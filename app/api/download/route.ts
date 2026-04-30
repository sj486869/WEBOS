import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return new NextResponse('Missing id parameter', { status: 400 });
  }

  try {
    // 1. Get file record from database
    const { data: fileRecord, error: dbError } = await supabase
      .from('files')
      .select('*')
      .eq('id', id)
      .single();

    if (dbError || !fileRecord) {
      return new NextResponse('File not found', { status: 404 });
    }

    // 2. Download from storage to proxy it
    const { data: blob, error: downloadError } = await supabase.storage
      .from('uploads')
      .download(fileRecord.storage_path);

    if (downloadError || !blob) {
      return new NextResponse('Failed to download from storage', { status: 500 });
    }

    // 3. Return the file with proper headers to force download with original filename
    const headers = new Headers();
    headers.set('Content-Type', fileRecord.mime_type || 'application/octet-stream');
    headers.set('Content-Disposition', `attachment; filename="${fileRecord.original_filename}"`);
    headers.set('Content-Length', blob.size.toString());

    return new NextResponse(blob, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error generating download URL:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
