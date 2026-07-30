import { NextResponse } from "next/server";
import { getSecurityStats } from "../../../../lib/security";
import { getAuthenticatedUser } from "../../../../lib/supabase";

export async function GET(request: Request) {
  await getAuthenticatedUser(request);

  return NextResponse.json({
    ok: true,
    stats: getSecurityStats(),
  });
}
