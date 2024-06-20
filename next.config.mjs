/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'www.oliveradatenea.com'
      },
      {
        hostname: 'www.eluniversal.com.mx'
      },
      {
        hostname: 'www.elmueble.com'
      },
      {
        hostname: 'cdn2.cocinadelirante.com'
      }
    ]
  }
};

export default nextConfig;
