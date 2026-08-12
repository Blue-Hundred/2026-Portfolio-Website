import { useParams, Link, useNavigate } from "react-router";
import { useState, useEffect, useLayoutEffect } from "react";
import { motion } from "motion/react";
import { Typography } from "@mui/material";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  LockKeyhole,
  X,
  Workflow,
  Wrench,
  CircleDashed,
  BookOpen,
  Activity,
  MessageSquareWarning,
  Sparkles,
  Bot,
  UserRoundPlus,
  BarChart3,
  Radar,
  Compass,
  LayoutGrid,
  WandSparkles,
  CheckCircle2,
  Rocket,
  Lightbulb,
  ChevronDown,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { caseStudies, visibleCaseStudySlugs, type Phase, type CaseStudy } from "./data/caseStudies";
import { useTheme } from "./hooks/useTheme";
import { ThemeToggle } from "./components/ThemeToggle";
import { DSButton, DSImageDialog, DSStaticImageView } from "./design-system";
import tamareLightLogo from "../assets/Favicon/Tamare Light Logo.svg";
import tamareDarkLogo from "../assets/Favicon/Tamare Dark Logo.svg";

const SESSION_KEY = "cs_unlocked";
const revealProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" },
};

const CASE_STUDY_HEADING_CLASSES = {
  h1: "",
  h2: "",
  h3: "",
  h4: "",
} as const;

function scrollToTopInstant() {
  const html = document.documentElement;
  const body = document.body;
  const previousHtmlBehavior = html.style.scrollBehavior;
  const previousBodyBehavior = body.style.scrollBehavior;

  html.style.scrollBehavior = "auto";
  body.style.scrollBehavior = "auto";
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });

  requestAnimationFrame(() => {
    html.style.scrollBehavior = previousHtmlBehavior;
    body.style.scrollBehavior = previousBodyBehavior;
  });
}

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const attempt = () => {
    if (value === "tamarereese") {
      sessionStorage.setItem(SESSION_KEY, "1");
      onUnlock();
    } else {
      setError(true);
      setShaking(true);
      setValue("");
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-5 sm:px-8 py-8">
      <div
        className={`w-full max-w-sm ${shaking ? "animate-shake" : ""}`}
        style={shaking ? { animation: "shake 0.4s ease" } : {}}
      >
        <div className="flex items-center justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-secondary/40 text-foreground flex items-center justify-center">
            <LockKeyhole size={30} strokeWidth={2.25} />
          </div>
        </div>

        <Typography variant="h3" component="h3" className="text-center mb-2">
          Password protected
        </Typography>
        <Typography variant="body1" component="p" className="text-center text-muted-foreground mb-4">
          This case study is available on request.
        </Typography>

        <div className={`border ${error ? "border-red-500" : "border-border"} transition-colors`}>
          <input
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            onKeyDown={(e) => e.key === "Enter" && attempt()}
            placeholder="Enter password"
            autoFocus
            className="w-full bg-transparent px-5 py-4 text-[16px] text-foreground placeholder:text-muted-foreground/40 outline-none"
          />
        </div>

        {error && (
          <Typography variant="caption" component="p" className="text-red-500 mt-2 px-1">Incorrect password. Try again.</Typography>
        )}

        <DSButton
          onClick={attempt}
          className="mt-3 dark:!bg-white dark:!text-black dark:!border-white dark:hover:!bg-white/90"
          variant="primary"
          size="lg"
          fullWidth
        >
          Unlock
        </DSButton>

        <div className="mt-8 text-center">
          <Link
            to="/#work"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to portfolio
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}

const SCP_RESPONSIBILITIES = [
  "Experience Strategy",
  "Research Synthesis",
  "Information Architecture",
  "Service Design",
  "Interaction Design",
  "Prototyping",
  "Usability Testing",
  "Cross-functional Alignment",
];

const SCP_PERSONAS = [
  {
    name: "Application Owner",
    description:
      "Responsible for preparing applications, coordinating prerequisites, managing approvals, and enabling engineering teams.",
    goals: ["Complete onboarding efficiently", "Maintain compliance", "Reduce engineering blockers"],
    painPoints: [
      "Fragmented onboarding",
      "Multiple disconnected systems",
      "Poor visibility into approvals",
      "Confusing ownership",
    ],
  },
  {
    name: "Engineer",
    description:
      "Responsible for provisioning, configuring, monitoring, and maintaining database services.",
    goals: ["Provision services quickly", "Configure correctly", "Resolve issues independently"],
    painPoints: [
      "Inconsistent provisioning",
      "Technical complexity",
      "Limited operational visibility",
      "Difficult troubleshooting",
    ],
  },
];

const SCP_DESIGN_PRINCIPLES = [
  {
    title: "Design Once, Scale Everywhere",
    body: "Create reusable interaction patterns across products.",
  },
  {
    title: "Progressive Disclosure",
    body: "Reduce complexity by revealing information when needed.",
  },
  {
    title: "Context First",
    body: "Provide documentation and guidance within the workflow.",
  },
  {
    title: "Operational Transparency",
    body: "Expose system status, health, and progress throughout provisioning.",
  },
  {
    title: "Consistency Builds Confidence",
    body: "Standardize terminology, navigation, and workflows regardless of database technology.",
  },
];

function ScpSectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-baseline gap-4 sm:gap-6 mb-5">
      <Typography
        variant="h2"
        component="h2"
        className={CASE_STUDY_HEADING_CLASSES.h2}
      >
        {title}
      </Typography>
      <div className="flex-1 h-px bg-border ml-2 sm:ml-4 hidden sm:block" />
    </div>
  );
}

