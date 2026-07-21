"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useChat } from "@ai-sdk/react";

type ChatMode = "casual" | "expert" | "creative";
type ModelChoice = "flash" | "pro";
type StoredMessage = { id: string; role: "user" | "assistant"; content: string };

const modes: Array<{
  id: ChatMode;
  label: string;
  icon: string;
  description: string;
}> = [
  {
    id: "casual",
    label: "Casual",
    icon: "đź’¬",
    description: "krĂłtko, prosto i po ludzku",
  },
  {
    id: "expert",
    label: "Ekspert",
    icon: "đźŽ“",
    description: "analitycznie, formalnie i z rekomendacjÄ…",
  },
  {
    id: "creative",
    label: "Kreatywny",
    icon: "đźŽ¨",
    description: "nieszablonowo, z analogiami i inspiracjÄ…",
  },
];

const models: Array<{
  id: ModelChoice;
  label: string;
  icon: string;
  description: string;
}> = [
  {
    id: "flash",
    label: "Flash",
    icon: "âšˇ",
    description: "szybki model do codziennych pytaĹ„",
  },
  {
    id: "pro",
    label: "Pro",
    icon: "đź§ ",
    description: "zaawansowany model do zĹ‚oĹĽonych analiz",
  },
];

const sampleQuestions = [
  "Jak zaplanowaÄ‡ pierwszÄ… automatyzacjÄ™ AI dla maĹ‚ego sklepu WooCommerce?",
  "Jakie dane mogÄ™ bezpiecznie wysyĹ‚aÄ‡ do AI, a jakich nie powinnam?",
  "Jak zbudowaÄ‡ prostego chatbota do obsĹ‚ugi pytaĹ„ klientĂłw?",
  "PorĂłwnaj n8n, Make i Zapier dla poczÄ…tkujÄ…cej osoby.",
];

function messageText(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

function splitSourceLine(text: string) {
  const lines = text.split("\n");
  const sourceIndex = lines.findIndex((line) =>
    /^đź“Ž\s*ĹąrĂłdĹ‚[oa]:/i.test(line.trim()),
  );

  if (sourceIndex === -1) {
    return { body: text, source: "" };
  }

  return {
    body: lines.filter((_, index) => index !== sourceIndex).join("\n").trim(),
    source: lines[sourceIndex].trim().replace(/^đź“Ž\s*/, ""),
  };
}

function estimateTokens(messages: UIMessage[]) {
  const characters = messages.reduce(
    (sum, message) => sum + messageText(message).length,
    0,
  );
  return Math.ceil(characters / 4);
}

function buildConversationMemory(messages: StoredMessage[]) {
  return messages
    .slice(-10)
    .map((message) => {
      const author = message.role === "user" ? "Wioletta" : "Vie";
      return `${author}: ${message.content}`.slice(0, 700);
    })
    .join("\n");
}

function buildConversationMemoryFromUi(messages: UIMessage[]) {
  return buildConversationMemory(
    messages.map((message) => ({
      id: message.id,
      role: message.role as "user" | "assistant",
      content: messageText(message),
    })),
  );
}

async function readJsonResponse(response: Response) {
  const text = await response.text();
  if (!text.trim()) return {};

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Serwer zwrĂłciĹ‚ niepeĹ‚nÄ… odpowiedĹş. OdĹ›wieĹĽ stronÄ™ i sprĂłbuj ponownie.");
  }
}

