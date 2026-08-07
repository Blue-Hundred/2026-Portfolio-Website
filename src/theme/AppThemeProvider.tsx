import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { createPortfolioTheme } from "./theme";

type ThemeMode = "light" | "dark";

function getDocumentThemeMode(): ThemeMode {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => getDocumentThemeMode());
  const theme = useMemo(() => createPortfolioTheme(mode), [mode]);

  useEffect(() => {
    const updateMode = () => setMode(getDocumentThemeMode());
    const observer = new MutationObserver(updateMode);

    updateMode();
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}