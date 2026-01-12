import { RootProvider } from 'fumadocs-ui/provider';
import { I18nProvider } from 'fumadocs-ui/i18n';
import { i18n } from '@/lib/i18n-fumadocs';

const translations = {
  zh: {
    search: '搜索',
    toc: '目录',
    lastUpdate: '最后更新',
    previousPage: '上一页',
    nextPage: '下一页',
    chooseLanguage: '选择语言',
  },
  en: {
    lastUpdate: 'Last Updated',
    chooseLanguage: 'Language',
  },
} as const;

const locales = [
  { locale: 'en', name: 'English' },
  { locale: 'zh', name: '中文' },
];

export default function LocaleLayout({
  params,
  children,
}: {
  params: { locale: string };
  children: React.ReactNode;
}) {
  const locale = params.locale as 'en' | 'zh';
  
  return (
    <RootProvider>
      <I18nProvider
        locale={locale}
        locales={[
          { locale: 'en', name: 'English' },
          { locale: 'zh', name: '中文' },
        ]}
      >
        {children}
      </I18nProvider>
    </RootProvider>
  );
}
