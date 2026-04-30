import { NextResponse } from "next/server";

type GeminiRequest = {
  prompt: string;
  model?: string;
};

type GenerateContentResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
};

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GEMINI_API_KEY. Add it to .env.local (do not commit)." },
      { status: 500 }
    );
  }

  let body: GeminiRequest;
  try {
    body = (await req.json()) as GeminiRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const prompt = body.prompt?.trim();
  if (!prompt) {
    return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
  }

  const model = body.model?.trim() || "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model
  )}:generateContent`;

  const upstream = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    }),
  });

  const json: unknown = await upstream.json().catch(() => null);

  if (!upstream.ok) {
    return NextResponse.json(
      {
        error: "Gemini request failed",
        status: upstream.status,
        details: json,
      },
      { status: 502 }
    );
  }

  const parsed = json as GenerateContentResponse | null;
  const text =
    parsed?.candidates?.[0]?.content?.parts
      ?.map((p) => p.text)
      .filter((t): t is string => typeof t === "string" && t.length > 0)
      .join("\n") ?? "";

  return NextResponse.json({ text, raw: json });
}
