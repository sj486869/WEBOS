import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const envFilePath = path.join(process.cwd(), '.env.local');
    let envContent = '';

    if (fs.existsSync(envFilePath)) {
      envContent = fs.readFileSync(envFilePath, 'utf8');
    }

    const envLines = envContent.split(/\r?\n/);
    let found = false;

    for (let i = 0; i < envLines.length; i++) {
      if (envLines[i].startsWith('NEXT_PUBLIC_MEDIA_SERVER_URL=')) {
        envLines[i] = `NEXT_PUBLIC_MEDIA_SERVER_URL="${url}"`;
        found = true;
        break;
      }
    }

    if (!found) {
      envLines.push(`NEXT_PUBLIC_MEDIA_SERVER_URL="${url}"`);
    }

    // Ensure it ends with a newline
    let finalContent = envLines.join('\n');
    if (!finalContent.endsWith('\n')) {
      finalContent += '\n';
    }

    fs.writeFileSync(envFilePath, finalContent);

    return NextResponse.json({ success: true, url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
