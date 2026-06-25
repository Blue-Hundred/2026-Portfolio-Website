import { useParams, Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock, X, ZoomIn } from "lucide-react";
import { caseStudies, type Phase } from "./data/caseStudies";
import { useTheme } from "./hooks/useTheme";
import { ThemeToggle } from "./components/ThemeToggle";

const SESSION_KEY = "cs_unlocked";

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
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-8"
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
            className="w-full bg-transparent px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none"
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
    <button
      className={`group relative overflow-hidden bg-secondary ${aspectClass} w-full text-left`}
      onClick={() => onImageClick(artifact.src, artifact.caption)}
      aria-label={`View full image: ${artifact.caption}`}
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
    </button>
  );
}

function PhaseSection({
  phase,
  index,
  color,
  isLast,
  onImageClick,
}: {
  phase: Phase;
  index: number;
  color: string;
  isLast: boolean;
  onImageClick: (src: string, caption: string) => void;
}) {
  const hasThreeArtifacts = phase.artifacts.length === 3;
  const hasOneArtifact = phase.artifacts.length === 1;

  return (
    <section className="border-t border-border py-12 sm:py-20">
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
    </section>
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

  // Resolved accent: swap to lightColor in light mode when provided, guaranteeing ≥4.5:1
  const accent = !isDark && study.lightColor ? study.lightColor : study.color;

  return (
    <div
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
        <section className="border-t border-border py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12">
          <div className="lg:col-span-3">
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Overview</span>
          </div>
          <div className="lg:col-span-7">
            <p className="text-base sm:text-lg leading-relaxed text-foreground/90">{study.overview}</p>
          </div>
        </section>

        {/* Metrics */}
        <section className="border-t border-border py-12 sm:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {study.metrics.map((m) => (
              <div key={m.label} className="bg-background p-5 sm:p-8">
                <div
                  className="text-3xl sm:text-4xl font-extrabold mb-2"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: accent }}
                >
                  {m.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground leading-snug">{m.label}</div>
              </div>
            ))}
          </div>
        </section>


        {/* Four phases */}
        {phases.map((phase, i) => (
          <div key={phase.title} id={`phase-${phase.title.toLowerCase()}`}>
            <PhaseSection
              phase={phase}
              index={i}
              color={accent}
              isLast={i === phases.length - 1}
              onImageClick={(src, caption) => setLightbox({ src, caption })}
            />
          </div>
        ))}

        {/* Outcome */}
        <section id="phase-outcome" className="border-t border-border py-12 sm:py-20">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border mt-px">
            {study.metrics.map((m) => (
              <div key={m.label} className="bg-background px-5 sm:px-8 py-5 sm:py-6 flex items-baseline gap-3 sm:gap-4">
                <span
                  className="text-xl sm:text-2xl font-extrabold shrink-0"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: accent }}
                >
                  {m.value}
                </span>
                <span className="text-xs text-muted-foreground leading-snug">{m.label}</span>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Prev / Next */}
      <div className="border-t border-border mt-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-px bg-border">
          {prev ? (
            <button
              onClick={() => navigate(`/work/${prev.slug}`)}
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
              onClick={() => navigate(`/work/${next.slug}`)}
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
