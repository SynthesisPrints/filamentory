import { Header } from '@/components/header';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider, ThemeToggle, cn } from '@repo/ui';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { zinc } from 'tailwindcss/colors';
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
	metadataBase: (() => {
		// If VERCEL_URL is defined, return a URL object using it
		if (process.env.VERCEL_URL) {
			return new URL(`https://${process.env.VERCEL_URL}`);
		}
		return new URL('http://localhost:3000');
	})(),
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
		<ClerkProvider
			appearance={{
				elements: {
					navbar: 'bg-base-100 [&_*]:text-base-content',
					navbarButton: 'bg-base-100',
					userButtonPopoverFooter: '!bg-base-200 !text-base-content [&>*:last-child_path]:fill-base-content',
					card: 'bg-base-200 [&_*]:text-base-content [&>*:last-child]:bg-accent [&>*:last-child>*]:text-accent-content [&>*:last-child_path]:fill-accent-content',
					formButtonPrimary: 'bg-accent !text-accent-content hover:bg-accent hover:brightness-90',
					formFieldInput: 'input',
					socialButtonsIconButton__github: 'dark:[&>img]:invert',
					providerIcon__github: 'dark:invert',
					profileSection__danger: '[&_button]:text-error-content [&_button]:bg-error',
				},
			}}
		>
			<html suppressHydrationWarning lang="en" className="scroll-smooth">
				<head>
					<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
					<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
					<link rel="manifest" href="/manifest.json" />
					<meta name="msapplication-TileColor" content={zinc[900]} />
					<meta name="theme-color" content={zinc[900]}></meta>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
				</head>

				<body className={cn(inter.className, 'grid grid-rows-[auto_1fr_auto] min-h-[100dvh]')}>
					<ThemeProvider>
						<Header />
						<main className="grid grid-cols-[1fr_min(80ch,_100%)_1fr] [&>*]:col-[2] [&>.full-bleed]:col-[1/4] py-4">
							{children}
						</main>
						<footer>
							<ThemeToggle />
						</footer>
						<SpeedInsights />
						<Analytics />
						<Toaster richColors className="[&_path]:fill-current" />
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
