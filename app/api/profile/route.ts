import { NextResponse } from "next/server";
import { getAuthenticatedUser, supabaseRequest } from "../../../lib/supabase";

type Profile = {
  id: string;
  name: string | null;
  preferences: Record<string, string>;
};

async function getProfile(userId: string) {
  const rows = await supabaseRequest<Profile[]>(
    `user_profiles?select=id,name,preferences&id=eq.${encodeURIComponent(userId)}&limit=1`,
  );

  return rows[0] ?? null;
}

async function upsertProfile(
  userId: string,
  name: string | null,
  preferences: Record<string, string>,
) {
  const rows = await supabaseRequest<Profile[]>(
    "user_profiles?on_conflict=id",
    {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify({
        id: userId,
        name,
        preferences,
      }),
    },
  );

  return rows[0] ?? null;
}

function profileStatus(error: unknown) {
  return error instanceof Error && error.message.includes("zalog") ? 401 : 500;
}

export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    const profile = await getProfile(user.id);

    return NextResponse.json({ profile });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Błąd profilu" },
      { status: profileStatus(error) },
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    const existingProfile = await getProfile(user.id);

    if (existingProfile) {
      return NextResponse.json({ profile: existingProfile });
    }

    const profile = await upsertProfile(user.id, user.email?.split("@")[0] ?? null, {});

    return NextResponse.json({ profile });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Błąd profilu" },
      { status: profileStatus(error) },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    const body = (await request.json()) as {
      name?: string;
      preference?: { key: string; value: string };
    };
    const currentProfile = (await getProfile(user.id)) ?? {
      id: user.id,
      name: null,
      preferences: {},
    };
    const preferences = { ...(currentProfile.preferences ?? {}) };

    if (body.preference?.key && body.preference.value) {
      preferences[body.preference.key] = body.preference.value;
    }

    const profile = await upsertProfile(
      user.id,
      body.name ?? currentProfile.name ?? user.email?.split("@")[0] ?? null,
      preferences,
    );

    return NextResponse.json({ profile });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Błąd profilu" },
      { status: profileStatus(error) },
    );
  }
}
