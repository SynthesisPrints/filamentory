// reference: https://github.com/pacocoursey/next-themes

'use client';

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	memo,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

// @ts-ignore
import { script } from './theme-script.js';

interface ValueObject {
	[themeName: string]: string;
}

export interface UseThemeProps {
	/** List of all available theme names */
	themes: string[];
	/** Forced theme name for the current page */
	forcedTheme?: string | undefined;
	/** Update the theme */
	setTheme: Dispatch<SetStateAction<string>>;
	/** Active theme name */
	theme?: string | undefined;
	/** If `enableSystem` is true and the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme` */
	resolvedTheme?: string | undefined;
	/** If enableSystem is true, returns the System theme preference ("dark" or "light"), regardless what the active theme is */
	systemTheme?: 'dark' | 'light' | undefined;
}

export interface ThemeProviderProps {
	/** List of all available theme names */
	themes?: string[] | undefined;
	/** Forced theme name for the current page */
	forcedTheme?: string | undefined;
	/** Whether to switch between dark and light themes based on prefers-color-scheme */
	enableSystem?: boolean | undefined;
	/** Disable all CSS transitions when switching themes */
	disableTransitionOnChange?: boolean | undefined;
	/** Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons */
	enableColorScheme?: boolean | undefined;
	/** Key used to store theme setting in localStorage */
	storageKey?: string | undefined;
	/** Default theme name (for v0.0.12 and lower the default was light). If `enableSystem` is false, the default theme is light */
	defaultTheme?: string | undefined;
	/** HTML attribute modified based on the active theme. Accepts `class` and `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.) */
	attribute?: `data-theme` | 'class' | 'both' | undefined;
	/** Mapping of theme name to HTML attribute value. Object where key is the theme name and value is the attribute value */
	value?: ValueObject | undefined;
	/** Nonce string to pass to the inline script for CSP headers */
	nonce?: string | undefined;
	/** React children */
	children: ReactNode;
}

const colorSchemes = ['light', 'dark'];
const MEDIA = '(prefers-color-scheme: dark)';
const isServer = typeof window === 'undefined';
const ThemeContext = createContext<UseThemeProps | undefined>(undefined);
const defaultContext: UseThemeProps = { setTheme: () => {}, themes: [] };

export const useTheme = () => useContext(ThemeContext) ?? defaultContext;

export const ThemeProvider = (props: ThemeProviderProps): ReactNode => {
	const context = useContext(ThemeContext);

	// Ignore nested context providers, just passthrough children
	if (context) return props.children;
	return <Theme {...props} />;
};

const defaultThemes = ['light', 'dark'];

