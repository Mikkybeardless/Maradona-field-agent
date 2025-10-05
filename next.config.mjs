/** @type {import('next').NextConfig} */
import TerserPlugin from "terser-webpack-plugin";
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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ds.reconnaissancetechnologies.com",
        pathname: "/uploads/**",
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // removes ALL console.* calls
              drop_debugger: true, // removes debugger statements
            },
          },
        })
      );
    }
    return config;
  },
};

export default nextConfig;
