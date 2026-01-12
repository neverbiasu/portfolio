import { docs, meta } from '@/.source';
import { createMDXSource } from 'fumadocs-mdx';
import { loader } from 'fumadocs-core/source';
import { i18n } from '@/lib/i18n-fumadocs';

export const source = loader({
  baseUrl: '/blog',
  source: createMDXSource(docs, meta),
  i18n,
});