function ScpModernLayout({
  study,
  accent,
  onImageClick,
}: {
  study: CaseStudy;
  accent: string;
  onImageClick: (src: string, caption: string) => void;
}) {
  const appOwnerArtifact = study.define.artifacts.find((artifact) =>
    artifact.caption.toLowerCase().includes("application owner")
  );
  const engineerArtifact = study.define.artifacts.find((artifact) =>
    artifact.caption.toLowerCase().includes("engineer")
  );
  const researchSynthesisArtifact = study.define.artifacts.find((artifact) =>
    artifact.caption.toLowerCase().includes("research synthesis")
  );
  const journeyMapArtifact = study.define.artifacts.find((artifact) =>
    artifact.caption.toLowerCase().includes("journey")
  );
  const strategyArtifact = study.discover.artifacts[0];
  const discoveryArtifact = study.discover.artifacts[1] ?? study.discover.artifacts[0];
  const principlesArtifact = study.design.artifacts[0];
  const infoArchitectureArtifact = study.design.artifacts.find((artifact) =>
    artifact.caption.toLowerCase().includes("information architecture")
  );
  const userFlowArtifact = study.deliver.artifacts[0];
  const wireframeArtifact = study.deliver.artifacts[1];
  const directImages = study.deliverDirectImages ?? [];
  const sharedNavigationArtifact = directImages[0];
  const dashboardAfterArtifact = directImages[1];
  const provisioningArtifact = directImages[2];
  const relationalFutureArtifact = directImages[3];
  const graphLaunchArtifact = directImages[4];
  const sideBySideArtifact = directImages[5] ?? directImages[6];
  const transformationArtifact = study.deliverFinalImage ?? directImages[7] ?? directImages[6];

  const researchMetrics = [
    { value: "73%", label: "Needed SRE support to complete onboarding and provisioning" },
    { value: "85%", label: "Wanted stronger observability and monitoring" },
    { value: "85%", label: "Had concerns about cost transparency" },
    { value: "69%", label: "Were uncertain when choosing database service sizes" },
  ];

  const strategicObjectives = [
    {
      title: "01 — Create Consistency",
      body: "Standardize shared control-plane experiences to reduce duplicated design and engineering effort.",
    },
    {
      title: "02 — Build for Scale",
      body: "Create reusable experiences that could extend across relational, non-relational, and graph products.",
    },
    {
      title: "03 — Improve Operational Awareness",
      body: "Surface urgent service issues, pricing, developer support, and platform health within a more centralized experience.",
    },
  ];

  const actionJourneySteps = [
    "Learn & Prepare",
    "Complete Onboarding",
    "Provision Database",
    "Configure Service",
    "Operate & Monitor",
  ];

  return (
    <>
      <motion.section className="bg-background py-8 sm:py-10" {...revealProps}>
        <DSImageDialog
          src={study.image}
          caption="Databases case study hero"
          onImageClick={onImageClick}
          variant="plain"
          className="w-full border border-border"
          imageClassName="w-full h-auto object-contain"
        />
      </motion.section>

      <motion.section className="bg-background py-12 sm:py-14" {...revealProps}>
        <ScpSectionTitle title="Situation" />
        <div className="max-w-4xl">
          <Typography variant="h3" component="h3" className="mb-4 text-foreground">
            10+ database products had evolved into disconnected experiences.
          </Typography>
          <Typography variant="body1" component="p" className="text-foreground/90 mb-4">
            Enterprise engineers relied on more than 10 independent database control planes across relational, non-relational, and graph technologies.
          </Typography>
          <Typography variant="body1" component="p" className="text-foreground/90 mb-8">
            Although engineers performed many of the same tasks across products, each control plane had different navigation, terminology, provisioning workflows, documentation, and operational experiences.
          </Typography>
        </div>

        <div className="grid grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {[
            {
              title: "Customer Friction",
              body: "Engineers had to relearn workflows across database products and frequently relied on support.",
            },
            {
              title: "Duplicated Investment",
              body: "Teams independently designed and engineered similar capabilities, increasing development and maintenance costs.",
            },
            {
              title: "Limited Scalability",
              body: "Fragmented experiences made it difficult to create a unified experience that could eventually integrate into the broader Integrated Engineers Portal.",
            },
          ].map((item) => (
            <div key={item.title} className="col-span-4 lg:col-span-2 rounded-xl border border-border bg-secondary/25 p-5">
              <Typography variant="eyebrow" component="p" className="text-muted-foreground mb-2">{item.title}</Typography>
              <Typography variant="bodySmall" component="p" className="text-foreground/85">{item.body}</Typography>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-secondary/20 p-6 mb-10">
          <Typography variant="bodyLarge" component="p" className="text-foreground/90">
            We needed to launch the first shared control plane while establishing an experience framework that could scale across the database ecosystem.
          </Typography>
        </div>

        <Typography variant="h3" component="h3" className="mb-4 text-foreground">Strategic objectives</Typography>
        <div className="grid grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {strategicObjectives.map((objective) => (
            <div key={objective.title} className="col-span-4 lg:col-span-2 rounded-xl border border-border bg-background p-5">
              <Typography variant="h4" component="h4" className="mb-2 text-foreground">{objective.title}</Typography>
              <Typography variant="bodySmall" component="p" className="text-foreground/80">{objective.body}</Typography>
            </div>
          ))}
        </div>

        {strategyArtifact && (
          <div className="mb-10">
            <Typography variant="eyebrow" component="p" className="text-muted-foreground mb-2">Artifact</Typography>
            <Typography variant="h4" component="h4" className="mb-3">Context & Strategic Objectives</Typography>
            <DSImageDialog
              src={strategyArtifact.src}
              caption="Context & Strategic Objectives"
              onImageClick={onImageClick}
              variant="plain"
              className="w-full border border-border"
              imageClassName="w-full h-auto object-contain"
            />
            <Typography variant="bodySmall" component="p" className="mt-3 text-foreground/75">
              10+ independent control planes → shared UX framework → Graph Shared Control Plane → future Relational and Non-relational experiences → Integrated Engineers Portal.
            </Typography>
          </div>
        )}

        <Typography variant="h3" component="h3" className="mb-4 text-foreground">Research confirmed the problem.</Typography>
        <div className="max-w-4xl mb-6">
          <Typography variant="body1" component="p" className="text-foreground/90 mb-4">
            The initiative began with an audit of existing control planes and expanded through multiple rounds of research to understand the customer and operational challenges behind the fragmented experience.
          </Typography>
        </div>

        <div className="grid grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {[
            "Round 1 — Stakeholder interviews and UX audits across 9+ control planes",
            "Round 2 — 13 proof-of-concept usability tests and feedback sessions",
            "Round 3 — 14 qualitative customer interviews",
          ].map((round) => (
            <div key={round} className="col-span-4 lg:col-span-2 rounded-xl border border-border bg-background p-4">
              <Typography variant="bodySmall" component="p" className="text-foreground/85">{round}</Typography>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 lg:grid-cols-4 gap-px bg-background mb-8">
          {researchMetrics.map((metric) => (
            <div key={metric.label} className="col-span-2 lg:col-span-1 bg-background p-5 sm:p-8 border border-border">
              <Typography variant="kpiValue" component="div" className="mb-2" style={{ color: accent }}>
                {metric.value}
              </Typography>
              <Typography variant="bodySmall" component="p" className="text-muted-foreground">{metric.label}</Typography>
            </div>
          ))}
        </div>

        <Typography variant="body1" component="p" className="text-foreground/90 mb-8 max-w-4xl">
          These findings shifted the problem from modernizing individual interfaces to creating a platform experience that enabled engineers to operate more independently.
        </Typography>

        {discoveryArtifact && (
          <div className="mb-10">
            <Typography variant="eyebrow" component="p" className="text-muted-foreground mb-2">Artifact</Typography>
            <Typography variant="h4" component="h4" className="mb-3">Discovery Research</Typography>
            <DSImageDialog
              src={discoveryArtifact.src}
              caption="Discovery Research"
              onImageClick={onImageClick}
              variant="plain"
              className="w-full border border-border"
              imageClassName="w-full h-auto object-contain"
            />
          </div>
        )}

        <Typography variant="h3" component="h3" className="mb-4 text-foreground">Fragmentation created inconsistent mental models.</Typography>
        <Typography variant="body1" component="p" className="text-foreground/90 mb-4 max-w-4xl">
          Existing products used different navigation structures, terminology, information architectures, and interaction patterns for similar customer tasks.
        </Typography>
        <Typography variant="body1" component="p" className="text-foreground/90 mb-8 max-w-4xl">
          Engineers moving between database technologies had to repeatedly learn where capabilities lived and how each product worked.
        </Typography>

        {sharedNavigationArtifact && (
          <div>
            <Typography variant="eyebrow" component="p" className="text-muted-foreground mb-2">Artifact</Typography>
            <Typography variant="h4" component="h4" className="mb-3">Navigation Before Modernization</Typography>
            <DSImageDialog
              src={sharedNavigationArtifact}
              caption="Navigation Before Modernization"
              onImageClick={onImageClick}
              variant="plain"
              className="w-full border border-border"
              imageClassName="w-full h-auto object-contain"
            />
          </div>
        )}
      </motion.section>

      <motion.section className="bg-background py-12 sm:py-14" {...revealProps}>
        <ScpSectionTitle title="Task" />
        <Typography variant="h3" component="h3" className="mb-4 text-foreground">
          Define what should be shared—and what should remain product-specific.
        </Typography>
        <Typography variant="body1" component="p" className="text-foreground/90 mb-5 max-w-4xl">
          As Lead Product Designer, I was responsible for translating fragmented research and product experiences into a scalable UX strategy.
        </Typography>
        <div className="rounded-xl border border-border bg-secondary/20 p-6 mb-6 max-w-4xl">
          <Typography variant="h4" component="p" className="text-foreground/90">
            “What should be standardized across database products, and what needed to remain technology-specific?”
          </Typography>
        </div>
        <Typography variant="body1" component="p" className="text-foreground/90 mb-6 max-w-4xl">
          I partnered with Product Management, Engineering, Architecture, Operations, UX, and technology leadership to establish the experience strategy for the first shared control plane and create reusable patterns that could scale to future Relational and Non-relational experiences.
        </Typography>

        <Typography variant="h3" component="h3" className="mb-3 text-foreground">Responsibilities</Typography>
        <div className="flex flex-wrap gap-2.5 mb-8">
          {SCP_RESPONSIBILITIES.map((item) => (
            <span
              key={item}
              className="px-3 py-1.5 rounded-full border border-border bg-secondary/25 text-sm sm:text-[15px] text-foreground/90"
            >
              {item}
            </span>
          ))}
        </div>

        {researchSynthesisArtifact && (
          <div>
            <Typography variant="eyebrow" component="p" className="text-muted-foreground mb-2">Artifact</Typography>
            <Typography variant="h4" component="h4" className="mb-3">Platform Model / My Scope</Typography>
            <DSImageDialog
              src={researchSynthesisArtifact.src}
              caption="Platform Model / My Scope"
              onImageClick={onImageClick}
              variant="plain"
              className="w-full border border-border"
              imageClassName="w-full h-auto object-contain"
            />
          </div>
        )}
      </motion.section>

      <motion.section className="bg-background py-12 sm:py-14" {...revealProps}>
        <ScpSectionTitle title="Action" />
        <Typography variant="h3" component="h3" className="mb-4 text-foreground">
          I shifted the organization from designing individual products to designing a shared platform.
        </Typography>
        <Typography variant="body1" component="p" className="text-foreground/90 mb-10 max-w-4xl">
          Rather than redesigning each control plane independently, I focused on identifying the customer needs, workflows, and interaction patterns that could be standardized across the ecosystem.
        </Typography>

        <Typography variant="h3" component="h3" className="mb-4">01 — Shared customer journey</Typography>
        <Typography variant="h4" component="h4" className="mb-3">I identified the shared customer journey.</Typography>
        <div className="grid grid-cols-4 lg:grid-cols-2 gap-4 mb-6">
          {SCP_PERSONAS.map((persona) => (
            <div key={persona.name} className="col-span-4 lg:col-span-1 rounded-xl border border-border bg-secondary/25 p-5">
              <Typography variant="h4" component="h4" className="mb-2">{persona.name}</Typography>
              <Typography variant="bodySmall" component="p" className="text-foreground/85">{persona.description}</Typography>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-background p-5 mb-6">
          <div className="flex flex-wrap items-center gap-2.5">
            {actionJourneySteps.map((step, index) => (
              <div key={step} className="flex items-center gap-2.5">
                <span className="px-3 py-1.5 rounded-full border border-border bg-secondary/20 text-sm">{step}</span>
                {index < actionJourneySteps.length - 1 && <ArrowRight size={14} className="text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>

        <Typography variant="body1" component="p" className="text-foreground/90 mb-6 max-w-4xl">
          The journey revealed that the greatest friction occurred when customers moved between disconnected systems, encountered unclear ownership, or lacked visibility into what needed to happen next.
        </Typography>

        <div className="grid grid-cols-4 lg:grid-cols-2 gap-4 mb-10">
          {appOwnerArtifact && (
            <div className="col-span-4 lg:col-span-1">
              <Typography variant="eyebrow" component="p" className="text-muted-foreground mb-2">Artifact</Typography>
              <Typography variant="h4" component="h4" className="mb-3">Primary Personas</Typography>
              <DSImageDialog
                src={appOwnerArtifact.src}
                caption="Primary Personas"
                onImageClick={onImageClick}
                variant="plain"
                className="w-full border border-border"
                imageClassName="w-full h-auto object-contain"
              />
            </div>
          )}
          {journeyMapArtifact && (
            <div className="col-span-4 lg:col-span-1">
              <Typography variant="eyebrow" component="p" className="text-muted-foreground mb-2">Artifact</Typography>
              <Typography variant="h4" component="h4" className="mb-3">Customer Journey Map</Typography>
              <DSImageDialog
                src={journeyMapArtifact.src}
                caption="Customer Journey Map"
                onImageClick={onImageClick}
                variant="plain"
                className="w-full border border-border"
                imageClassName="w-full h-auto object-contain"
              />
            </div>
          )}
        </div>

        <Typography variant="h3" component="h3" className="mb-4">02 — Shared experience strategy</Typography>
        <Typography variant="h4" component="h4" className="mb-3">I turned research into a shared experience strategy.</Typography>
        <Typography variant="body1" component="p" className="text-foreground/90 mb-4">Research revealed recurring customer needs:</Typography>
        <div className="flex flex-wrap gap-2.5 mb-6">
          {["Consistency", "Self-service", "Operational visibility", "Cost transparency", "Contextual support"].map((item) => (
            <span key={item} className="px-3 py-1.5 rounded-full border border-border bg-secondary/25 text-sm sm:text-[15px]">
              {item}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
          {SCP_DESIGN_PRINCIPLES.map((principle) => (
            <div key={principle.title} className="col-span-4 xl:col-span-2 rounded-xl border border-border bg-background p-5">
              <Typography variant="h4" component="h4" className="mb-2">{principle.title.toUpperCase()}</Typography>
              <Typography variant="bodySmall" component="p" className="text-foreground/80">{principle.body}</Typography>
            </div>
          ))}
        </div>
        {principlesArtifact && (
          <div className="mb-10">
            <Typography variant="eyebrow" component="p" className="text-muted-foreground mb-2">Artifact</Typography>
            <Typography variant="h4" component="h4" className="mb-3">Research Synthesis</Typography>
            <DSImageDialog
              src={principlesArtifact.src}
              caption="Research Synthesis"
              onImageClick={onImageClick}
              variant="plain"
              className="w-full border border-border"
              imageClassName="w-full h-auto object-contain"
            />
            <Typography variant="bodySmall" component="p" className="mt-3 text-foreground/75">
              I synthesized findings across products to separate technology-specific requirements from customer needs that could be standardized.
            </Typography>
          </div>
        )}

        <Typography variant="h3" component="h3" className="mb-4">03 — Information architecture</Typography>
        <Typography variant="h4" component="h4" className="mb-3">I created a shared information architecture.</Typography>
        <Typography variant="body1" component="p" className="text-foreground/90 mb-4 max-w-4xl">
          Database products organized similar capabilities differently, forcing engineers to develop a new mental model for each technology.
        </Typography>
        <Typography variant="body1" component="p" className="text-foreground/90 mb-6 max-w-4xl">
          I established a common architecture organized around customer tasks: My Databases, Database Services, Database Pricing, Subscriptions, Create Database Service, and Preferences.
        </Typography>

        <div className="grid grid-cols-4 lg:grid-cols-2 gap-4 mb-10">
          {sharedNavigationArtifact && (
            <div className="col-span-4 lg:col-span-1">
              <Typography variant="eyebrow" component="p" className="text-muted-foreground mb-2">Before</Typography>
              <Typography variant="h4" component="h4" className="mb-3">Legacy Navigation</Typography>
              <DSImageDialog
                src={sharedNavigationArtifact}
                caption="Legacy Navigation"
                onImageClick={onImageClick}
                variant="plain"
                className="w-full border border-border"
                imageClassName="w-full h-auto object-contain"
              />
            </div>
          )}
          {infoArchitectureArtifact && (
            <div className="col-span-4 lg:col-span-1">
              <Typography variant="eyebrow" component="p" className="text-muted-foreground mb-2">After</Typography>
              <Typography variant="h4" component="h4" className="mb-3">Shared Information Architecture</Typography>
              <DSImageDialog
                src={infoArchitectureArtifact.src}
                caption="Shared Information Architecture"
                onImageClick={onImageClick}
                variant="plain"
                className="w-full border border-border"
                imageClassName="w-full h-auto object-contain"
              />
            </div>
          )}
        </div>

        <Typography variant="h3" component="h3" className="mb-4">04 — Reusable platform patterns</Typography>
        <Typography variant="h4" component="h4" className="mb-3">I established reusable patterns for the next shared control planes.</Typography>
        <Typography variant="body1" component="p" className="text-foreground/90 mb-4 max-w-4xl">
          Using the Integrated Engineers Portal design system, I established shared experience patterns that could be reused beyond the initial implementation.
        </Typography>
        <div className="flex flex-wrap gap-2.5 mb-6">
          {[
            "Navigation and information architecture",
            "Component styling",
            "Service cards",
            "Service-detail layouts",
            "Dashboard patterns",
            "Branding",
            "Operational states",
          ].map((item) => (
            <span key={item} className="px-3 py-1.5 rounded-full border border-border bg-secondary/25 text-sm sm:text-[15px]">
              {item}
            </span>
          ))}
        </div>

        {graphLaunchArtifact && (
          <div className="mb-10">
            <Typography variant="eyebrow" component="p" className="text-muted-foreground mb-2">Artifact</Typography>
            <Typography variant="h4" component="h4" className="mb-3">Graph + Relational Shared Navigation</Typography>
            <DSImageDialog
              src={graphLaunchArtifact}
              caption="Graph + Relational Shared Navigation"
              onImageClick={onImageClick}
              variant="plain"
              className="w-full border border-border"
              imageClassName="w-full h-auto object-contain"
            />
            <Typography variant="bodySmall" component="p" className="mt-3 text-foreground/75">
              The Graph Shared Control Plane launched first, while the same navigation and interaction standards were designed to extend to future shared control planes.
            </Typography>
          </div>
        )}

        <Typography variant="h3" component="h3" className="mb-4">05 — Dashboard redesign</Typography>
        <Typography variant="h4" component="h4" className="mb-3">I redesigned dashboards around customer decisions.</Typography>
        <Typography variant="body1" component="p" className="text-foreground/90 mb-4 max-w-4xl">
          Existing dashboards surfaced different information depending on the database technology and often prioritized available system data over what engineers actually needed to know.
        </Typography>
        <Typography variant="body1" component="p" className="text-foreground/90 mb-6 max-w-4xl">
          Research showed customers needed faster answers to: What needs my attention? Are my services healthy? What am I spending? Where can I get help?
        </Typography>

        <div className="grid grid-cols-4 lg:grid-cols-2 gap-4 mb-6">
          {sharedNavigationArtifact && (
            <div className="col-span-4 lg:col-span-1">
              <Typography variant="eyebrow" component="p" className="text-muted-foreground mb-2">Before</Typography>
              <Typography variant="h4" component="h4" className="mb-3">Legacy MySQL + Cassandra dashboards</Typography>
              <DSImageDialog
                src={sharedNavigationArtifact}
                caption="Legacy dashboards"
                onImageClick={onImageClick}
                variant="plain"
                className="w-full border border-border"
                imageClassName="w-full h-auto object-contain"
              />
            </div>
          )}
          {dashboardAfterArtifact && (
            <div className="col-span-4 lg:col-span-1">
              <Typography variant="eyebrow" component="p" className="text-muted-foreground mb-2">After</Typography>
              <Typography variant="h4" component="h4" className="mb-3">Final My Databases dashboard</Typography>
              <DSImageDialog
                src={dashboardAfterArtifact}
                caption="Final My Databases dashboard"
                onImageClick={onImageClick}
                variant="plain"
                className="w-full border border-border"
                imageClassName="w-full h-auto object-contain"
              />
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2.5 mb-10">
          {["Recent Services", "Performance & Health", "Applications", "Pricing", "Product Knowledge Base"].map((item) => (
            <span key={item} className="px-3 py-1.5 rounded-full border border-border bg-secondary/25 text-sm sm:text-[15px]">
              {item}
            </span>
          ))}
        </div>

        <Typography variant="h3" component="h3" className="mb-4">06 — Provisioning workflow</Typography>
        <Typography variant="h4" component="h4" className="mb-3">I applied the strategy to a complex provisioning workflow.</Typography>
        <Typography variant="body1" component="p" className="text-foreground/90 mb-6 max-w-4xl">
          I used Create Database Service as a representative workflow to demonstrate how the shared framework could support technically complex database experiences.
        </Typography>
        <div className="flex flex-wrap gap-2.5 mb-6">
          {[
            "Simplifying configuration",
            "Reducing unnecessary complexity",
            "Providing contextual guidance",
            "Surfacing dependencies",
            "Improving provisioning-status visibility",
            "Creating reusable patterns for additional database products",
          ].map((item) => (
            <span key={item} className="px-3 py-1.5 rounded-full border border-border bg-secondary/25 text-sm sm:text-[15px]">
              {item}
            </span>
          ))}
        </div>

        {userFlowArtifact && (
          <div className="mb-8">
            <Typography variant="eyebrow" component="p" className="text-muted-foreground mb-2">Artifact</Typography>
            <Typography variant="h4" component="h4" className="mb-3">Create Database Service User Flow</Typography>
            <DSImageDialog
              src={userFlowArtifact.src}
              caption="Create Database Service User Flow"
              onImageClick={onImageClick}
              variant="plain"
              className="w-full border border-border"
              imageClassName="w-full h-auto object-contain"
            />
          </div>
        )}

        <Typography variant="h4" component="h4" className="mb-3">From flow to interface.</Typography>
        <Typography variant="body1" component="p" className="text-foreground/90 mb-6 max-w-4xl">
          I translated the workflow into wireframes and high-fidelity prototypes, iterating with Product, Engineering, Architecture, and customers. Usability testing helped identify friction and validate design decisions before implementation.
        </Typography>

        <div className="grid grid-cols-4 lg:grid-cols-2 gap-4 mb-10">
          {wireframeArtifact && (
            <div className="col-span-4 lg:col-span-1">
              <Typography variant="eyebrow" component="p" className="text-muted-foreground mb-2">Artifact</Typography>
              <Typography variant="h4" component="h4" className="mb-3">Provisioning Wireframes</Typography>
              <DSImageDialog
                src={wireframeArtifact.src}
                caption="Provisioning Wireframes"
                onImageClick={onImageClick}
                variant="plain"
                className="w-full border border-border"
                imageClassName="w-full h-auto object-contain"
              />
            </div>
          )}
          {relationalFutureArtifact && (
            <div className="col-span-4 lg:col-span-1">
              <Typography variant="eyebrow" component="p" className="text-muted-foreground mb-2">Artifact</Typography>
              <Typography variant="h4" component="h4" className="mb-3">Relational Shared Control Plane Future-State Designs</Typography>
              <DSImageDialog
                src={relationalFutureArtifact}
                caption="Relational Shared Control Plane Future-State Designs"
                onImageClick={onImageClick}
                variant="plain"
                className="w-full border border-border"
                imageClassName="w-full h-auto object-contain"
              />
              <Typography variant="bodySmall" component="p" className="mt-3 text-foreground/75">
                These Relational Shared Control Plane designs applied the reusable framework established by the program and represented the intended future-state experience.
              </Typography>
            </div>
          )}
        </div>

        <Typography variant="h3" component="h3" className="mb-4">Design validation</Typography>
        <Typography variant="body1" component="p" className="text-foreground/90 max-w-4xl">
          Validation focused on discoverability, navigation, onboarding, provisioning, and service management. Findings were used to refine patterns before implementation and confirm that the shared framework reduced friction across critical workflows.
        </Typography>
      </motion.section>

      <motion.section className="bg-background py-12 sm:py-14" {...revealProps}>
        <ScpSectionTitle title="Result" />
        <Typography variant="h3" component="h3" className="mb-4 text-foreground">
          We launched the first shared control plane and established the foundation for the rest.
        </Typography>
        <Typography variant="body1" component="p" className="text-foreground/90 mb-8 max-w-4xl">
          The work resulted in the launch of the Graph Shared Control Plane, consolidating previously fragmented graph database experiences into a more consistent management experience.
        </Typography>
        <Typography variant="body1" component="p" className="text-foreground/90 mb-10 max-w-4xl">
          At the same time, we created reusable navigation, information architecture, interaction patterns, and UI components intended to accelerate development of future Relational and Non-relational Shared Control Planes and support eventual integration into the Integrated Engineers Portal.
        </Typography>

        <Typography variant="h3" component="h3" className="mb-4">Customer impact</Typography>
        <div className="grid grid-cols-4 lg:grid-cols-4 gap-px bg-background mb-8">
          {study.metrics.map((m) => (
            <motion.div key={m.label} className="col-span-2 lg:col-span-1 bg-background p-5 sm:p-8 border border-border" {...revealProps}>
              <Typography variant="kpiValue" component="div" className="mb-2" style={{ color: accent }}>
                {m.value}
              </Typography>
              <Typography variant="bodySmall" component="p" className="text-muted-foreground">{m.label}</Typography>
            </motion.div>
          ))}
        </div>

        {dashboardAfterArtifact && (
          <div className="mb-10">
            <Typography variant="eyebrow" component="p" className="text-muted-foreground mb-2">Artifact</Typography>
            <Typography variant="h4" component="h4" className="mb-3">Usability Validation / Results</Typography>
            <DSImageDialog
              src={dashboardAfterArtifact}
              caption="Usability Validation / Results"
              onImageClick={onImageClick}
              variant="plain"
              className="w-full border border-border"
              imageClassName="w-full h-auto object-contain"
            />
          </div>
        )}

        <Typography variant="h3" component="h3" className="mb-3">Launched the Graph Shared Control Plane</Typography>
        <Typography variant="body1" component="p" className="text-foreground/90 mb-6 max-w-4xl">
          The Graph Shared Control Plane became the first production implementation of the shared-control-plane strategy.
        </Typography>

        {graphLaunchArtifact && (
          <div className="mb-10">
            <Typography variant="eyebrow" component="p" className="text-muted-foreground mb-2">Artifact</Typography>
            <Typography variant="h4" component="h4" className="mb-3">Launched Graph Shared Control Plane</Typography>
            <DSImageDialog
              src={graphLaunchArtifact}
              caption="Launched Graph Shared Control Plane"
              onImageClick={onImageClick}
              variant="plain"
              className="w-full border border-border"
              imageClassName="w-full h-auto object-contain"
            />
          </div>
        )}

        <Typography variant="h3" component="h3" className="mb-3">Established reusable patterns for future control planes</Typography>
        <div className="flex flex-wrap gap-2.5 mb-8">
          {[
            "Navigation and information architecture",
            "Dashboard structures",
            "Service cards and service-detail layouts",
            "Onboarding and provisioning",
            "Operational status and health",
            "Contextual documentation and support",
            "Shared design-system components",
          ].map((item) => (
            <span key={item} className="px-3 py-1.5 rounded-full border border-border bg-secondary/25 text-sm sm:text-[15px]">
              {item}
            </span>
          ))}
        </div>

        <Typography variant="h3" component="h3" className="mb-3">Extended the framework into future-state Relational designs</Typography>
        <Typography variant="body1" component="p" className="text-foreground/90 mb-6 max-w-4xl">
          Using the shared framework, I designed future-state experiences for the Relational Shared Control Plane, including dashboard, service discovery, service detail, pricing visibility, and provisioning.
        </Typography>

        {sideBySideArtifact && (
          <div className="mb-10">
            <Typography variant="eyebrow" component="p" className="text-muted-foreground mb-2">Artifact</Typography>
            <Typography variant="h4" component="h4" className="mb-3">Graph + Relational Experiences Side-by-Side</Typography>
            <DSImageDialog
              src={sideBySideArtifact}
              caption="Graph + Relational Experiences Side-by-Side"
              onImageClick={onImageClick}
              variant="plain"
              className="w-full border border-border"
              imageClassName="w-full h-auto object-contain"
            />
            <Typography variant="bodySmall" component="p" className="mt-3 text-foreground/75">
              The same experience framework could support different database technologies without forcing every product into an identical interface.
            </Typography>
          </div>
        )}

        <Typography variant="h3" component="h3" className="mb-4">Platform transformation</Typography>
        <div className="rounded-xl border border-border bg-secondary/20 p-6 mb-8">
          <div className="space-y-2">
            <Typography variant="h4" component="p">10+ Independent Control Planes</Typography>
            <Typography variant="bodySmall" component="p" className="text-muted-foreground">↓</Typography>
            <Typography variant="h4" component="p">Shared UX Framework</Typography>
            <Typography variant="bodySmall" component="p" className="text-muted-foreground">↓</Typography>
            <Typography variant="h4" component="p">Graph Shared Control Plane — Launched</Typography>
            <Typography variant="bodySmall" component="p" className="text-muted-foreground">↓</Typography>
            <Typography variant="h4" component="p">Relational + Non-relational Shared Control Planes</Typography>
            <Typography variant="bodySmall" component="p" className="text-muted-foreground">Reusable patterns / future-state designs</Typography>
            <Typography variant="bodySmall" component="p" className="text-muted-foreground">↓</Typography>
            <Typography variant="h4" component="p">Integrated Engineers Portal</Typography>
            <Typography variant="bodySmall" component="p" className="text-muted-foreground">Long-term platform vision</Typography>
          </div>
        </div>

        {transformationArtifact && (
          <div className="mb-8">
            <Typography variant="eyebrow" component="p" className="text-muted-foreground mb-2">Artifact</Typography>
            <Typography variant="h4" component="h4" className="mb-3">Final Platform Transformation</Typography>
            <DSImageDialog
              src={transformationArtifact}
              caption="Final Platform Transformation"
              onImageClick={onImageClick}
              variant="plain"
              className="w-full border border-border"
              imageClassName="w-full h-auto object-contain"
            />
          </div>
        )}

        <div className="rounded-xl border border-border bg-secondary/20 p-6">
          <Typography variant="blockQuote" component="p" className="text-foreground">
            I helped move the organization from independently designed database experiences toward a shared platform model—launching the Graph Shared Control Plane while establishing reusable UX patterns for the control planes that would follow.
          </Typography>
        </div>
      </motion.section>

      {engineerArtifact && (
        <motion.section className="bg-background py-4" {...revealProps}>
          <DSImageDialog
            src={engineerArtifact.src}
            caption="Supplemental Persona Artifact"
            onImageClick={onImageClick}
            variant="plain"
            className="w-full border border-border"
            imageClassName="w-full h-auto object-contain"
          />
        </motion.section>
      )}
    </>
  );
}

function ScpInsightBanner({ text, accent }: { text: string; accent: string }) {
  return (
    <motion.section
      className="bg-background py-10 sm:py-14"
      {...revealProps}
    >
      <div className="rounded-2xl border border-border bg-gradient-to-br from-secondary/70 to-background px-6 sm:px-10 py-8 sm:py-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accent}22` }}>
            <Lightbulb size={18} style={{ color: accent }} />
          </div>
          <span className="text-xs tracking-widest uppercase text-muted-foreground">Key Insight</span>
        </div>
        <Typography variant="blockQuote" component="p" className="leading-relaxed">
          {text}
        </Typography>
      </div>
    </motion.section>
  );
}

function ScpStrategyFlow({ accent }: { accent: string }) {
  return (
    <motion.section className="bg-background py-12 sm:py-16" {...revealProps}>
      <div className="mb-8">
        <Typography
          variant="h3"
          component="h3"
          className={`${CASE_STUDY_HEADING_CLASSES.h3} mb-2`}
        >
          Representative Workflow
        </Typography>
      </div>

      <div className="w-full">
        <div className="space-y-2 sm:space-y-3">
          {SCP_STRATEGY_FLOW.map((step, i) => (
            <div key={step} className="contents">
              <div
                className="rounded-xl border border-border bg-secondary/40 px-3 sm:px-5 py-4 sm:py-5 text-center flex flex-col items-center justify-center"
              >
                <span className="text-[10px] sm:text-xs tracking-widest uppercase mb-2" style={{ color: accent }}>
                  Step {i + 1}
                </span>
                <span className="text-xs sm:text-sm font-medium leading-relaxed break-words">{step}</span>
              </div>
              {i < SCP_STRATEGY_FLOW.length - 1 && (
                <div className="flex items-center justify-center py-1">
                  <ArrowDownFlowIcon color={accent} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ArrowDownFlowIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M12 19l-5-5M12 19l5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightFlowIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M19 12l-5-5M19 12l-5 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ScpIconCardRow({
  title,
  items,
}: {
  title: string;
  items: { title: string; body: string; icon: LucideIcon }[];
}) {
  return (
    <motion.section className="bg-background py-12 sm:py-16" {...revealProps}>
      <Typography
        variant="h3"
        component="h3"
        className={`${CASE_STUDY_HEADING_CLASSES.h3} mb-8`}
      >
        {title}
      </Typography>
      <div className="grid grid-cols-4 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="col-span-4 md:col-span-2 xl:col-span-2 rounded-xl border border-border bg-secondary/40 p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/20">
              <div className="mb-3 inline-flex w-9 h-9 items-center justify-center rounded-full bg-background border border-border">
                <Icon size={16} />
              </div>
              <Typography variant="h4" component="h4" className={`${CASE_STUDY_HEADING_CLASSES.h4} mb-2`}>{item.title}</Typography>
              <Typography variant="bodySmall" component="p" className="text-foreground/80">{item.body}</Typography>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

function ScpStrategicPriorities({ accent }: { accent: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.section className="bg-background py-12 sm:py-16" {...revealProps}>
      <Typography
        variant="h3"
        component="h3"
        className={`${CASE_STUDY_HEADING_CLASSES.h3} mb-8`}
      >
        Product Decisions
      </Typography>
      <Typography variant="body1" component="p" className="text-foreground/80 mb-6">
        Research continuously informed product decisions throughout the project.
      </Typography>

      <div className="space-y-3">
        {SCP_STRATEGIC_PRIORITIES.map((priority, i) => {
          const Icon = priority.icon;
          const isActive = i === activeIndex;
          return (
            <div
              key={priority.title}
              className={`rounded-xl border overflow-hidden transition-all ${
                isActive ? "border-foreground/30 bg-secondary" : "border-border bg-background"
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(isActive ? -1 : i)}
                className="w-full text-left p-4 sm:p-5"
                aria-expanded={isActive}
              >
                <div className="text-xs text-muted-foreground mb-2">Priority {i + 1}</div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon size={16} style={isActive ? { color: accent } : undefined} />
                    <span className="text-sm sm:text-base font-semibold truncate">{priority.title}</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 transition-transform ${isActive ? "rotate-180" : "rotate-0"}`}
                  />
                </div>
              </button>

              {isActive && (
                <div className="border-t border-border/60 bg-background/50 px-4 sm:px-5 py-4 sm:py-5">
                  <div className="grid grid-cols-4 md:grid-cols-4 gap-5">
                    <div className="col-span-4 md:col-span-2">
                      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Why this mattered</div>
                      <Typography variant="bodySmall" component="p" className="text-foreground/80">{priority.painPoint}</Typography>
                    </div>
                    <div className="col-span-4 md:col-span-2">
                      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Product decision</div>
                      <Typography variant="bodySmall" component="p" className="text-foreground/80">{priority.response}</Typography>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

function ScpChipSection({ title, chips, icon: Icon }: { title: string; chips: string[]; icon: LucideIcon }) {
  return (
    <motion.section className="bg-background py-12 sm:py-16" {...revealProps}>
      <div className="flex items-center gap-2 mb-6">
        <Icon size={16} />
        <Typography
          variant="h3"
          component="h3"
          className={CASE_STUDY_HEADING_CLASSES.h3}
        >
          {title}
        </Typography>
      </div>
      <div className="flex flex-wrap gap-3">
        {chips.map((chip) => (
          <span key={chip} className="px-4 py-2 rounded-full border border-border bg-secondary/40 text-sm">
            {chip}
          </span>
        ))}
      </div>
    </motion.section>
  );
}

function ScpContributions({ accent }: { accent: string }) {
  return (
    <motion.section className="bg-background py-12 sm:py-16" {...revealProps}>
      <div className="rounded-2xl border border-border bg-gradient-to-br from-secondary/70 to-background p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6">
          <WandSparkles size={16} style={{ color: accent }} />
          <Typography
            variant="h3"
            component="h3"
            className={CASE_STUDY_HEADING_CLASSES.h3}
          >
            My Contributions
          </Typography>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-4 gap-3">
          {SCP_CONTRIBUTIONS.map((item) => (
            <div key={item} className="col-span-4 md:col-span-2 rounded-lg border border-border bg-background/70 p-4 text-sm leading-relaxed text-foreground/85">
              {item}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ScpOutcomes({
  accent,
  summary,
  metrics,
}: {
  accent: string;
  summary: string;
  metrics: { value: string; label: string }[];
}) {
  const sections = [
    { title: "Customer Outcomes", items: SCP_CUSTOMER_OUTCOMES, icon: Radar },
    { title: "Organizational Outcomes", items: SCP_ORG_OUTCOMES, icon: Rocket },
    { title: "Design Outcomes", items: SCP_DESIGN_OUTCOMES, icon: LayoutGrid },
  ];

  return (
    <motion.section id="phase-outcome" className="bg-background py-12 sm:py-20" {...revealProps}>
      <ScpSectionTitle title="Strategic Outcomes" />

      <Typography variant="body1" component="p" className="text-foreground/90 mb-10">{summary}</Typography>

      <div className="grid grid-cols-4 lg:grid-cols-4 gap-px bg-background mb-10">
        {metrics.map((m) => (
          <motion.div key={m.label} className="col-span-2 lg:col-span-1 bg-background p-5 sm:p-8" {...revealProps}>
            <Typography variant="kpiValue" component="div" className="mb-2" style={{ color: accent }}>
              {m.value}
            </Typography>
            <div className="text-xs sm:text-sm text-muted-foreground leading-snug">{m.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-4 xl:grid-cols-6 gap-4 mb-4">
        {sections.map(({ title, items, icon: Icon }) => (
          <div key={title} className="col-span-4 xl:col-span-2 rounded-xl border border-border bg-secondary/40 p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/20">
            <div className="flex items-center gap-2 mb-4">
              <div className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-background border border-border">
                <Icon size={16} />
              </div>
              <Typography variant="h4" component="h4" className={CASE_STUDY_HEADING_CLASSES.h4}>{title}</Typography>
            </div>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item} className="text-sm leading-relaxed text-foreground/80">• {item}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </motion.section>
  );
}

function Lightbox({
  src,
  caption,
  onClose,
}: {
  src: string;
  caption: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/95 backdrop-blur-md p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        aria-label="Close image"
      >
        <span className="hidden sm:inline tracking-wide">Close</span>
        <X size={18} />
      </button>

      {/* Image */}
      <div
        className="relative max-w-5xl w-full max-h-[80vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={caption}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="max-w-full max-h-[75vh] object-contain"
          style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.4)" }}
        />
      </div>

    </div>
  );
}

function ArtifactImage({
  artifact,
  aspectClass,
  onImageClick,
  imageClassName,
  disableHoverScale,
}: {
  artifact: { src: string; caption: string };
  aspectClass: string;
  onImageClick: (src: string, caption: string) => void;
  imageClassName?: string;
  disableHoverScale?: boolean;
}) {
  return (
    <DSImageDialog
      src={artifact.src}
      caption={artifact.caption}
      onImageClick={onImageClick}
      variant="artifact"
      aspectClass={aspectClass}
      imageClassName={imageClassName}
      disableHoverScale={disableHoverScale}
    />
  );
}

function PhaseSection({
  phase,
  index,
  color,
  isLast,
  compactHeadingSpacing = false,
  stackOnDesktop = false,
  onImageClick,
}: {
  phase: Phase;
  index: number;
  color: string;
  isLast: boolean;
  compactHeadingSpacing?: boolean;
  stackOnDesktop?: boolean;
  onImageClick: (src: string, caption: string) => void;
}) {
  const hasThreeArtifacts = phase.artifacts.length === 3;
  const hasOneArtifact = phase.artifacts.length === 1;

  return (
    <motion.section className="bg-background border-t border-border py-12 sm:py-20" {...revealProps}>
      {/* Phase header */}
      <div className={`flex items-baseline gap-4 sm:gap-6 ${compactHeadingSpacing ? "mb-5" : "mb-8 sm:mb-14"}`}>
        <Typography
          variant="h2"
          component="h2"
          className={CASE_STUDY_HEADING_CLASSES.h2}
        >
          {phase.title}
        </Typography>
        <div className="flex-1 h-px bg-border ml-2 sm:ml-4 hidden sm:block" />
      </div>

      {/* Body + artifacts */}
      {stackOnDesktop ? (
        <div>
          <div className="max-w-5xl">
            {phase.body.split("\n\n").map((para, i) => (
              <Typography key={i} variant="body1" component="p" className={`text-foreground/80 ${i > 0 ? "mt-4" : ""}`}>
                {para}
              </Typography>
            ))}
          </div>

          <div className="mt-8 sm:mt-10">
            {hasThreeArtifacts ? (
              <div className="space-y-3">
                <ArtifactImage
                  artifact={phase.artifacts[0]}
                  aspectClass="aspect-[16/9]"
                  onImageClick={onImageClick}
                />
                <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
                  {phase.artifacts.slice(1).map((artifact, i) => (
                    <div key={i} className="col-span-4 sm:col-span-2">
                      <ArtifactImage
                        artifact={artifact}
                        aspectClass="aspect-[4/3]"
                        onImageClick={onImageClick}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : hasOneArtifact ? (
              <ArtifactImage
                artifact={phase.artifacts[0]}
                aspectClass="aspect-[16/9]"
                onImageClick={onImageClick}
              />
            ) : (
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
                {phase.artifacts.map((artifact, i) => (
                  <div key={i} className="col-span-4 sm:col-span-2">
                    <ArtifactImage
                      artifact={artifact}
                      aspectClass="aspect-[4/3]"
                      onImageClick={onImageClick}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 lg:grid-cols-12 gap-8 sm:gap-12">
          <div className="col-span-4 lg:col-span-4 lg:sticky lg:top-28">
            {phase.body.split("\n\n").map((para, i) => (
              <Typography key={i} variant="body1" component="p" className={`text-foreground/80 ${i > 0 ? "mt-4" : ""}`}>
                {para}
              </Typography>
            ))}
          </div>

          <div className="col-span-4 lg:col-span-8">
            {hasThreeArtifacts ? (
              <div className="space-y-3">
                <ArtifactImage
                  artifact={phase.artifacts[0]}
                  aspectClass="aspect-[16/9]"
                  onImageClick={onImageClick}
                />
                <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
                  {phase.artifacts.slice(1).map((artifact, i) => (
                    <div key={i} className="col-span-4 sm:col-span-2">
                      <ArtifactImage
                        artifact={artifact}
                        aspectClass="aspect-[4/3]"
                        onImageClick={onImageClick}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : hasOneArtifact ? (
              <ArtifactImage
                artifact={phase.artifacts[0]}
                aspectClass="aspect-[16/9]"
                onImageClick={onImageClick}
              />
            ) : (
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
                {phase.artifacts.map((artifact, i) => (
                  <div key={i} className="col-span-4 sm:col-span-2">
                    <ArtifactImage
                      artifact={artifact}
                      aspectClass="aspect-[4/3]"
                      onImageClick={onImageClick}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </motion.section>
  );
}

function KeybankDefineCoreProblems({
  phase,
  color,
}: {
  phase: Phase;
  color: string;
}) {
  const problemAreas: Array<{ title: string; detail: string; icon: LucideIcon }> = [
    {
      title: "Reduce Processing Cost",
      detail: "Eliminate unnecessary reviews and manual interventions across dispute operations.",
      icon: Wrench,
    },
    {
      title: "Lower Contact-Center Volume",
      detail: "Improve guidance and self-service to reduce avoidable support dependency.",
      icon: MessageSquareWarning,
    },
    {
      title: "Improve Dispute Quality",
      detail: "Increase resolution accuracy through clearer requirements and stronger submissions.",
      icon: CheckCircle2,
    },
    {
      title: "Align Experience + Compliance",
      detail: "Create a consistent customer journey aligned with operational and regulatory requirements.",
      icon: ShieldCheck,
    },
  ];

  return (
    <motion.section className="bg-background border-t border-border py-12 sm:py-20" {...revealProps}>
      <div className="flex items-baseline gap-4 sm:gap-6 mb-8 sm:mb-14">
        <Typography variant="h2" component="h2" className={CASE_STUDY_HEADING_CLASSES.h2}>
          {phase.title}
        </Typography>
        <div className="flex-1 h-px bg-border ml-2 sm:ml-4 hidden sm:block" />
      </div>

      <div className="grid grid-cols-4 lg:grid-cols-12 gap-8 sm:gap-12">
        <div className="col-span-4 lg:col-span-4 lg:sticky lg:top-28">
          {phase.body.split("\n\n").map((para, i) => (
            <Typography key={i} variant="body1" component="p" className={`text-foreground/80 ${i > 0 ? "mt-4" : ""}`}>
              {para}
            </Typography>
          ))}
        </div>

        <div className="col-span-4 lg:col-span-8">
          <div className="rounded-xl border border-border bg-secondary/25 p-5 sm:p-6 mb-4">
            <Typography variant="eyebrow" component="p" className="text-muted-foreground mb-2">Core Problem Areas</Typography>
            <Typography variant="body1" component="p" className="text-foreground/85">
              Strategic focus centered on cost efficiency, self-service guidance, dispute quality, and compliance-aligned consistency.
            </Typography>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
            {problemAreas.map(({ title, detail, icon: Icon }) => (
              <motion.div
                key={title}
                className="col-span-4 sm:col-span-2 rounded-xl border border-border bg-background p-5 sm:p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/20"
                {...revealProps}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="inline-flex w-9 h-9 items-center justify-center rounded-full border border-border shrink-0"
                    style={{ backgroundColor: `${color}1A` }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>
                  <Typography variant="h4" component="h4" className="text-foreground">
                    {title}
                  </Typography>
                </div>
                <Typography variant="bodySmall" component="p" className="text-foreground/80">{detail}</Typography>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function KeybankDesignTextOnly({
  phase,
  onImageClick,
}: {
  phase: Phase;
  onImageClick: (src: string, caption: string) => void;
}) {
  const isDeliverPhase = phase.title === "Deliver";

  return (
    <motion.section className="bg-background border-t border-border py-12 sm:py-20" {...revealProps}>
      <div className="flex items-baseline gap-4 sm:gap-6 mb-8 sm:mb-14">
        <Typography variant="h2" component="h2" className={CASE_STUDY_HEADING_CLASSES.h2}>
          {phase.title}
        </Typography>
        <div className="flex-1 h-px bg-border ml-2 sm:ml-4 hidden sm:block" />
      </div>

      <div className="w-full max-w-5xl">
        {phase.body.split("\n\n").map((para, i) => (
          <Typography key={i} variant="body1" component="p" className={`text-foreground/85 ${i > 0 ? "mt-4" : ""}`}>
            {para}
          </Typography>
        ))}

        {phase.artifacts.length > 0 && (
          <div className="mt-8 sm:mt-10 space-y-3">
            {isDeliverPhase ? (
              <DSStaticImageView
                src={phase.artifacts[0].src}
                caption={phase.artifacts[0].caption}
                onImageClick={onImageClick}
              />
            ) : (
              <ArtifactImage
                key={`${phase.artifacts[0].caption}-lead`}
                artifact={phase.artifacts[0]}
                aspectClass="aspect-[16/9]"
                onImageClick={onImageClick}
                imageClassName="object-contain"
                disableHoverScale
              />
            )}

            {phase.artifacts.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                {phase.artifacts.slice(1).map((artifact, index) =>
                  <div key={`${artifact.caption}-${index}`} className="col-span-4 sm:col-span-2 lg:col-span-2">
                    {isDeliverPhase ? (
                      <DSStaticImageView
                        src={artifact.src}
                        caption={artifact.caption}
                        onImageClick={onImageClick}
                      />
                    ) : (
                      <ArtifactImage
                        artifact={artifact}
                        aspectClass="aspect-square"
                        onImageClick={onImageClick}
                        imageClassName="object-contain"
                        disableHoverScale
                      />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
}

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "1"
  );
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);
  const visibleCaseStudies = caseStudies.filter((item) => visibleCaseStudySlugs.includes(item.slug));
  const study = visibleCaseStudies.find((s) => s.slug === slug);

  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    scrollToTopInstant();
    requestAnimationFrame(() => scrollToTopInstant());
    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, [slug]);

  if (!study) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <Typography variant="body1" component="p" className="text-muted-foreground mb-4">Case study not found.</Typography>
          <Link to="/#work" className="text-primary underline text-sm">
            Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  const currentIndex = visibleCaseStudies.findIndex((s) => s.slug === slug);
  const prev = visibleCaseStudies[currentIndex - 1] ?? null;
  const next = visibleCaseStudies[currentIndex + 1] ?? null;

  const phases = [study.discover, study.define, study.design, study.deliver];
  const isSharedControlPlanes = study.slug === "shared-control-planes";
  const isModernizingFamilyBanking = study.slug === "chase-first-banking";
  const usesScreenshotHeaderLayout = isModernizingFamilyBanking || isSharedControlPlanes;
  const usesExecutiveSummaryTitle =
    isSharedControlPlanes || study.slug === "chase-first-banking" || study.slug === "keybank-counterfeit-disputes";
  const showOverviewMetrics = study.slug !== "keybank-counterfeit-disputes";

  // Resolved accent: swap to lightColor in light mode when provided, guaranteeing ≥4.5:1
  const accent = !isDark && study.lightColor ? study.lightColor : study.color;

  return (
    <div
      key={slug}
      className="min-h-screen bg-background text-foreground"
    >
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          caption={lightbox.caption}
          onClose={() => setLightbox(null)}
        />
      )}
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16 sm:h-[68px] flex items-center justify-between px-5 sm:px-8 border-b border-border backdrop-blur-md bg-background/80"
        style={{
          fontFamily: 'Inter, -apple-system, system-ui, "Segoe UI", Roboto, sans-serif',
          fontFeatureSettings: "normal",
          fontVariationSettings: "normal",
        }}
      >
        <Link
          to="/#work"
          className="flex items-center gap-2 text-sm sm:text-[16px] sm:font-medium text-muted-foreground hover:text-foreground transition-colors group shrink-0"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">Back to portfolio</span>
          <span className="sm:hidden">Back</span>
        </Link>
        <Link
          to="/"
          aria-label="Go to home"
          className="absolute left-1/2 -translate-x-1/2 inline-flex items-center justify-center"
        >
          <img
            src={isDark ? tamareLightLogo : tamareDarkLogo}
            alt="Tamaré Reese"
            className="h-7 sm:h-8 w-auto"
          />
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle isDark={isDark} toggle={toggle} />
        </div>
      </nav>

      {/* Header */}
      <div className="relative overflow-hidden mt-16 sm:mt-[68px]">
        <div
          className={`px-5 sm:px-8 relative z-10 mx-auto max-w-6xl ${
            usesScreenshotHeaderLayout ? "pb-12 sm:pb-16" : "pb-8 sm:pb-10"
          }`}
          style={{ paddingTop: "100px" }}
        >
          <div className="max-w-3xl">
            <Typography
              variant="display"
              component="h1"
              className={`${CASE_STUDY_HEADING_CLASSES.h1} ${
                usesScreenshotHeaderLayout ? "" : "mb-2 sm:mb-3"
              }`}
              sx={usesScreenshotHeaderLayout ? { marginBottom: { xs: "20px", sm: "24px" } } : undefined}
            >
              {study.title}
            </Typography>
            <Typography
              variant="bodyLarge"
              component="p"
              className={`text-muted-foreground ${
                usesScreenshotHeaderLayout ? "" : "mb-3 sm:mb-4"
              }`}
              sx={usesScreenshotHeaderLayout ? { marginBottom: { xs: "28px", sm: "32px" } } : undefined}
            >
              {study.subtitle}
            </Typography>
            <div className="border-t border-border mb-5 sm:mb-6" />
            <div className="grid grid-cols-4 gap-5 sm:gap-8">
              {[
                { label: "Client", value: study.client },
                { label: "Role", value: study.role },
                { label: "Duration", value: study.duration },
                { label: "Year", value: study.year },
                ...(study.team ? [{ label: "Team", value: study.team }] : []),
              ].map((item) => (
                <div key={item.label} className="col-span-2 sm:col-span-1">
                  <div className="text-xs text-muted-foreground tracking-widest uppercase mb-1">{item.label}</div>
                  <div className="text-sm font-medium text-foreground">{item.value}</div>
                </div>
              ))}
            </div>
            {isSharedControlPlanes && (
              <div className="mt-6">
                <div className="text-xs text-muted-foreground tracking-widest uppercase mb-3">Responsibilities</div>
                <div className="flex flex-wrap gap-2.5">
                  {SCP_RESPONSIBILITIES.map((item) => (
                    <span
                      key={`hero-${item}`}
                      className="px-3 py-1.5 rounded-full border border-border bg-secondary/25 text-sm sm:text-[15px] text-foreground/90"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="px-5 sm:px-8 max-w-6xl mx-auto">
        {!isSharedControlPlanes && (
          <motion.section className="bg-background border-t border-border pt-8 sm:pt-10 pb-12 sm:pb-14 grid grid-cols-4 lg:grid-cols-12 gap-6 sm:gap-12" {...revealProps}>
            <div className="col-span-4 lg:col-span-3">
              <span className="text-xs text-muted-foreground tracking-widest uppercase">
                {usesExecutiveSummaryTitle ? "Executive Summary" : "Overview"}
              </span>
            </div>
            <div className="col-span-4 lg:col-span-7">
              {study.overview.split("\n\n").map((paragraph, i) => (
                <Typography key={i} variant="body1" component="p" className={`text-foreground/90 ${i > 0 ? "mt-4" : ""}`}>
                  {paragraph}
                </Typography>
              ))}
            </div>
          </motion.section>
        )}

        {isSharedControlPlanes ? (
          <ScpModernLayout
            study={study}
            accent={accent}
            onImageClick={(src, caption) => setLightbox({ src, caption })}
          />
        ) : (
          <>
            {showOverviewMetrics && (
              <motion.section className="bg-background border-t border-border py-12 sm:py-16" {...revealProps}>
                <div className="grid grid-cols-4 lg:grid-cols-4 gap-px bg-background">
                  {study.metrics.map((m) => (
                    <motion.div key={m.label} className="col-span-2 lg:col-span-1 bg-background p-5 sm:p-8" {...revealProps}>
                      <Typography
                        variant="kpiValue"
                        component="div"
                        className="mb-2"
                        style={{ color: accent }}
                      >
                        {m.value}
                      </Typography>
                      <div className="text-xs sm:text-sm text-muted-foreground leading-snug">{m.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {phases.map((phase, i) => (
              <div key={phase.title} id={`phase-${phase.title.toLowerCase()}`}>
                {study.slug === "keybank-counterfeit-disputes" && phase.title === "Define" ? (
                  <KeybankDefineCoreProblems
                    phase={phase}
                    color={accent}
                  />
                ) : study.slug === "keybank-counterfeit-disputes" && phase.title === "Design" ? (
                  <KeybankDesignTextOnly
                    phase={phase}
                    onImageClick={(src, caption) => setLightbox({ src, caption })}
                  />
                ) : study.slug === "keybank-counterfeit-disputes" && phase.title === "Deliver" ? (
                  <KeybankDesignTextOnly
                    phase={phase}
                    onImageClick={(src, caption) => setLightbox({ src, caption })}
                  />
                ) : (
                  <PhaseSection
                    phase={phase}
                    index={i}
                    color={accent}
                    isLast={i === phases.length - 1}
                    compactHeadingSpacing={isModernizingFamilyBanking}
                    onImageClick={(src, caption) => setLightbox({ src, caption })}
                  />
                )}
              </div>
            ))}

        <motion.section id="phase-outcome" className="bg-background border-t border-border py-12 sm:py-20" {...revealProps}>
          <div className={`flex items-baseline gap-4 sm:gap-6 ${isModernizingFamilyBanking ? "mb-5" : "mb-8 sm:mb-14"}`}>
            <Typography
              variant="h2"
              component="h2"
              className={CASE_STUDY_HEADING_CLASSES.h2}
            >
              Outcome
            </Typography>
            <div className="flex-1 h-px bg-border ml-2 sm:ml-4 hidden sm:block" />
          </div>

          <div className="grid grid-cols-4 lg:grid-cols-6 gap-px bg-background">
            {[
              { label: "Summary", body: study.outcome.summary },
              { label: "Business Impact", body: study.outcome.impact },
              { label: "Reflection", body: study.outcome.reflection },
            ].map(({ label, body }) => (
              <div key={label} className="col-span-4 lg:col-span-2 bg-background p-6 sm:p-8 flex flex-col gap-4">
                <span className="text-xs text-muted-foreground tracking-widest uppercase">{label}</span>
                <Typography variant="bodySmall" component="p" className="text-foreground/80">{body}</Typography>
              </div>
            ))}
          </div>

          {/* Metrics reprise */}
          <div className="grid grid-cols-4 lg:grid-cols-4 gap-px bg-background mt-px">
            {study.metrics.map((m) => (
              <motion.div
                key={m.label}
                className="col-span-2 lg:col-span-1 bg-background px-5 sm:px-8 py-5 sm:py-6 flex items-baseline gap-3 sm:gap-4"
                {...revealProps}
              >
                <span
                  className="shrink-0"
                  style={{ color: accent }}
                >
                  <Typography variant="kpiInlineValue" component="span" style={{ color: accent }}>
                    {m.value}
                  </Typography>
                </span>
                <span className="text-xs text-muted-foreground leading-snug">{m.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>
          </>
        )}

      </div>

      {/* Prev / Next */}
      <div className="border-t border-border mt-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-px bg-border">
          {prev ? (
            <button
              onClick={() => {
                scrollToTopInstant();
                navigate(`/work/${prev.slug}`);
              }}
              className="bg-background px-5 sm:px-8 py-8 sm:py-10 text-left group hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
                Previous
              </div>
              <Typography
                variant="h4"
                component="h4"
                className="text-base sm:text-lg font-bold group-hover:text-primary transition-colors"
              >
                {prev.title}
              </Typography>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                {prev.subtitle}
              </div>
            </button>
          ) : (
            <div className="bg-background" />
          )}

          {next ? (
            <button
              onClick={() => {
                scrollToTopInstant();
                navigate(`/work/${next.slug}`);
              }}
              className="bg-background px-5 sm:px-8 py-8 sm:py-10 text-right group hover:bg-secondary transition-colors"
            >
              <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground mb-3">
                Next
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
              <Typography
                variant="h4"
                component="h4"
                className="text-base sm:text-lg font-bold group-hover:text-primary transition-colors"
              >
                {next.title}
              </Typography>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                {next.subtitle}
              </div>
            </button>
          ) : (
            <div className="bg-background" />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[rgb(19,21,42)] text-white px-5 sm:px-8 lg:px-10 py-14 sm:py-24 flex flex-col items-center text-center">
        <Typography variant="display" component="h2" className="max-w-[520px] pb-1 text-white text-center">
          Let's Connect!
        </Typography>
        <a
          href="mailto:tamaredesign@outlook.com"
          className="mt-8 sm:mt-10 inline-flex bg-white text-black rounded-full px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Tamaredesign@outlook.com
        </a>
        <a
          href="https://www.linkedin.com/in/tamarereese/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="mt-4 inline-flex w-10 h-10 items-center justify-center rounded-full border border-white/70 text-white hover:bg-white hover:text-black transition-colors"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
            <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.85-3.037-1.853 0-2.136 1.445-2.136 2.94v5.666H9.347V9h3.414v1.561h.049c.476-.9 1.636-1.85 3.367-1.85 3.6 0 4.265 2.37 4.265 5.455v6.286zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM7.119 20.452H3.555V9h3.564v11.452z" />
          </svg>
        </a>
        <span className="mt-4 text-xs text-white/70">© Tamaré Reese</span>
      </footer>
    </div>
  );
}
