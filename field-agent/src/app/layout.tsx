import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
	title: 'Field Agent',
	description: 'Distress Sale Field Agent Application',
};

const work_sans = Work_Sans({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-work-sans',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={`${work_sans.className}`}>
			<link rel='icon' href='/favicon.ico' sizes='any' />
			<body>{children}</body>
		</html>
	);
}
