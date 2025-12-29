
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, Calendar, Scale, AlertCircle, ExternalLink, Github, Clock } from 'lucide-react';
import type { Project } from '@/lib/content';
import type { Locale } from '@/lib/i18n';
import { getLanguageColor } from '@/lib/language-colors';

interface Props {
  project: Project;
  locale: Locale;
}

// Format file size from KB to readable format
function formatSize(sizeKB: number | undefined): string {
  if (!sizeKB) return '-';
  if (sizeKB < 1024) return `${sizeKB} KB`;
  return `${(sizeKB / 1024).toFixed(1)} MB`;
}

// Format date to short format
function formatDate(dateString: string | undefined, locale: Locale): string {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString(
    locale === 'zh' ? 'zh-CN' : 'en-US',
    { year: 'numeric', month: 'short' }
  );
}

export function ProjectCard({ project, locale }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const title = project.title[locale];
  const summary = project.summary[locale];
  const languageColor = getLanguageColor(project.language);

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };

  // Display up to 3 tags, show +N for rest
  const displayTopics = project.topics?.slice(0, 3) || [];
  const remainingTopics = (project.topics?.length || 0) - 3;

  return (
    <div 
      className="relative w-full h-72 md:h-80 cursor-pointer group perspective-1000"
      onClick={handleFlip}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        {/* === FRONT SIDE === */}
        <div className="absolute w-full h-full backface-hidden">
          <article className="w-full h-full flex flex-col rounded-lg overflow-hidden border-2 border-mocha-surface hover:border-mocha-primary/50 transition-all duration-300 bg-gradient-to-br from-mocha-base to-mocha-surface shadow-lg hover:shadow-xl hover:shadow-mocha-primary/10">
            
            {/* Language Bar */}
            <div 
              className="h-1.5 w-full"
              style={{ backgroundColor: languageColor }}
            />
            
            {/* Header */}
            <div className="p-5 flex-1 flex flex-col">
              {/* Title Row */}
              <div className="flex justify-between items-start gap-2 mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  {project.language && (
                    <span 
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: languageColor }}
                      title={project.language}
                    />
                  )}
                  <h3 className="text-lg font-bold font-mono text-mocha-text truncate">
                    {title}
                  </h3>
                </div>
                
                {/* Stats Badges */}
                <div className="flex gap-1.5 shrink-0">
                  {project.stars !== undefined && project.stars > 0 && (
                    <div className="flex items-center gap-1 text-mocha-yellow bg-mocha-yellow/10 px-2 py-0.5 rounded-full text-xs font-mono">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{project.stars}</span>
                    </div>
                  )}
                  {project.forks !== undefined && project.forks > 0 && (
                    <div className="flex items-center gap-1 text-mocha-mauve bg-mocha-mauve/10 px-2 py-0.5 rounded-full text-xs font-mono">
                      <GitFork className="w-3 h-3" />
                      <span>{project.forks}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-mocha-text/70 leading-relaxed line-clamp-3 mb-4">
                {summary}
              </p>

              {/* Topics */}
              {displayTopics.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {displayTopics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-0.5 text-xs font-mono rounded bg-mocha-surface text-mocha-subtext border border-mocha-surface hover:border-mocha-primary/30 transition-colors"
                    >
                      {topic}
                    </span>
                  ))}
                  {remainingTopics > 0 && (
                    <span className="px-2 py-0.5 text-xs font-mono rounded bg-mocha-overlay text-mocha-subtext">
                      +{remainingTopics}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Footer Hint */}
            <div className="px-5 py-3 border-t border-mocha-surface/50 flex items-center justify-center opacity-0 group-hover:opacity-60 transition-opacity">
              <span className="text-xs font-mono text-mocha-subtext">
                {locale === 'zh' ? '[ 点击查看详情 ]' : '[ Click for details ]'}
              </span>
            </div>
          </article>
        </div>

        {/* === BACK SIDE (Game Card Style) === */}
        <div 
          className="absolute w-full h-full backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <article className="w-full h-full flex flex-col rounded-lg overflow-hidden border-2 border-mocha-primary bg-gradient-to-br from-mocha-surface to-mocha-base shadow-lg">
            
            {/* Section: STATS */}
            <div className="px-4 py-3 border-b border-mocha-overlay/50">
              <h4 className="text-[10px] font-bold text-mocha-subtext uppercase tracking-widest mb-2 font-mono">
                {locale === 'zh' ? '数据' : 'STATS'}
              </h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-mocha-yellow" />
                  <span className="text-xs text-mocha-subtext">Stars</span>
                  <span className="text-xs font-mono text-mocha-text ml-auto">{project.stars || 0}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitFork className="w-3.5 h-3.5 text-mocha-mauve" />
                  <span className="text-xs text-mocha-subtext">Forks</span>
                  <span className="text-xs font-mono text-mocha-text ml-auto">{project.forks || 0}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-mocha-peach" />
                  <span className="text-xs text-mocha-subtext">Issues</span>
                  <span className="text-xs font-mono text-mocha-text ml-auto">{project.openIssues || 0}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Scale className="w-3.5 h-3.5 text-mocha-teal" />
                  <span className="text-xs text-mocha-subtext">Size</span>
                  <span className="text-xs font-mono text-mocha-text ml-auto">{formatSize(project.size)}</span>
                </div>
              </div>
            </div>

            {/* Section: INFO */}
            <div className="px-4 py-3 border-b border-mocha-overlay/50 flex-1">
              <h4 className="text-[10px] font-bold text-mocha-subtext uppercase tracking-widest mb-2 font-mono">
                {locale === 'zh' ? '信息' : 'INFO'}
              </h4>
              <div className="space-y-2">
                {/* Language */}
                <div className="flex items-center gap-2">
                  <span 
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: languageColor }}
                  />
                  <span className="text-xs text-mocha-subtext">{locale === 'zh' ? '语言' : 'Language'}</span>
                  <span className="text-xs font-mono text-mocha-text ml-auto">{project.language || '-'}</span>
                </div>
                {/* License */}
                <div className="flex items-center gap-2">
                  <Scale className="w-3 h-3 text-mocha-green" />
                  <span className="text-xs text-mocha-subtext">{locale === 'zh' ? '许可证' : 'License'}</span>
                  <span className="text-xs font-mono text-mocha-text ml-auto">{project.license || '-'}</span>
                </div>
                {/* Created */}
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-mocha-blue" />
                  <span className="text-xs text-mocha-subtext">{locale === 'zh' ? '创建' : 'Created'}</span>
                  <span className="text-xs font-mono text-mocha-text ml-auto">{formatDate(project.createdAt, locale)}</span>
                </div>
                {/* Updated */}
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-mocha-lavender" />
                  <span className="text-xs text-mocha-subtext">{locale === 'zh' ? '更新' : 'Updated'}</span>
                  <span className="text-xs font-mono text-mocha-text ml-auto">{formatDate(project.lastUpdate, locale)}</span>
                </div>
              </div>
            </div>

            {/* Section: LINKS */}
            <div className="px-4 py-3">
              <h4 className="text-[10px] font-bold text-mocha-subtext uppercase tracking-widest mb-2 font-mono">
                {locale === 'zh' ? '链接' : 'LINKS'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {/* GitHub Link */}
                {project.links.find(l => l.href.includes('github.com')) && (
                  <a
                    href={project.links.find(l => l.href.includes('github.com'))?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono font-bold text-mocha-base bg-mocha-text hover:bg-mocha-blue px-3 py-1.5 rounded transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
                {/* Demo Link (homepage) */}
                {project.homepage && (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono font-bold text-mocha-base bg-mocha-green hover:bg-mocha-teal px-3 py-1.5 rounded transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Demo</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        </div>
      </motion.div>
    </div>
  );
}

