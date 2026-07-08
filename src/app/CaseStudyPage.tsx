import { useParams, Link, useNavigate } from "react-router";
import { useState, useEffect, useLayoutEffect } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Lock,
  X,
  ZoomIn,
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

const SESSION_KEY = "cs_unlocked";
const revealProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" },
};

const CASE_STUDY_HEADING_FONT = { fontFamily: "'Bricolage Grotesque', sans-serif" } as const;
const CASE_STUDY_HEADING_CLASSES = {
  h1: "font-extrabold leading-tight tracking-tight",
  h2: "text-2xl sm:text-3xl font-extrabold tracking-tight",
  h3: "text-xl sm:text-2xl font-extrabold",
  h4: "text-base sm:text-lg font-bold tracking-tight",
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
    if (value === "tamare2026") {
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
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-5 sm:px-8 py-8"
      style={{ fontFamily: "'Instrument Sans', sans-serif" }}
    >
      <div
        className={`w-full max-w-sm ${shaking ? "animate-shake" : ""}`}
        style={shaking ? { animation: "shake 0.4s ease" } : {}}
      >
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground">
            <Lock size={18} />
          </div>
        </div>

        <h1
          className="text-2xl font-extrabold text-center mb-2"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Password protected
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-8">
          This case study is available on request.
        </p>

        <div className={`border ${error ? "border-red-500" : "border-border"} transition-colors`}>
          <input
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            onKeyDown={(e) => e.key === "Enter" && attempt()}
            placeholder="Enter password"
            autoFocus
            className="w-full bg-transparent px-5 py-4 text-base text-foreground placeholder:text-muted-foreground/40 outline-none"
          />
        </div>

        {error && (
          <p className="text-xs text-red-500 mt-2 px-1">Incorrect password. Try again.</p>
        )}

        <button
          onClick={attempt}
          className="w-full mt-3 py-4 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Unlock
        </button>

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

const SCP_STRATEGY_FLOW = [
  "Learn",
  "Complete Prerequisites",
  "Provision Database",
  "Configure Service",
  "Monitor Health",
  "Manage Lifecycle",
];

const SCP_PAIN_POINTS: { label: string; icon: LucideIcon }[] = [
  { label: "Different navigation structures", icon: Compass },
  { label: "Different provisioning workflows", icon: Workflow },
  { label: "Different terminology", icon: CircleDashed },
  { label: "Different approval processes", icon: ShieldCheck },
  { label: "Different operational experiences", icon: Activity },
];

const SCP_STRATEGIC_PRIORITIES: {
  title: string;
  painPoint: string;
  response: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Standardize Provisioning",
    painPoint:
      "Every database product followed a different provisioning model.",
    response:
      "Every database product followed one consistent provisioning model.",
    icon: Sparkles,
  },
  {
    title: "Separate Governance from Provisioning",
    painPoint:
      "Customers confused onboarding requirements with provisioning tasks.",
    response:
      "Separating these workflows reduced cognitive load.",
    icon: UserRoundPlus,
  },
  {
    title: "Surface Operational Health",
    painPoint:
      "Provisioning isn't complete when infrastructure is created.",
    response:
      "Customers need confidence that services remain healthy.",
    icon: Bot,
  },
  {
    title: "Embed Documentation",
    painPoint:
      "Documentation was outside the workflow.",
    response:
      "Documentation became part of the workflow rather than a separate destination.",
    icon: BarChart3,
  },
  {
    title: "Build for Scale",
    painPoint:
      "Patterns needed to scale beyond a single use case.",
    response:
      "Evaluate every interaction pattern for reuse across additional database products and workflows.",
    icon: MessageSquareWarning,
  },
];

const SCP_CONTRIBUTIONS = [
  "Synthesized existing UX audit findings into a unified experience strategy",
  "Led stakeholder interviews and qualitative research",
  "Facilitated service blueprint, design consistency, and stakeholder alignment workshops",
  "Defined interface capabilities and functionality for high-priority user flows",
  "Led prototype usability testing and design validation",
  "Conducted post-launch customer research to prioritize enhancements and roadmap investments",
];

const SCP_RESEARCH_METHODS = [
  "Stakeholder Interviews",
  "UX Audit",
  "Customer Journey Mapping",
  "Service Blueprinting",
  "Workflow Analysis",
  "Persona Development",
  "Usability Testing",
];

const SCP_VALIDATION_ACTIVITIES = [
  "Discoverability",
  "Navigation",
  "Onboarding",
  "Provisioning",
  "Service Management",
  "Iterative Validation",
];

const SCP_CUSTOMER_OUTCOMES = [
  "Unified experience strategy across multiple database products",
  "Standardized onboarding and provisioning workflows",
  "Shared navigation and interaction patterns",
  "Improved usability through iterative validation",
];

const SCP_ORG_OUTCOMES = [
  "Reusable design patterns for future database products",
  "Foundation for Integrated Engineers Portal",
  "Reduced onboarding time and provisioning friction",
  "Scalable platform model for future capabilities",
];

const SCP_DESIGN_OUTCOMES = [
  "Design once, scale everywhere",
  "Progressive disclosure",
  "Context-first guidance",
  "Operational transparency",
  "Consistency across products",
];

const SHOW_SCP_CONTRIBUTIONS = false;

const SCP_RESPONSIBILITIES = [
  "Experience Strategy",
  "Product Design",
  "UX Research & Synthesis",
  "Service Design",
  "Information Architecture",
  "Interaction Design",
  "Design Systems",
  "Usability Testing",
  "Cross-functional Leadership",
  "Executive Storytelling",
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
      <h2
        className={CASE_STUDY_HEADING_CLASSES.h2}
        style={CASE_STUDY_HEADING_FONT}
      >
        {title}
      </h2>
      <div className="flex-1 h-px bg-border ml-2 sm:ml-4 hidden sm:block" />
    </div>
  );
}

