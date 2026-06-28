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
  BriefcaseBusiness,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { caseStudies, type Phase } from "./data/caseStudies";
import { useTheme } from "./hooks/useTheme";
import { ThemeToggle } from "./components/ThemeToggle";

const SESSION_KEY = "cs_unlocked";
const revealProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" },
};

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
    if (value === "Prosp3r7") {
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
            to="/"
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

const PHASES = ["discover", "define", "design", "deliver"] as const;

const SCP_STRATEGY_FLOW = [
  "Individual Database Control Planes",
  "Shared Control Planes",
  "Centralized control plane experience in the Integrated Engineer's Portal application",
];

const SCP_PAIN_POINTS: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Fragmented Operational Workflows",
    body: "Engineers navigated multiple systems to complete a single operational task, increasing cognitive load and slowing delivery.",
    icon: Workflow,
  },
  {
    title: "Limited Self-Service",
    body: "Onboarding, provisioning, and troubleshooting depended heavily on manual support, creating bottlenecks and delaying work.",
    icon: Wrench,
  },
  {
    title: "Inconsistent Experiences",
    body: "Common tasks behaved differently depending on database technology, requiring engineers to relearn workflows when switching products.",
    icon: CircleDashed,
  },
  {
    title: "Documentation & Discoverability",
    body: "Critical documentation and operational guidance were difficult to locate, inconsistent across products, or unavailable when needed.",
    icon: BookOpen,
  },
  {
    title: "Limited Operational Visibility",
    body: "Customers lacked a centralized view of service health, operational status, and lifecycle management.",
    icon: Activity,
  },
  {
    title: "No Customer Feedback Loop",
    body: "Without customer experience observability, Product teams struggled to identify friction after launch.",
    icon: MessageSquareWarning,
  },
];

