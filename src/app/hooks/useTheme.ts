import { useState, useEffect } from "react";

const THEME_KEY = "theme";
type ThemeMode = "light" | "dark";

function getStoredTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "dark" || stored === "light") {
      return stored;
    }
  } catch {
    return "light";
  }

  return "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => getStoredTheme());
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore storage write failures
    }
  }, [isDark, theme]);

  return {
    isDark,
    toggle: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
  };
}
