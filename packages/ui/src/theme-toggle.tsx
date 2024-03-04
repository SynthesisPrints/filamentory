'use client';

import { ComponentProps, useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa6';
import { cn } from '.';

export type ThemeToggleProps = ComponentProps<'button'>;

export const ThemeToggle = ({ className, children, ...props }: ThemeToggleProps) => {
	const [theme, setTheme] = useState(document.querySelector('html')!.getAttribute('data-theme') ?? 'dark');

	const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

	useEffect(() => {
		document.querySelector('html')!.setAttribute('data-theme', theme);
	}, [theme]);

	return (
		<button onClick={toggleTheme} className={cn('btn', className)}>
			{children ? children : theme === 'dark' ? <FaSun /> : <FaMoon />}
		</button>
	);
};
