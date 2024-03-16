'use client';

import { cn } from '@/lib';
import { ComponentProps, useEffect, useState } from 'react';
import { FaMoon, FaSpinner, FaSun } from 'react-icons/fa6';
import { useTheme } from '.';

export type ThemeToggleProps = ComponentProps<'button'>;

export const ThemeToggle = ({ className, children, ...props }: ThemeToggleProps) => {
	const [mounted, setMounted] = useState(false);
	const { setTheme, theme } = useTheme();

	const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

	useEffect(() => setMounted(true), []);

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme ?? 'dark');
	}, [theme]);

	return (
		<button onClick={toggleTheme} className={cn('btn', className)} {...props}>
			{mounted ? (
				children ? (
					children
				) : theme === 'dark' ? (
					<FaSun />
				) : (
					<FaMoon />
				)
			) : (
				<FaSpinner className="animate-spin" />
			)}
		</button>
	);
};
