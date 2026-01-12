import { NextResponse } from 'next/server';
import { source } from '@/lib/source';

export const dynamic = 'force-dynamic';

export async function GET() {
  const locale = 'zh'; // Test Chinese logic
  const baseTree = source.pageTree[locale] || source.pageTree;
  
  const processTree = (nodes: any[]): any[] => {
    return nodes.map(node => {
      if (node.type === 'page') {
         if (!node.url.includes(`/blog/${locale}`)) return null;
         
         let slugPath = node.url;
         
         if (slugPath.startsWith('/blog/')) {
             slugPath = slugPath.substring(5);
         } else if (slugPath === '/blog') {
             slugPath = '';
         }
         
         if (slugPath.startsWith('/')) slugPath = slugPath.substring(1);
         
         if (slugPath.startsWith(`${locale}/`)) {
             slugPath = slugPath.substring(locale.length + 1);
         } else if (slugPath === locale) {
             slugPath = '';
         }
         
         if (slugPath.length > 0 && !slugPath.startsWith('/')) {
             slugPath = '/' + slugPath;
         }

         const newUrl = `/blog/${locale}${slugPath}`;
         
         return { ...node, originalUrl: node.url, url: newUrl };
      }
      if (node.type === 'folder') {
        const children = processTree(node.children);
        if (children.length === 0) return null;
        return { ...node, children };
      }
      return node;
    }).filter(Boolean);
  };

  const processedTree = processTree(baseTree.children || []);

  return NextResponse.json({
    originalTree: baseTree.children,
    processedTree
  });
}
