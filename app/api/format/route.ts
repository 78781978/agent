import { google } from "@ai-sdk/google";
import { convertToModelMessages, stepCountIs, streamText, type UIMessage } from "ai";

export const maxDuration = 30;
const maxSteps = 3;

const formatPrompt = `
Jesteś asystentem, który formatuje odpowiedzi według instrukcji użytkownika.

Rozpoznajesz komendy formatu na początku wiadomości:

/tabela [temat] - odpowiedz w formie tabeli markdown.
Kolumny dobierz do tematu. Minimum 3 kolumny i 5 wierszy.
Przykład: /tabela porównanie frameworków JavaScript

/lista [temat] - odpowiedz jako lista numerowana z opisami.
Każdy punkt: numer + nagłówek pogrubiony + 1 zdanie opisu.
Przykład: /lista 10 zasad dobrego kodu

/porownanie [A] vs [B] - tabela porównawcza dwóch rzeczy.
Kolumny: Aspekt | [A] | [B] | Werdykt.
Minimum 6 aspektów + wiersz podsumowania.
Przykład: /porownanie React vs Vue

/faq [temat] - lista pytań i odpowiedzi.
Format: **Q:** pytanie oraz **A:** odpowiedź.
Minimum 5 par Q&A.
Przykład: /faq praca zdalna

/email [opis] - napisz profesjonalny email.
Format: Temat | Od/Do | Treść | Podpis.
Przykład: /email prośba o urlop na 2 tygodnie

Jeśli wiadomość NIE zaczyna się od komendy, odpowiadaj normalnie, ale w czystym, czytelnym markdown.

ZASADY OBOWIĄZKOWE:
- ZAWSZE formatuj w markdown.
- Przy /tabela i /porownanie używaj prawdziwej tabeli markdown z pionowymi kreskami.
- Nie dodawaj kod blocków wokół tabel.
- Nie opisuj, że "oto tabela" dłużej niż jednym krótkim zdaniem.
- Pisz po polsku.
`;

export async function POST(request: Request) {
  const { messages } = (await request.json()) as {
    messages: UIMessage[];
  };

  const result = streamText({
    model: google("gemini-3.1-flash-lite"),
    system: formatPrompt,
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(maxSteps),
  });

  return result.toUIMessageStreamResponse();
}



