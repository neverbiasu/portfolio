import { source } from '../lib/source';

console.log('All Pages:', source.getPages().map(p => ({ 
  url: p.url, 
  slugs: p.slugs,
  locale: p.file.locale 
})));
