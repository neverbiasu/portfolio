'use client';

import { useState, useMemo } from 'react';
import { SiteHeader } from '@/components/site-header';
import { TerminalBlock } from '@/components/TerminalBlock';
import { LLMFilter } from '@/components/llm-filter';
import { LLMCard, type LLM } from '@/components/llm-card';
import llmsData from '@/src/data/llms.json';
import type { FilterOption } from '@/components/tools-filter';
import type { Locale } from '@/lib/i18n';

const DEFAULT_LOCALE: Locale = 'en';

export default function LLMsPage() {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  const [activeRegion, setActiveRegion] = useState('all');
  const [activeTag, setActiveTag] = useState('all');

  const regions = llmsData.regions as FilterOption[];
  const tags = llmsData.tags as FilterOption[];
  const llms = llmsData.llms as LLM[];

  const filteredLLMs = useMemo(() => {
    return llms.filter((llm) => {
      const matchesRegion = activeRegion === 'all' || llm.region === activeRegion;
      const matchesTag = activeTag === 'all' || llm.tags.includes(activeTag);
      return matchesRegion && matchesTag;
    });
  }, [activeRegion, activeTag, llms]);

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

  return (
    <>
      <SiteHeader locale={locale} onToggle={setLocale} />
      <main className="relative min-h-[100dvh] bg-mocha-crust p-3 pt-14 md:p-8 md:pt-20 lg:p-12 lg:pt-24">
        <div className="mx-auto max-w-6xl">
          <TerminalBlock title="~/llms">
            <div className="mb-5 sm:mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-mocha-mauve mb-1 sm:mb-2 font-mono">
                {locale === 'en' ? 'Large Language Models' : '可用大语言模型'}
              </h1>
              <p className="text-mocha-subtext text-xs sm:text-sm">
                {locale === 'en'
                  ? 'A curated list of LLMs I regularly use, build upon, or recommend for AI engineering.'
                  : '我日常开发、调用或推荐的大语言模型列表。'}
              </p>
              {llmsData.source && (
                <p className="text-mocha-subtext/60 text-[11px] sm:text-xs mt-1.5 font-mono">
                  {locale === 'en' ? 'Source: ' : '数据来源：'}
                  <a
                    href={llmsData.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mocha-blue hover:underline transition-colors"
                  >
                    {llmsData.source.name}
                  </a>
                </p>
              )}
            </div>

            <div className="mb-5 sm:mb-6">
              <LLMFilter
                regions={regions}
                tags={tags}
                activeRegion={activeRegion}
                activeTag={activeTag}
                onRegionChange={setActiveRegion}
                onTagChange={setActiveTag}
                locale={locale}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredLLMs.map((llm) => (
                <LLMCard
                  key={llm.id}
                  llm={llm}
                  locale={locale}
                  tagLabels={tagLabels}
                  tagColors={tagColors}
                />
              ))}
            </div>

            {filteredLLMs.length === 0 && (
              <div className="text-center py-12 text-mocha-subtext font-mono text-xs sm:text-sm">
                {locale === 'en' ? 'No models found matching the filters.' : '没有找到符合筛选条件的模型。'}
              </div>
            )}
          </TerminalBlock>
        </div>
      </main>
    </>
  );
}

