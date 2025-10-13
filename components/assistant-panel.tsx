"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "ai/react";
import { X } from "lucide-react";
import type { Locale, SectionCopy } from "@/lib/i18n";
import {
  AI_MAX_MESSAGES,
  AI_MESSAGE_COUNT_KEY,
  ASSISTANT_SYSTEM_PROMPT,
} from "@/lib/constants";

type Props = {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  dictionary: SectionCopy;
};

export function AssistantPanel({ open, onClose, locale, dictionary }: Props) {
  const [usedMessages, setUsedMessages] = useState(0);
  const [showLimitNotice, setShowLimitNotice] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { messages, input, handleInputChange, append, setInput, isLoading, error } =
    useChat({
      api: "/api/ai",
      id: "portfolio-assistant",
      body: {
        system: ASSISTANT_SYSTEM_PROMPT,
        locale,
      },
      initialMessages: [],
      sendExtraMessageFields: true,
    });

  useEffect(() => {
    if (!open) {
      return;
    }
    if (typeof window === "undefined") {
      return;
    }

    const stored = Number.parseInt(
      window.localStorage.getItem(AI_MESSAGE_COUNT_KEY) ?? "0",
      10,
    );
    setUsedMessages(Number.isNaN(stored) ? 0 : stored);
  }, [open]);

  useEffect(() => {
    if (!open || typeof window === "undefined") {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const remaining = useMemo(
    () => Math.max(AI_MAX_MESSAGES - usedMessages, 0),
    [usedMessages],
  );

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    if (remaining <= 0) {
      setShowLimitNotice(true);
      return;
    }

    const nextCount = usedMessages + 1;
    setUsedMessages(nextCount);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(AI_MESSAGE_COUNT_KEY, String(nextCount));
    }
    setShowLimitNotice(false);

    setInput("");
    try {
      await append({
        role: "user",
        content: trimmed,
      });
    } catch (err) {
      console.error(err);
      const fallbackCount = Math.max(nextCount - 1, 0);
      setUsedMessages(fallbackCount);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          AI_MESSAGE_COUNT_KEY,
          String(fallbackCount),
        );
      }
      setInput(trimmed);
    }
  };

  return (
    <div
      aria-hidden={!open}
      className={`fixed z-50 transition-all duration-300 ease-soft ${
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      } ${
        open
          ? "inset-0 flex h-full w-full flex-col bg-mocha-base md:inset-y-0 md:left-0 md:w-sidebar md:bg-mocha-surface md:shadow-surface"
          : "hidden"
      }`}
    >
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-mocha-subtle">
            {dictionary.assistantTitle}
          </p>
          <p className="mt-1 text-sm text-mocha-text/80">
            {dictionary.assistantGreeting}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/10 p-2 text-mocha-text/70 transition-colors duration-200 hover:border-mocha-primary/60 hover:text-mocha-primary"
          aria-label={locale === "en" ? "Close assistant" : "关闭助手"}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-4 text-sm"
      >
        {messages.length === 0 ? (
          <p className="rounded-lg bg-white/5 px-4 py-3 text-mocha-text/70">
            {dictionary.assistantEmpty}
          </p>
        ) : (
          <ul className="space-y-4">
            {messages.map((message) => (
              <li
                key={message.id}
                className={`w-full rounded-lg px-4 py-3 text-sm ${
                  message.role === "user"
                    ? "bg-mocha-primary/10 text-mocha-primary"
                    : "bg-white/5 text-mocha-text"
                }`}
              >
                {message.content}
              </li>
            ))}
          </ul>
        )}
        {error ? (
          <p className="mt-4 rounded-lg border border-red-500/40 px-4 py-3 text-xs text-red-200">
            {dictionary.assistantError}
          </p>
        ) : null}
        {showLimitNotice || remaining <= 0 ? (
          <p className="mt-3 rounded-lg border border-mocha-primary/30 px-4 py-3 text-xs text-mocha-primary">
            {dictionary.assistantLimitReached}
          </p>
        ) : (
          <p className="mt-3 text-xs text-mocha-text/50">
            {dictionary.assistantLimit(remaining)}
          </p>
        )}
      </div>
      <form
        className="border-t border-white/5 bg-mocha-base/60 px-5 py-4 backdrop-blur"
        onSubmit={(event) => {
          event.preventDefault();
          handleSend();
        }}
      >
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder={dictionary.assistantPlaceholder}
            className="flex-1 rounded-lg border border-white/10 bg-mocha-surface/60 px-4 py-3 text-sm text-mocha-text outline-none transition-colors duration-200 focus:border-mocha-primary"
            disabled={remaining <= 0}
          />
          <button
            type="submit"
            disabled={isLoading || remaining <= 0}
            className="rounded-lg bg-mocha-primary px-4 py-3 text-sm font-semibold text-mocha-base transition-transform duration-200 hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {dictionary.assistantSend}
          </button>
        </div>
      </form>
    </div>
  );
}
