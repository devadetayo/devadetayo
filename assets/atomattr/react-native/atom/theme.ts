export interface AtomTheme {
  isDark?: boolean;
  colors?: Record<string, string>;
}

let currentTheme: AtomTheme = {};

function applyThemeToDocument(theme: AtomTheme) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  if (theme.isDark === true) {
    root.dataset.atomTheme = 'dark';
  } else if (theme.isDark === false) {
    root.dataset.atomTheme = 'light';
  }

  for (const [token, value] of Object.entries(theme.colors ?? {})) {
    root.style.setProperty(`--atom-${token}`, value);
  }
}

export function setAtomTheme(theme: AtomTheme) {
  currentTheme = {
    ...currentTheme,
    ...theme,
    colors: {
      ...(currentTheme.colors ?? {}),
      ...(theme.colors ?? {}),
    },
  };

  applyThemeToDocument(currentTheme);
}

export function getAtomTheme() {
  return currentTheme;
}
