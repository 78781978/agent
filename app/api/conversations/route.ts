import { NextResponse } from "next/server";
import { supabaseRequest } from "../../../lib/supabase";

type Conversation = { id: string; title: string | null; updated_at: string };

export async function GET(request: Request) {
  try {
    const requestedId = new URL(request.url).searchParams.get("id");
    const rows = await supabaseRequest<Conversation[]>(
      requestedId
        ? `conversations?select=id,title,updated_at&id=eq.${encodeURIComponent(requestedId)}&limit=1`
        : "conversations?select=id,title,updated_at&order=updated_at.desc&limit=1",
    );
    if (!rows[0]) return NextResponse.json({ conversation: null, messages: [] });
    const conversation = rows[0];
    const messages = await supabaseRequest<Array<{ id: string; role: "user" | "assistant"; content: string }>>(
      `messages?select=id,role,content&conversation_id=eq.${conversation.id}&order=created_at.asc`,
    );
    return NextResponse.json({ conversation, messages });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Błąd Supabase" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { title?: string };
    const rows = await supabaseRequest<Conversation[]>("conversations", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({ title: body.title?.slice(0, 50) || "Nowa rozmowa" }),
    });
    return NextResponse.json({ conversation: rows[0] });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Błąd Supabase" }, { status: 500 });
  }
}