const Theme = ({
	forcedTheme,
	disableTransitionOnChange = false,
	enableSystem = false,
	enableColorScheme = true,
	storageKey = 'theme',
	themes = defaultThemes,
	defaultTheme = enableSystem ? 'system' : 'dark',
	attribute = 'both',
	value,
	children,
	nonce,
}: ThemeProviderProps) => {
	const [theme, setThemeState] = useState(() => getTheme(storageKey, defaultTheme));
	const [resolvedTheme, setResolvedTheme] = useState(() => getTheme(storageKey));
	const attrs = !value ? themes : Object.values(value);

	const applyTheme = useCallback((theme?: string) => {
		let resolved = theme;
		if (!resolved) return;

		// If theme is system, resolve it before setting theme
		if (theme === 'system' && enableSystem) {
			resolved = getSystemTheme();
		}

		const name = value ? value[resolved] : resolved;
		const enable = disableTransitionOnChange ? disableAnimation() : null;
		const d = document.documentElement;

		if (attribute === 'class' || attribute === 'both') {
			d.classList.remove(...attrs);
			if (name) d.classList.add(name);
		}

		if (attribute === 'data-theme' || attribute === 'both') {
			if (name) {
				d.setAttribute('data-theme', name);
			} else {
				d.removeAttribute('data-theme');
			}
		}

		if (enableColorScheme) {
			const fallback = colorSchemes.includes(defaultTheme) ? defaultTheme : null;
			const colorScheme = colorSchemes.includes(resolved) ? resolved : fallback;
			// @ts-ignore
			d.style.colorScheme = colorScheme;
		}

		enable?.();
	}, []);

	const setTheme = useCallback(
		(theme: string | Function) => {
			const newTheme = typeof theme === 'function' ? theme(theme) : theme;
			setThemeState(newTheme);

			// Save to storage
			try {
				localStorage.setItem(storageKey, newTheme);
			} catch (e) {
				// Unsupported
			}
		},
		[forcedTheme],
	);

	const handleMediaQuery = useCallback(
		(e: MediaQueryListEvent | MediaQueryList) => {
			const resolved = getSystemTheme(e);
			setResolvedTheme(resolved);

			if (theme === 'system' && enableSystem && !forcedTheme) {
				applyTheme('system');
			}
		},
		[theme, forcedTheme],
	);

	// Always listen to System preference
	useEffect(() => {
		const media = window.matchMedia(MEDIA);

		// Intentionally use deprecated listener methods to support iOS & old browsers
		media.addListener(handleMediaQuery);
		handleMediaQuery(media);

		return () => media.removeListener(handleMediaQuery);
	}, [handleMediaQuery]);

	// localStorage event handling
	useEffect(() => {
		const handleStorage = (e: StorageEvent) => {
			if (e.key !== storageKey) {
				return;
			}

			// If default theme set, use it if localstorage === null (happens on local storage manual deletion)
			const theme = e.newValue || defaultTheme;
			setTheme(theme);
		};

		window.addEventListener('storage', handleStorage);
		return () => window.removeEventListener('storage', handleStorage);
	}, [setTheme]);

	// Whenever theme or forcedTheme changes, apply it
	useEffect(() => {
		applyTheme(forcedTheme ?? theme);
	}, [forcedTheme, theme]);

	const providerValue = useMemo(
		() => ({
			theme,
			setTheme,
			forcedTheme,
			resolvedTheme: theme === 'system' ? resolvedTheme : theme,
			themes: enableSystem ? [...themes, 'system'] : themes,
			systemTheme: (enableSystem ? resolvedTheme : undefined) as 'light' | 'dark' | undefined,
		}),
		[theme, setTheme, forcedTheme, resolvedTheme, enableSystem, themes],
	);

	return (
		<ThemeContext.Provider value={providerValue}>
			<ThemeScript
				{...{
					forcedTheme,
					storageKey,
					attribute,
					enableSystem,
					enableColorScheme,
					defaultTheme,
					value,
					themes,
					nonce,
				}}
			/>

			{children}
		</ThemeContext.Provider>
	);
};

const ThemeScript = memo(
	({
		forcedTheme,
		storageKey,
		attribute,
		enableSystem,
		enableColorScheme,
		defaultTheme,
		value,
		themes,
		nonce,
	}: Omit<ThemeProviderProps, 'children'> & { defaultTheme: string }) => {
		const scriptArgs = JSON.stringify([
			attribute,
			storageKey,
			defaultTheme,
			forcedTheme,
			themes,
			value,
			enableSystem,
			enableColorScheme,
		]).slice(1, -1);

		return (
			<script
				suppressHydrationWarning
				nonce={typeof window === 'undefined' ? nonce : ''}
				dangerouslySetInnerHTML={{ __html: `(${script.toString()})(${scriptArgs})` }}
			/>
		);
	},
);

// Helpers
const getTheme = (key: string, fallback?: string) => {
	if (isServer) return undefined;
	let theme;
	try {
		theme = localStorage.getItem(key) || undefined;
	} catch (e) {
		// Unsupported
	}
	return theme || fallback;
};

const disableAnimation = () => {
	const css = document.createElement('style');
	css.appendChild(
		document.createTextNode(
			`*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
		),
	);
	document.head.appendChild(css);

	return () => {
		// Force restyle
		(() => window.getComputedStyle(document.body))();

		// Wait for next tick before removing
		setTimeout(() => {
			document.head.removeChild(css);
		}, 1);
	};
};

const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
	if (!e) e = window.matchMedia(MEDIA);
	const isDark = e.matches;
	const systemTheme = isDark ? 'dark' : 'light';
	return systemTheme;
};
