import { NextResponse } from "next/server";
import { supabaseRequest } from "../../../lib/supabase";

type Profile = {
  id: string;
  name: string | null;
  preferences: Record<string, string> | null;
};

export async function GET(request: Request) {
  try {
    const userId = new URL(request.url).searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "Brakuje userId." }, { status: 400 });
    const rows = await supabaseRequest<Profile[]>(
      `user_profiles?select=id,name,preferences&id=eq.${encodeURIComponent(userId)}&limit=1`,
    );
    return NextResponse.json({ profile: rows[0] ?? null });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Błąd Supabase" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = (await request.json()) as { userId: string };
    const rows = await supabaseRequest<Profile[]>("user_profiles", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({ id: userId, preferences: {} }),
    });
    return NextResponse.json({ profile: rows[0] });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Błąd Supabase" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as {
      userId: string;
      name?: string;
      preference?: { key: string; value: string };
    };
    const currentRows = await supabaseRequest<Profile[]>(
      `user_profiles?select=id,name,preferences&id=eq.${encodeURIComponent(body.userId)}&limit=1`,
    );
    const current = currentRows[0];
    if (!current) return NextResponse.json({ error: "Nie znaleziono profilu." }, { status: 404 });
    const preferences = { ...(current.preferences ?? {}) };
    if (body.preference) preferences[body.preference.key] = body.preference.value;
    const update: { name?: string; preferences?: Record<string, string> } = {};
    if (body.name) update.name = body.name.trim().slice(0, 80);
    if (body.preference) update.preferences = preferences;
    const rows = await supabaseRequest<Profile[]>(`user_profiles?id=eq.${encodeURIComponent(body.userId)}`, {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(update),
    });
    return NextResponse.json({ profile: rows[0] });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Błąd Supabase" }, { status: 500 });
  }
}