export default function Home() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<ChatMode>("casual");
  const [model, setModel] = useState<ModelChoice>("flash");
  const [assistantModes, setAssistantModes] = useState<Record<string, ChatMode>>(
    {},
  );
  const [assistantModels, setAssistantModels] = useState<
    Record<string, ModelChoice>
  >({});
  const [lastPrompt, setLastPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const [contextOpen, setContextOpen] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [persistenceError, setPersistenceError] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [preferences, setPreferences] = useState<Record<string, string>>({});
  const [lastConversationMemory, setLastConversationMemory] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const conversationIdRef = useRef<string | null>(null);
  const lastConversationMemoryRef = useRef("");
  const pendingModeRef = useRef<ChatMode>("casual");
  const pendingModelRef = useRef<ModelChoice>("flash");

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest({ messages, body }) {
          const visibleMemory = buildConversationMemoryFromUi(messages);

          return {
            body: {
              ...body,
              messages,
              mode,
              model,
              userProfile: { name: userName || null, preferences },
              longTermMemory: visibleMemory || lastConversationMemory,
            },
          };
        },
      }),
    [mode, model, userName, preferences, lastConversationMemory],
  );

  const {
    messages,
    sendMessage,
    setMessages,
    status,
    stop,
    error,
    clearError,
  } = useChat({
    transport,
    onFinish({ message }) {
      const responseMode = pendingModeRef.current;
      const responseModel = pendingModelRef.current;
      setAssistantModes((current) => ({
        ...current,
        [message.id]: responseMode,
      }));
      setAssistantModels((current) => ({
        ...current,
        [message.id]: responseModel,
      }));
      const activeConversationId = conversationIdRef.current;
      const content = messageText(message);
      if (activeConversationId && content) void saveMessage(activeConversationId, "assistant", content);
    },
  });

  const activeMode = modes.find((item) => item.id === mode) ?? modes[0];
  const activeModel = models.find((item) => item.id === model) ?? models[0];
  const isLoading = status === "submitted" || status === "streaming";
  const tokenCount = estimateTokens(messages);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    try {
      const savedMemory = localStorage.getItem("vie_last_conversation_memory") ?? "";
      setLastConversationMemory(savedMemory);
      lastConversationMemoryRef.current = savedMemory;
    } catch {
      setLastConversationMemory("");
      lastConversationMemoryRef.current = "";
    }
  }, []);

  useEffect(() => {
    if (!messages.length) return;
    const memory = buildConversationMemoryFromUi(messages);
    setLastConversationMemory(memory);
    lastConversationMemoryRef.current = memory;
    try {
      localStorage.setItem("vie_last_conversation_memory", memory);
    } catch {
      // Lokalna pamiÄ™Ä‡ jest dodatkiem. JeĹ›li przeglÄ…darka jÄ… zablokuje, czat nadal dziaĹ‚a.
    }
  }, [messages]);

  useEffect(() => {
    let active = true;
    async function loadHistory() {
      try {
        const selectedConversation = new URLSearchParams(window.location.search).get("conversationId");
        const response = await fetch(selectedConversation ? `/api/conversations?id=${encodeURIComponent(selectedConversation)}` : "/api/conversations");
        const data = await readJsonResponse(response);
        if (!response.ok) throw new Error(data.error || "Nie udaĹ‚o siÄ™ wczytaÄ‡ historii.");
        if (!active) return;
        if (data.conversation) {
          const loadedMessages = data.messages as StoredMessage[];
          const memory = buildConversationMemory(loadedMessages);
          setConversationId(data.conversation.id);
          conversationIdRef.current = data.conversation.id;
          setLastConversationMemory(memory);
          lastConversationMemoryRef.current = memory;
          try {
            localStorage.setItem("vie_last_conversation_memory", memory);
          } catch {}
          setMessages(loadedMessages.map((message) => ({
            id: message.id,
            role: message.role,
            parts: [{ type: "text" as const, text: message.content }],
          })));
        }
      } catch (loadError) {
        if (active) setPersistenceError(loadError instanceof Error ? loadError.message : "BĹ‚Ä…d historii.");
      } finally {
        if (active) setHistoryLoading(false);
      }
    }
    void loadHistory();
    return () => { active = false; };
  }, [setMessages]);

  useEffect(() => {
    let active = true;
    async function loadProfile() {
      try {
        let id = localStorage.getItem("user_id");
        if (!id) {
          id = crypto.randomUUID();
          localStorage.setItem("user_id", id);
        }
        setUserId(id);
        let response = await fetch(`/api/profile?userId=${encodeURIComponent(id)}`);
        let data = await readJsonResponse(response);
        if (!response.ok) throw new Error(data.error || "Nie udaĹ‚o siÄ™ pobraÄ‡ profilu.");
        if (!data.profile) {
          response = await fetch("/api/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: id }),
          });
          data = await readJsonResponse(response);
          if (!response.ok) throw new Error(data.error || "Nie udaĹ‚o siÄ™ utworzyÄ‡ profilu.");
        }
        if (active) {
          setUserName(data.profile.name || "");
          setPreferences(data.profile.preferences || {});
        }
      } catch (profileError) {
        if (active) setPersistenceError(profileError instanceof Error ? profileError.message : "BĹ‚Ä…d profilu.");
      } finally {
        if (active) setProfileLoading(false);
      }
    }
    void loadProfile();
    return () => { active = false; };
  }, []);

  async function updateProfile(update: { name?: string; preference?: { key: string; value: string } }) {
    if (!userId) return;
    const response = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, ...update }),
    });
    const data = await readJsonResponse(response);
    if (!response.ok) throw new Error(data.error || "Nie udaĹ‚o siÄ™ zapisaÄ‡ profilu.");
    setUserName(data.profile.name || "");
    setPreferences(data.profile.preferences || {});
  }

  function profileDetails(text: string) {
    const nameMatch = text.match(/(?:mam na imi[eÄ™]|nazywam si[eÄ™]|jestem)\s+([a-zÄ…Ä‡Ä™Ĺ‚Ĺ„ĂłĹ›ĹşĹĽ-]+)/i);
    const singleName = !userName && /^[a-zÄ…Ä‡Ä™Ĺ‚Ĺ„ĂłĹ›ĹşĹĽ-]{2,30}$/i.test(text.trim()) ? text.trim() : "";
    const preferenceMatch = text.match(/lubi[eÄ™]\s+(.{2,80})/i);
    const cityMatch = text.match(/mieszkam w\s+([a-zÄ…Ä‡Ä™Ĺ‚Ĺ„ĂłĹ›ĹşĹĽ -]{2,50})/i);
    return {
      name: nameMatch?.[1] || singleName || undefined,
      preference: cityMatch
        ? { key: "miasto", value: cityMatch[1].trim() }
        : preferenceMatch
          ? { key: "lubiÄ™", value: preferenceMatch[1].trim() }
          : undefined,
    };
  }

  async function createConversation(title = "Nowa rozmowa") {
    const response = await fetch("/api/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title.slice(0, 50) }),
    });
    const data = await readJsonResponse(response);
    if (!response.ok) throw new Error(data.error || "Nie udaĹ‚o siÄ™ utworzyÄ‡ rozmowy.");
    setConversationId(data.conversation.id);
    conversationIdRef.current = data.conversation.id;
    return data.conversation.id as string;
  }

  async function saveMessage(id: string, role: "user" | "assistant", content: string) {
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: id, role, content }),
      });
      const data = await readJsonResponse(response);
      if (!response.ok) throw new Error(data.error || "Nie udaĹ‚o siÄ™ zapisaÄ‡ wiadomoĹ›ci.");
      setPersistenceError("");
    } catch (saveError) {
      setPersistenceError(saveError instanceof Error ? saveError.message : "BĹ‚Ä…d zapisu historii.");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = input.trim();

    if (!trimmed || isLoading) {
      return;
    }

    setInput("");
    setLastPrompt(trimmed);
    pendingModeRef.current = mode;
    pendingModelRef.current = model;

    try {
      const details = profileDetails(trimmed);
      if (details.name || details.preference) await updateProfile(details);
      const activeConversationId = conversationId ?? (await createConversation(trimmed));
      await saveMessage(activeConversationId, "user", trimmed);
      await sendMessage(
        { text: trimmed },
        {
          body: {
            mode,
            model,
          },
        },
      );
    } catch {
      setInput(trimmed);
    }
  }

  async function retryLastPrompt() {
    const trimmed = lastPrompt.trim();

    if (!trimmed || isLoading) {
      return;
    }

    clearError();
    pendingModeRef.current = mode;
    pendingModelRef.current = model;

    try {
      await sendMessage(
        { text: trimmed },
        {
          body: {
            mode,
            model,
          },
        },
      );
    } catch {
      setInput(trimmed);
    }
  }

  function friendlyErrorMessage(message?: string) {
    if (!message || message === "An error occurred.") {
      return "WystÄ…piĹ‚ chwilowy bĹ‚Ä…d poĹ‚Ä…czenia z modelem AI. Kliknij â€žSprĂłbuj ponownieâ€ť albo wyĹ›lij wiadomoĹ›Ä‡ jeszcze raz.";
    }

    if (message.toLowerCase().includes("quota")) {
      return "Model AI zgĹ‚asza limit lub problem z rozliczeniem API. SprawdĹş limit klucza albo uĹĽyj taĹ„szego modelu Flash.";
    }

    if (message.toLowerCase().includes("api key")) {
      return "Aplikacja nie widzi poprawnego klucza API. SprawdĹş plik .env.local i uruchom serwer ponownie.";
    }

    return message;
  }

  async function exportConversation() {
    const content = messages
      .map((message) => {
        const author = message.role === "user" ? "UĹĽytkownik" : "Agent";
        return `${author}: ${messageText(message)}`;
      })
      .join("\n\n");

    await navigator.clipboard.writeText(content || "Rozmowa jest pusta.");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  async function startNewConversation() {
    clearError();
    const memory = messages.length
      ? buildConversationMemoryFromUi(messages)
      : lastConversationMemoryRef.current;
    setMessages([]);
    setAssistantModes({});
    setAssistantModels({});
    setCopied(false);
    setPersistenceError("");
    setLastConversationMemory(memory);
    lastConversationMemoryRef.current = memory;
    try {
      localStorage.setItem("vie_last_conversation_memory", memory);
    } catch {}
    try {
      await createConversation();
    } catch (newConversationError) {
      setPersistenceError(newConversationError instanceof Error ? newConversationError.message : "Nie udaĹ‚o siÄ™ utworzyÄ‡ rozmowy.");
    }
  }

  function useSampleQuestion(question: string) {
    setInput(question);
  }

  return (
    <main className="chat-shell">
      <section className="chat-card" aria-label="Vie Agent AI">
        <nav className="top-nav" aria-label="Nawigacja">
          <Link href="/agent">Agent</Link>
          <Link className="active" href="/chat">
            đź¤– Chat
          </Link>
          <Link href="/react">đź”„ ReAct</Link>
          <Link href="/travel">âśď¸Ź PodrĂłĹĽe</Link>
          <Link href="/think">đź§  MyĹ›lenie</Link>
          <Link href="/fewshot">đź“š SĹ‚ownik</Link>
          <Link href="/format">đź“ Formater</Link>
          <Link href="/search">Szukaj</Link>
          <Link href="/history">đź“ś Historia</Link>
          <Link href="/generate">Grafiki</Link>
          <Link href="/wash">đźš— Myjnia</Link>
          <Link href="/wash-site">đźŚ Strona myjni</Link>
        </nav>

        <header className="chat-header">
          <div>
            <p className="eyebrow">Warsztaty 1-4</p>
            <h1>đź¤– Vie â€” ekspertka automatyzacji AI</h1>
            <p className="subtitle">
              Ekspert od automatyzacji AI, e-commerce, WordPress i WooCommerce.
              Zapytaj mnie o chatboty, procesy, API, n8n, Make i bezpieczne
              wdroĹĽenia.
            </p>
            <div className="sample-questions" aria-label="PrzykĹ‚adowe pytania">
              {sampleQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => useSampleQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
          <div className="header-pills">
            <div className={`mode-pill ${mode}`}>
              {activeMode.icon} {activeMode.label}
            </div>
            <div className={`model-pill ${model}`}>
              {activeModel.icon} {activeModel.label}
            </div>
          </div>
        </header>

        <section className="memory-panel" aria-label="Kontekst rozmowy">
          <button
            className="memory-toggle"
            type="button"
            onClick={() => setContextOpen((value) => !value)}
          >
            Kontekst rozmowy
            <span>{contextOpen ? "Ukryj" : "PokaĹĽ"}</span>
          </button>

          {contextOpen && (
            <div className="memory-content">
              <p>
                WiadomoĹ›ci: <strong>{messages.length}</strong> | ~Tokeny:{" "}
                <strong>{tokenCount}</strong>
              </p>
              <div className="memory-actions">
                <button type="button" onClick={startNewConversation}>
                  đź—‘ Nowa rozmowa
                </button>
                <button type="button" onClick={exportConversation}>
                  đź“‹ Eksportuj rozmowÄ™
                </button>
                {copied && <span className="copied">Skopiowano!</span>}
              </div>
            </div>
          )}
        </section>

        <section className="messages" aria-live="polite">
          {!profileLoading && (
            <div className="empty-state" role="status">
              <p>{userName ? `CzeĹ›Ä‡, ${userName}! MiĹ‚o CiÄ™ znowu widzieÄ‡.` : "CzeĹ›Ä‡! Jestem Vie. Nie znamy siÄ™ jeszcze â€” jak masz na imiÄ™?"}</p>
            </div>
          )}
          {historyLoading && <div className="empty-state" role="status"><p>WczytujÄ™ ostatniÄ… rozmowÄ™...</p></div>}
          {!historyLoading && messages.length === 0 && (
            <div className="empty-state">
              <p>
                CzeĹ›Ä‡, jestem Vie. Zapytaj mnie o automatyzacje AI,
                WooCommerce, chatboty albo plan wdroĹĽenia dla maĹ‚ej firmy.
              </p>
            </div>
          )}

          {messages.map((message) => {
            const { body, source } = splitSourceLine(messageText(message));

            return (
            <article
              className={`message ${message.role}`}
              key={message.id}
              aria-label={message.role === "user" ? "UĹĽytkownik" : "Agent AI"}
            >
              {message.role === "assistant" &&
                (() => {
                  const messageMode = assistantModes[message.id] ?? mode;
                  const messageModeData =
                    modes.find((item) => item.id === messageMode) ?? modes[0];
                  const messageModel = assistantModels[message.id] ?? model;
                  const messageModelData =
                    models.find((item) => item.id === messageModel) ??
                    models[0];
                  return (
                    <div className="badge-row">
                      <span className={`badge ${messageMode}`}>
                        {messageModeData.icon} {messageMode}
                      </span>
                      <span className={`model-badge ${messageModel}`}>
                        {messageModelData.icon} {messageModel}
                      </span>
                    </div>
                  );
                })()}
              <div className="bubble">{body}</div>
              {source ? <div className="message-source">{source}</div> : null}
            </article>
            );
          })}

          {isLoading && (
            <article className="message assistant">
              <span className={`badge ${mode}`}>
                {activeMode.icon} {mode}
              </span>
              <div className="bubble thinking">MyĹ›lÄ™...</div>
            </article>
          )}

          <div ref={bottomRef} />
        </section>

        {error && (
          <div className="error-box">
            <p>{friendlyErrorMessage(error.message)}</p>
            <div className="error-actions">
              {lastPrompt && (
                <button type="button" onClick={retryLastPrompt}>
                  SprĂłbuj ponownie
                </button>
              )}
              <button type="button" onClick={clearError}>
                Zamknij
              </button>
            </div>
          </div>
        )}

        {persistenceError && <div className="error-box"><p>Historia rozmowy: {persistenceError}</p></div>}

        <section className="mode-switcher" aria-label="Tryb rozmowy">
          {modes.map((item) => (
            <button
              className={item.id === mode ? "active" : ""}
              key={item.id}
              type="button"
              onClick={() => setMode(item.id)}
              title={item.description}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </section>

        <section className="model-switcher" aria-label="Model AI">
          {models.map((item) => (
            <button
              className={item.id === model ? "active" : ""}
              key={item.id}
              type="button"
              onClick={() => setModel(item.id)}
              title={item.description}
            >
              <span>{item.icon}</span>
              {item.label}
              <small>{item.description}</small>
            </button>
          ))}
        </section>

        <form className="composer" onSubmit={handleSubmit}>
          <textarea
            aria-label="WiadomoĹ›Ä‡ do agenta"
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder="Napisz wiadomoĹ›Ä‡..."
            value={input}
          />
          {isLoading ? (
            <button type="button" onClick={stop}>
              Stop
            </button>
          ) : (
            <button type="submit" disabled={isLoading || !input.trim()}>
              WyĹ›lij
            </button>
          )}
        </form>
      </section>
    </main>
  );
}


