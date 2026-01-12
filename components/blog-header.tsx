'use client';

import { SiteHeader } from '@/components/site-header';
import { useRouter, usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n';

export function BlogHeader() {
  const router = useRouter();
  const pathname = usePathname();
  
  // Determine locale from path, default to 'en'
  const currentLocale: Locale = pathname?.startsWith('/blog/zh') ? 'zh' : 'en';

  const handleToggle = (next: Locale) => {
    // If we are on the root /blog, handle simple redirect
    if (pathname === '/blog') {
        if (next === 'zh') router.push('/blog/zh');
        else router.push('/blog/en');
        return;
    }

    // For other paths, try to switch the locale segment
    // /blog/en/... -> /blog/zh/...
    const segments = pathname.split('/');
    // segments[0] is empty, [1] is 'blog', [2] is locale
    if (segments.length >= 3 && (segments[2] === 'en' || segments[2] === 'zh')) {
      segments[2] = next;
      router.push(segments.join('/'));
    } else {
      // Fallback
      router.push(`/blog/${next}`);
    }
  };

  return <SiteHeader locale={currentLocale} onToggle={handleToggle} />;
}
