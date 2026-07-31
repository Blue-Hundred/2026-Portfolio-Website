import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ThemeToggle } from "./components/ThemeToggle";
import { useTheme } from "./hooks/useTheme";
import tamareLightLogo from "../assets/Favicon/Tamare Light Logo.svg";
import tamareDarkLogo from "../assets/Favicon/Tamare Dark Logo.svg";

const RESUME_PDF_URL = "/Tamare_Reese_Resume_2026_Final.pdf";

const experiences = [
  {
    range: "2024 — Current",
    title: "Sr. Product Designer",
    company: "OpenAI",
  },
  {
    range: "2020 - 2024",
    title: "Product Designer",
    company: "Meta",
  },
  {
    range: "2017 - 2020",
    title: "UX Designer",
    company: "Hookbang",
  },
];

const valueProps = [
  {
    title: "Enterprise Scale",
    body: "I don’t just design for concepts; I ship for millions. With experience at OpenAI and Meta, I know how to navigate complex systems and deliver work that survives the rigors of high-scale production.",
    icon: "◫",
  },
  {
    title: "Technical Fluency",
    body: "With a B.S. in Computer Science, I speak the same language as your engineering team. I design with feasibility in mind, reducing handoff friction and ensuring the final product matches the vision.",
    icon: "⚙",
  },
  {
    title: "AI-Native Workflows",
    body: "I use Claude Code, Codex, and Figma Make daily to prototype and validate ideas before they cost engineering time. It compresses the distance between research and shipped product.",
    icon: "⚡",
  },
  {
    title: "Business Impact",
    body: "Pretty pixels are the baseline. I design for the metrics that matter: cutting setup from weeks to minutes, reducing support escalations, and building self-service tools that solve expensive problems.",
    icon: "$",
  },
];

export default function AboutPage() {
  const { isDark, toggle } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerLogo = isDark ? tamareLightLogo : tamareDarkLogo;

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.documentElement.style.removeProperty("overflow");
      return;
    }

    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.removeProperty("overflow");
    };
  }, [isMobileMenuOpen]);

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background text-foreground" style={{ fontFamily: "var(--font-family-sans)" }}>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between gap-4">
          <Link to="/" aria-label="Go to home" className="inline-flex">
            <img src={headerLogo} alt="Tamaré Reese logo" className="h-8 sm:h-9 w-auto" />
          </Link>

          <nav className="hidden sm:flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-foreground/80">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <a href={RESUME_PDF_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Resume</a>
            <ThemeToggle isDark={isDark} toggle={toggle} />
          </nav>

          <button
            type="button"
            className="sm:hidden relative w-10 h-10 flex items-center justify-center text-foreground/90 hover:text-foreground transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-main-nav"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
          >
            <span
              className={`absolute h-0.5 w-4 rounded-full bg-current transition-transform duration-300 ease-out ${
                isMobileMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-[5px] rotate-0"
              }`}
            />
            <span
              className={`absolute h-0.5 w-4 rounded-full bg-current transition-opacity duration-200 ease-out ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-0.5 w-4 rounded-full bg-current transition-transform duration-300 ease-out ${
                isMobileMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-[5px] rotate-0"
              }`}
            />
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div id="mobile-main-nav" className="sm:hidden fixed inset-0 z-[70] bg-white text-zinc-900 opacity-100 pointer-events-auto">
          <div className="h-full px-6 pt-6 pb-10 flex flex-col mobile-menu-shell mobile-menu-shell-open">
            <div className="flex items-center justify-between">
              <img src={tamareDarkLogo} alt="Tamaré Reese logo" className="h-10 w-auto" />
              <button
                type="button"
                className="relative w-10 h-10 flex items-center justify-center text-zinc-900 hover:opacity-75 transition-opacity"
                aria-label="Close menu"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="absolute h-0.5 w-4 rounded-full bg-current rotate-45" />
                <span className="absolute h-0.5 w-4 rounded-full bg-current -rotate-45" />
              </button>
            </div>

            <nav className="mt-16 flex flex-col text-zinc-900">
              <Link
                to="/"
                className="mobile-menu-link py-3 border-b border-zinc-300 text-[58px] leading-[1.05] font-semibold tracking-tight hover:opacity-80 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <a
                href={RESUME_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-menu-link py-3 border-b border-zinc-300 text-[58px] leading-[1.05] font-semibold tracking-tight hover:opacity-80 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resume
              </a>
            </nav>

            <div className="mt-8 inline-flex items-center text-zinc-700">
              <ThemeToggle isDark={isDark} toggle={toggle} />
            </div>
          </div>
        </div>
      )}

      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-14 sm:pt-20 lg:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          <div className="lg:col-span-7">
            <h1 className="mt-10 sm:mt-12 text-[64px] sm:text-[76px] leading-[0.98] font-bold tracking-tight">
              Hi, I’m
              <br />
              Tamaré Reese.
            </h1>
            <a
              href="https://www.linkedin.com/in/tamarereese/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex mt-8 w-10 h-10 items-center justify-center rounded-full border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
                <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.85-3.037-1.853 0-2.136 1.445-2.136 2.94v5.666H9.347V9h3.414v1.561h.049c.476-.9 1.636-1.85 3.367-1.85 3.6 0 4.265 2.37 4.265 5.455v6.286zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM7.119 20.452H3.555V9h3.564v11.452z" />
              </svg>
            </a>
          </div>

          <div className="lg:col-span-5 h-[355px] rounded-[36px] bg-zinc-100 border border-zinc-100 flex items-center justify-center text-[32px] font-medium text-zinc-900/90">
            Image placeholder
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 mt-14 sm:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-12 h-[420px] sm:h-[460px] rounded-[36px] bg-zinc-100 border border-zinc-100" />
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 mt-16 sm:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
          <h3 className="lg:col-span-6">Experience</h3>
          <div className="lg:col-span-6 space-y-0">
            {experiences.map((item) => (
              <div key={item.title} className="grid grid-cols-[170px_1fr] gap-6 py-4 border-b border-border/70 text-[14px] sm:text-[15px] text-foreground/90">
                <span className="text-foreground/75">{item.range}</span>
                <span>
                  {item.title} — {item.company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 mt-20 sm:mt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          <h3 className="lg:col-span-4">Design Principles</h3>
          <div className="lg:col-span-8">
            <h5>Design that ships, at scale, with engineering.</h5>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
              {valueProps.map((item) => (
                <article key={item.title} className="max-w-[360px]">
                  <div className="w-7 h-7 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[12px] font-semibold text-zinc-700">
                    {item.icon}
                  </div>
                  <h4 className="mt-3 text-[26px] font-semibold leading-tight">{item.title}</h4>
                  <p className="mt-2 text-[14px] sm:text-[15px] leading-[1.6] text-foreground/65">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 pb-14 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-12 rounded-[30px] sm:rounded-[34px] bg-black text-white px-8 sm:px-10 py-14 sm:py-16 flex flex-col items-center text-center">
          <h2 className="text-[78px] sm:text-[86px] leading-[0.95] font-semibold tracking-tight">
            Let’s work
            <br />
            together!
          </h2>
          <a
            href="mailto:tamaredesign@outlook.com"
            className="mt-8 inline-flex bg-white text-black rounded-full px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Tamaredesign@outlook.com
          </a>
          </div>
        </div>
      </section>
    </main>
  );
}
