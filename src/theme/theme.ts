import { createTheme, type PaletteMode } from "@mui/material/styles";
import type { CSSProperties } from "react";

type CaseStudyThemeTokens = {
  prototypeCanvas: string;
  navigationBackground: string;
  navigationSelectedState: string;
  navigationHoverState: string;
  inspectionPoint: string;
  activeInspectionPoint: string;
  inspectionPanel: string;
  prototypeBorder: string;
  subtleSurface: string;
  focusState: string;
};

declare module "@mui/material/styles" {
  interface TypographyVariants {
    display: CSSProperties;
    bodyLarge: CSSProperties;
    bodySmall: CSSProperties;
    eyebrow: CSSProperties;
    blockQuote: CSSProperties;
    mobileMenuLink: CSSProperties;
    timelineRow: CSSProperties;
    kpiValue: CSSProperties;
    kpiInlineValue: CSSProperties;
  }

  interface TypographyVariantsOptions {
    display?: CSSProperties;
    bodyLarge?: CSSProperties;
    bodySmall?: CSSProperties;
    eyebrow?: CSSProperties;
    blockQuote?: CSSProperties;
    mobileMenuLink?: CSSProperties;
    timelineRow?: CSSProperties;
    kpiValue?: CSSProperties;
    kpiInlineValue?: CSSProperties;
  }

  interface Theme {
    caseStudy: CaseStudyThemeTokens;
  }

  interface ThemeOptions {
    caseStudy?: CaseStudyThemeTokens;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    display: true;
    bodyLarge: true;
    bodySmall: true;
    eyebrow: true;
    blockQuote: true;
    mobileMenuLink: true;
    timelineRow: true;
    kpiValue: true;
    kpiInlineValue: true;
  }
}

const fontFamily = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const borderRadius = 12;

const lightCaseStudyTokens: CaseStudyThemeTokens = {
  prototypeCanvas: "#F7F8FA",
  navigationBackground: "#F5F3EE",
  navigationSelectedState: "rgba(122, 184, 0, 0.14)",
  navigationHoverState: "rgba(13, 14, 26, 0.06)",
  inspectionPoint: "#7AB800",
  activeInspectionPoint: "#4D7600",
  inspectionPanel: "#FFFFFF",
  prototypeBorder: "rgba(13, 14, 26, 0.16)",
  subtleSurface: "#F0F0F0",
  focusState: "#7AB800",
};

const darkCaseStudyTokens: CaseStudyThemeTokens = {
  prototypeCanvas: "#0F1224",
  navigationBackground: "#13152A",
  navigationSelectedState: "rgba(198, 241, 53, 0.16)",
  navigationHoverState: "rgba(242, 240, 234, 0.08)",
  inspectionPoint: "#C6F135",
  activeInspectionPoint: "#E4FF73",
  inspectionPanel: "#171A30",
  prototypeBorder: "rgba(242, 240, 234, 0.16)",
  subtleSurface: "#1A1D30",
  focusState: "#C6F135",
};