function ScpArtifactPlaceholders({
  title,
  artifacts,
  intro,
  outro,
  showArtifactsLabel = true,
  onImageClick,
}: {
  title: string;
  artifacts: { src: string; caption: string }[];
  intro?: string[];
  outro?: string[];
  showArtifactsLabel?: boolean;
  onImageClick: (src: string, caption: string) => void;
}) {
  return (
    <section className="bg-background border-t border-border py-12 sm:py-14">
      {showArtifactsLabel && (
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs tracking-widest uppercase text-muted-foreground">Artifacts</span>
        </div>
      )}
      <ScpSectionTitle title={title} />
      {intro && intro.length > 0 && (
        <div className="max-w-4xl mb-6">
          {intro.map((paragraph) => (
            <p key={paragraph} className="text-base text-foreground/90 leading-relaxed mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {artifacts.map((artifact) => (
          <button
            key={artifact.caption}
            type="button"
            onClick={() => onImageClick(artifact.src, artifact.caption)}
            aria-label={`Open image: ${artifact.caption}`}
            className="rounded-2xl border border-border bg-secondary/20 overflow-hidden text-left transition-all hover:-translate-y-0.5 hover:border-foreground/20"
          >
            <div className="aspect-[16/9] bg-background/50">
              <img
                src={artifact.src}
                alt={artifact.caption}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-foreground/85 leading-relaxed">{artifact.caption}</p>
            </div>
          </button>
        ))}
      </div>
      {outro && outro.length > 0 && (
        <div className="max-w-4xl mt-6">
          {outro.map((paragraph) => (
            <p key={paragraph} className="text-base text-foreground/90 leading-relaxed mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </section>
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
  const researchArtifacts = study.define.artifacts.filter(
    (artifact) => artifact !== appOwnerArtifact && artifact !== engineerArtifact
  );

  return (
    <>
      <section className="bg-background border-t border-border py-12 sm:py-14">
        <ScpSectionTitle title="My Role" />
        <div className="max-w-4xl">
          <p className="text-base text-foreground/90 leading-relaxed mb-6">
            As the Lead Product Designer, I partnered with product managers, engineers, architects, and UX researchers to define the experience strategy for a unified database management platform. My work spanned the full product design lifecycle—from synthesizing research and mapping complex service ecosystems to establishing information architecture, interaction patterns, and scalable design principles. While the platform encompassed numerous database products and workflows, I led the design of the onboarding and provisioning experience as a representative use case, creating reusable patterns that informed the broader platform strategy. Through iterative design, usability testing, and cross-functional collaboration, I helped align teams around a shared vision that balanced customer needs, technical feasibility, and long-term scalability.
          </p>

          <p className="text-base font-semibold text-foreground/90 leading-relaxed mb-3">Responsibilities</p>

          <div className="flex flex-wrap gap-2.5">
            {SCP_RESPONSIBILITIES.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-full border border-border bg-secondary/25 text-sm sm:text-[15px] text-foreground/90"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background border-t border-border py-12 sm:py-14">
        <ScpSectionTitle title="The Challenge" />
        <div className="max-w-4xl">
          <p className="text-base text-foreground/90 leading-relaxed mb-5">
            Although every database product supported similar customer goals, each control plane exposed those capabilities differently.
          </p>

          <p className="text-base text-foreground/90 leading-relaxed mb-3">Customers encountered:</p>

          <div className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
              {SCP_PAIN_POINTS.map((item) => {
                const Icon = item.icon;
                return (
                <div
                  key={item.label}
                  className="rounded-xl border border-border bg-secondary/25 px-4 py-5 text-center"
                >
                  <div className="flex justify-center mb-3">
                    <div className="inline-flex w-9 h-9 items-center justify-center rounded-full border border-border bg-background">
                      <Icon size={16} style={{ color: accent }} />
                    </div>
                  </div>
                  <p className="text-sm sm:text-[15px] leading-relaxed text-foreground/90">{item.label}</p>
                </div>
                );
              })}
            </div>
          </div>

          <p className="text-base text-foreground/90 leading-relaxed mb-4">
            The inconsistency increased onboarding time, slowed provisioning, and made the platform difficult to scale.
          </p>

          <p className="text-base text-foreground/90 leading-relaxed">
            Rather than redesigning a single interface, our challenge was to define a reusable experience strategy that every database product could adopt.
          </p>
        </div>
      </section>

      <ScpArtifactPlaceholders
        title="Understanding the Ecosystem"
        artifacts={study.discover.artifacts}
        showArtifactsLabel={false}
        onImageClick={onImageClick}
        intro={[
          "Before designing solutions, I needed to understand how customers, internal teams, enterprise systems, and infrastructure interacted throughout the service lifecycle.",
          "Working closely with stakeholders, I mapped the complete ecosystem—from initial learning and onboarding through provisioning, operations, and ongoing service management.",
          "This systems-level perspective revealed organizational, technical, and process challenges that individual interface designs alone could not solve.",
        ]}
        outro={[
          "The service blueprint documented multiple customer journeys across the platform.",
          "From this analysis, onboarding and provisioning emerged as the highest-impact workflow to redesign first because it represented the greatest concentration of customer friction while establishing reusable patterns for future experiences.",
        ]}
      />

      <section className="bg-background border-t border-border py-12 sm:py-14">
        <ScpSectionTitle title="Research" />
        <div className="max-w-4xl mb-8">
          <p className="text-base text-foreground/90 leading-relaxed">
            To understand the complexity of the database management experience, I conducted a comprehensive discovery effort that combined existing platform knowledge with new qualitative research. Working closely with product managers, engineers, architects, and UX researchers, I analyzed how customers navigated onboarding, provisioning, and service management across multiple database control planes. Through stakeholder interviews, journey mapping, service blueprinting, workflow analysis, persona development, and usability testing, I identified recurring patterns that extended beyond individual products. Rather than isolated usability issues, the research revealed systemic challenges—including fragmented workflows, inconsistent terminology, unclear ownership, and limited visibility into provisioning status. These insights became the foundation for a scalable experience strategy that could be applied consistently across the broader platform.
          </p>
        </div>

        <p className="text-base font-semibold text-foreground/90 leading-relaxed mb-3">Research Methods</p>
        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-2.5">
            {SCP_RESEARCH_METHODS.map((item) => (
              <span key={item} className="px-3 py-1.5 rounded-full border border-border bg-secondary/25 text-sm sm:text-[15px]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <ScpArtifactPlaceholders
        title="Research Artifacts"
        artifacts={researchArtifacts}
        onImageClick={onImageClick}
        showArtifactsLabel={false}
      />

      <section className="bg-background border-t border-border py-12 sm:py-14">
        <ScpSectionTitle title="Primary Personas" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {SCP_PERSONAS.map((persona) => {
            const personaArtifact =
              persona.name === "Application Owner" ? appOwnerArtifact : engineerArtifact;

            return (
            <div key={persona.name} className="rounded-2xl border border-border bg-secondary/25 p-6">
              <h4 className={`${CASE_STUDY_HEADING_CLASSES.h4} mb-2`} style={CASE_STUDY_HEADING_FONT}>
                {persona.name}
              </h4>
              <p className="text-sm text-foreground/80 mb-4">{persona.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Goals</div>
                  <div className="space-y-1.5 text-sm text-foreground/85">
                    {persona.goals.map((goal) => (
                      <div key={goal}>• {goal}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Pain Points</div>
                  <div className="space-y-1.5 text-sm text-foreground/85">
                    {persona.painPoints.map((pain) => (
                      <div key={pain}>• {pain}</div>
                    ))}
                  </div>
                </div>
              </div>

              {personaArtifact && (
                <button
                  type="button"
                  onClick={() => onImageClick(personaArtifact.src, personaArtifact.caption)}
                  aria-label={`Open image: ${personaArtifact.caption}`}
                  className="mt-5 w-full rounded-xl border border-border bg-background/60 overflow-hidden text-left transition-all hover:-translate-y-0.5 hover:border-foreground/20"
                >
                  <div className="aspect-[16/10] bg-background">
                    <img
                      src={personaArtifact.src}
                      alt={personaArtifact.caption}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="px-4 py-3 text-sm text-foreground/85">{personaArtifact.caption}</div>
                </button>
              )}
            </div>
            );
          })}
        </div>
      </section>

      <section className="bg-background border-t border-border py-12 sm:py-14">
        <ScpSectionTitle title="Defining the Experience Strategy" />
        <div className="max-w-4xl mb-8">
          <p className="text-base text-foreground/90 leading-relaxed">
            Rather than redesigning individual interfaces, I focused on defining a scalable experience strategy that could be applied consistently across every database product. Guided by research insights, I established a set of experience principles that standardized navigation, workflows, terminology, and interaction patterns—creating a flexible foundation that improved consistency while supporting future platform growth.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
          {SCP_DESIGN_PRINCIPLES.map((principle) => (
            <div key={principle.title} className="rounded-xl border border-border bg-secondary/25 p-5">
              <h4 className={`${CASE_STUDY_HEADING_CLASSES.h4} mb-2`} style={CASE_STUDY_HEADING_FONT}>{principle.title}</h4>
              <p className="text-sm text-foreground/80 leading-relaxed">{principle.body}</p>
            </div>
          ))}
        </div>

      </section>

      <ScpArtifactPlaceholders
        title="Strategy Artifacts"
        artifacts={study.design.artifacts}
        onImageClick={onImageClick}
        showArtifactsLabel={false}
      />

      <ScpArtifactPlaceholders
        title="Design Exploration & Validation"
        artifacts={study.deliver.artifacts}
        onImageClick={onImageClick}
        showArtifactsLabel={false}
        intro={[
          "With the platform strategy established, I translated research insights into a series of design concepts focused on the onboarding and provisioning experience. Through iterative sketching, wireframing, and high-fidelity prototyping, I explored ways to simplify complex workflows, standardize interactions, and improve visibility throughout the customer journey. I conducted usability testing with enterprise users to evaluate key workflows, identify usability issues, and validate design decisions before implementation. Insights from testing, combined with ongoing collaboration with product managers, engineers, and architects, informed multiple iterations, ensuring the final experience was intuitive, scalable, and aligned with both customer needs and technical constraints.",
        ]}
      />

      {study.deliverDirectImages && study.deliverDirectImages.length > 0 && (
        <section className="bg-background border-t border-border py-12 sm:py-14">
          <div className="grid grid-cols-2 gap-4">
            {study.deliverDirectImages.map((imageSrc, index) => (
              <img
                key={`${imageSrc}-${index}`}
                src={imageSrc}
                alt={`Database ${index + 1}`}
                className="w-full h-auto border border-[#D9D9D9]"
              />
            ))}
          </div>
        </section>
      )}

      {study.deliverFinalImage && (
        <section className="bg-background border-t border-border py-12 sm:py-14">
          <img
            src={study.deliverFinalImage}
            alt="Databases final image"
            className="w-full h-auto"
          />
        </section>
      )}

      <ScpOutcomes
        accent={accent}
        summary={study.outcome.summary}
        metrics={study.metrics}
      />
    </>
  );
}

function ScpInsightBanner({ text, accent }: { text: string; accent: string }) {
  return (
    <motion.section
      className="bg-background border-t border-border py-10 sm:py-14"
      {...revealProps}
    >
      <div className="rounded-2xl border border-border bg-gradient-to-br from-secondary/70 to-background px-6 sm:px-10 py-8 sm:py-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accent}22` }}>
            <Lightbulb size={18} style={{ color: accent }} />
          </div>
          <span className="text-xs tracking-widest uppercase text-muted-foreground">Key Insight</span>
        </div>
        <p
          className={`${CASE_STUDY_HEADING_CLASSES.h3} leading-relaxed`}
          style={CASE_STUDY_HEADING_FONT}
        >
          {text}
        </p>
      </div>
    </motion.section>
  );
}

function ScpStrategyFlow({ accent }: { accent: string }) {
  return (
    <motion.section className="bg-background border-t border-border py-12 sm:py-16" {...revealProps}>
      <div className="mb-8">
        <h3
          className={`${CASE_STUDY_HEADING_CLASSES.h3} mb-2`}
          style={CASE_STUDY_HEADING_FONT}
        >
          Representative Workflow
        </h3>
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
    <motion.section className="bg-background border-t border-border py-12 sm:py-16" {...revealProps}>
      <h3
        className={`${CASE_STUDY_HEADING_CLASSES.h3} mb-8`}
        style={CASE_STUDY_HEADING_FONT}
      >
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-xl border border-border bg-secondary/40 p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/20">
              <div className="mb-3 inline-flex w-9 h-9 items-center justify-center rounded-full bg-background border border-border">
                <Icon size={16} />
              </div>
              <h4 className={`${CASE_STUDY_HEADING_CLASSES.h4} mb-2`} style={CASE_STUDY_HEADING_FONT}>{item.title}</h4>
              <p className="text-sm text-foreground/80 leading-relaxed">{item.body}</p>
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
    <motion.section className="bg-background border-t border-border py-12 sm:py-16" {...revealProps}>
      <h3
        className={`${CASE_STUDY_HEADING_CLASSES.h3} mb-8`}
        style={CASE_STUDY_HEADING_FONT}
      >
        Product Decisions
      </h3>
      <p className="text-base text-foreground/80 leading-relaxed mb-6">
        Research continuously informed product decisions throughout the project.
      </p>

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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Why this mattered</div>
                      <p className="text-sm leading-relaxed text-foreground/80">{priority.painPoint}</p>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Product decision</div>
                      <p className="text-sm leading-relaxed text-foreground/80">{priority.response}</p>
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
    <motion.section className="bg-background border-t border-border py-12 sm:py-16" {...revealProps}>
      <div className="flex items-center gap-2 mb-6">
        <Icon size={16} />
        <h3
          className={CASE_STUDY_HEADING_CLASSES.h3}
          style={CASE_STUDY_HEADING_FONT}
        >
          {title}
        </h3>
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
    <motion.section className="bg-background border-t border-border py-12 sm:py-16" {...revealProps}>
      <div className="rounded-2xl border border-border bg-gradient-to-br from-secondary/70 to-background p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6">
          <WandSparkles size={16} style={{ color: accent }} />
          <h3
            className={CASE_STUDY_HEADING_CLASSES.h3}
            style={CASE_STUDY_HEADING_FONT}
          >
            My Contributions
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SCP_CONTRIBUTIONS.map((item) => (
            <div key={item} className="rounded-lg border border-border bg-background/70 p-4 text-sm leading-relaxed text-foreground/85">
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
    <motion.section id="phase-outcome" className="bg-background border-t border-border py-12 sm:py-20" {...revealProps}>
      <ScpSectionTitle title="Strategic Outcomes" />

      <p className="text-base leading-relaxed text-foreground/90 mb-10">{summary}</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-background mb-10">
        {metrics.map((m) => (
          <motion.div key={m.label} className="bg-background p-5 sm:p-8" {...revealProps}>
            <div
              className="text-3xl sm:text-4xl font-extrabold mb-2"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: accent }}
            >
              {m.value}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground leading-snug">{m.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        {sections.map(({ title, items, icon: Icon }) => (
          <div key={title} className="rounded-xl border border-border bg-secondary/40 p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/20">
            <div className="flex items-center gap-2 mb-4">
              <div className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-background border border-border">
                <Icon size={16} />
              </div>
              <h4 className={CASE_STUDY_HEADING_CLASSES.h4} style={CASE_STUDY_HEADING_FONT}>{title}</h4>
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
}: {
  artifact: { src: string; caption: string };
  aspectClass: string;
  onImageClick: (src: string, caption: string) => void;
}) {
  return (
    <motion.button
      className={`group relative overflow-hidden bg-background ${aspectClass} w-full text-left`}
      onClick={() => onImageClick(artifact.src, artifact.caption)}
      aria-label={`View full image: ${artifact.caption}`}
      {...revealProps}
    >
      <img
        src={artifact.src}
        alt={artifact.caption}
        className="w-full h-full object-contain opacity-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.02]"
      />
      {/* Zoom hint */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-background/80 backdrop-blur-sm rounded-full p-2">
          <ZoomIn size={16} className="text-foreground" />
        </div>
      </div>
    </motion.button>
  );
}

function PhaseSection({
  phase,
  index,
  color,
  isLast,
  stackOnDesktop = false,
  onImageClick,
}: {
  phase: Phase;
  index: number;
  color: string;
  isLast: boolean;
  stackOnDesktop?: boolean;
  onImageClick: (src: string, caption: string) => void;
}) {
  const hasThreeArtifacts = phase.artifacts.length === 3;
  const hasOneArtifact = phase.artifacts.length === 1;

  return (
    <motion.section className="bg-background border-t border-border py-12 sm:py-20" {...revealProps}>
      {/* Phase header */}
      <div className="flex items-baseline gap-4 sm:gap-6 mb-8 sm:mb-14">
        <h2
          className={CASE_STUDY_HEADING_CLASSES.h2}
          style={CASE_STUDY_HEADING_FONT}
        >
          {phase.title}
        </h2>
        <div className="flex-1 h-px bg-border ml-2 sm:ml-4 hidden sm:block" />
      </div>

      {/* Body + artifacts */}
      {stackOnDesktop ? (
        <div>
          <div className="max-w-5xl">
            {phase.body.split("\n\n").map((para, i) => (
              <p key={i} className={`text-base leading-relaxed text-foreground/80 ${i > 0 ? "mt-4" : ""}`}>
                {para}
              </p>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {phase.artifacts.slice(1).map((artifact, i) => (
                    <ArtifactImage
                      key={i}
                      artifact={artifact}
                      aspectClass="aspect-[4/3]"
                      onImageClick={onImageClick}
                    />
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {phase.artifacts.map((artifact, i) => (
                  <ArtifactImage
                    key={i}
                    artifact={artifact}
                    aspectClass="aspect-[4/3]"
                    onImageClick={onImageClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            {phase.body.split("\n\n").map((para, i) => (
              <p key={i} className={`text-base leading-relaxed text-foreground/80 ${i > 0 ? "mt-4" : ""}`}>
                {para}
              </p>
            ))}
          </div>

          <div className="lg:col-span-8">
            {hasThreeArtifacts ? (
              <div className="space-y-3">
                <ArtifactImage
                  artifact={phase.artifacts[0]}
                  aspectClass="aspect-[16/9]"
                  onImageClick={onImageClick}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {phase.artifacts.slice(1).map((artifact, i) => (
                    <ArtifactImage
                      key={i}
                      artifact={artifact}
                      aspectClass="aspect-[4/3]"
                      onImageClick={onImageClick}
                    />
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {phase.artifacts.map((artifact, i) => (
                  <ArtifactImage
                    key={i}
                    artifact={artifact}
                    aspectClass="aspect-[4/3]"
                    onImageClick={onImageClick}
                  />
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
        <h2 className={CASE_STUDY_HEADING_CLASSES.h2} style={CASE_STUDY_HEADING_FONT}>
          {phase.title}
        </h2>
        <div className="flex-1 h-px bg-border ml-2 sm:ml-4 hidden sm:block" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          {phase.body.split("\n\n").map((para, i) => (
            <p key={i} className={`text-base leading-relaxed text-foreground/80 ${i > 0 ? "mt-4" : ""}`}>
              {para}
            </p>
          ))}
        </div>

        <div className="lg:col-span-8">
          <div className="rounded-xl border border-border bg-secondary/25 p-5 sm:p-6 mb-4">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Core Problem Areas</p>
            <p className="text-base text-foreground/85 leading-relaxed">
              Strategic focus centered on cost efficiency, self-service guidance, dispute quality, and compliance-aligned consistency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {problemAreas.map(({ title, detail, icon: Icon }) => (
              <motion.div
                key={title}
                className="rounded-xl border border-border bg-background p-5 sm:p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/20"
                {...revealProps}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="inline-flex w-9 h-9 items-center justify-center rounded-full border border-border shrink-0"
                    style={{ backgroundColor: `${color}1A` }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>
                  <h3 className="text-base font-semibold leading-tight text-foreground" style={CASE_STUDY_HEADING_FONT}>
                    {title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80">{detail}</p>
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
  return (
    <motion.section className="bg-background border-t border-border py-12 sm:py-20" {...revealProps}>
      <div className="flex items-baseline gap-4 sm:gap-6 mb-8 sm:mb-14">
        <h2 className={CASE_STUDY_HEADING_CLASSES.h2} style={CASE_STUDY_HEADING_FONT}>
          {phase.title}
        </h2>
        <div className="flex-1 h-px bg-border ml-2 sm:ml-4 hidden sm:block" />
      </div>

      <div className="w-full max-w-5xl">
        {phase.body.split("\n\n").map((para, i) => (
          <p key={i} className={`text-base leading-relaxed text-foreground/85 ${i > 0 ? "mt-4" : ""}`}>
            {para}
          </p>
        ))}

        {phase.artifacts.length > 0 && (
          <div className="mt-8 sm:mt-10 space-y-3">
            <ArtifactImage
              key={`${phase.artifacts[0].caption}-lead`}
              artifact={phase.artifacts[0]}
              aspectClass="aspect-[16/9]"
              onImageClick={onImageClick}
            />

            {phase.artifacts.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {phase.artifacts.slice(1).map((artifact, index) => (
                  <ArtifactImage
                    key={`${artifact.caption}-${index}`}
                    artifact={artifact}
                    aspectClass="aspect-square"
                    onImageClick={onImageClick}
                  />
                ))}
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
          <p className="text-muted-foreground mb-4">Case study not found.</p>
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
  const usesExecutiveSummaryTitle =
    isSharedControlPlanes || study.slug === "chase-first-banking" || study.slug === "keybank-counterfeit-disputes";
  const showOverviewMetrics = study.slug !== "keybank-counterfeit-disputes";

  // Resolved accent: swap to lightColor in light mode when provided, guaranteeing ≥4.5:1
  const accent = !isDark && study.lightColor ? study.lightColor : study.color;

  return (
    <div
      key={slug}
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Instrument Sans', sans-serif" }}
    >
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          caption={lightbox.caption}
          onClose={() => setLightbox(null)}
        />
      )}
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-5 border-b border-border backdrop-blur-md bg-background/80">
        <Link
          to="/#work"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group shrink-0"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">Back to portfolio</span>
          <span className="sm:hidden">Back</span>
        </Link>
        <span
          className="text-base sm:text-lg font-bold tracking-tight text-foreground"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Tamare Reese
        </span>
        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle isDark={isDark} toggle={toggle} />
        </div>
      </nav>

      {/* Hero image */}
      <div className="pt-[72px] relative h-[40vh] sm:h-[55vh] min-h-[280px] sm:min-h-[400px] bg-secondary overflow-hidden">
        <img
          src={study.image}
          alt={study.title}
          className="w-full h-full object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Header */}
      <div className="px-5 sm:px-8 pb-12 sm:pb-16 -mt-16 relative z-10 max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <h1
            className={`${CASE_STUDY_HEADING_CLASSES.h1} mb-4`}
            style={{
              ...CASE_STUDY_HEADING_FONT,
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
            }}
          >
            {study.title}
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed mb-8">
            {study.subtitle}
          </p>
          <div className="flex flex-wrap gap-6 sm:gap-8 border-t border-border pt-8">
            {[
              { label: "Client", value: study.client },
              { label: "Role", value: study.role },
              { label: "Duration", value: study.duration },
              { label: "Year", value: study.year },
              ...(study.team ? [{ label: "Team", value: study.team }] : []),
            ].map((item) => (
              <div key={item.label}>
                <div className="text-xs text-muted-foreground tracking-widest uppercase mb-1">{item.label}</div>
                <div className="text-sm font-medium text-foreground">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="px-5 sm:px-8 max-w-6xl mx-auto">
        <motion.section className="bg-background border-t border-border py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12" {...revealProps}>
          <div className="lg:col-span-3">
            <span className="text-xs text-muted-foreground tracking-widest uppercase">
              {usesExecutiveSummaryTitle ? "Executive Summary" : "Overview"}
            </span>
          </div>
          <div className="lg:col-span-7">
            {study.overview.split("\n\n").map((paragraph, i) => (
              <p key={i} className={`text-base leading-relaxed text-foreground/90 ${i > 0 ? "mt-4" : ""}`}>
                {paragraph}
              </p>
            ))}
          </div>
        </motion.section>

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
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-background">
                  {study.metrics.map((m) => (
                    <motion.div key={m.label} className="bg-background p-5 sm:p-8" {...revealProps}>
                      <div
                        className="text-3xl sm:text-4xl font-extrabold mb-2"
                        style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: accent }}
                      >
                        {m.value}
                      </div>
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
                    onImageClick={(src, caption) => setLightbox({ src, caption })}
                  />
                )}
              </div>
            ))}

        <motion.section id="phase-outcome" className="bg-background border-t border-border py-12 sm:py-20" {...revealProps}>
          <div className="flex items-baseline gap-4 sm:gap-6 mb-8 sm:mb-14">
            <h2
              className={CASE_STUDY_HEADING_CLASSES.h2}
              style={CASE_STUDY_HEADING_FONT}
            >
              Outcome
            </h2>
            <div className="flex-1 h-px bg-border ml-2 sm:ml-4 hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-background">
            {[
              { label: "Summary", body: study.outcome.summary },
              { label: "Business Impact", body: study.outcome.impact },
              { label: "Reflection", body: study.outcome.reflection },
            ].map(({ label, body }) => (
              <div key={label} className="bg-background p-6 sm:p-8 flex flex-col gap-4">
                <span className="text-xs text-muted-foreground tracking-widest uppercase">{label}</span>
                <p className="text-sm leading-relaxed text-foreground/80">{body}</p>
              </div>
            ))}
          </div>

          {/* Metrics reprise */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-background mt-px">
            {study.metrics.map((m) => (
              <motion.div
                key={m.label}
                className="bg-background px-5 sm:px-8 py-5 sm:py-6 flex items-baseline gap-3 sm:gap-4"
                {...revealProps}
              >
                <span
                  className="text-xl sm:text-2xl font-extrabold shrink-0"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: accent }}
                >
                  {m.value}
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
              <div
                className="text-base sm:text-lg font-bold group-hover:text-primary transition-colors"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                {prev.title}
              </div>
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
              <div
                className="text-base sm:text-lg font-bold group-hover:text-primary transition-colors"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                {next.title}
              </div>
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
      <footer className="px-5 sm:px-8 py-8 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="text-sm font-bold text-foreground"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Tamare Reese
          </span>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Get in touch <ArrowUpRight size={12} />
          </Link>
          <span className="text-xs text-muted-foreground">© 2024 Tamare Reese</span>
        </div>
      </footer>
    </div>
  );
}
