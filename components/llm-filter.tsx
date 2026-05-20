'use client';

import type { Locale } from '@/lib/i18n';
import type { FilterOption } from './tools-filter';

interface LLMFilterProps {
  regions: FilterOption[];
  tags: FilterOption[];
  activeRegion: string;
  activeTag: string;
  onRegionChange: (regionId: string) => void;
  onTagChange: (tagId: string) => void;
  locale: Locale;
}

export function LLMFilter({
  regions,
  tags,
  activeRegion,
  activeTag,
  onRegionChange,
  onTagChange,
  locale,
}: LLMFilterProps) {
  const isZh = locale === 'zh';

  return (
    <div className="space-y-4 sm:space-y-3.5">
      {/* Region Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <span className="text-xs text-mocha-overlay font-mono shrink-0">
          {isZh ? '区域筛选:' : 'Region:'}
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onRegionChange('all')}
            className={`px-3.5 py-1.5 sm:py-1 rounded-full text-xs font-mono transition-all min-h-[32px] sm:min-h-0 ${
              activeRegion === 'all'
                ? 'bg-mocha-blue/10 border border-mocha-blue text-mocha-blue font-semibold'
                : 'bg-mocha-surface/30 border border-transparent hover:border-mocha-overlay text-mocha-subtext hover:text-white active:bg-mocha-surface/50'
            }`}
          >
            {isZh ? '全部区域' : 'All Regions'}
          </button>
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => onRegionChange(region.id)}
              className={`px-3.5 py-1.5 sm:py-1 rounded-full text-xs font-mono transition-all min-h-[32px] sm:min-h-0 ${
                activeRegion === region.id
                  ? 'bg-mocha-blue/10 border border-mocha-blue text-mocha-blue font-semibold'
                  : 'bg-mocha-surface/30 border border-transparent hover:border-mocha-overlay text-mocha-subtext hover:text-white active:bg-mocha-surface/50'
              }`}
            >
              {region.label[locale]}
            </button>
          ))}
        </div>
      </div>

      {/* Feature/Tag Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <span className="text-xs text-mocha-overlay font-mono shrink-0">
          {isZh ? '核心特性:' : 'Features:'}
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onTagChange('all')}
            className={`px-3.5 py-1.5 sm:py-1 rounded-full text-xs font-mono transition-all min-h-[32px] sm:min-h-0 ${
              activeTag === 'all'
                ? 'bg-mocha-mauve/10 border border-mocha-mauve text-mocha-mauve font-semibold'
                : 'bg-mocha-surface/30 border border-transparent hover:border-mocha-overlay text-mocha-subtext hover:text-white active:bg-mocha-surface/50'
            }`}
          >
            {isZh ? '全部特性' : 'All Features'}
          </button>
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagChange(tag.id)}
              className={`px-3.5 py-1.5 sm:py-1 rounded-full text-xs font-mono transition-all min-h-[32px] sm:min-h-0 ${
                activeTag === tag.id
                  ? 'bg-mocha-mauve/10 border border-mocha-mauve text-mocha-mauve font-semibold'
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

