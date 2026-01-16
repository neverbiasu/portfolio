'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SiteHeader } from '@/components/site-header';
import { profile, socialLinks } from '@/lib/content';
import type { Locale } from '@/lib/i18n';
import {
  Github,
  Linkedin,
  ExternalLink,
} from 'lucide-react';

const DEFAULT_LOCALE: Locale = 'en';

// Icon components for each platform
const platformIcons: Record<string, React.ReactNode> = {
  github: <Github className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
};

// Platform logos (external URLs for platforms without lucide icons)
const platformLogos: Record<string, string> = {
  codewithgpu: 'https://www.codewithgpu.com/favicon.ico',
  modelscope: 'https://modelscope.cn/favicon.ico',
  civitai: 'https://civitai.com/favicon.ico',
  openart: 'https://openart.ai/favicon.ico',
};

// Platform colors for hover effects
const platformColors: Record<string, string> = {
  github: 'hover:border-[#6e5494] hover:bg-[#6e5494]/10',
  linkedin: 'hover:border-[#0077b5] hover:bg-[#0077b5]/10',
  codewithgpu: 'hover:border-mocha-green hover:bg-mocha-green/10',
  modelscope: 'hover:border-mocha-blue hover:bg-mocha-blue/10',
  civitai: 'hover:border-mocha-mauve hover:bg-mocha-mauve/10',
  openart: 'hover:border-mocha-peach hover:bg-mocha-peach/10',
};

export default function SocialsPage() {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  return (
    <>
      <SiteHeader locale={locale} onToggle={setLocale} />
      <main className="relative min-h-[100dvh] bg-mocha-crust flex items-center justify-center p-4 pt-16">
        <div className="w-full max-w-md mx-auto">
          {/* Profile Card */}
          <div className="text-center mb-8">
            {/* Avatar */}
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="rounded-full object-cover border-2 border-mocha-surface"
              />
            </div>

            {/* Name */}
            <h1 className="text-xl font-bold text-mocha-text font-mono mb-1">
              {profile.name}
            </h1>

            {/* Role */}
            <p className="text-sm text-mocha-subtext">
              {profile.role[locale]}
            </p>

            {/* Bio */}
            <p className="text-xs text-mocha-overlay mt-2 max-w-xs mx-auto">
              {profile.description[locale]}
            </p>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            {socialLinks.map((link) => {
              const hasLucideIcon = platformIcons[link.id];
              const logoUrl = platformLogos[link.id];
              const colorClass = platformColors[link.id] || 'hover:border-mocha-blue hover:bg-mocha-blue/10';

              return (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-4 w-full p-4 rounded-xl bg-mocha-base border border-mocha-surface transition-all duration-300 ${colorClass}`}
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-mocha-surface flex items-center justify-center text-mocha-text group-hover:scale-110 transition-transform">
                    {hasLucideIcon ? (
                      platformIcons[link.id]
                    ) : logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={logoUrl}
                        alt={link.label}
                        className="w-5 h-5 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <ExternalLink className="w-5 h-5" />
                    )}
                  </div>

                  {/* Label */}
                  <span className="flex-1 font-mono text-sm text-mocha-text">
                    {link.label}
                  </span>

                  {/* Arrow */}
                  <ExternalLink className="w-4 h-4 text-mocha-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-mocha-overlay font-mono">
              @neverbiasu
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
