/** @type {import('next').NextConfig} */
export default {
  // Elke oude URL eindigde op een slash; dat houden we exact zo, anders
  // verliest elke bestaande Google-positie zijn bestemming.
  trailingSlash: true,

  // Next/Image levert de studiofoto's als AVIF waar de browser dat kan, anders WebP.
  images: { formats: ['image/avif', 'image/webp'] },

  async redirects() {
    return [
      // Deze pagina noemde nog 55 euro voor 10 trainingen, weer een ander
      // bedrag dan de tarievenpagina en de webshop. Een 301 in plaats van een
      // verwijdering, zodat de positie in Google meeverhuist.
      { source: '/indoor/tarieven', destination: '/tarieven/', permanent: true },
      { source: '/trainingstijden-2', destination: '/trainingstijden/', permanent: true },
      { source: '/locatie-2', destination: '/contact/', permanent: true },
      { source: '/1-op-1-begeleiding-2', destination: '/personal-training/', permanent: true },
    ];
  },
};
