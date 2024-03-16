export const script = (
	attribute,
	storageKey,
	defaultTheme,
	forcedTheme,
	themes,
	value,
	enableSystem,
	enableColorScheme,
) => {
	const el = document.documentElement;
	const systemThemes = ['light', 'dark'];
	const classes = attribute === 'class' && value ? themes.map((t) => value[t] || t) : themes;

	function updateDOM(theme) {
		if (attribute === 'class' || attribute === 'both') {
			el.classList.remove(...classes);
			el.classList.add(theme);
		}
		if (attribute === 'data-theme' || attribute === 'both') {
			el.setAttribute('data-theme', theme);
		}

		setColorScheme(theme);
	}

	function setColorScheme(theme) {
		if (enableColorScheme && systemThemes.includes(theme)) {
			el.style.colorScheme = theme;
		}
	}

	function getSystemTheme() {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	if (forcedTheme) {
		updateDOM(forcedTheme);
	} else {
		try {
			const themeName = localStorage.getItem(storageKey) || defaultTheme;
			const isSystem = enableSystem && themeName === 'system';
			const theme = isSystem ? getSystemTheme() : themeName;
			updateDOM(theme);
		} catch (e) {
			//
		}
	}
};
