import { source } from '@/lib/source';
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/page';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';

export default async function Page({ params }: { params: { slug?: string[] } }) {
  const { slug = [] } = params;
  let page;

  if (slug.length > 0 && slug[0] === 'zh') {
    page = source.getPage(slug.slice(1), 'zh');
  } else {
    page = source.getPage(slug);
  }

  if (!page) notFound();

  const MDX = page.data.body;
  
  // @ts-ignore -- source.pageTree is indexed by locale when i18n is enabled
  const tree = source.pageTree[page.file.locale || 'en'];

  return (
    <DocsLayout tree={tree} nav={{ title: 'Blog' }}>
      <DocsPage toc={page.data.toc} full={page.data.full}>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <MDX components={{ ...defaultMdxComponents }} />
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}
