'use client';

import type { Locale } from '@/lib/i18n';

export interface FilterOption {
  id: string;
  label: { en: string; zh: string };
  color?: string;
}

interface ToolsFilterProps {
  tags: FilterOption[];
  platforms: FilterOption[];
  activeTag: string;
  activePlatform: string;
  onTagChange: (tagId: string) => void;
  onPlatformChange: (platformId: string) => void;
  locale: Locale;
}

export function ToolsFilter({
  tags,
  platforms,
  activeTag,
  activePlatform,
  onTagChange,
  onPlatformChange,
  locale,
}: ToolsFilterProps) {
  return (
    <div className="space-y-4 sm:space-y-3">
      {/* Platform Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <span className="text-xs text-mocha-overlay font-mono shrink-0">
          {locale === 'en' ? 'Platform:' : '平台:'}
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onPlatformChange('all')}
            className={`px-3 py-1.5 sm:py-1 rounded-full text-xs font-mono transition-all min-h-[32px] sm:min-h-0 ${
              activePlatform === 'all'
                ? 'bg-mocha-blue/10 border border-mocha-blue text-mocha-blue'
                : 'bg-mocha-surface/30 border border-transparent hover:border-mocha-overlay text-mocha-subtext hover:text-white active:bg-mocha-surface/50'
            }`}
          >
            {locale === 'en' ? 'All' : '全部'}
          </button>
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => onPlatformChange(platform.id)}
              className={`px-3 py-1.5 sm:py-1 rounded-full text-xs font-mono transition-all min-h-[32px] sm:min-h-0 ${
                activePlatform === platform.id
                  ? 'bg-mocha-blue/10 border border-mocha-blue text-mocha-blue'
                  : 'bg-mocha-surface/30 border border-transparent hover:border-mocha-overlay text-mocha-subtext hover:text-white active:bg-mocha-surface/50'
              }`}
            >
              {platform.label[locale]}
            </button>
          ))}
        </div>
      </div>

      {/* Tag Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <span className="text-xs text-mocha-overlay font-mono shrink-0">
          {locale === 'en' ? 'Category:' : '分类:'}
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onTagChange('all')}
            className={`px-3 py-1.5 sm:py-1 rounded-full text-xs font-mono transition-all min-h-[32px] sm:min-h-0 ${
              activeTag === 'all'
                ? 'bg-mocha-mauve/10 border border-mocha-mauve text-mocha-mauve'
                : 'bg-mocha-surface/30 border border-transparent hover:border-mocha-overlay text-mocha-subtext hover:text-white active:bg-mocha-surface/50'
            }`}
          >
            {locale === 'en' ? 'All' : '全部'}
          </button>
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagChange(tag.id)}
              className={`px-3 py-1.5 sm:py-1 rounded-full text-xs font-mono transition-all min-h-[32px] sm:min-h-0 ${
                activeTag === tag.id
                  ? 'bg-mocha-mauve/10 border border-mocha-mauve text-mocha-mauve'
                  : 'bg-mocha-surface/30 border border-transparent hover:border-mocha-overlay text-mocha-subtext hover:text-white active:bg-mocha-surface/50'
              }`}
            >
              {tag.label[locale]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
