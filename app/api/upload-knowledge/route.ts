import { splitIntoChunks } from "../../../lib/chunking";
import { embedText } from "../../../lib/embeddings";
import { supabaseRequest } from "../../../lib/supabase";

type DocumentRow = {
  title: string;
  created_at: string;
};

function vectorToPgString(vector: number[]) {
  return `[${vector.join(",")}]`;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Nieznany błąd.";
}

export async function GET() {
  try {
    const rows = await supabaseRequest<DocumentRow[]>(
      "documents?select=title,created_at&order=created_at.desc",
    );

    const grouped = new Map<
      string,
      {
        title: string;
        chunks: number;
        created_at: string;
      }
    >();

    for (const row of rows ?? []) {
      const existing = grouped.get(row.title);

      if (existing) {
        existing.chunks += 1;
        if (new Date(row.created_at) < new Date(existing.created_at)) {
          existing.created_at = row.created_at;
        }
      } else {
        grouped.set(row.title, {
          title: row.title,
          chunks: 1,
          created_at: row.created_at,
        });
      }
    }

    return Response.json({
      documents: Array.from(grouped.values()).sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    });
  } catch (error) {
    return Response.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    title?: unknown;
    content?: unknown;
  } | null;
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const content = typeof body?.content === "string" ? body.content.trim() : "";

  if (!title || !content) {
    return Response.json(
      { error: "Podaj tytuł i treść dokumentu." },
      { status: 400 },
    );
  }

  const chunks = splitIntoChunks(content);

  if (!chunks.length) {
    return Response.json(
      { error: "Treść dokumentu jest zbyt krótka albo pusta." },
      { status: 400 },
    );
  }

  try {
    for (let index = 0; index < chunks.length; index += 1) {
      const chunk = chunks[index];
      const embedding = await embedText(chunk);

      await supabaseRequest("documents", {
        method: "POST",
        headers: {
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          title,
          content: chunk,
          embedding: vectorToPgString(embedding),
          metadata: {
            source: title,
            chunk_index: index,
            total_chunks: chunks.length,
          },
        }),
      });
    }

    return Response.json({
      success: true,
      chunks_saved: chunks.length,
    });
  } catch (error) {
    return Response.json(
      {
        error: getErrorMessage(error),
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.trim();

  if (!title) {
    return Response.json({ error: "Brakuje tytułu dokumentu." }, { status: 400 });
  }

  try {
    await supabaseRequest(`documents?title=eq.${encodeURIComponent(title)}`, {
      method: "DELETE",
      headers: {
        Prefer: "return=minimal",
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
