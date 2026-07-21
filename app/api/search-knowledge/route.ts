import { searchKnowledge } from "../../../lib/knowledge";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    query?: unknown;
  } | null;
  const query = typeof body?.query === "string" ? body.query.trim() : "";

  if (!query) {
    return Response.json({ error: "Pole query jest wymagane." }, { status: 400 });
  }

  try {
    const result = await searchKnowledge(query);
    return Response.json(result);
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Nie udało się wyszukać w bazie wiedzy.",
      },
      { status: 500 },
    );
  }
}
