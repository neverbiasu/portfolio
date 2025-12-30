'use client';

import React, { useEffect, useMemo, useState, useRef } from 'react';
import { TerminalBlock } from '@/components/TerminalBlock';
import { ProjectCard } from '@/components/project-card';
import { SocialIcons } from '@/components/social-icons';
import { LanguageToggle } from '@/components/language-toggle';
import { profile, projects, wakatimeStats } from '@/lib/content';
import { getCopy, type Locale } from '@/lib/i18n';
import { useTabCompletion } from '@/hooks/useTabCompletion';
import { useCommandHistory } from '@/hooks/useCommandHistory';
import { getLanguageColor } from '@/lib/language-colors';

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

const StatsOutput: React.FC<{ locale: Locale }> = ({ locale }) => {
  if (!wakatimeStats) {
    return (
      <div className="text-mocha-subtext">
        {locale === 'zh' ? 'Wakatime 数据不可用' : 'Wakatime data not available'}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div>
        <p className="text-mocha-blue font-bold">
          {locale === 'zh' ? '编程统计' : 'Coding Stats'} ({wakatimeStats.range})
        </p>
        <p className="mt-1">
          <span className="text-mocha-subtext">{locale === 'zh' ? '总计: ' : 'Total: '}</span>
          <span className="text-mocha-green font-bold">{wakatimeStats.human_readable_total}</span>
          <span className="text-mocha-subtext mx-2">|</span>
          <span className="text-mocha-subtext">{locale === 'zh' ? '日均: ' : 'Daily Avg: '}</span>
          <span className="text-mocha-yellow">{wakatimeStats.human_readable_daily_average}</span>
        </p>
      </div>

      {/* Languages with progress bars */}
      <div>
        <p className="text-mocha-mauve font-bold mb-2">
          {locale === 'zh' ? '编程语言' : 'Languages'}
        </p>
        <div className="space-y-1">
          {wakatimeStats.languages.slice(0, 6).map((lang: any) => (
            <div key={lang.name} className="flex items-center gap-2">
              <span className="w-20 text-sm truncate">{lang.name}</span>
              <div className="flex-1 h-2 bg-mocha-surface rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(lang.percent, 100)}%`,
                    backgroundColor: getLanguageColor(lang.name),
                  }}
                />
              </div>
              <span className="w-12 text-xs text-mocha-subtext text-right">{lang.percent.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Editors */}
      {wakatimeStats.editors && wakatimeStats.editors.length > 0 && (
        <div>
          <p className="text-mocha-lavender font-bold mb-1">
            {locale === 'zh' ? '编辑器' : 'Editors'}
          </p>
          <p className="text-sm">
            {wakatimeStats.editors.map((e: any) => `${e.name} (${e.percent.toFixed(1)}%)`).join(', ')}
          </p>
        </div>
      )}

      {/* Best day */}
      {wakatimeStats.best_day && (
        <div className="text-sm">
          <span className="text-mocha-peach">★ </span>
          <span className="text-mocha-subtext">{locale === 'zh' ? '最佳日: ' : 'Best Day: '}</span>
          <span>{wakatimeStats.best_day.date} - {wakatimeStats.best_day.text}</span>
        </div>
      )}
    </div>
  );
};

// --- Main Page Component ---

export function PortfolioPage() {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  const copy = useMemo(() => getCopy(locale), [locale]);

  const [history, setHistory] = useState<React.ReactNode[]>([]);
  const [input, setInput] = useState('');
  const historyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Available commands for Tab completion
  const commandNames = useMemo(() => ['help', 'whoami', 'skills', 'projects', 'stats', 'clear'], []);

  // Tab completion hook
  const { handleKeyDown: handleTabKeyDown, suggestion } = useTabCompletion({
    commands: commandNames,
    input,
    onComplete: setInput,
  });

  // Command history hook (up/down arrow navigation)
  const { addCommand, handleKeyDown: handleHistoryKeyDown } = useCommandHistory({
    onRestore: setInput,
  });

  // Combined key handler for input
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handleTabKeyDown(e);
    handleHistoryKeyDown(e);
  };

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
      stats: () => <StatsOutput locale={locale} />,
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

  // Effect for auto-scrolling to bottom when history changes
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
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
    addCommand(command); // Add to command history for arrow navigation
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
          {/* Terminal content - single scrollable area */}
          <div 
            ref={historyRef}
            className="h-full overflow-y-auto overflow-x-hidden pr-2 terminal-scrollbar"
          >
            {history}
            {/* Input form - flows after history */}
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
                    {/* Ghost text suggestion */}
                    {suggestion && input && (
                      <span className="text-mocha-subtle/50">
                        {suggestion.slice(input.length)}
                      </span>
                    )}
                    <span className="blinking-cursor text-mocha-text">█</span>
                  </div>
                  <input
                    ref={inputRef}
                    id="terminal-input"
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleInputKeyDown}
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