const SCP_STRATEGIC_PRIORITIES: {
  title: string;
  painPoint: string;
  response: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Create a Service",
    painPoint:
      "Provisioning workflows differed across database technologies, increasing onboarding time and creating unnecessary complexity.",
    response:
      "Design a standardized provisioning experience that supports both Graph and Relational platforms through a shared operational workflow.",
    icon: Sparkles,
  },
  {
    title: "Shared Control Plane Onboarding",
    painPoint:
      "New engineers struggled to understand prerequisites, locate documentation, and confidently begin using the platform.",
    response:
      "Create a guided self-service onboarding experience that reduces dependency on manual assistance while improving discoverability.",
    icon: UserRoundPlus,
  },
  {
    title: "AI Support Assistant",
    painPoint:
      "Engineers depended on weekly SRE office hours for common onboarding, provisioning, and operational questions.",
    response:
      "Design an AI-powered support assistant embedded in onboarding and provisioning flows to provide contextual guidance and unblock customers in real time.",
    icon: Bot,
  },
  {
    title: "Customer Experience Observability",
    painPoint:
      "Product teams lacked visibility into customer struggles after launch, making prioritization reactive.",
    response:
      "Introduce customer experience observability to continuously measure adoption, identify friction, and guide roadmap investments.",
    icon: BarChart3,
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

const SCP_FOCUS_AREAS = [
  "Create a Service",
  "Shared Control Plane Onboarding",
  "AI Support Assistant",
  "Operational Dashboards",
  "Navigation",
  "Search",
  "Information Architecture",
  "Shared Interaction Patterns",
];

const SCP_VALIDATION_ACTIVITIES = [
  "Moderated usability testing",
  "Executive research readouts",
  "MVP prioritization",
  "Launch support",
  "Post-launch customer interviews",
  "Roadmap recommendations",
];

const SCP_CUSTOMER_OUTCOMES = [
  "Simplified database provisioning through standardized workflows",
  "Improved onboarding through guided self-service experiences",
  "Enabled self-service support through an integrated AI assistant",
  "Reduced context switching between operational tools",
  "Increased confidence completing infrastructure tasks independently",
  "Introduced customer experience observability for continuous improvement",
];

const SCP_ORG_OUTCOMES = [
  "Reduced operational fragmentation",
  "Standardized common workflows across database products",
  "Improved cross-product consistency",
  "Established reusable UX standards",
  "Created a scalable platform foundation for future database products",
  "Influenced long-term roadmap investments through customer research",
];

const SCP_DESIGN_OUTCOMES = [
  "Shared experience architecture",
  "Reusable interaction patterns",
  "Standardized navigation framework",
  "Service blueprint methodology",
  "Enterprise design system adoption",
];

const SCP_DESIGN_LEADERSHIP_ACTIONS = [
  "Leading stakeholder discovery and customer research",
  "Facilitating 5–6 cross-functional strategy and alignment workshops",
  "Translating customer insights into enterprise experience strategy",
  "Defining interface capabilities and functionality for high-priority experiences",
  "Validating solutions through moderated usability testing",
  "Presenting executive-ready recommendations to leadership",
  "Conducting post-launch research that directly influenced roadmap investments",
];

const SCP_VALIDATION_METHODS = [
  "Existing UX audit synthesis",
  "Stakeholder interviews",
  "Contextual inquiry",
  "Service blueprint workshops",
  "Design consistency workshops",
  "Technical feasibility reviews",
  "Moderated usability testing",
  "Executive design reviews",
  "14 post-launch customer interviews",
];

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
          className="text-xl sm:text-2xl font-bold leading-relaxed"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
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
          className="text-xl sm:text-2xl font-extrabold mb-2"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Strategy at a Glance
        </h3>
        <p className="text-sm text-muted-foreground">Enterprise Vision</p>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-2 sm:gap-3 items-stretch">
          {SCP_STRATEGY_FLOW.map((step, i) => (
            <div key={step} className="contents">
              <div
                className="h-full rounded-xl border border-border bg-secondary/40 px-3 sm:px-5 py-4 sm:py-5 text-center flex flex-col items-center justify-center"
              >
                <span className="text-[10px] sm:text-xs tracking-widest uppercase mb-2" style={{ color: accent }}>
                  Step {i + 1}
                </span>
                <span className="text-xs sm:text-sm font-medium leading-relaxed break-words">{step}</span>
              </div>
              {i < SCP_STRATEGY_FLOW.length - 1 && (
                <div className="flex items-center justify-center">
                  <ArrowRightFlowIcon color={accent} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
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
        className="text-xl sm:text-2xl font-extrabold mb-8"
        style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
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
              <h4 className="font-semibold mb-2">{item.title}</h4>
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
        className="text-xl sm:text-2xl font-extrabold mb-8"
        style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
      >
        Strategic Priorities
      </h3>

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
                      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Customer Pain Point</div>
                      <p className="text-sm leading-relaxed text-foreground/80">{priority.painPoint}</p>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Strategic Response</div>
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
          className="text-xl sm:text-2xl font-extrabold"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
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
            className="text-xl sm:text-2xl font-extrabold"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
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
  leadership,
  accuracy,
  metrics,
}: {
  accent: string;
  summary: string;
  leadership: string;
  accuracy: string;
  metrics: { value: string; label: string }[];
}) {
  const sections = [
    { title: "Customer Outcomes", items: SCP_CUSTOMER_OUTCOMES, icon: Radar },
    { title: "Organizational Outcomes", items: SCP_ORG_OUTCOMES, icon: Rocket },
    { title: "Design Outcomes", items: SCP_DESIGN_OUTCOMES, icon: LayoutGrid },
  ];

  return (
    <motion.section id="phase-outcome" className="bg-background border-t border-border py-12 sm:py-20" {...revealProps}>
      <div className="flex items-baseline gap-4 sm:gap-6 mb-8 sm:mb-14">
        <span className="text-xs font-mono tracking-widest shrink-0" style={{ color: accent }}>05</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
          Strategic Outcomes
        </h2>
        <div className="flex-1 h-px bg-border ml-2 sm:ml-4 hidden sm:block" />
      </div>

      <p className="text-base sm:text-lg leading-relaxed text-foreground/90 mb-10">{summary}</p>

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
                <Icon size={16} style={{ color: accent }} />
              </div>
              <h3 className="font-semibold">{title}</h3>
            </div>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item} className="text-sm leading-relaxed text-foreground/80">• {item}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
        <div className="rounded-xl border border-border bg-secondary/40 p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/20">
          <div className="flex items-center gap-2 mb-4">
            <div className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-background border border-border">
              <BriefcaseBusiness size={16} style={{ color: accent }} />
            </div>
            <h3 className="text-lg font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Design Leadership
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-foreground/80 mb-4">{leadership}</p>
          <div className="space-y-2 mb-4">
            {SCP_DESIGN_LEADERSHIP_ACTIONS.map((item) => (
              <div key={item} className="text-sm text-foreground/80">• {item}</div>
            ))}
          </div>
          <p className="text-sm leading-relaxed text-foreground/80">
            The project reinforced that successful enterprise transformation begins with deeply understanding customer problems and building organizational alignment around solving them.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-secondary/40 p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/20">
          <div className="flex items-center gap-2 mb-4">
            <div className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-background border border-border">
              <ShieldCheck size={16} style={{ color: accent }} />
            </div>
            <h3 className="text-lg font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Ensuring Clarity & Accuracy
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-foreground/80 mb-4">{accuracy}</p>
          <div className="space-y-2 mb-4">
            {SCP_VALIDATION_METHODS.map((item) => (
              <div key={item} className="text-sm text-foreground/80">• {item}</div>
            ))}
          </div>
          <p className="text-sm leading-relaxed text-foreground/80">
            Executive presentations focused on strategic recommendations and outcomes, while Product and Engineering teams received prioritized workflows, implementation guidance, and scalable experience principles.
          </p>
        </div>
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

      {/* Caption */}
      {caption && (
        <p
          className="mt-5 text-xs text-muted-foreground text-center max-w-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {caption}
        </p>
      )}
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
        className="w-full h-full object-cover opacity-75 transition-all duration-500 group-hover:opacity-95 group-hover:scale-[1.02]"
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
        <span className="text-xs font-mono tracking-widest shrink-0" style={{ color }}>
          0{index + 1}
        </span>
        <h2
          className="text-2xl sm:text-3xl font-extrabold tracking-tight"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
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

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "1"
  );
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);
  const study = caseStudies.find((s) => s.slug === slug);

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
          <Link to="/" className="text-primary underline text-sm">
            Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  const currentIndex = caseStudies.findIndex((s) => s.slug === slug);
  const prev = caseStudies[currentIndex - 1] ?? null;
  const next = caseStudies[currentIndex + 1] ?? null;

  const phases = [study.discover, study.define, study.design, study.deliver];
  const isSharedControlPlanes = study.slug === "shared-control-planes";

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
          to="/"
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
          <div className="hidden md:flex items-center gap-1">
            {PHASES.map((p) => (
              <a
                key={p}
                href={`#phase-${p}`}
                className="text-xs text-muted-foreground hover:text-foreground capitalize px-2 sm:px-3 py-1 transition-colors"
              >
                {p}
              </a>
            ))}
          </div>
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
      <div className="px-5 sm:px-8 pb-12 sm:pb-16 -mt-16 relative z-10 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <h1
            className="font-extrabold leading-tight mb-4"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
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
      <div className="px-5 sm:px-8 max-w-7xl mx-auto">
        <motion.section className="bg-background border-t border-border py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12" {...revealProps}>
          <div className="lg:col-span-3">
            <span className="text-xs text-muted-foreground tracking-widest uppercase">
              {isSharedControlPlanes ? "Executive Summary" : "Overview"}
            </span>
          </div>
          <div className="lg:col-span-7">
            {study.overview.split("\n\n").map((paragraph, i) => (
              <p key={i} className={`text-base sm:text-lg leading-relaxed text-foreground/90 ${i > 0 ? "mt-4" : ""}`}>
                {paragraph}
              </p>
            ))}
          </div>
        </motion.section>

        {isSharedControlPlanes && <ScpStrategyFlow accent={accent} />}

        {/* Metrics */}
        {!isSharedControlPlanes && (
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


        {/* Four phases */}
        {phases.map((phase, i) => (
          <div key={phase.title} id={`phase-${phase.title.toLowerCase()}`}>
            <PhaseSection
              phase={phase}
              index={i}
              color={accent}
              isLast={i === phases.length - 1}
              stackOnDesktop={
                isSharedControlPlanes &&
                (phase.title === "Framing the Problem" ||
                  phase.title === "Translating Strategy into Experience")
              }
              onImageClick={(src, caption) => setLightbox({ src, caption })}
            />

            {isSharedControlPlanes && i === 0 && (
              <>
                <ScpIconCardRow title="Customer Pain Points" items={SCP_PAIN_POINTS} />
                <ScpInsightBanner
                  accent={accent}
                  text="Engineers weren't asking for new features—they wanted a simpler, more consistent way to accomplish the same operational goals."
                />
              </>
            )}

            {isSharedControlPlanes && i === 1 && (
              <>
                <ScpStrategicPriorities accent={accent} />
                <ScpContributions accent={accent} />
                <ScpInsightBanner
                  accent={accent}
                  text="The challenge wasn't simply redesigning database interfaces—it was establishing a scalable operational model. By resolving the most significant customer pain points first, we created a reusable experience foundation that reduced operational complexity while supporting the organization's long-term platform vision."
                />
              </>
            )}

            {isSharedControlPlanes && i === 2 && (
              <ScpChipSection title="Focus Areas" chips={SCP_FOCUS_AREAS} icon={Compass} />
            )}

            {isSharedControlPlanes && i === 3 && (
              <ScpChipSection title="Validation Activities" chips={SCP_VALIDATION_ACTIVITIES} icon={CheckCircle2} />
            )}
          </div>
        ))}

        {/* Outcome */}
        {isSharedControlPlanes ? (
          <ScpOutcomes
            accent={accent}
            summary={study.outcome.summary}
            leadership={study.outcome.impact}
            accuracy={study.outcome.reflection}
            metrics={study.metrics}
          />
        ) : (
        <motion.section id="phase-outcome" className="bg-background border-t border-border py-12 sm:py-20" {...revealProps}>
          <div className="flex items-baseline gap-4 sm:gap-6 mb-8 sm:mb-14">
            <span className="text-xs font-mono tracking-widest shrink-0" style={{ color: accent }}>05</span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
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
        )}

      </div>

      {/* Prev / Next */}
      <div className="border-t border-border mt-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-px bg-border">
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
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
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
