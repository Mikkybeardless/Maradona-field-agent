/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/authentication/login',
				permanent: true,
			},
			{
				source: '/authentication',
				destination: '/authentication/login',
				permanent: true,
			},
			{
				source: '/dashboard',
				destination: '/dashboard/home',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
