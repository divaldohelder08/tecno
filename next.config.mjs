/** @type {import('next').NextConfig} */


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.edgestore.dev',
        port: '', // Deixe vazio se não for usar uma porta específica
        pathname: '/**', // Permite qualquer caminho após o domínio
      },
    ],
  },
};

export default nextConfig;


/*const nextConfig = {
    images: {
        domains: ['files.edgestore.dev'], // Adicione o domínio aqui
    },
};

export default nextConfig;*/
//domains remotePatterns