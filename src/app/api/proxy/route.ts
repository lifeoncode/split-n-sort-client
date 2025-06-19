import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, url } = body;

    if (!email || !url) {
      return NextResponse.json({ error: "Missing email or url" }, { status: 400 });
    }

    const target = `https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/junior-dev?url=${encodeURIComponent(
      url
    )}&email=${encodeURIComponent(email)}`;

    const response = await fetch(target);
    const text = await response.text();

    if (!response.ok) {
      console.error("Supabase error response:", text);
      return NextResponse.json({ error: "Supabase error", detail: text }, { status: response.status });
    }

    return NextResponse.json(JSON.parse(text), { status: response.status });
  } catch (err: unknown) {
    console.error("API proxy route crashed:", err);
    if (err instanceof Error) return NextResponse.json({ error: "Proxy failed", detail: err.message }, { status: 500 });
    return NextResponse.json({ error: "Proxy failed", detail: err }, { status: 500 });
  }
}
