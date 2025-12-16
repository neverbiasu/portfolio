
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, Calendar, Code2, ExternalLink } from 'lucide-react';
import type { Project } from '@/lib/content';
import type { Locale } from '@/lib/i18n';

interface Props {
  project: Project;
  locale: Locale;
}

export function ProjectCard({ project, locale }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const title = project.title[locale];
  const summary = project.summary[locale];

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };

  const roundedStars = project.stars 
    ? (project.stars > 1000 ? `${(project.stars / 1000).toFixed(1)}k` : project.stars)
    : 0;
  
  const roundedForks = project.forks
    ? (project.forks > 1000 ? `${(project.forks / 1000).toFixed(1)}k` : project.forks)
    : 0;

  const lastUpdate = project.lastUpdate 
    ? new Date(project.lastUpdate).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : '';

  return (
    <div 
      className="relative w-full h-64 md:h-72 cursor-pointer group perspective-1000"
      onClick={handleFlip}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        {/* --- FRONT SIDE --- */}
        <div className="absolute w-full h-full backface-hidden">
          <article className="glassless-panel w-full h-full flex flex-col justify-between rounded-surface p-6 border-2 border-mocha-surface bg-mocha-base/80 hover:border-mocha-primary/50 transition-colors">
            
            {/* Top: Header */}
            <div>
              <div className="flex justify-between items-start mb-2">
                 <h3 className="text-xl font-bold font-mono text-mocha-primary line-clamp-2">{title}</h3>
                 <div className="flex gap-2">
                   {project.stars !== undefined && (
                     <div className="flex items-center gap-1 text-mocha-yellow bg-mocha-surface/50 px-2 py-1 rounded-full text-xs font-mono">
                       <Star className="w-3 h-3 fill-current" />
                       <span>{roundedStars}</span>
                     </div>
                   )}
                   {project.forks !== undefined && project.forks > 0 && (
                     <div className="flex items-center gap-1 text-mocha-mauve bg-mocha-surface/50 px-2 py-1 rounded-full text-xs font-mono">
                       <GitFork className="w-3 h-3" />
                       <span>{roundedForks}</span>
                     </div>
                   )}
                 </div>
              </div>
              <p className="mt-2 text-sm text-mocha-text/80 leading-relaxed font-sans">{summary}</p>
            </div>

            {/* Bottom: Hint */}
            <div className="mt-4 flex items-center justify-center opacity-0 group-hover:opacity-60 transition-opacity">
               <span className="text-xs font-mono text-mocha-subtle">[ Click to flip ]</span>
            </div>
          </article>
        </div>

        {/* --- BACK SIDE --- */}
        <div 
          className="absolute w-full h-full backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <article className="glassless-panel w-full h-full flex flex-col justify-between rounded-surface p-6 border-2 border-mocha-primary bg-mocha-surface/90">
             
             {/* Tech Stack */}
             <div>
               <h4 className="text-sm font-bold text-mocha-subtle uppercase tracking-wider mb-3 font-mono">Tech Stack</h4>
               <ul className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center gap-1 rounded px-2 py-1 bg-mocha-base text-xs font-mono text-mocha-blue"
                  >
                    <Code2 className="w-3 h-3" />
                    {tech}
                  </li>
                ))}
              </ul>
             </div>

             {/* Meta Info */}
             <div className="space-y-4">
                {lastUpdate && (
                  <div className="flex items-center gap-2 text-xs font-mono text-mocha-text/60">
                    <Calendar className="w-3 h-3" />
                    <span>Updated: {lastUpdate}</span>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-3 pt-4 border-t border-mocha-text/10">
                  {project.links.map((link) => (
                    <a
                      key={`${project.title.en}-${link.label}`}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-bold font-mono text-mocha-base bg-mocha-primary hover:bg-mocha-blue hover:text-white px-3 py-1.5 rounded transition-colors"
                      onClick={(e) => e.stopPropagation()} // Prevent flip when clicking link
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
             </div>

          </article>
        </div>
      </motion.div>
    </div>
  );
}
