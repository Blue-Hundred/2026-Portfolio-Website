import { Link } from "react-router";
import { Button, Typography, useTheme } from "@mui/material";

const BREAKPOINT_LABELS = {
  mobile: "<600px",
  tablet: "600–899px",
  desktop: "900px+",
} as const;

type TypographyTokenName =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "bodyLarge"
  | "body1"
  | "bodySmall"
  | "eyebrow"
  | "caption"
  | "blockQuote"
  | "mobileMenuLink"
  | "timelineRow"
  | "kpiValue"
  | "kpiInlineValue"
  | "button"
  | "overline";

type TypographyDocRow = {
  label: string;
  token: TypographyTokenName;
  semanticUsage: string;
  component?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "blockquote";
  sample: string;
};

type TypographyAuditRow = {
  status: "CONSISTENT" | "POTENTIAL DUPLICATE" | "ONE-OFF" | "NEEDS REVIEW";
  component: string;
  file: string;
  declaration: string;
  notes: string;
};

const typographyRows: TypographyDocRow[] = [
  { label: "Display / Hero", token: "display", semanticUsage: "Primary hero headline", component: "h1", sample: "Display Typography" },
  { label: "Header 1", token: "h1", semanticUsage: "Primary page title", component: "h1", sample: "Header 1" },
  { label: "Header 2", token: "h2", semanticUsage: "Section heading", component: "h2", sample: "Header 2" },
  { label: "Header 3", token: "h3", semanticUsage: "Subsection heading", component: "h3", sample: "Header 3" },
  { label: "Header 4", token: "h4", semanticUsage: "Card/item heading", component: "h4", sample: "Header 4" },
  { label: "Body Large", token: "bodyLarge", semanticUsage: "Intro and prominent paragraph", component: "p", sample: "Body Large text used for introductory content." },
  { label: "Body", token: "body1", semanticUsage: "Default paragraph text", component: "p", sample: "Body paragraph text for standard reading content." },
  { label: "Body Small", token: "bodySmall", semanticUsage: "Secondary/supporting paragraph text", component: "p", sample: "Body small text for metadata and supporting context." },
  { label: "Eyebrow / Overline", token: "eyebrow", semanticUsage: "Small uppercase labels", component: "span", sample: "Eyebrow label" },
  { label: "Caption", token: "caption", semanticUsage: "Fine-grain metadata/captions", component: "span", sample: "Caption text" },
  { label: "Block Quote", token: "blockQuote", semanticUsage: "Highlighted quotation text", component: "blockquote", sample: "Block quote text used for emphasized statements." },
  { label: "Mobile Menu Link", token: "mobileMenuLink", semanticUsage: "Large mobile navigation links", component: "span", sample: "Menu Link" },
  { label: "Timeline Row", token: "timelineRow", semanticUsage: "Compact experience timeline text", component: "span", sample: "2022 — Current · Role · Company" },
  { label: "KPI Value", token: "kpiValue", semanticUsage: "Primary metric value emphasis", component: "span", sample: "96%" },
  { label: "KPI Inline Value", token: "kpiInlineValue", semanticUsage: "Secondary metric value emphasis", component: "span", sample: "12x" },
  { label: "Button Typography", token: "button", semanticUsage: "Button labels", component: "span", sample: "Button Label" },
  { label: "Overline", token: "overline", semanticUsage: "Legacy uppercase overline", component: "span", sample: "Overline" },
];

