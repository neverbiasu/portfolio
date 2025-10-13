"use client";

import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  onToggle: (next: Locale) => void;
};

export function LanguageToggle({ locale, onToggle }: Props) {
  const nextLocale = locale === "en" ? "zh" : "en";

  return (
    <button
      type="button"
      onClick={() => onToggle(nextLocale)}
      className="rounded-full border border-mocha-primary/60 px-4 py-2 text-sm font-mono uppercase tracking-[0.2em] text-mocha-primary transition-colors duration-200 hover:bg-mocha-primary/10"
      aria-label={locale === "en" ? "Switch to Chinese" : "切换到英文"}
    >
      {locale === "en" ? "中文" : "EN"}
    </button>
  );
}
