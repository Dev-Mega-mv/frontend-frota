/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: 'export', // Habilita o modo static export
  trailingSlash: true, // Adiciona barra no final das rotas (opcional, recomendado para static hosting)
  images: {
    unoptimized: true, // Necessário para exportação, pois o Next otimiza imagens apenas em servidor
  },
};

module.exports = nextConfig;
