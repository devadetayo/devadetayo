import { useEffect, useState, useCallback } from 'react';
// Import engine API; path may be adjusted depending on build setup
import { setTheme, getTheme } from '../src/engine/generator.js';

export type Theme = 'light' | 'dark';

export default function useTheme(): [Theme, (t?: Theme) => void] {
  const [theme, setLocalTheme] = useState<Theme>(() => (getTheme ? (getTheme() as Theme) : 'light'));

  useEffect(() => {
    const handler = (e: Event) => {
      try {
        const detail = (e as CustomEvent).detail;
        setLocalTheme(detail === 'dark' ? 'dark' : 'light');
      } catch (err) {
        setLocalTheme(getTheme() as Theme);
      }
    };
    if (typeof document !== 'undefined') {
      document.addEventListener('atomattr:themechange', handler as EventListener);
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('atomattr:themechange', handler as EventListener);
      }
    };
  }, []);

  const toggleTheme = useCallback((t?: Theme) => {
    const next = t || (theme === 'dark' ? 'light' : 'dark');
    setTheme(next);
    setLocalTheme(next);
  }, [theme]);

  return [theme, toggleTheme];
}
