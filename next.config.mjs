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
        hostname: "res.cloudinary.com",
        pathname: "/daiprengq/**",
      },
      {
        protocol: "http",
        hostname: "dsstaging.eu-north-1.elasticbeanstalk.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "https://ds.reconnaissancetechnologies.com",
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
