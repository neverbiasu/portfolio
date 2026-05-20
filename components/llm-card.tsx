'use client';

import { ExternalLink } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

export interface LLM {
  id: string;
  name: string;
  provider: string;
  region: 'global' | 'domestic';
  url: string;
  logo: string;
  tags: string[];
  description: { en: string; zh: string };
  features: { en: string[]; zh: string[] };
}

interface LLMCardProps {
  llm: LLM;
  locale: Locale;
  tagLabels: Record<string, string>;
  tagColors: Record<string, string>;
}

const colorMap: Record<string, { text: string; bg: string }> = {
  'mocha-green': { text: 'text-mocha-green', bg: 'bg-mocha-green/10' },
  'mocha-mauve': { text: 'text-mocha-mauve', bg: 'bg-mocha-mauve/10' },
  'mocha-lavender': { text: 'text-mocha-lavender', bg: 'bg-mocha-lavender/10' },
  'mocha-blue': { text: 'text-mocha-blue', bg: 'bg-mocha-blue/10' },
  'mocha-sapphire': { text: 'text-mocha-sapphire', bg: 'bg-mocha-sapphire/10' },
  'mocha-teal': { text: 'text-mocha-teal', bg: 'bg-mocha-teal/10' },
  'mocha-sky': { text: 'text-mocha-sky', bg: 'bg-mocha-sky/10' },
  'mocha-peach': { text: 'text-mocha-peach', bg: 'bg-mocha-peach/10' },
  'mocha-pink': { text: 'text-mocha-pink', bg: 'bg-mocha-pink/10' },
  'mocha-flamingo': { text: 'text-mocha-flamingo', bg: 'bg-mocha-flamingo/10' },
};

export function LLMCard({ llm, locale, tagLabels, tagColors }: LLMCardProps) {
  const isZh = locale === 'zh';
  const regionLabel = llm.region === 'global' 
    ? (isZh ? '海外' : 'Global') 
    : (isZh ? '国内' : 'Domestic');

  return (
    <div className="group flex flex-col bg-mocha-base border border-mocha-surface rounded-lg p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:border-mocha-overlay/60">
      {/* Header: Logo + Region + Link */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded bg-mocha-surface flex items-center justify-center overflow-hidden shrink-0 border border-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={llm.logo}
              alt={llm.name}
              width={32}
              height={32}
              className="object-contain w-8 h-8"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = `<span class="text-xl font-bold text-mocha-subtext">${llm.name[0]}</span>`;
                }
              }}
            />
          </div>
          <div>
            <span className="text-[10px] font-mono text-mocha-subtext/60 block">
              {llm.provider}
            </span>
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-medium ${
              llm.region === 'global'
                ? 'bg-mocha-mauve/10 text-mocha-mauve'
                : 'bg-mocha-green/10 text-mocha-green'
            }`}>
              {regionLabel}
            </span>
          </div>
        </div>
        <a
          href={llm.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-mocha-subtext hover:text-white transition-colors sm:opacity-0 sm:group-hover:opacity-100 p-1 -m-1"
          title={isZh ? '访问官方网站' : 'Visit website'}
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Name */}
      <h3 className="font-mono text-lg font-bold text-white mb-2 group-hover:text-mocha-blue transition-colors">
        {llm.name}
      </h3>

      {/* Description */}
      <p className="text-mocha-subtext text-xs sm:text-sm leading-relaxed mb-4 min-h-[40px]">
        {llm.description[locale]}
      </p>

      {/* Key Features List */}
      <div className="mb-4">
        <span className="text-[10px] font-mono text-mocha-subtext/50 block mb-1.5 uppercase tracking-wider">
          {isZh ? '关键特性' : 'Key Features'}
        </span>
        <ul className="space-y-1">
          {llm.features[locale].map((feat, index) => (
            <li key={index} className="text-xs text-mocha-text/75 flex items-start gap-1.5">
              <span className="text-mocha-blue select-none font-mono shrink-0">›</span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="mt-auto flex flex-wrap gap-1.5 pt-3.5 border-t border-mocha-surface/40">
        {llm.tags.map((tag) => {
          const tagColor = tagColors[tag] || 'mocha-blue';
          const tagStyle = colorMap[tagColor] || colorMap['mocha-blue'];
          return (
            <span
              key={tag}
              className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium ${tagStyle.bg} ${tagStyle.text}`}
            >
              {tagLabels[tag] || tag}
            </span>
          );
        })}
      </div>
    </div>
  );
}

