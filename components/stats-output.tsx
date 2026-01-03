
import React from 'react';
import { wakatimeStats } from '@/lib/content';
import { Locale } from '@/lib/i18n';

interface StatsOutputProps {
  locale: Locale;
}

const ProgressBar = ({ percent, length = 20 }: { percent: number; length?: number }) => {
  const filledLength = Math.round((length * percent) / 100);
  const emptyLength = length - filledLength;
  
  const filled = '█'.repeat(filledLength);
  const empty = '░'.repeat(emptyLength);
  
  return (
    <span className="font-mono">
      <span className="text-mocha-green">{filled}</span>
      <span className="text-mocha-overlay1">{empty}</span>
    </span>
  );
};

export const StatsOutput: React.FC<StatsOutputProps> = ({ locale }) => {
  if (!wakatimeStats) {
    return (
      <div className="text-mocha-overlay1 italic">
        {locale === 'zh' 
          ? '暂无 Wakatime 统计数据。请在 GitHub Environment Variables 中配置 WAKATIME_API_KEY。'
          : 'No Wakatime stats available. Please configure WAKATIME_API_KEY in GitHub Environment Variables.'}
      </div>
    );
  }

  const {
    human_readable_total,
    human_readable_daily_average,
    languages,
    editors,
    best_day,
    range
  } = wakatimeStats;

  const t = {
    activity: locale === 'zh' ? '编程活动' : 'Coding Activity',
    total: locale === 'zh' ? '总计时长' : 'Total Time',
    dailyAvg: locale === 'zh' ? '日均时长' : 'Daily Average',
    languages: locale === 'zh' ? '语言分布' : 'Languages',
    editors: locale === 'zh' ? '编辑器使用' : 'Editors',
    bestDay: locale === 'zh' ? '最佳单日' : 'Best Day',
    range: locale === 'zh' ? '(最近 7 天)' : `(${range})`,
  };

  return (
    <div className="flex flex-col gap-4 mt-2 mb-4 text-sm">
      <div className="border-l-2 border-mocha-blue pl-3">
        <h3 className="text-mocha-blue font-bold text-base mb-1">
          {t.activity} <span className="text-xs font-normal text-mocha-overlay2">{t.range}</span>
        </h3>
        <div className="grid grid-cols-2 max-w-md gap-2">
          <div>
            <span className="text-mocha-overlay2 block text-xs">{t.total}</span>
            <span className="text-mocha-text font-bold">{human_readable_total}</span>
          </div>
          <div>
            <span className="text-mocha-overlay2 block text-xs">{t.dailyAvg}</span>
            <span className="text-mocha-text font-bold">{human_readable_daily_average}</span>
          </div>
          {best_day && (
            <div className="col-span-2 mt-1">
              <span className="text-mocha-overlay2 block text-xs">{t.bestDay}</span>
              <span className="text-mocha-yellow">
                {best_day.date}: {best_day.text}
              </span>
            </div>
          )}
        </div>
      </div>

      <div>
        <h4 className="text-mocha-mauve font-bold mb-2">&gt; {t.languages}</h4>
        <div className="space-y-1">
          {languages.map((lang) => (
            <div key={lang.name} className="flex items-center gap-3">
              <div className="w-24 truncate text-right text-mocha-subtext0">{lang.name}</div>
              <ProgressBar percent={lang.percent} />
              <div className="w-16 text-right text-mocha-text">{lang.percent}%</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-mocha-pink font-bold mb-2">&gt; {t.editors}</h4>
        <div className="space-y-1">
          {editors.map((editor) => (
            <div key={editor.name} className="flex items-center gap-3">
              <div className="w-24 truncate text-right text-mocha-subtext0">{editor.name}</div>
              <ProgressBar percent={editor.percent} />
              <div className="w-16 text-right text-mocha-text">{editor.percent}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