const typographyAuditRows: TypographyAuditRow[] = [
  {
    status: "CONSISTENT",
    component: "Homepage Hero",
    file: "src/app/App.tsx",
    declaration: "<Typography variant=\"display\">",
    notes: "Uses centralized display variant directly.",
  },
  {
    status: "CONSISTENT",
    component: "Case Study Sections",
    file: "src/app/CaseStudyPage.tsx",
    declaration: "<Typography variant=\"h2/h3/h4\">",
    notes: "Section headings now map to theme variants.",
  },
  {
    status: "CONSISTENT",
    component: "Mobile Menu Links",
    file: "src/app/App.tsx, src/app/AboutPage.tsx",
    declaration: "<Typography variant=\"mobileMenuLink\">",
    notes: "Mobile menu headings now use a dedicated centralized variant.",
  },
  {
    status: "ONE-OFF",
    component: "DSButton",
    file: "src/app/design-system/components/DSButton.tsx",
    declaration: "Tailwind text-sm font-semibold leading-5",
    notes: "Intended design-system primitive; aligned to button token shape.",
  },
  {
    status: "CONSISTENT",
    component: "Experience List Row Text",
    file: "src/app/AboutPage.tsx",
    declaration: "<Typography variant=\"timelineRow\">",
    notes: "Timeline row text now uses a centralized compact text variant.",
  },
  {
    status: "CONSISTENT",
    component: "Case Study KPI Numbers",
    file: "src/app/CaseStudyPage.tsx",
    declaration: "<Typography variant=\"kpiValue/kpiInlineValue\">",
    notes: "Metric values now use dedicated centralized KPI variants.",
  },
  {
    status: "CONSISTENT",
    component: "Image Caption Text",
    file: "src/app/design-system/components/DSImageDialog.tsx",
    declaration: "<Typography variant=\"bodySmall\">",
    notes: "Caption text now uses centralized bodySmall variant.",
  },
  {
    status: "CONSISTENT",
    component: "Form Input (password gate)",
    file: "src/app/CaseStudyPage.tsx",
    declaration: "text-[16px]",
    notes: "Intentional iPhone Safari anti-zoom safeguard.",
  },
];

function getVariantMetrics(variant: Record<string, unknown> | undefined) {
  const fallback = { mobile: "—", tablet: "—", desktop: "—" };

  if (!variant) {
    return {
      fontSize: fallback,
      lineHeight: fallback,
      letterSpacing: fallback,
      fontWeight: fallback,
    };
  }

  const mobile = variant;
  const tablet = ((variant["@media (min-width:600px)"] as Record<string, unknown> | undefined) ?? variant);
  const desktop = ((variant["@media (min-width:900px)"] as Record<string, unknown> | undefined) ?? tablet);

  const read = (key: string, source: Record<string, unknown>) => {
    const value = source[key] ?? mobile[key];
    return value == null ? "—" : String(value);
  };

  return {
    fontSize: {
      mobile: read("fontSize", mobile),
      tablet: read("fontSize", tablet),
      desktop: read("fontSize", desktop),
    },
    lineHeight: {
      mobile: read("lineHeight", mobile),
      tablet: read("lineHeight", tablet),
      desktop: read("lineHeight", desktop),
    },
    letterSpacing: {
      mobile: read("letterSpacing", mobile),
      tablet: read("letterSpacing", tablet),
      desktop: read("letterSpacing", desktop),
    },
    fontWeight: {
      mobile: read("fontWeight", mobile),
      tablet: read("fontWeight", tablet),
      desktop: read("fontWeight", desktop),
    },
  };
}

