import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { message?: string }
    | null;

  const message = body?.message?.toString() ?? "";

  if (message.trim().length === 0) {
    return NextResponse.json({ reply: "Send a message and I'll respond." });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Updated to use the free NVIDIA Nemotron 3 Ultra model
        model: "nvidia/nemotron-3-ultra-550b-a55b:free",
        messages: [{ role: "user", content: message }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    
    const replyText = data.choices?.[0]?.message?.content ?? "No response received.";

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error("OpenRouter API Error:", error);
    
    return NextResponse.json(
      { reply: "Sorry, I encountered an error while processing your request." },
      { status: 500 }
    );
  }
}