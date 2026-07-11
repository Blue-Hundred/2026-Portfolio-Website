export const designTokens = {
  color: {
    background: "var(--background)",
    foreground: "var(--foreground)",
    primary: "var(--primary)",
    muted: "var(--muted-foreground)",
    border: "var(--border)",
  },
  typography: {
    displayFont: "'Bricolage Grotesque', sans-serif",
    bodyFont: "'Instrument Sans', sans-serif",
  },
  radius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    pill: "9999px",
  },
  spacing: {
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    6: "1.5rem",
    8: "2rem",
    12: "3rem",
  },
  shadow: {
    subtle: "0 1px 2px rgba(0, 0, 0, 0.06)",
    card: "0 8px 24px rgba(0, 0, 0, 0.08)",
  },
} as const;

export type DesignTokens = typeof designTokens;