function StatusPill({ status }: { status: TypographyAuditRow["status"] }) {
  const classes =
    status === "CONSISTENT"
      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
      : status === "POTENTIAL DUPLICATE"
      ? "bg-amber-500/20 text-amber-800 dark:text-amber-300"
      : status === "ONE-OFF"
      ? "bg-sky-500/20 text-sky-800 dark:text-sky-300"
      : "bg-rose-500/20 text-rose-800 dark:text-rose-300";

  return <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${classes}`}>{status}</span>;
}

export default function DesignSystemPage() {
  const theme = useTheme();

  return (
    <main className="min-h-screen bg-background text-foreground px-4 sm:px-8 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Typography variant="h1" component="h1">Design System: Typography</Typography>
            <Typography variant="body1" component="p" className="text-muted-foreground mt-2">
              Live production typography tokens and current implementation audit.
            </Typography>
          </div>
          <Link to="/" className="text-sm underline text-primary">Back to Home</Link>
        </header>

        <section className="space-y-4">
          <Typography variant="h2" component="h2">Typography Tokens</Typography>
          <div className="overflow-x-auto border border-border rounded-xl">
            <table className="w-full text-left min-w-[1100px]">
              <thead className="bg-secondary/40">
                <tr>
                  <th className="px-4 py-3 text-xs uppercase tracking-wide">Style</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wide">Live Example</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wide">Variant / Token</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wide">Semantic Usage</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wide">Font</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wide">Mobile</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wide">Tablet</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wide">Desktop</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wide">Weight</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wide">Line Height</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wide">Letter Spacing</th>
                </tr>
              </thead>
              <tbody>
                {typographyRows.map((row) => {
                  const variantObj = theme.typography[row.token] as Record<string, unknown> | undefined;
                  const metrics = getVariantMetrics(variantObj);
                  const sampleComponent = row.component ?? "p";

                  return (
                    <tr key={row.label} className="border-t border-border align-top">
                      <td className="px-4 py-4">
                        <Typography variant="subtitle2" component="p">{row.label}</Typography>
                      </td>
                      <td className="px-4 py-4">
                        {row.token === "button" ? (
                          <Button variant="contained">{row.sample}</Button>
                        ) : (
                          <Typography variant={row.token} component={sampleComponent}>
                            {row.sample}
                          </Typography>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <div><code>{`variant=\"${row.token}\"`}</code></div>
                        <div className="text-muted-foreground"><code>{`theme.typography.${row.token}`}</code></div>
                      </td>
                      <td className="px-4 py-4 text-sm text-foreground/90">{row.semanticUsage}</td>
                      <td className="px-4 py-4 text-sm">Inter</td>
                      <td className="px-4 py-4 text-sm">
                        <div className="text-muted-foreground text-xs">{BREAKPOINT_LABELS.mobile}</div>
                        <div>{metrics.fontSize.mobile}</div>
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <div className="text-muted-foreground text-xs">{BREAKPOINT_LABELS.tablet}</div>
                        <div>{metrics.fontSize.tablet}</div>
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <div className="text-muted-foreground text-xs">{BREAKPOINT_LABELS.desktop}</div>
                        <div>{metrics.fontSize.desktop}</div>
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <div>M: {metrics.fontWeight.mobile}</div>
                        <div>T: {metrics.fontWeight.tablet}</div>
                        <div>D: {metrics.fontWeight.desktop}</div>
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <div>M: {metrics.lineHeight.mobile}</div>
                        <div>T: {metrics.lineHeight.tablet}</div>
                        <div>D: {metrics.lineHeight.desktop}</div>
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <div>M: {metrics.letterSpacing.mobile}</div>
                        <div>T: {metrics.letterSpacing.tablet}</div>
                        <div>D: {metrics.letterSpacing.desktop}</div>
                      </td>
                    </tr>
                  );
                })}
                <tr className="border-t border-border align-top">
                  <td className="px-4 py-4">
                    <Typography variant="subtitle2" component="p">Navigation Typography</Typography>
                  </td>
                  <td className="px-4 py-4">
                    <nav className="flex gap-4 text-sm">
                      <a href="#" className="hover:underline">Home</a>
                      <a href="#" className="hover:underline">About</a>
                      <a href="#" className="hover:underline">Resume</a>
                    </nav>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <div><code>Tailwind utilities in nav links</code></div>
                    <div className="text-muted-foreground"><code>Needs token mapping review</code></div>
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground/90">Primary navigation links</td>
                  <td className="px-4 py-4 text-sm">Inter</td>
                  <td className="px-4 py-4 text-sm">Contextual</td>
                  <td className="px-4 py-4 text-sm">Contextual</td>
                  <td className="px-4 py-4 text-sm">Contextual</td>
                  <td className="px-4 py-4 text-sm">Contextual</td>
                  <td className="px-4 py-4 text-sm">Contextual</td>
                  <td className="px-4 py-4 text-sm">Contextual</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <Typography variant="h2" component="h2">Typography Audit</Typography>
          <div className="overflow-x-auto border border-border rounded-xl">
            <table className="w-full min-w-[980px] text-left">
              <thead className="bg-secondary/40">
                <tr>
                  <th className="px-4 py-3 text-xs uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wide">Component</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wide">File</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wide">Declaration</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wide">Notes</th>
                </tr>
              </thead>
              <tbody>
                {typographyAuditRows.map((item) => (
                  <tr key={`${item.file}-${item.component}-${item.declaration}`} className="border-t border-border align-top">
                    <td className="px-4 py-4"><StatusPill status={item.status} /></td>
                    <td className="px-4 py-4 text-sm font-medium">{item.component}</td>
                    <td className="px-4 py-4 text-sm"><code>{item.file}</code></td>
                    <td className="px-4 py-4 text-sm"><code>{item.declaration}</code></td>
                    <td className="px-4 py-4 text-sm text-foreground/90">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
