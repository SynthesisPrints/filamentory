import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const APP_NAME = 'spoolhub';
const APP_DEFAULT_TITLE = 'spoolhub';
const APP_TITLE_TEMPLATE = '%s - spoolhub';
const APP_DESCRIPTION = 'todo: add description here';

export const metadata: Metadata = {
	applicationName: APP_NAME,
	title: {
		default: APP_DEFAULT_TITLE,
		template: APP_TITLE_TEMPLATE,
	},
	description: APP_DESCRIPTION,
	appleWebApp: {
		capable: true,
		statusBarStyle: 'default',
		title: APP_DEFAULT_TITLE,
	},
	formatDetection: {
		telephone: false,
	},
	openGraph: {
		type: 'website',
		siteName: APP_NAME,
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
	twitter: {
		card: 'summary',
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
	manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<ClerkProvider>
			<html lang="en" data-theme="dark">
				<body className={inter.className}>
					{children}
					<SpeedInsights />
					<Analytics />
				</body>
			</html>
		</ClerkProvider>
	);
}
