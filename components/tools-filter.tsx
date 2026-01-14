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
    <div className="space-y-3">
      {/* Platform Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-mocha-overlay font-mono mr-2">
          {locale === 'en' ? 'Platform:' : '平台:'}
        </span>
        <button
          onClick={() => onPlatformChange('all')}
          className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
            activePlatform === 'all'
              ? 'bg-mocha-blue/10 border border-mocha-blue text-mocha-blue'
              : 'bg-mocha-surface/30 border border-transparent hover:border-mocha-overlay text-mocha-subtext hover:text-white'
          }`}
        >
          {locale === 'en' ? 'All' : '全部'}
        </button>
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => onPlatformChange(platform.id)}
            className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
              activePlatform === platform.id
                ? 'bg-mocha-blue/10 border border-mocha-blue text-mocha-blue'
                : 'bg-mocha-surface/30 border border-transparent hover:border-mocha-overlay text-mocha-subtext hover:text-white'
            }`}
          >
            {platform.label[locale]}
          </button>
        ))}
      </div>

      {/* Tag Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-mocha-overlay font-mono mr-2">
          {locale === 'en' ? 'Category:' : '分类:'}
        </span>
        <button
          onClick={() => onTagChange('all')}
          className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
            activeTag === 'all'
              ? 'bg-mocha-mauve/10 border border-mocha-mauve text-mocha-mauve'
              : 'bg-mocha-surface/30 border border-transparent hover:border-mocha-overlay text-mocha-subtext hover:text-white'
          }`}
        >
          {locale === 'en' ? 'All' : '全部'}
        </button>
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => onTagChange(tag.id)}
            className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
              activeTag === tag.id
                ? 'bg-mocha-mauve/10 border border-mocha-mauve text-mocha-mauve'
                : 'bg-mocha-surface/30 border border-transparent hover:border-mocha-overlay text-mocha-subtext hover:text-white'
            }`}
          >
            {tag.label[locale]}
          </button>
        ))}
      </div>
    </div>
  );
}
