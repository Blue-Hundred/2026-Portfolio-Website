import { BrowserRouter, Link, Routes, Route, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { caseStudies, visibleCaseStudySlugs } from "./data/caseStudies";
import CaseStudyPage from "./CaseStudyPage";
import AboutPage from "./AboutPage";
import { CustomCursor } from "./components/CustomCursor";
import { ThemeToggle } from "./components/ThemeToggle";
import { useTheme } from "./hooks/useTheme";
import { CaseStudyPresentationPage } from "../components/case-study/CaseStudyPresentationPage";
import { CaseStudyRoutedPage } from "../components/case-study/CaseStudyRoutedPage";
import DesignSystemPage from "./DesignSystemPage";
import cfbCoverImage from "../assets/covers/FB_Cover_1.png";
import databasesCoverImage from "../assets/covers/Databases_Cover_4.png";
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
      company: "Financial Institution",
      coverImage: cfbCoverImage,
    },
    {
      slug: "shared-control-planes",
      title: "Database Service Management",
      company: "Financial Institution",
      coverImage: databasesCoverImage,
    },
  ];

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-4 sm:py-6 flex items-center justify-between gap-4">
          <Link to="/" aria-label="Go to home" className="inline-flex">
            <img src={headerLogo} alt="Tamaré Reese logo" className="h-8 sm:h-9 w-auto" />
          </Link>

          <nav
            className="hidden sm:flex items-center gap-4 sm:gap-6 text-[16px] font-medium text-foreground/80"
            style={{
              fontFamily: 'Inter, -apple-system, system-ui, "Segoe UI", Roboto, sans-serif',
              fontFeatureSettings: "normal",
              fontVariationSettings: "normal",
            }}
          >
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <a href={RESUME_PDF_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Resume</a>
            <ThemeToggle isDark={isDark} toggle={toggle} />
          </nav>

          <div className="sm:hidden flex items-center gap-2">
            <ThemeToggle isDark={isDark} toggle={toggle} />
            <button
              type="button"
              className="relative w-10 h-10 flex items-center justify-center text-foreground/90 hover:text-foreground transition-colors"
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
        </div>

      </header>

      {isMobileMenuOpen && (
        <div
          id="mobile-main-nav"
          className="sm:hidden fixed inset-0 z-[70] bg-background text-foreground opacity-100 pointer-events-auto"
        >
          <div className="h-full px-6 pt-6 pb-10 flex flex-col mobile-menu-shell mobile-menu-shell-open">
          <div className="flex items-center justify-between">
            <img src={headerLogo} alt="Tamaré Reese logo" className="h-10 w-auto" />
            <button
              type="button"
              className="relative w-10 h-10 flex items-center justify-center text-foreground hover:opacity-75 transition-opacity"
              aria-label="Close menu"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="absolute h-0.5 w-4 rounded-full bg-current rotate-45" />
              <span className="absolute h-0.5 w-4 rounded-full bg-current -rotate-45" />
            </button>
          </div>

          <nav className="mt-16 flex flex-col text-foreground">
            <Link
              to="/"
              className="mobile-menu-link py-3 border-b border-border hover:opacity-80 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Typography variant="mobileMenuLink" component="span">Home</Typography>
            </Link>
            <Link
              to="/about"
              className="mobile-menu-link py-3 border-b border-border hover:opacity-80 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Typography variant="mobileMenuLink" component="span">About</Typography>
            </Link>
            <a
              href={RESUME_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-menu-link py-3 border-b border-border hover:opacity-80 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Typography variant="mobileMenuLink" component="span">Resume</Typography>
            </a>
          </nav>
        </div>
        </div>
      )}

      <section className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 pt-12 sm:pt-20 lg:pt-32 pb-2 sm:pb-3 home-load home-load-hero">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 items-start">
          <Typography variant="display" component="h1">
            Tamaré Reese
          </Typography>
          <div className="pt-2">
            <Typography
              variant="blockQuote"
              component="p"
              className="text-foreground max-w-xl"
              sx={{
                fontSize: { xs: "1.25rem", sm: "1.625rem" },
                lineHeight: { xs: "30px", sm: "36px" },
              }}
            >
              I'm a Product Designer based in Columbus, Ohio, turning complex problems into intuitive experiences and successful products.
            </Typography>
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

      <section className="relative -mt-8 sm:-mt-12 overflow-x-hidden" data-reveal>
        <div className="absolute left-1/2 -translate-x-1/2 -top-6 sm:-top-10 h-[24rem] sm:h-[40rem] lg:h-[48rem] w-[150vw] min-w-[900px] sm:min-w-[1200px] max-w-none pointer-events-none opacity-72 overflow-visible" aria-hidden>
          <svg viewBox="0 -120 1200 1400" className="w-full h-full overflow-visible hero-ribbon-svg" preserveAspectRatio="none">
            <path
              className="hero-ribbon-path"
              d="M-170 330 C -20 170, 170 170, 320 330 C 470 490, 650 490, 800 330 C 960 160, 1130 160, 1290 330"
              fill="none"
              stroke="url(#homepage-ribbon)"
              strokeWidth="210"
              strokeLinecap="round"
            >
              <animate
                attributeName="d"
                dur="30s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.25;0.5;0.75;1"
                keySplines="0.45 0 0.2 1;0.45 0 0.2 1;0.45 0 0.2 1;0.45 0 0.2 1"
                values="M-170 330 C -20 170, 170 170, 320 330 C 470 490, 650 490, 800 330 C 960 160, 1130 160, 1290 330;
M-170 300 C -10 140, 180 140, 330 300 C 480 460, 660 460, 810 300 C 965 145, 1135 145, 1290 300;
M-170 350 C -15 190, 175 190, 325 350 C 475 510, 655 510, 805 350 C 970 185, 1140 185, 1290 350;
M-170 315 C -25 155, 165 155, 315 315 C 465 475, 645 475, 795 315 C 955 150, 1125 150, 1290 315;
M-170 330 C -20 170, 170 170, 320 330 C 470 490, 650 490, 800 330 C 960 160, 1130 160, 1290 330"
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

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 pt-20 sm:pt-[120px] lg:pt-[160px] pb-16 sm:pb-24 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 lg:gap-8">
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
                  backgroundImage: `url(${card.coverImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="relative z-10 p-5 sm:p-6">
                  <span className="inline-flex w-fit px-3 py-1 rounded-full text-xs font-medium mb-4 border border-black text-black bg-white/80">
                    {card.company}
                  </span>
                  <Typography variant="h4" component="h4" className="text-black">
                    {card.title}
                  </Typography>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <footer className="mt-12 sm:mt-20 bg-[rgb(19,21,42)] text-white px-5 sm:px-8 lg:px-10 py-14 sm:py-24 flex flex-col items-center text-center">
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
        <Route path="/design-system" element={<DesignSystemPage />} />
        <Route path="/case-study-presentation" element={<CaseStudyPresentationPage />} />
        <Route path="/work/:caseStudyId/:flowId" element={<CaseStudyRoutedPage />} />
        <Route path="/work/:slug" element={<CaseStudyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
