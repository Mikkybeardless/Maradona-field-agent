/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard/overview",
        permanent: true,
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.minimizer[0].options.minimizer.options.compress.drop_console = true;
    }
    return config;
  },
};

export default nextConfig;
