export default function robots() {
  return {
    // AI-assistenten mogen expliciet mee: die sturen inmiddels echte bezoekers.
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://www.fitstudiosayan.nl/sitemap.xml',
    host: 'https://www.fitstudiosayan.nl',
  };
}
