'use client';

import { useState, useMemo } from 'react';
import { SiteHeader } from '@/components/site-header';
import { TerminalBlock } from '@/components/TerminalBlock';
import { ToolsFilter, type FilterOption } from '@/components/tools-filter';
import { ToolCard, type Tool } from '@/components/tool-card';
import toolsData from '@/src/data/tools.json';
import type { Locale } from '@/lib/i18n';

const DEFAULT_LOCALE: Locale = 'en';

export default function ToolsPage() {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  const [activeTag, setActiveTag] = useState('all');
  const [activePlatform, setActivePlatform] = useState('all');

  const platforms = toolsData.platforms as FilterOption[];
  const tags = toolsData.tags as FilterOption[];
  const tools = toolsData.tools as Tool[];

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesTag = activeTag === 'all' || tool.tags.includes(activeTag);
      const matchesPlatform = activePlatform === 'all' || tool.platforms.includes(activePlatform);
      return matchesTag && matchesPlatform;
    });
  }, [activeTag, activePlatform, tools]);

  const tagLabels = useMemo(() => {
    const labels: Record<string, string> = {};
    tags.forEach((tag) => {
      labels[tag.id] = tag.label[locale];
    });
    return labels;
  }, [tags, locale]);

  const tagColors = useMemo(() => {
    const colors: Record<string, string> = {};
    tags.forEach((tag) => {
      if (tag.color) {
        colors[tag.id] = tag.color;
      }
    });
    return colors;
  }, [tags]);

  const platformLabels = useMemo(() => {
    const labels: Record<string, string> = {};
    platforms.forEach((platform) => {
      labels[platform.id] = platform.label[locale];
    });
    return labels;
  }, [platforms, locale]);

  return (
    <>
      <SiteHeader locale={locale} onToggle={setLocale} />
      <main className="relative min-h-[100dvh] bg-mocha-crust p-3 pt-14 md:p-8 md:pt-20 lg:p-12 lg:pt-24">
        <div className="mx-auto max-w-6xl">
          <TerminalBlock title="~/tools">
            <div className="mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-mocha-mauve mb-1 sm:mb-2 font-mono">
                {locale === 'en' ? 'Tools' : '工具'}
              </h1>
              <p className="text-mocha-subtext text-xs sm:text-sm">
                {locale === 'en'
                  ? 'The tools I use daily for development, research, and productivity.'
                  : '我日常用于开发、研究和效率提升的工具。'}
              </p>
            </div>

            <div className="mb-4 sm:mb-6">
              <ToolsFilter
                tags={tags}
                platforms={platforms}
                activeTag={activeTag}
                activePlatform={activePlatform}
                onTagChange={setActiveTag}
                onPlatformChange={setActivePlatform}
                locale={locale}
              />
            </div>

            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  locale={locale}
                  tagLabels={tagLabels}
                  tagColors={tagColors}
                  platformLabels={platformLabels}
                />
              ))}
            </div>

            {filteredTools.length === 0 && (
              <div className="text-center py-12 text-mocha-subtext">
                {locale === 'en' ? 'No tools found matching the filters.' : '没有找到符合筛选条件的工具。'}
              </div>
            )}
          </TerminalBlock>
        </div>
      </main>
    </>
  );
}
