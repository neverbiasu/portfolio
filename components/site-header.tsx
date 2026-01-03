"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Wifi, Battery } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getCopy } from "@/lib/i18n";

type Props = {
  locale: Locale;
  onToggle: (next: Locale) => void;
};

export function SiteHeader({ locale, onToggle }: Props) {
  const dictionary = getCopy(locale);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString(locale === "zh" ? "zh-CN" : "en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000); // 10s update is enough for minutes
    return () => clearInterval(interval);
  }, [locale]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[32px] bg-mocha-base/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 text-xs font-mono select-none text-mocha-text/80 shadow-sm">
      {/* Left: Logo & Nav */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 font-bold text-mocha-text hover:text-mocha-primary cursor-pointer transition-colors">
          <Terminal className="w-3.5 h-3.5" />
          <span>neverbiasu</span>
        </div>

        <nav className="hidden md:flex items-center gap-5">
          <button className="hover:text-mocha-text hover:bg-white/10 px-2 py-0.5 rounded-sm transition-all">
            {dictionary.nav.home}
          </button>
          <button
            onClick={() => window.open("/blog", "_blank")}
            className="hover:text-mocha-text hover:bg-white/10 px-2 py-0.5 rounded-sm transition-all"
          >
            {dictionary.nav.blog}
          </button>
          <button className="hover:text-mocha-text hover:bg-white/10 px-2 py-0.5 rounded-sm transition-all text-mocha-text/50 cursor-not-allowed">
            {dictionary.nav.about}
          </button>
        </nav>
      </div>

      {/* Right: Status & Toggles */}
      <div className="flex items-center gap-4">
        {/* Language Toggle */}
        <button
          onClick={() => onToggle(locale === "en" ? "zh" : "en")}
          className="hover:text-mocha-text hover:bg-white/10 px-2 py-0.5 rounded-sm transition-all uppercase font-semibold"
          title={locale === 'en' ? 'Switch to Chinese' : '切换到英文'}
        >
          {locale === "en" ? "中文" : "EN"}
        </button>

        {/* Status Icons */}
        <div className="hidden sm:flex items-center gap-3 text-mocha-text/60">
            <span>{time}</span>
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-3.5 h-3.5" />
        </div>
      </div>
    </header>
  );
}
