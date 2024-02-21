'use client';

import { useEffect, useState } from 'react';

export type ThemeToggleProps = {};

export const ThemeToggle = (props: ThemeToggleProps) => {
	const [theme, setTheme] = useState('dark');

	const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

	useEffect(() => {
		document.querySelector('html')!.setAttribute('data-theme', theme);
	}, [theme]);

	return (
		<>
			<button onClick={toggleTheme} className="btn">
				Current: {theme === 'dark' ? 'Dark' : 'Light'}
			</button>
		</>
	);
};
