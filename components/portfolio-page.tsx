'use client';

import React, { useEffect, useMemo, useState, useRef } from 'react';
import { TerminalBlock } from '@/components/TerminalBlock';
import { ProjectCard } from '@/components/project-card';
import { SocialIcons } from '@/components/social-icons';
import { LanguageToggle } from '@/components/language-toggle';
import { profile, projects } from '@/lib/content';
import { getCopy, type Locale } from '@/lib/i18n';

const DEFAULT_LOCALE: Locale = 'en';

// --- Terminal Components ---

const CommandOutput: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="whitespace-pre-wrap text-left text-mocha-text/80">{children}</div>
);

const CommandInputLine: React.FC<{ command: string }> = ({ command }) => (
  <div className="text-mocha-green">
    <span className="text-mocha-blue">faych@portfolio:~$</span>
    <span className="ml-2">{command}</span>
  </div>
);

const HelpOutput: React.FC<{ copy: ReturnType<typeof getCopy> }> = ({ copy }) => (
  <div>
    <p>{copy.helpIntro}</p>
    <ul className="mt-2">
      {Object.entries(copy.commands).map(([cmd, desc]) => (
        <li key={cmd} className="flex">
          <span className="w-24 font-bold text-mocha-mauve">{cmd}</span>
          <span>{desc}</span>
        </li>
      ))}
    </ul>
  </div>
);

// --- Main Page Component ---

export function PortfolioPage() {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  const copy = useMemo(() => getCopy(locale), [locale]);

  const [history, setHistory] = useState<React.ReactNode[]>([]);
  const [input, setInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const whoamiNode = useMemo(
    () => (
      <div className="text-left">
        <p>
          <span className="font-bold text-mocha-blue">Name:</span>
          <span className="opacity-80">    {profile.name}</span>
        </p>
        <p>
          <span className="font-bold text-mocha-blue">Role:</span>
          <span className="opacity-80">    {profile.role[locale]}</span>
        </p>
        <p>
          <span className="font-bold text-mocha-blue">Bio:</span>
          <span className="opacity-80">     {profile.description[locale]}</span>
        </p>
        <div className="mt-4">
          <SocialIcons />
        </div>
      </div>
    ),
    [locale],
  );

  const commands = useMemo(
    () => ({
      help: () => <HelpOutput copy={copy} />,
      whoami: () => whoamiNode,
      skills: () => profile.skills.join(', '),
      projects: () =>
        projects
          .map(p => `${p.title[locale]}: ${p.summary[locale]}`)
          .join('\n\n'),
      clear: () => {
        setHistory([]);
        return null;
      },
    }),
    [copy, locale, whoamiNode],
  );

  // Effect for initial load
  useEffect(() => {
    setHistory([
      <CommandInputLine key="init-cmd" command="whoami" />,
      <CommandOutput key="init-output">{whoamiNode}</CommandOutput>,
      <CommandOutput key="init-hint">{copy.welcomeHint}</CommandOutput>,
    ]);
  }, [whoamiNode, copy.welcomeHint]);

  // Effect for auto-scrolling
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = input.trim();
    if (!command) return;

    const newHistory: React.ReactNode[] = [
      ...history,
      <CommandInputLine key={history.length} command={command} />,
    ];

    const handler = commands[command as keyof typeof commands];
    if (handler) {
      const output = handler();
      if (output) {
        newHistory.push(
          <CommandOutput key={history.length + 1}>{output}</CommandOutput>,
        );
      }
    } else {
      newHistory.push(
        <CommandOutput key={history.length + 1}>
          {copy.commandNotFound(command)}
        </CommandOutput>,
      );
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <main
      className="relative min-h-screen bg-mocha-crust p-4 md:p-8 lg:p-12"
      onClick={() => inputRef.current?.focus()} // Focus input on any click
    >
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10">
        <LanguageToggle locale={locale} onToggle={setLocale} />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        {/* --- Terminal Block --- */}
        <TerminalBlock
          title={`faysh`}
          className="h-[60vh] min-h-[300px]"
        >
          <div
            ref={terminalRef}
            className="h-full overflow-y-auto overflow-x-hidden pr-2"
          >
            {history}
            <form
              onSubmit={handleCommandSubmit}
              className="font-mono"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="flex items-center">
                <label
                  htmlFor="terminal-input"
                  className="text-mocha-blue shrink-0"
                >
                  faych@portfolio:~$
                </label>
                <div className="relative flex-1 pl-2">
                  {/* This div is the visual representation of the input */}
                  <div className="flex items-center">
                    <span className="text-mocha-text">{input}</span>
                    <span className="blinking-cursor text-mocha-text">█</span>
                  </div>
                  <input
                    ref={inputRef}
                    id="terminal-input"
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="absolute top-0 left-0 w-full h-full bg-transparent border-none text-transparent caret-transparent focus:outline-none pl-2"
                    autoFocus
                    spellCheck="false"
                  />
                </div>
              </div>
            </form>
          </div>
        </TerminalBlock>

        {/* --- Projects Block --- */}
        <TerminalBlock title="~/projects">
          <h2 className="text-lg font-bold text-mocha-mauve mb-4">
            {copy.projectsTitle}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map(project => (
              <ProjectCard
                key={project.title.en}
                project={project}
                locale={locale}
              />
            ))}
          </div>
        </TerminalBlock>
      </div>
    </main>
  );
}
