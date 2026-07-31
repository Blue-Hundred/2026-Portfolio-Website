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

      <section className="relative mt-14 sm:mt-16 overflow-x-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 -top-14 sm:-top-18 h-[22rem] sm:h-[28rem] w-[155vw] min-w-[1200px] max-w-none pointer-events-none opacity-70 overflow-visible" aria-hidden>
          <svg viewBox="0 -320 1200 980" className="w-full h-full overflow-visible hero-ribbon-svg" preserveAspectRatio="none">
            <path
              className="hero-ribbon-path"
              d="M-170 344 C -68 122, 170 -190, 350 78 C 502 312, 628 -136, 810 124 C 954 322, 1082 -72, 1282 224"
              fill="none"
              stroke="url(#about-center-ribbon)"
              strokeWidth="145"
              strokeLinecap="round"
            >
              <animate
                attributeName="d"
                dur="31s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.15;0.31;0.48;0.66;0.82;0.92;1"
                keySplines="0.55 0 0.25 1;0.45 0 0.25 1;0.5 0 0.2 1;0.4 0 0.25 1;0.5 0 0.2 1;0.44 0 0.25 1;0.5 0 0.2 1"
                values="M-170 344 C -68 122, 170 -190, 350 78 C 502 312, 628 -136, 810 124 C 954 322, 1082 -72, 1282 224;
M-170 290 C -12 92, 222 -220, 390 128 C 536 384, 702 -56, 832 62 C 970 188, 1122 -140, 1282 260;
M-170 372 C -104 228, 142 -78, 326 34 C 488 132, 564 -178, 754 150 C 906 386, 1002 22, 1282 172;
M-170 318 C -42 116, 236 -198, 418 110 C 566 360, 694 -100, 862 120 C 996 292, 1132 -50, 1282 238;
M-170 384 C -120 258, 124 -46, 312 42 C 474 132, 548 -194, 738 160 C 896 414, 992 40, 1282 160;
M-170 330 C -54 126, 218 -184, 400 100 C 550 336, 670 -122, 842 132 C 988 326, 1118 -70, 1282 216;
M-170 352 C -82 184, 164 -126, 346 68 C 500 254, 602 -154, 786 138 C 934 352, 1046 -2, 1282 198;
M-170 344 C -68 122, 170 -190, 350 78 C 502 312, 628 -136, 810 124 C 954 322, 1082 -72, 1282 224"
              />
            </path>
            <defs>
              <linearGradient id="about-center-ribbon" x1="0%" y1="0%" x2="100%" y2="0%">
                <animate attributeName="x1" values="0%;-12%;0%" dur="18s" repeatCount="indefinite" />
                <animate attributeName="x2" values="100%;112%;100%" dur="18s" repeatCount="indefinite" />
                <stop offset="0%" stopColor="#ff2247">
                  <animate attributeName="stop-color" values="#ff2247;#ff6a00;#ffe600;#2cff89;#00d9ff;#3f5bff;#a23dff;#ff2247" dur="18s" repeatCount="indefinite" />
                </stop>
                <stop offset="30%" stopColor="#ffe600">
                  <animate attributeName="stop-color" values="#ffe600;#2cff89;#00d9ff;#3f5bff;#a23dff;#ff2247;#ff6a00;#ffe600" dur="18s" repeatCount="indefinite" />
                </stop>
                <stop offset="65%" stopColor="#00d9ff">
                  <animate attributeName="stop-color" values="#00d9ff;#3f5bff;#a23dff;#ff2247;#ff6a00;#ffe600;#2cff89;#00d9ff" dur="18s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#a23dff">
                  <animate attributeName="stop-color" values="#a23dff;#ff2247;#ff6a00;#ffe600;#2cff89;#00d9ff;#3f5bff;#a23dff" dur="18s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-12 rounded-[36px] bg-zinc-100 border border-zinc-100 px-6 sm:px-10 lg:px-14 py-10 sm:py-12 lg:py-14 text-zinc-900">
              <p
                className="text-[18px] sm:text-[22px] lg:text-[26px] font-medium text-foreground leading-[1.45] sm:leading-[1.35] lg:leading-[1.32]"
                style={{ letterSpacing: "-0.4px" }}
              >
                I solve complex problems, improve experiences, and build products that create meaningful business results. My career has taken me from agency work designing financial products for KeyBank and First National Bank to enterprise roles at Bath &amp; Body Works and JPMorgan Chase, where I’ve worked across customer experiences, internal platforms, and developer tools.
              </p>
              <p
                className="mt-8 sm:mt-10 text-[18px] sm:text-[22px] lg:text-[26px] font-medium text-foreground leading-[1.45] sm:leading-[1.35] lg:leading-[1.32]"
                style={{ letterSpacing: "-0.4px" }}
              >
                At JPMorgan Chase, I’ve learned to look beyond the interface and understand how customer needs, business strategy, technology, architecture, operations, and data connect. I’m also fascinated by the shift toward faster experimentation, machine learning, and AI, and I enjoy thoughtful conversations about the future of technology, modern design, and design philosophy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 mt-16 sm:mt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h3>Experience</h3>
            <div className="mt-10 space-y-0">
              {experiences.map((item) => (
                <div key={item.title} className="grid grid-cols-[190px_1fr] gap-6 py-4 border-b border-border/70 text-[14px] sm:text-[15px] text-foreground/90">
                  <span className="text-foreground/75">{item.range}</span>
                  <span>
                    {item.title} — {item.company}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <h3>Design Principles</h3>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
              {valueProps.map((item) => (
                <article key={item.title} className="max-w-[360px]">
                  <div className="w-7 h-7 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[12px] font-semibold text-zinc-700">
                    {item.icon}
                  </div>
                  <h4 className="mt-3">{item.title}</h4>
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
