import { useState, useRef } from "react";
import { Download, ArrowUpRight, Mail, Send, ChevronDown, Menu, X, Linkedin } from "lucide-react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router";
import { caseStudies } from "./data/caseStudies";
import CaseStudyPage from "./CaseStudyPage";
import { useTheme } from "./hooks/useTheme";
import { ThemeToggle } from "./components/ThemeToggle";
import resumePdf from "../assets/Attachments/Tamare_Reese_Resume_2026_Final.pdf";

function Portfolio() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();

  const scrollToContact = () => {
    setMenuOpen(false);
    setTimeout(() => contactRef.current?.scrollIntoView({ behavior: "smooth" }), 10);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    const recipient = "tamaredesign@outlook.com";
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name || "Website Visitor"}`);
    const body = encodeURIComponent(
      [
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        "",
        "Message:",
        formData.message,
      ].join("\n")
    );

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    setFormStatus("sent");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Instrument Sans', sans-serif" }}
    >
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border backdrop-blur-md bg-background/80">
        <div className="flex items-center justify-between px-5 sm:px-8 py-5">
          <span
            className="text-lg font-bold tracking-tight text-foreground"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Tamare Reese
          </span>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#work" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Work</a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
            <button onClick={scrollToContact} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</button>
            <ThemeToggle isDark={isDark} toggle={toggle} />
            <a
              href="https://www.linkedin.com/in/tamarereese/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              style={{ borderRadius: "var(--radius)" }}
            >
              <Download size={14} />
              Resume
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle isDark={isDark} toggle={toggle} />
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md px-5 py-4 flex flex-col gap-4">
            <a href="#work" onClick={() => setMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1">Work</a>
            <a href="#about" onClick={() => setMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1">About</a>
            <button onClick={scrollToContact} className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1 text-left">Contact</button>
            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors w-full justify-center mt-1"
              style={{ borderRadius: "var(--radius)" }}
            >
              <Download size={14} />
              Download Resume
            </a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="min-h-[290px] sm:min-h-screen flex flex-col justify-start sm:justify-end pb-12 sm:pb-20 px-5 sm:px-8 pt-20 sm:pt-32 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(242,240,234,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(242,240,234,0.04) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="mt-[40px] sm:mt-0 mb-5 sm:mb-6 flex items-center gap-3">
            <span className="text-xs font-medium tracking-widest uppercase text-primary">
              Lead UX Designer, UX Strategy, Service Design, and AI Developer
            </span>
            <div className="h-px flex-1 max-w-[60px] bg-primary opacity-60" />
          </div>

          <h1
            className="font-extrabold leading-[0.9] tracking-tight mb-8"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
            }}
          >
            Crafting
            <br />
            <span className="text-primary">interfaces</span>
            <br />
            that matter.
          </h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8 border-t border-border pt-8">
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl leading-relaxed">
              Lead UX Designer with 10+ years of experience designing enterprise products, platforms, and systems that drive measurable business outcomes.
            </p>
            <div className="flex items-center gap-6 shrink-0">
              <button
                onClick={scrollToContact}
                className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors group"
              >
                Get in touch
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <a href="#work" className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ChevronDown size={16} />
                See work
              </a>
            </div>
          </div>
        </div>

      </section>

      {/* Case Studies */}
      <section id="work" className="px-5 sm:px-8 py-16 sm:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10 sm:mb-16">
            <h2
              className="text-3xl sm:text-4xl font-bold leading-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Selected Work
            </h2>
            <span className="text-muted-foreground text-sm">6 case studies</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-px bg-transparent sm:bg-border">
            {caseStudies.map((study) => (
              <div
                key={study.id}
                className="bg-background group cursor-pointer relative overflow-hidden"
                onMouseEnter={() => setHoveredCard(study.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => navigate(`/work/${study.slug}`)}
              >
                <div className="relative h-48 sm:h-56 overflow-hidden bg-secondary">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-90"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-20"
                    style={{ backgroundColor: study.color }}
                  />
                  <div
                    className={`absolute bottom-4 right-4 w-8 h-8 flex items-center justify-center transition-all duration-300 ${
                      hoveredCard === study.id ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 translate-x-1 translate-y-1"
                    }`}
                    style={{ backgroundColor: study.color, borderRadius: "50%" }}
                  >
                    <ArrowUpRight size={14} color="#0D0E1A" />
                  </div>
                </div>

                <div className="p-5 sm:p-6 border-t border-border">
                  <h3
                    className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors"
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  >
                    {study.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{study.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-5 sm:px-8 py-16 sm:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">About</span>
            <h2
              className="text-3xl sm:text-4xl font-bold leading-tight mb-8"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              I turn complexity
              <br />
              into clarity.
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I&apos;m a Lead Experience Designer, Strategist, Researcher, and AI Developer based in Columbus, Ohio.
              </p>
              <p>
                I’m passionate about solving complex problems through design, technology, and the evolving role of AI. My approach is rooted in systems thinking—I believe the best experiences are built around how people naturally think and work.
              </p>
              <p>
                Over the past 10+ years, including more than six years at JPMorgan Chase and earlier work with KeyBank and First National Bank, I&apos;ve designed customer-facing and enterprise solutions that simplify workflows, improve experiences, and drive measurable business outcomes.
              </p>
              <p>
                I&apos;m currently open to new opportunities and connecting with teams that are passionate about building exceptional products.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px bg-border lg:self-center">
            {[
              { value: "10+", label: "Years in UX Design & Strategy" },
              { value: "2+", label: "Years in AI & Front-End Development" },
              { value: "4+", label: "Years in Product Management" },
              { value: "6+", label: "Years Leading User Research" },
            ].map((stat) => (
              <div key={stat.label} className="bg-background p-6 sm:p-8">
                <div
                  className="text-4xl sm:text-5xl font-extrabold text-primary mb-2"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 sm:mt-16 border-t border-border pt-12 sm:pt-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-border">
            {["Product Strategy", "UX Research", "Interaction Design", "Design Systems", "Prototyping", "Front-End Dev"].map((skill) => (
              <div key={skill} className="bg-background px-4 sm:px-6 py-4 text-sm text-muted-foreground text-center hover:text-foreground transition-colors">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section ref={contactRef} id="contact" className="px-5 sm:px-8 py-16 sm:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">Contact</span>
            <h2
              className="text-3xl sm:text-4xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Let&apos;s work
              <br />
              together.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-sm">
              Have a project in mind or want to explore working together? Send me a message
              and I&apos;ll get back to you within 24 hours.
            </p>
            <a
              href="mailto:tamaredesign@outlook.com"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <Mail size={14} />
              tamaredesign@outlook.com
              <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          <div>
            {formStatus === "sent" ? (
              <div className="flex flex-col items-start gap-4 py-12">
                <div
                  className="text-3xl sm:text-4xl font-bold text-primary"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  Message sent.
                </div>
                <p className="text-muted-foreground">Thanks for reaching out — I&apos;ll be in touch soon.</p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="text-sm text-muted-foreground hover:text-foreground underline transition-colors mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="border border-border p-4 sm:p-5 focus-within:border-primary transition-colors">
                  <label className="block text-xs text-muted-foreground mb-2 tracking-wide uppercase">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/40 text-sm outline-none"
                  />
                </div>
                <div className="border border-t-0 border-border p-4 sm:p-5 focus-within:border-primary transition-colors">
                  <label className="block text-xs text-muted-foreground mb-2 tracking-wide uppercase">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/40 text-sm outline-none"
                  />
                </div>
                <div className="border border-t-0 border-border p-4 sm:p-5 focus-within:border-primary transition-colors">
                  <label className="block text-xs text-muted-foreground mb-2 tracking-wide uppercase">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/40 text-sm outline-none resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full flex items-center justify-center gap-2 py-4 font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition-all"
                >
                  {formStatus === "sending" ? "Sending..." : <><Send size={14} />Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-5 sm:px-8 py-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="text-sm font-bold text-foreground"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Tamare Reese
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a
              href="https://www.linkedin.com/in/tamarereese/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
          </div>
          <span className="text-xs text-muted-foreground">© 2024 Tamare Reese</span>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/work/:slug" element={<CaseStudyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