export function createPortfolioTheme(mode: PaletteMode = "light") {
  const isDark = mode === "dark";
  const caseStudy = isDark ? darkCaseStudyTokens : lightCaseStudyTokens;

  return createTheme({
      palette: {
        mode,
        primary: {
          main: isDark ? "#C6F135" : "#7AB800",
          contrastText: isDark ? "#0D0E1A" : "#FFFFFF",
        },
        secondary: {
          main: isDark ? "#8C90B5" : "#5C5C72",
          contrastText: isDark ? "#0D0E1A" : "#FFFFFF",
        },
        background: {
          default: isDark ? "#0D0E1A" : "#FFFFFF",
          paper: isDark ? "#13152A" : "#FFFFFF",
        },
        text: {
          primary: isDark ? "#F2F0EA" : "#0D0E1A",
          secondary: isDark ? "#B9BACD" : "#5C5C72",
          disabled: isDark ? "rgba(242, 240, 234, 0.42)" : "rgba(13, 14, 26, 0.38)",
        },
        divider: isDark ? "rgba(242, 240, 234, 0.12)" : "rgba(13, 14, 26, 0.12)",
        success: {
          main: "#2E7D32",
        },
        warning: {
          main: "#ED6C02",
        },
        error: {
          main: "#D32F2F",
        },
        info: {
          main: "#0288D1",
        },
      },
      typography: {
        fontFamily,
        display: {
          fontFamily,
          fontSize: "2.625rem",
          fontWeight: 700,
          lineHeight: "50px",
          letterSpacing: "-1px",
          "@media (min-width:600px)": {
            fontSize: "3.5rem",
            lineHeight: "64px",
            letterSpacing: "-1.5px",
          },
          "@media (min-width:900px)": {
            fontSize: "4.5rem",
            lineHeight: "80px",
            letterSpacing: "-2px",
          },
        },
        h1: {
          fontFamily,
          fontSize: "4.5rem",
          fontWeight: 700,
          lineHeight: "80px",
          letterSpacing: "-2px",
        },
        h2: {
          fontFamily,
          fontSize: "1.875rem",
          fontWeight: 700,
          lineHeight: "46px",
          letterSpacing: "0px",
        },
        h3: {
          fontFamily,
          fontSize: "1.125rem",
          fontWeight: 600,
          lineHeight: "28px",
          letterSpacing: "0px",
        },
        h4: {
          fontFamily,
          fontSize: "1rem",
          fontWeight: 650,
          lineHeight: 1.45,
          letterSpacing: "-0.01em",
          "@media (min-width:600px)": {
            fontSize: "1.05rem",
            lineHeight: 1.45,
          },
          "@media (min-width:900px)": {
            fontSize: "1.125rem",
            lineHeight: 1.5,
          },
        },
        h5: {
          fontFamily,
          fontSize: "1.1rem",
          fontWeight: 650,
          lineHeight: 1.35,
          letterSpacing: "-0.015em",
          "@media (min-width:900px)": {
            fontSize: "1.25rem",
          },
        },
        h6: {
          fontFamily,
          fontSize: "1rem",
          fontWeight: 650,
          lineHeight: 1.4,
          letterSpacing: "-0.01em",
          "@media (min-width:900px)": {
            fontSize: "1.125rem",
          },
        },
        bodyLarge: {
          fontFamily,
          fontSize: "1.25rem",
          fontWeight: 400,
          lineHeight: "32px",
          letterSpacing: "0px",
        },
        subtitle1: {
          fontFamily,
          fontSize: "1.125rem",
          fontWeight: 500,
          lineHeight: 1.5,
          letterSpacing: "-0.01em",
        },
        subtitle2: {
          fontFamily,
          fontSize: "1rem",
          fontWeight: 600,
          lineHeight: 1.45,
          letterSpacing: "-0.005em",
        },
        body1: {
          fontFamily,
          fontSize: "1rem",
          fontWeight: 400,
          lineHeight: "26px",
          letterSpacing: "0px",
        },
        body2: {
          fontFamily,
          fontSize: "0.875rem",
          fontWeight: 400,
          lineHeight: 1.55,
          letterSpacing: "0em",
        },
        bodySmall: {
          fontFamily,
          fontSize: "0.875rem",
          fontWeight: 400,
          lineHeight: 1.55,
          letterSpacing: "0em",
          "@media (min-width:900px)": {
            fontSize: "0.9375rem",
          },
        },
        button: {
          fontFamily,
          fontSize: "0.875rem",
          fontWeight: 600,
          lineHeight: 1.4,
          letterSpacing: "0em",
          textTransform: "none",
        },
        caption: {
          fontFamily,
          fontSize: "0.75rem",
          fontWeight: 400,
          lineHeight: 1.45,
          letterSpacing: "0.01em",
        },
        overline: {
          fontFamily,
          fontSize: "0.6875rem",
          fontWeight: 700,
          lineHeight: 1.4,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        },
        eyebrow: {
          fontFamily,
          fontSize: "0.6875rem",
          fontWeight: 700,
          lineHeight: 1.4,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          "@media (min-width:900px)": {
            fontSize: "0.75rem",
          },
        },
        blockQuote: {
          fontFamily,
          fontSize: "1.625rem",
          fontWeight: 600,
          lineHeight: "36px",
          letterSpacing: "0px",
        },
        mobileMenuLink: {
          fontFamily,
          fontSize: "2.75rem",
          fontWeight: 600,
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          "@media (min-width:600px)": {
            fontSize: "3.625rem",
            lineHeight: 1.05,
          },
        },
        timelineRow: {
          fontFamily,
          fontSize: "0.875rem",
          fontWeight: 400,
          lineHeight: 1.45,
          letterSpacing: "0px",
          "@media (min-width:600px)": {
            fontSize: "0.9375rem",
            lineHeight: 1.45,
          },
        },
        kpiValue: {
          fontFamily,
          fontSize: "1.875rem",
          fontWeight: 800,
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          "@media (min-width:600px)": {
            fontSize: "2.25rem",
            lineHeight: 1.2,
          },
        },
        kpiInlineValue: {
          fontFamily,
          fontSize: "1.25rem",
          fontWeight: 800,
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          "@media (min-width:600px)": {
            fontSize: "1.5rem",
            lineHeight: 1.2,
          },
        },
      },
      shape: {
        borderRadius,
      },
      spacing: 8,
      caseStudy,
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              fontFamily,
              backgroundColor: isDark ? "#0D0E1A" : "#FFFFFF",
              color: isDark ? "#F2F0EA" : "#0D0E1A",
              textRendering: "optimizeLegibility",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            },
          },
        },
        MuiTypography: {
          defaultProps: {
            variantMapping: {
              display: "h1",
              bodyLarge: "p",
              bodySmall: "p",
              eyebrow: "span",
              blockQuote: "blockquote",
              mobileMenuLink: "span",
              timelineRow: "span",
              kpiValue: "span",
              kpiInlineValue: "span",
            },
          },
        },
        MuiButton: {
          defaultProps: {
            disableElevation: true,
          },
          styleOverrides: {
            root: ({ theme }) => ({
              borderRadius: borderRadius * 2,
              textTransform: "none",
              "&:focus-visible": {
                outline: `3px solid ${theme.caseStudy.focusState}`,
                outlineOffset: 2,
              },
            }),
          },
        },
        MuiButtonBase: {
          styleOverrides: {
            root: ({ theme }) => ({
              "&:focus-visible": {
                outline: `3px solid ${theme.caseStudy.focusState}`,
                outlineOffset: 2,
              },
            }),
          },
        },
        MuiCard: {
          styleOverrides: {
            root: ({ theme }) => ({
              borderRadius: borderRadius * 1.5,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: "none",
            }),
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: ({ theme }) => ({
              backgroundImage: "none",
              borderColor: theme.palette.divider,
            }),
          },
        },
        MuiListItemButton: {
          styleOverrides: {
            root: ({ theme }) => ({
              borderRadius: theme.shape.borderRadius,
              "&.Mui-selected": {
                backgroundColor: theme.caseStudy.navigationSelectedState,
              },
              "&.Mui-selected:hover": {
                backgroundColor: theme.caseStudy.navigationSelectedState,
              },
              "&:hover": {
                backgroundColor: theme.caseStudy.navigationHoverState,
              },
            }),
          },
        },
      },
    });
}

export const theme = createPortfolioTheme("light");