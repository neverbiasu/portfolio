"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AssistantLauncher } from "@/components/assistant-launcher";
import { AssistantPanel } from "@/components/assistant-panel";
import { LanguageToggle } from "@/components/language-toggle";
import { ProjectCard } from "@/components/project-card";
import { SocialIcons } from "@/components/social-icons";
import { profile, projects } from "@/lib/content";
import { getCopy, type Locale, type SectionCopy } from "@/lib/i18n";
import { LANGUAGE_STORAGE_KEY } from "@/lib/constants";

const DEFAULT_LOCALE: Locale = "en";

export function PortfolioPage() {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  const [assistantOpen, setAssistantOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const storedLocale = window.localStorage.getItem(
      LANGUAGE_STORAGE_KEY,
    ) as Locale | null;
    if (storedLocale === "en" || storedLocale === "zh") {
      setLocale(storedLocale);
    }
  }, []);

  const copy = useMemo<SectionCopy>(() => getCopy(locale), [locale]);
  const mainSpacing = assistantOpen
    ? "md:pl-[calc(320px+3rem)]"
    : "md:pl-[calc(60px+3rem)]";

  const handleLocaleToggle = (nextLocale: Locale) => {
    setLocale(nextLocale);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLocale);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-mocha-base text-mocha-text">
      {!assistantOpen && <AssistantLauncher onOpen={() => setAssistantOpen(true)} />}
      <AssistantPanel
        open={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        locale={locale}
        dictionary={copy}
      />

      <main
        className={`relative mx-auto flex w-full max-w-content flex-col gap-16 px-6 pb-24 pt-12 md:px-12 lg:px-16 ${mainSpacing}`}
      >
        <header className="flex flex-col gap-8">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-mocha-primary">
                {profile.role[locale]}
              </p>
              <h1 className="mt-4 text-4xl font-semibold text-mocha-text sm:text-5xl md:text-6xl">
                {profile.name}
              </h1>
              <p className="mt-6 max-w-2xl text-base text-mocha-text/70">
                {profile.description[locale]}
              </p>
            </div>
            <div className="flex items-center gap-4 self-end">
              <LanguageToggle locale={locale} onToggle={handleLocaleToggle} />
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={80}
                height={80}
                className="rounded-full border border-mocha-primary/30"
              />
            </div>
          </div>
          <SocialIcons />
        </header>

        <section className="grid gap-10 rounded-surface bg-mocha-surface/80 p-8 backdrop-blur-sm md:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold text-mocha-primary">
              {copy.aboutTitle}
            </h2>
            <p className="mt-4 text-sm text-mocha-text/80">{copy.aboutDescription}</p>
            <div className="mt-8 flex flex-wrap gap-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-mocha-subtle">
                  {copy.skillsLabel}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-mocha-primary/20 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-mocha-text/80"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-mocha-subtle">
                  {copy.passionLabel}
                </p>
                <p className="mt-3 max-w-sm text-sm text-mocha-text/80">
                  {profile.passion[locale]}
                </p>
                {profile.openToCollab ? (
                  <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-mocha-primary/10 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-mocha-primary">
                    {copy.collabLabel}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
          <div className="rounded-surface border border-white/5 bg-mocha-base/40 p-6 shadow-surface">
            <p className="text-sm text-mocha-text/70">
              &ldquo;{profile.passion[locale]}&rdquo;
            </p>
            <p className="mt-6 text-xs font-mono uppercase tracking-[0.3em] text-mocha-subtle">
              {profile.name}
            </p>
          </div>
        </section>

        <section id="projects" className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-mocha-primary">
              {copy.projectsTitle}
            </h2>
            <p className="text-sm text-mocha-text/70">{copy.projectsSubtitle}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.title.en} project={project} locale={locale} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6 rounded-surface bg-mocha-surface/80 p-8">
          <h2 className="text-2xl font-semibold text-mocha-primary">
            {copy.statsTitle}
          </h2>
          <div className="overflow-hidden rounded-surface border border-white/5 bg-mocha-base/50 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github-readme-stats.vercel.app/api?username=neverbiasu&show_icons=true&theme=catppuccin_mocha&hide_title=false"
              alt="GitHub stats for neverbiasu"
              loading="lazy"
              className="mx-auto w-full max-w-3xl"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
