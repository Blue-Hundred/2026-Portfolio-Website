import { BrowserRouter, Link, Routes, Route, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { caseStudies, visibleCaseStudySlugs } from "./data/caseStudies";
import CaseStudyPage from "./CaseStudyPage";
import AboutPage from "./AboutPage";
import DesignSystemShowcase from "./design-system/DesignSystemShowcase";
import { CustomCursor } from "./components/CustomCursor";
import { ThemeToggle } from "./components/ThemeToggle";
import { useTheme } from "./hooks/useTheme";
import cfbCoverImage from "../assets/covers/CFB Cover.png";
import databasesCoverImage from "../assets/covers/Databases cover image.png";
import tamareLightLogo from "../assets/Favicon/Tamare Light Logo.svg";
import tamareDarkLogo from "../assets/Favicon/Tamare Dark Logo.svg";

const RESUME_PDF_URL = "/Tamare_Reese_Resume_2026_Final.pdf";

function Portfolio() {
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const homepageCaseStudies = caseStudies.filter((study) => visibleCaseStudySlugs.includes(study.slug));
  const availableHomepageSlugs = new Set(homepageCaseStudies.map((study) => study.slug));
  const headerLogo = isDark ? tamareLightLogo : tamareDarkLogo;

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!revealElements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.02,
        rootMargin: "0px 0px -2% 0px",
      }
    );

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    revealElements.forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${Math.min(index * 70, 280)}ms`);
      element.classList.remove("is-visible");

      const elementTop = element.getBoundingClientRect().top;
      if (elementTop <= viewportHeight * 1.15) {
        element.classList.add("is-visible");
        return;
      }

      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("overflow-y");
    document.documentElement.style.removeProperty("overflow");
    document.documentElement.style.removeProperty("overflow-y");
  }, []);

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

  const featuredCards = [
    {
      slug: "chase-first-banking",
      title: "Family Banking",
      company: "Chase",
      coverImage: cfbCoverImage,
    },
    {
      slug: "shared-control-planes",
      title: "Database Service Management",
      company: "Chase",
      coverImage: databasesCoverImage,
    },
  ];

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background text-foreground" style={{ fontFamily: "var(--font-family-sans)" }}>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-4 sm:py-6 flex items-center justify-between gap-4">
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
        <div
          id="mobile-main-nav"
          className="sm:hidden fixed inset-0 z-[70] bg-white text-zinc-900 opacity-100 pointer-events-auto"
        >
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

      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 pt-16 sm:pt-24 lg:pt-32 pb-8 sm:pb-10 home-load home-load-hero">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 items-start">
          <h1 className="text-[42px] sm:text-[56px] lg:text-[72px] leading-[1.02] font-bold tracking-tight">Tamaré Reese</h1>
          <div className="pt-2">
            <p
              className="text-[18px] sm:text-[22px] lg:text-[26px] font-medium text-foreground max-w-xl leading-[1.45] sm:leading-[1.35] lg:leading-[1.32]"
              style={{ letterSpacing: "-0.4px" }}
            >
              I solve complex problems, improve experiences, and ship successful products.
            </p>
            <a
              href="https://www.linkedin.com/in/tamarereese/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex mt-6 w-10 h-10 items-center justify-center rounded-full border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
                <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.85-3.037-1.853 0-2.136 1.445-2.136 2.94v5.666H9.347V9h3.414v1.561h.049c.476-.9 1.636-1.85 3.367-1.85 3.6 0 4.265 2.37 4.265 5.455v6.286zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM7.119 20.452H3.555V9h3.564v11.452z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section className="relative mt-12 sm:mt-20 overflow-x-hidden" data-reveal>
        <div className="absolute left-1/2 -translate-x-1/2 -top-20 sm:-top-28 h-[31rem] sm:h-[40rem] lg:h-[48rem] w-[150vw] min-w-[1200px] max-w-none pointer-events-none opacity-72 overflow-visible" aria-hidden>
          <svg viewBox="0 -500 1200 1400" className="w-full h-full overflow-visible hero-ribbon-svg" preserveAspectRatio="none">
            <path
              className="hero-ribbon-path"
              d="M-160 345 C -45 130, 195 -140, 360 72 C 500 255, 625 -115, 790 95 C 940 285, 1045 -35, 1270 215"
              fill="none"
              stroke="url(#homepage-ribbon)"
              strokeWidth="210"
              strokeLinecap="round"
            >
              <animate
                attributeName="d"
                dur="34s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.14;0.29;0.45;0.62;0.79;0.9;1"
                keySplines="0.55 0 0.25 1;0.45 0 0.25 1;0.5 0 0.2 1;0.4 0 0.25 1;0.52 0 0.2 1;0.44 0 0.25 1;0.5 0 0.2 1"
                values="M-176 348 C -78 128, 158 -198, 346 78 C 500 324, 628 -142, 812 126 C 956 334, 1090 -78, 1288 232;
M-176 286 C -18 86, 220 -228, 386 132 C 534 398, 706 -54, 842 52 C 980 180, 1128 -152, 1288 268;
M-176 378 C -112 236, 134 -82, 320 28 C 486 128, 560 -186, 754 156 C 910 402, 1008 28, 1288 166;
M-176 314 C -46 108, 236 -212, 424 116 C 572 384, 708 -96, 874 122 C 1002 300, 1142 -46, 1288 248;
M-176 392 C -130 274, 114 -52, 304 38 C 466 120, 542 -206, 730 166 C 896 430, 992 42, 1288 154;
M-176 326 C -56 118, 218 -194, 404 102 C 558 346, 678 -124, 848 136 C 994 334, 1122 -70, 1288 224;
M-176 356 C -88 188, 164 -132, 340 64 C 496 254, 596 -162, 786 140 C 936 362, 1044 0, 1288 198;
M-176 348 C -78 128, 158 -198, 346 78 C 500 324, 628 -142, 812 126 C 956 334, 1090 -78, 1288 232"
              />
            </path>
            <defs>
              <linearGradient id="homepage-ribbon" x1="0%" y1="0%" x2="100%" y2="0%">
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

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-16 sm:pb-24 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 lg:gap-8">
          {featuredCards.map((card) => {
            const canNavigate = availableHomepageSlugs.has(card.slug);

            return (
              <button
                key={card.title}
                type="button"
                onClick={() => canNavigate && navigate(`/work/${card.slug}`)}
                data-cursor="magnify"
                data-reveal
                className="group isolate w-full aspect-square text-left rounded-[32px] flex flex-col hover:-translate-y-0.5 transition-all relative overflow-hidden justify-end p-0 border-0 appearance-none"
                style={{
                  backgroundImage: `linear-gradient(to top, rgba(24,24,27,0.92) 0%, rgba(24,24,27,0.24) 36%, rgba(24,24,27,0) 62%), url(${card.coverImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="relative z-10 p-5 sm:p-6">
                  <span className="inline-flex w-fit px-3 py-1 rounded-full text-xs font-medium mb-4 border border-white text-white bg-black/25">
                    {card.company}
                  </span>
                  <h4
                    className="text-[22px] sm:text-[26px] leading-tight font-medium text-white"
                    style={{ letterSpacing: "-0.6px" }}
                  >
                    {card.title}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="relative mt-12 sm:mt-20 pb-14 sm:pb-24 overflow-x-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 -top-10 sm:-top-14 h-[24rem] sm:h-[30rem] w-[145vw] min-w-[1100px] max-w-none pointer-events-none opacity-70 overflow-visible" aria-hidden>
          <svg viewBox="0 -300 1200 980" className="w-full h-full overflow-visible cta-ribbon-svg" preserveAspectRatio="none">
            <path
              className="cta-ribbon-path"
              d="M-160 340 C -40 120, 200 -150, 360 70 C 500 260, 620 -120, 790 90 C 940 280, 1050 -40, 1270 210"
              fill="none"
              stroke="url(#cta-ribbon-gradient)"
              strokeWidth="150"
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
              <linearGradient id="cta-ribbon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <animate attributeName="x1" values="0%;-10%;0%" dur="17s" repeatCount="indefinite" />
                <animate attributeName="x2" values="100%;110%;100%" dur="17s" repeatCount="indefinite" />
                <stop offset="0%" stopColor="#ff2750">
                  <animate attributeName="stop-color" values="#ff2750;#ff7f2a;#ffe95b;#3ef2ab;#25d6ff;#5a66ff;#b25cff;#ff2750" dur="17s" repeatCount="indefinite" />
                </stop>
                <stop offset="34%" stopColor="#ffe95b">
                  <animate attributeName="stop-color" values="#ffe95b;#3ef2ab;#25d6ff;#5a66ff;#b25cff;#ff2750;#ff7f2a;#ffe95b" dur="17s" repeatCount="indefinite" />
                </stop>
                <stop offset="68%" stopColor="#25d6ff">
                  <animate attributeName="stop-color" values="#25d6ff;#5a66ff;#b25cff;#ff2750;#ff7f2a;#ffe95b;#3ef2ab;#25d6ff" dur="17s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#b25cff">
                  <animate attributeName="stop-color" values="#b25cff;#ff2750;#ff7f2a;#ffe95b;#3ef2ab;#25d6ff;#5a66ff;#b25cff" dur="17s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="rounded-[28px] sm:rounded-[34px] bg-black text-white px-5 sm:px-12 py-14 sm:py-24 flex flex-col items-center text-center">
          <h2
            className="text-[42px] sm:text-[58px] lg:text-[72px] font-semibold max-w-[520px] pb-1 text-white leading-[1.08]"
            style={{ letterSpacing: "-1.8px" }}
          >
            Let's Connect!
          </h2>
          <a
            href="mailto:tamaredesign@outlook.com"
            className="mt-8 sm:mt-10 inline-flex bg-white text-black rounded-full px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Tamaredesign@outlook.com
          </a>
          <span className="mt-4 text-xs text-white/70">© Tamaré Reese</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/design-system" element={<DesignSystemShowcase />} />
        <Route path="/work/:slug" element={<CaseStudyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
