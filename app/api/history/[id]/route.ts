import { NextResponse } from "next/server";
import { supabaseRequest } from "../../../../lib/supabase";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const safeId = encodeURIComponent(id);
    const conversations = await supabaseRequest<Array<{ id: string; title: string | null; created_at: string; updated_at: string }>>(
      `conversations?select=id,title,created_at,updated_at&id=eq.${safeId}&limit=1`,
    );
    if (!conversations[0]) return NextResponse.json({ error: "Nie znaleziono rozmowy." }, { status: 404 });
    const messages = await supabaseRequest<Array<{ id: string; role: "user" | "assistant"; content: string; created_at: string }>>(
      `messages?select=id,role,content,created_at&conversation_id=eq.${safeId}&order=created_at.asc`,
    );
    return NextResponse.json({ conversation: conversations[0], messages });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Błąd Supabase" }, { status: 500 });
  }
}

