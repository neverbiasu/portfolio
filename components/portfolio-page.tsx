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

const CommandOutput: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`whitespace-pre-wrap text-left text-mocha-text/80 ${className || ''}`}>{children}</div>
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

import { StatsOutput } from '@/components/stats-output';

// --- Main Page Component ---

export function PortfolioPage() {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  const copy = useMemo(() => getCopy(locale), [locale]);

  const [history, setHistory] = useState<React.ReactNode[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingOutput, setStreamingOutput] = useState('');
  const historyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Available commands for Tab completion
  const commandNames = useMemo(() => ['help', 'whoami', 'skills', 'projects', 'stats', 'blog', 'clear', 'faych'], []);

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
      blog: () => {
        window.open('/blog', '_blank');
        return <span className="text-mocha-green">Opening blog in new tab...</span>;
      },
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
  }, [history, streamingOutput]);

  const handleCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const command = input.trim();
    if (!command) return;

    // Add command to history UI instantly
    setHistory(prev => [
      ...prev,
      <CommandInputLine key={prev.length} command={command} />,
    ]);
    addCommand(command);
    setInput('');

    // Handle 'faych' AI command
    const [cmdName, ...args] = command.split(/\s+/);
    if (cmdName === 'faych') {
      const query = args.join(' ');
      if (!query) {
        setHistory(prev => [...prev, <CommandOutput key={prev.length}>Usage: faych &lt;question&gt;</CommandOutput>]);
        return;
      }

      setIsStreaming(true);
      setStreamingOutput('Thinking...'); 

      try {
        const res = await fetch('/api/ai', {
          method: 'POST',
          body: JSON.stringify({ messages: [{ role: 'user', content: query }], locale }),
        });

        if (!res.ok) throw new Error(res.statusText);
        
        const reader = res.body?.getReader();
        if (!reader) throw new Error('No body');
        
        setStreamingOutput(''); // Clear loading text
        let fullText = '';
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;
          setStreamingOutput(prev => prev + chunk);
        }
        
        // Finalize
        setHistory(prev => [...prev, <CommandOutput key={prev.length}>{fullText}</CommandOutput>]);
        setStreamingOutput('');
        
      } catch (e) {
        setHistory(prev => [...prev, <CommandOutput key={prev.length} className="text-red-400">Error: Failed to contact Faych.</CommandOutput>]);
        setStreamingOutput('');
      } finally {
        setIsStreaming(false);
      }
      return;
    }

    // Handle standard commands
    const handler = commands[command as keyof typeof commands];
    if (handler) {
      const output = handler();
      if (output) {
        setHistory(prev => [
          ...prev,
          <CommandOutput key={prev.length}>{output}</CommandOutput>,
        ]);
      }
    } else {
      setHistory(prev => [
        ...prev,
        <CommandOutput key={prev.length}>
          {copy.commandNotFound(command)}
        </CommandOutput>,
      ]);
    }
  };

  return (
    <main
      className="relative min-h-[100dvh] bg-mocha-crust p-3 md:p-8 lg:p-12"
      onClick={() => inputRef.current?.focus()} // Focus input on any click
    >
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10">
        <LanguageToggle locale={locale} onToggle={setLocale} />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-4 md:gap-8">
        {/* --- Terminal Block --- */}
        <TerminalBlock
          title={`faysh`}
          className="h-[50dvh] md:h-[60vh] min-h-[300px]"
        >
          {/* Terminal content - single scrollable area */}
          <div 
            ref={historyRef}
            className="h-full overflow-y-auto overflow-x-hidden pr-2 terminal-scrollbar"
          >
            {history}
            {/* Streaming Output */}
            {streamingOutput && (
              <CommandOutput>
                {streamingOutput}
                <span className="animate-pulse">_</span>
              </CommandOutput>
            )}

            {/* Input form - Hidden while streaming to prevent new input */}
            {!isStreaming && (
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
                  <div className="relative flex-1 ml-2 min-h-[1.5em]">
                    {/* Spacer for height */}
                    <span className="invisible whitespace-pre-wrap break-all">{input || ' '}</span>
                    
                    {/* Visible Content Layer */}
                    <div className="absolute top-0 left-0 w-full h-full flex flex-wrap">
                      <span className="text-mocha-text whitespace-pre-wrap break-all">{input}</span>
                      {/* Ghost text suggestion */}
                      {suggestion && input && (
                        <span className="text-mocha-subtle/50 whitespace-pre-wrap break-all">
                          {suggestion.slice(input.length)}
                        </span>
                      )}
                      <span className="blinking-cursor text-mocha-text">█</span>
                    </div>

                    {/* Input Layer */}
                    <input
                      ref={inputRef}
                      id="terminal-input"
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleInputKeyDown}
                      className="absolute top-0 left-0 w-full h-full bg-transparent border-none text-transparent caret-transparent focus:outline-none px-0"
                      autoFocus
                      spellCheck="false"
                      autoComplete="off"
                    />
                  </div>
                </div>
              </form>
            )}
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
