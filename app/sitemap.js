import paginas from '@/data/paginas.json';

export default function sitemap() {
  const basis = 'https://www.fitstudiosayan.nl';
  const nu = new Date();
  const eigen = ['/', '/proefles/', '/tarieven/', '/contact/'];
  return [
    ...eigen.map((p) => ({ url: basis + p, lastModified: nu, priority: p === '/' ? 1 : 0.8 })),
    ...paginas.map((p) => ({ url: basis + p.pad, lastModified: nu, priority: 0.6 })),
  ];
}
