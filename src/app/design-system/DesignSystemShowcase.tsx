import { ArrowRight, ExternalLink, Home, Printer } from "lucide-react";
import { Link } from "react-router";
import {
  DSArtifactImageView,
  DSButton,
  DSCard,
  DSChip,
  DSContainer,
  DSImageDialog,
  DSSectionHeader,
  DSCaptionImageView,
  DSStaticImageView,
} from ".";
import { caseStudies } from "../data/caseStudies";
import { designTokens } from "./tokens";

const skills = [
  "Product Strategy",
  "UX Research",
  "Interaction Design",
  "Design Systems",
  "Prototyping",
  "Front-End Dev",
];

export default function DesignSystemShowcase() {
  const demoImage = caseStudies[0]?.image;
  const databasesServiceBlueprint = caseStudies
    .find((study) => study.slug === "shared-control-planes")
    ?.discover.artifacts.find((artifact) => artifact.caption === "Service Blueprint");
  const keybankStaticImage = caseStudies
    .find((study) => study.slug === "keybank-counterfeit-disputes")
    ?.deliver.artifacts[0];
  const colorTokens = [
    { name: "background", value: designTokens.color.background, swatchClass: "bg-background" },
    { name: "foreground", value: designTokens.color.foreground, swatchClass: "bg-foreground" },
    { name: "primary", value: designTokens.color.primary, swatchClass: "bg-primary" },
    { name: "muted", value: designTokens.color.muted, swatchClass: "bg-muted-foreground" },
    { name: "border", value: designTokens.color.border, swatchClass: "bg-border" },
  ];

  const spacingTokens = Object.entries(designTokens.spacing);
  const radiusTokens = Object.entries(designTokens.radius);
  const shadowTokens = Object.entries(designTokens.shadow);

  return (
    <main className="min-h-screen bg-background text-foreground px-5 sm:px-8 py-14" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
      <DSContainer>
        <DSSectionHeader
          eyebrow="Design System"
          title="Visual Documentation"
          subtitle="Tokens, typography, and reusable UI primitives for the portfolio"
          className="mb-8"
        />

        <div className="flex flex-wrap gap-3 mb-8">
          <Link to="/">
            <DSButton variant="secondary" size="sm">
              <Home size={14} />
              Back to Home
            </DSButton>
          </Link>
          <DSButton variant="secondary" size="sm" onClick={() => window.print()}>
            <Printer size={14} />
            Export to PDF
          </DSButton>
          <a href="#usage" className="inline-flex">
            <DSButton variant="ghost" size="sm">
              Usage Snippets
              <ExternalLink size={14} />
            </DSButton>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <DSCard className="p-6 space-y-4">
            <h3 className="ds-heading-lg">Typography</h3>
            <div className="space-y-2">
              <p className="ds-heading-xl">Display Heading</p>
              <p className="ds-heading-lg">Section Heading</p>
              <p className="text-base text-foreground/90">Body text helps describe decisions and context.</p>
              <p className="text-sm text-muted-foreground">Secondary text for metadata and labels.</p>
            </div>
            <div className="text-xs text-muted-foreground border-t border-border pt-3 space-y-1">
              <div>Display: {designTokens.typography.displayFont}</div>
              <div>Body: {designTokens.typography.bodyFont}</div>
            </div>
          </DSCard>

          <DSCard className="p-6 space-y-4">
            <h3 className="ds-heading-lg">Color Tokens</h3>
            <div className="space-y-3">
              {colorTokens.map((token) => (
                <div key={token.name} className="flex items-center justify-between gap-4 border border-border rounded-sm px-3 py-2">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-sm border border-border ${token.swatchClass}`} />
                    <span className="text-sm font-medium">{token.name}</span>
                  </div>
                  <code className="text-xs text-muted-foreground">{token.value}</code>
                </div>
              ))}
            </div>
          </DSCard>
        </div>

        <DSCard className="p-6 space-y-5 mb-6">
          <h3 className="ds-heading-lg">Text Styles</h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs tracking-widest uppercase text-muted-foreground">H1</p>
              <h1 className="font-extrabold leading-tight tracking-tight text-4xl sm:text-5xl" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Heading Level One
              </h1>
            </div>

            <div className="space-y-1">
              <p className="text-xs tracking-widest uppercase text-muted-foreground">H2</p>
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Heading Level Two
              </h2>
            </div>

            <div className="space-y-1">
              <p className="text-xs tracking-widest uppercase text-muted-foreground">H2 + Rule</p>
              <div className="flex items-baseline gap-4 sm:gap-6">
                <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  Heading Level Two
                </h2>
                <div className="flex-1 h-px bg-border ml-2 sm:ml-4" />
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs tracking-widest uppercase text-muted-foreground">H3</p>
              <h3 className="text-xl sm:text-2xl font-extrabold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Heading Level Three
              </h3>
            </div>

            <div className="space-y-1">
              <p className="text-xs tracking-widest uppercase text-muted-foreground">p</p>
              <p className="text-base leading-relaxed text-foreground/90">
                This is a paragraph style sample used for narrative case-study copy and supporting content.
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs tracking-widest uppercase text-muted-foreground">caption</p>
              <p className="text-sm text-muted-foreground">Caption text for supporting context beneath visuals.</p>
            </div>
          </div>
        </DSCard>

        <DSCard className="p-6 space-y-4 mb-6">
          <h3 className="ds-heading-lg">Image Dialog</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {demoImage && (
              <div className="space-y-2">
                <p className="text-xs tracking-widest uppercase text-muted-foreground">DSArtifactImageView</p>
                <DSArtifactImageView
                  src={demoImage}
                  caption="Artifact variant"
                  imageClassName="object-cover"
                />
              </div>
            )}
            {databasesServiceBlueprint && (
              <div className="space-y-2">
                <p className="text-xs tracking-widest uppercase text-muted-foreground">DSCaptionImageView</p>
                <DSCaptionImageView
                  src={databasesServiceBlueprint.src}
                  caption={databasesServiceBlueprint.caption}
                />
              </div>
            )}
            {keybankStaticImage && (
              <div className="space-y-2">
                <p className="text-xs tracking-widest uppercase text-muted-foreground">DSStaticImageView</p>
                <DSStaticImageView
                  src={keybankStaticImage.src}
                  caption={keybankStaticImage.caption}
                />
              </div>
            )}
          </div>
        </DSCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <DSCard className="p-6 space-y-4">
            <h3 className="ds-heading-lg">Spacing Scale</h3>
            <div className="space-y-3">
              {spacingTokens.map(([token, value]) => (
                <div key={token} className="grid grid-cols-[70px_80px_1fr] items-center gap-3">
                  <code className="text-xs text-muted-foreground">{token}</code>
                  <code className="text-xs text-muted-foreground">{value}</code>
                  <div className="h-3 bg-primary/30" style={{ width: value }} />
                </div>
              ))}
            </div>
          </DSCard>

          <DSCard className="p-6 space-y-4">
            <h3 className="ds-heading-lg">Radius + Shadows</h3>
            <div className="space-y-3">
              {radiusTokens.map(([token, value]) => (
                <div key={token} className="flex items-center justify-between gap-3">
                  <code className="text-xs text-muted-foreground">radius.{token}</code>
                  <div className="w-16 h-8 border border-border bg-secondary/40" style={{ borderRadius: value }} />
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-border space-y-3">
              {shadowTokens.map(([token, value]) => (
                <div key={token} className="flex items-center justify-between gap-3">
                  <code className="text-xs text-muted-foreground">shadow.{token}</code>
                  <div className="w-20 h-10 bg-background border border-border" style={{ boxShadow: value }} />
                </div>
              ))}
            </div>
          </DSCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <DSCard className="p-6 space-y-4">
            <h3 className="ds-heading-lg">Buttons</h3>
            <div className="flex flex-wrap gap-3">
              <DSButton>Primary</DSButton>
              <DSButton variant="secondary">Secondary</DSButton>
              <DSButton variant="ghost">Ghost</DSButton>
              <DSButton size="lg">
                Explore
                <ArrowRight size={14} />
              </DSButton>
            </div>
          </DSCard>

          <DSCard className="p-6 space-y-4">
            <h3 className="ds-heading-lg">Chips</h3>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill) => (
                <DSChip key={skill}>{skill}</DSChip>
              ))}
            </div>
          </DSCard>
        </div>

        <DSCard id="usage" className="p-6 space-y-4">
          <h3 className="ds-heading-lg">Usage Snippets</h3>
          <pre className="overflow-x-auto text-xs sm:text-sm p-4 bg-secondary/40 border border-border">
{`import {
  DSArtifactImageView,
  DSButton,
  DSCard,
  DSChip,
  DSContainer,
  DSImageDialog,
  DSSectionHeader,
  DSCaptionImageView,
  DSStaticImageView,
} from "./design-system";

<DSContainer>
  <DSSectionHeader title="Selected Work" />
  <DSCard className="p-6">
    <DSButton>Primary Action</DSButton>
    <DSChip>Design Systems</DSChip>
    <DSArtifactImageView src={artifactImage} caption="Artifact" />
    <DSStaticImageView src={staticImage} caption="Static" />
    <DSCaptionImageView src={blueprintImage} caption="Service Blueprint" />
    <DSImageDialog src={image} caption="Generic Dialog" variant="plain" />
  </DSCard>
</DSContainer>`}
          </pre>
          <p className="text-sm text-muted-foreground">
            Tip: open this page and use <strong>Export to PDF</strong> to generate a shareable visual document.
          </p>
        </DSCard>
      </DSContainer>
    </main>
  );
}
