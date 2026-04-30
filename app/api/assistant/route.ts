import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { message?: string }
    | null;

  const message = body?.message?.toString() ?? "";

  // Placeholder: in a real deployment this is where you would call OpenAI or a local LLM.
  // Keep the contract stable so swapping the backend is trivial.

  const reply =
    message.trim().length === 0
      ? "Send a message and I'll respond."
      : `I received: "${message}"\n\n(Assistant backend is currently a stub. You can implement OpenAI integration in app/api/assistant/route.ts.)`;

  return NextResponse.json({ reply });
}
