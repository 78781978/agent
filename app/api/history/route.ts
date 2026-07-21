import { NextResponse } from "next/server";
import { supabaseRequest } from "../../../lib/supabase";

type Conversation = { id: string; title: string | null; created_at: string; updated_at: string };
type Message = { conversation_id: string; content: string; created_at: string };

export async function GET() {
  try {
    const conversations = await supabaseRequest<Conversation[]>("conversations?select=id,title,created_at,updated_at&order=updated_at.desc");
    const messages = await supabaseRequest<Message[]>("messages?select=conversation_id,content,created_at&order=created_at.asc");
    return NextResponse.json({
      conversations: conversations.map((conversation) => {
        const related = messages.filter((message) => message.conversation_id === conversation.id);
        return { ...conversation, messageCount: related.length, preview: related.at(-1)?.content ?? "Brak wiadomości" };
      }),
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Błąd Supabase" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Brakuje identyfikatora." }, { status: 400 });
    const safeId = encodeURIComponent(id);
    await supabaseRequest(`messages?conversation_id=eq.${safeId}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
    await supabaseRequest(`conversations?id=eq.${safeId}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Błąd Supabase" }, { status: 500 });
  }
}

