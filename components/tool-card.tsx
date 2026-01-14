'use client';

import { ExternalLink, Monitor, Smartphone, Globe } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

export interface Tool {
  id: string;
  name: string;
  platforms: string[];
  tags: string[];
  description: { en: string; zh: string };
  url: string;
  logo: string;
}

interface ToolCardProps {
  tool: Tool;
  locale: Locale;
  tagLabels: Record<string, string>;
  tagColors: Record<string, string>;
  platformLabels: Record<string, string>;
}

const platformIcons: Record<string, React.ReactNode> = {
  desktop: <Monitor className="w-3 h-3" />,
  mobile: <Smartphone className="w-3 h-3" />,
  web: <Globe className="w-3 h-3" />,
};

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

export function ToolCard({ tool, locale, tagLabels, tagColors, platformLabels }: ToolCardProps) {
  return (
    <div className="group flex flex-col bg-mocha-base border border-mocha-surface rounded-lg p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-mocha-overlay/50">
      {/* Header: Logo + Link */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded bg-mocha-surface flex items-center justify-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tool.logo}
            alt={tool.name}
            width={32}
            height={32}
            className="object-contain w-8 h-8"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              if (target.parentElement) {
                target.parentElement.innerHTML = `<span class="text-xl font-bold text-mocha-subtext">${tool.name[0]}</span>`;
              }
            }}
          />
        </div>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-mocha-subtext hover:text-white transition-colors opacity-0 group-hover:opacity-100"
          title="Visit website"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Name */}
      <h3 className="font-mono text-lg font-bold text-white mb-2 group-hover:text-mocha-blue transition-colors">
        {tool.name}
      </h3>

      {/* Description */}
      <p className="text-mocha-subtext text-sm leading-relaxed mb-4">
        {tool.description[locale]}
      </p>

      {/* Platforms */}
      <div className="flex gap-2 mb-4">
        {tool.platforms.map((platform) => (
          <span
            key={platform}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono text-mocha-overlay bg-mocha-surface/50"
            title={platformLabels[platform]}
          >
            {platformIcons[platform]}
            <span className="hidden sm:inline">{platformLabels[platform]}</span>
          </span>
        ))}
      </div>

      {/* Tags */}
      <div className="mt-auto flex flex-wrap gap-1.5 pt-3 border-t border-mocha-surface/50">
        {tool.tags.map((tag) => {
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
