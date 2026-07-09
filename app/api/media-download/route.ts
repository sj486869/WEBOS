import { NextResponse } from 'next/server';

const MEDIA_SERVER_URL = (process.env.NEXT_PUBLIC_MEDIA_SERVER_URL || 'https://i-try.onrender.com').replace(/\/+$/, '');

export const maxDuration = 300;

// Wake up Render server (free tier sleeps after inactivity — takes ~60s to start)
async function wakeUpServer(): Promise<boolean> {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(`${MEDIA_SERVER_URL}/health`, {
        signal: AbortSignal.timeout(25000), // 25s per attempt
      });
      if (res.ok) {
        console.log(`[media-download] Server awake (attempt ${attempt})`);
        return true;
      }
    } catch {
      console.log(`[media-download] Wake-up attempt ${attempt}/4 failed, retrying...`);
      if (attempt < 4) await new Promise(r => setTimeout(r, 5000));
    }
  }
  return false;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, destination } = body;

    if (!url) {
      return NextResponse.json({ error: 'Missing url' }, { status: 400 });
    }

    // Step 1: Wake up the Render server first (handles cold start)
    const isAwake = await wakeUpServer();
    if (!isAwake) {
      return NextResponse.json(
        { error: 'Media server is not responding. It may be starting up — please wait 60 seconds and try again.' },
        { status: 503 }
      );
    }

    // Step 2: Send download request (no timeout — large files take time)
    const response = await fetch(`${MEDIA_SERVER_URL}/download`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, destination: destination || 'local' }),
    });

    let data: any = {};
    try { data = await response.json(); } catch { data = { error: 'No response from media server' }; }

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || `Media server error: ${response.status}` },
        { status: 502 }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('[/api/media-download] Error:', error);
    return NextResponse.json(
      { error: `Download failed: ${error.message}` },
      { status: 503 }
    );
  }
}
