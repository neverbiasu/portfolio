import Link from 'next/link';
import { source } from '@/lib/source';
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/page';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Callout } from 'fumadocs-ui/components/callout';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { File, Folder, Files } from 'fumadocs-ui/components/files';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { TypeTable } from 'fumadocs-ui/components/type-table';

export default async function Page({ 
  params 
}: { 
  params: { locale: string; slug?: string[] } 
}) {
  const { locale, slug = [] } = params;
  
  // Custom logic to find the page because automatic locale detection is failing
  const page = source.getPages().find(p => {
    // 1. Ensure page belongs to the requested locale folder
    if (!p.file.path.startsWith(`${locale}/`)) return false;
    
    // 2. Compare slugs
    // The raw slug contains the locale prefix (e.g., ['en', 'hello-world'])
    // The requested slug does not (e.g., ['hello-world'])
    const rawSlugs = p.slugs;
    
    const strippedSlugs = rawSlugs[0] === locale ? rawSlugs.slice(1) : rawSlugs;
    
    if (slug.length !== strippedSlugs.length) return false;
    
    for (let i = 0; i < slug.length; i++) {
        if (slug[i] !== strippedSlugs[i]) return false;
    }
    return true;
  });

  if (!page) notFound();

  const MDX = page.data.body;
  
  const processTree = (nodes: any[]): any[] => {
    // Helper to clean URL based on file path
    // Helper to clean URL based on file path
    const getCleanUrl = (node: any) => {
         if (node.$ref?.file) {
             let cleanPath = node.$ref.file.replace(/\.mdx?$/, '');
             if (cleanPath.endsWith('/index')) {
                 cleanPath = cleanPath.substring(0, cleanPath.length - 6);
             }
             return `/blog/${cleanPath}`;
         }
         // Fallback: If no file ref, try to clean the raw URL as best effort or return as is
         // Avoiding undefined or null return
         return node.url || '#';
    };

    return nodes.map(node => {
      if (node.type === 'page') {
         // Check locale looser check
         const isInLocale = node.url.includes(`/${locale}`) || (node.$ref?.file?.startsWith(`${locale}/`) ?? false);
         if (!isInLocale) return null;
         
         const newUrl = getCleanUrl(node);
         return { ...node, url: newUrl };
      }
      if (node.type === 'folder') {
        const children = processTree(node.children);
        if (children.length === 0) return null;
        
        // Fix folder index URL
        let newIndex = node.index;
        if (node.index) {
             newIndex = { ...node.index, url: getCleanUrl(node.index) };
        }

        return { ...node, children, index: newIndex };
      }
      return node;
    }).filter(Boolean);
  };
  
  const baseTree = source.pageTree[locale] || source.pageTree;
  const tree = {
      name: baseTree.name,
      children: processTree(baseTree.children || [])
  };

  const switchLabel = locale === 'en' ? '中文' : 'English';
  const slugStr = slug.length > 0 ? '/' + slug.join('/') : '';
  const switchUrl = `/blog/${locale === 'en' ? 'zh' : 'en'}${slugStr}`;

  return (
    <DocsLayout 
      tree={tree} 
      nav={{ 
        title: 'Blog',
        url: `/blog/${locale}`
      }} 
      i18n={true} 
      links={[
        { text: 'Home', url: '/' },
      ]}
    >
      <DocsPage toc={page.data.toc} full={page.data.full}>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <MDX components={{ 
            ...defaultMdxComponents,
            Accordion, Accordions,
            Callout,
            Card, Cards,
            File, Folder, Files,
            Step, Steps,
            Tab, Tabs,
            TypeTable
          }} />
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  );
}

export async function generateStaticParams() {
   // Generate params manually
   const pages = source.getPages();
   const params = [];
   for (const page of pages) {
       // path: en/hello.mdx
       const match = page.file.path.match(/^([a-z]{2})\/(.*)\.mdx$/);
       if (match) {
           const locale = match[1];
           const slugStr = match[2]; // hello or index
           if (slugStr === 'index') {
               params.push({ locale, slug: [] });
           } else {
               params.push({ locale, slug: slugStr.split('/') });
           }
       }
   }
   return params;
}
