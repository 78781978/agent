import { NextResponse } from "next/server";
import { supabaseRequest } from "../../../lib/supabase";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      conversationId: string;
      role: "user" | "assistant";
      content: string;
    };
    await supabaseRequest("messages", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        conversation_id: body.conversationId,
        role: body.role,
        content: body.content,
      }),
    });
    await supabaseRequest(`conversations?id=eq.${body.conversationId}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ updated_at: new Date().toISOString() }),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Błąd Supabase" }, { status: 500 });
  }
}

