import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Menu,
  Send,
  X,
} from "lucide-react";
import { ContactBackground } from "@/components/backgrounds/ContactBackground";
import { HeroBackground } from "@/components/backgrounds/HeroBackground";
import { IntroBackground } from "@/components/backgrounds/IntroBackground";
import { PricingBackground } from "@/components/backgrounds/PricingBackground";
import { StackBackground } from "@/components/backgrounds/StackBackground";
import { CinematicFooter } from "@/components/cinematic-footer";
import { HeroTerminal } from "@/components/hero-terminal";
import { RevealSection } from "@/components/reveal-section";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ProcessScrollSection } from "@/components/ui/ProcessScrollSection";
import { ScrollProgressHud } from "@/components/ui/ScrollProgressHud";
import { RevealCard, ThreeDCardRevealSection } from "@/components/ui/ThreeDCardRevealSection";
import { TextScramble } from "@/components/ui/text-scramble";
import { StickyDesktopCTA } from "@/components/ui/sticky-desktop-cta";
import { FloatingMobileCTA } from "@/components/ui/floating-mobile-cta";
import { FreelanceStatusBadge } from "@/components/ui/freelance-status-badge";
import { KineticLabel } from "@/components/typography/KineticLabel";
import { SplitTextReveal } from "@/components/typography/SplitTextReveal";
import { ContactLinksGroup } from "@/components/contact-links-group";
import { ContactForm } from "@/components/contact-form";
import { motionTimings, premiumEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const services: RevealCard[] = [
  {
    title: "Landing Pages",
    description: "High-converting one-page websites for products, services, campaigns, and personal brands.",
    tags: ["One Page", "CTA", "Responsive", "Fast Delivery"],
    meta: [
      ["service.status", "available"],
      ["delivery.mode", "remote"],
    ],
  },
  {
    title: "Business Websites",
    description: "Professional websites for small businesses with clear sections, contact options, and mobile-first layouts.",
    tags: ["Home", "About", "Services", "Contact"],
    meta: [
      ["service.status", "available"],
      ["delivery.mode", "remote"],
    ],
  },
  {
    title: "Student & FYP Project Frontends",
    description: "Clean and demo-ready interfaces for university projects, dashboards, and web applications.",
    tags: ["Dashboard", "Auth Screens", "Demo Flow", "UI Polish"],
    meta: [
      ["service.status", "available"],
      ["delivery.mode", "remote"],
    ],
  },
  {
    title: "Website Redesigns",
    description: "Modern redesigns for outdated websites with improved layout, responsiveness, and user experience.",
    tags: ["Redesign", "Mobile Fix", "Better UX", "Modern Layout"],
    meta: [
      ["service.status", "available"],
      ["delivery.mode", "remote"],
    ],
  },
];

const projects: RevealCard[] = [
  {
    title: "Restaurant Website Demo",
    type: "Small Business Website",
    status: "Coming Soon",
    code: `// BUILD_QUEUE [01]
const RestaurantWebsite = {
  category: "Food & Beverage",
  type: "Business Website",
  pages: ["Home", "Menu", "Gallery", "Contact"],
  status: "queue"
}`,
  },
  {
    title: "Business Landing Page",
    type: "Marketing Website",
    status: "Coming Soon",
    code: `// BUILD_QUEUE [02]
const BusinessLanding = {
  category: "SaaS / Startup",
  type: "Landing Page",
  features: ["Hero", "CTA", "Pricing", "FAQ"],
  status: "queue"
}`,
  },
  {
    title: "Dashboard UI",
    type: "Admin Interface",
    status: "Coming Soon",
    code: `// BUILD_QUEUE [03]
const DashboardUI = {
  category: "Student / Startup",
  type: "Admin Interface",
  modules: ["Analytics", "Users", "Settings"],
  status: "queue"
}`,
  },
  {
    title: "Portfolio Redesign",
    type: "Personal Brand Website",
    status: "Coming Soon",
    code: `// BUILD_QUEUE [04]
const PortfolioRedesign = {
  category: "Personal Branding",
  type: "Portfolio",
  sections: ["Work", "About", "Contact"],
  status: "queue"
}`,
  },
];

const processSteps = [
  { step: "01_DISCUSS", body: "We define your goal, content, pages, and design direction." },
  { step: "02_PLAN", body: "I structure the website sections and user flow before development." },
  { step: "03_BUILD", body: "I create a responsive interface using modern web tools." },
  { step: "04_LAUNCH", body: "The website is deployed and shared as a live link." },
];

const pricing = [
  {
    title: "Starter Landing Page",
    price: "Starting from PKR 15,000",
    detail: "A focused one-page website for a service, campaign, product, or personal brand.",
  },
  {
    title: "Business Website",
    price: "Starting from PKR 35,000",
    detail: "A complete business presence with clear sections, contact flow, and responsive layout.",
    featured: true,
  },
  {
    title: "Custom Project UI",
    price: "Starting from PKR 25,000",
    detail: "Demo-ready frontend screens for students, FYP teams, startups, and dashboards.",
  },
];

const stackGroups = [
  {
    title: "Frontend",
    command: "ui.render()",
    items: ["React", "TypeScript", "Tailwind CSS", "Responsive UI"],
  },
  {
    title: "Motion",
    command: "motion.sequence()",
    items: ["GSAP", "ScrollTrigger", "Framer Motion", "Lenis"],
  },
  {
    title: "Delivery",
    command: "deploy.preview()",
    items: ["GitHub", "Vercel", "Netlify", "Client Handoff"],
  },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "navbar fixed inset-x-0 top-0 z-[100] transition-colors duration-500 backdrop-blur-xl",
        isScrolled ? "bg-black/90 border-b border-white/15 shadow-xl" : "bg-black/70 border-b border-transparent"
      )}
    >
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8" aria-label="Primary navigation">
        <a href="#home" aria-label="Home" className="group flex min-w-0 items-center gap-3">
          <img
            src="/download (1).png"
            alt="Zaid Rasool logo"
            className="logo-z h-7 w-auto object-contain md:h-9"
          />
          <span className="font-mono text-xs tracking-[0.35em] text-white sm:text-sm">
            ZAID.DEV
          </span>
        </a>

        <div className="hidden items-center gap-7 text-xs text-neutral-300 lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-white">
              <TextScramble text={link.label} />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <MagneticButton href="#contact" className="hidden bg-white text-black hover:bg-black hover:text-white sm:inline-flex">
            <TextScramble text="Let's Talk" />
          </MagneticButton>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center border border-white/20 text-white lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="relative z-[110] border-t border-white/12 bg-black/96 px-4 pb-4 shadow-[0_18px_70px_rgba(0,0,0,0.72)] lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2 pt-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="min-h-12 border border-white/12 bg-white/[0.025] px-4 py-3.5 text-sm text-neutral-200">
                <TextScramble text={link.label} />
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 42, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: motionTimings.section, ease: premiumEase }}
      className="mb-9 max-w-3xl sm:mb-12"
    >
      <KineticLabel label={label} />
      <SplitTextReveal
        text={title}
        className="font-display text-glitch-soft mt-4 text-[clamp(1.85rem,8.8vw,2.35rem)] font-black uppercase leading-[1.02] tracking-[-0.015em] text-white sm:text-5xl sm:leading-[0.95] sm:tracking-[-0.04em]"
      />
      {subtitle ? <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/68 sm:mt-6 sm:text-lg sm:leading-8">{subtitle}</p> : null}
    </motion.div>
  );
}

function PricingMobileCarousel({ pricing }: { pricing: any[] }) {
  const [active, setActive] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const containerCenter = container.getBoundingClientRect().left + container.clientWidth / 2;
          let closestIndex = 0;
          let minDistance = Infinity;

          const cards = container.querySelectorAll(".pricing-mobile-card");
          cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const distance = Math.abs(cardCenter - containerCenter);

            if (distance < minDistance) {
              minDistance = distance;
              closestIndex = index;
            }
          });

          setActive(closestIndex);
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    
    // Initial check for mobile on mount
    onScroll();

    return () => {
      container.removeEventListener("scroll", onScroll);
    };
  }, [pricing.length]);

  return (
    <div className="md:hidden">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
          Swipe to compare plans
        </span>
        <span className="font-mono text-[10px] text-white/40">
          {String(active + 1).padStart(2, "0")} / {String(pricing.length).padStart(2, "0")}
        </span>
      </div>
      <div className="mb-6 h-px w-full overflow-hidden bg-white/10">
        <span 
          className="block h-full bg-white/70 transition-all duration-300" 
          style={{ width: `${((active + 1) / pricing.length) * 100}%` }} 
        />
      </div>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 px-4 pb-4 -mx-4 sm:px-6 sm:-mx-6"
        aria-label="Pricing plans carousel"
      >
        {pricing.map((plan, index) => {
          const isActive = index === active;
          return (
            <article
              key={plan.title}
              className={cn(
                "pricing-mobile-card snap-center shrink-0 min-w-[84vw] max-w-[420px] flex flex-col overflow-hidden border bg-black/78 p-5 backdrop-blur transition-all duration-300 sm:p-7",
                isActive 
                  ? "border-white/40 scale-100 opacity-100 shadow-[0_0_28px_rgba(255,255,255,0.045)]" 
                  : "border-white/15 scale-[0.97] opacity-70",
                plan.featured && isActive && "border-white/50 shadow-[0_0_48px_rgba(255,255,255,0.12)]"
              )}
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">{plan.featured ? "recommended" : "package"}</p>
              <h3 className="font-display mt-5 text-xl font-black uppercase tracking-[-0.025em] sm:text-2xl sm:tracking-[-0.035em]">{plan.title}</h3>
              <p className="mt-4 font-mono text-base font-semibold leading-7 text-white sm:text-lg">{plan.price}</p>
              <p className="mt-5 text-[15px] leading-7 text-white/64 sm:text-base sm:leading-8">{plan.detail}</p>
              <div className="mt-8">
                <MagneticButton href="#contact" className="w-full">
                  <TextScramble text="DISCUSS PROJECT" />
                  <ArrowRight size={16} />
                </MagneticButton>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <div className="noise-layer" />
      <ScrollProgressHud />
      <StickyDesktopCTA triggerElementId="home" />
      <FloatingMobileCTA contactUrl="#contact" />

      <Navbar />

      <main className="relative z-10">
        <section className="intro-scene relative grid min-h-[100svh] place-items-center overflow-hidden px-4">
          <IntroBackground />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.25, ease: premiumEase }}
            className="relative text-center"
          >
            <div className="absolute -inset-8 -z-10 border border-white/20 opacity-80 [transform:rotateX(58deg)_rotateZ(45deg)] sm:-inset-16 sm:opacity-90" />
            <p className="font-display text-glitch-soft text-[clamp(2.55rem,12.5vw,3.6rem)] font-black uppercase tracking-[-0.035em] sm:text-7xl sm:tracking-[-0.05em] lg:text-8xl">ZAID.DEV</p>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/55 sm:text-xs sm:tracking-[0.36em]">PORTFOLIO_INTERFACE</p>
            <a href="#home" aria-label="Scroll to enter" className="mt-12 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/55 transition hover:text-white">
              SCROLL_TO_ENTER <ArrowDown size={14} className="text-white/55" />
            </a>
          </motion.div>
        </section>

        <section id="home" className="relative min-h-[100svh] overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pb-28 lg:px-8">
          <HeroBackground />
          <div className="absolute inset-x-4 top-20 z-10 hidden border-y border-white/12 bg-black/35 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45 backdrop-blur sm:block lg:inset-x-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
              <span>ZAID.DEV</span>
              <span className="hidden lg:inline">WEB_DEVELOPER / COMPUTER_ENGINEERING_STUDENT</span>
              <span>001 / PORTFOLIO_INTERFACE</span>
            </div>
          </div>

          <div className="relative mx-auto grid min-h-[calc(100svh-7rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
            <div className="min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 18, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: motionTimings.text, ease: premiumEase }}
                className="mb-6 inline-flex flex-col gap-3 sm:mb-7"
              >
                <div className="inline-flex max-w-full border border-white/18 bg-black/70 px-3 py-2 font-mono text-[10px] tracking-[0.08em] text-neutral-300 shadow-[0_0_30px_rgba(255,255,255,0.08)] sm:text-xs">
                  <span className="mr-2 text-white">001</span> / PORTFOLIO_INTERFACE
                </div>
                <div className="inline-block">
                  <FreelanceStatusBadge size="md" />
                </div>
              </motion.div>
              <SplitTextReveal
                as="h1"
                by="lines"
                text={"Clean\nwebsites"}
                className="font-display text-glitch-soft max-w-5xl text-[clamp(3rem,14.5vw,4.3rem)] font-black uppercase leading-[0.9] tracking-[-0.035em] text-white sm:text-7xl sm:tracking-[-0.055em] lg:text-[6.4rem]"
              />
              <motion.p
                initial={{ opacity: 0, y: 26, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: motionTimings.textSlow, delay: 0.32, ease: premiumEase }}
                className="mt-7 max-w-2xl text-base leading-8 text-white/72 sm:mt-8 sm:text-lg sm:leading-9"
              >
                For businesses, startups, students, and personal brands that need a professional online presence.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 24, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: motionTimings.text, delay: 0.48, ease: premiumEase }}
                className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row"
              >
                <MagneticButton href="#contact" className="w-full bg-white text-black hover:bg-black hover:text-white sm:w-auto">
                  <TextScramble text="START A PROJECT" />
                  <Send size={17} />
                </MagneticButton>
                <MagneticButton href="#services" className="w-full sm:w-auto">
                  <TextScramble text="VIEW SERVICES" />
                  <ArrowRight size={17} />
                </MagneticButton>
              </motion.div>
            </div>

            <HeroTerminal />
          </div>
        </section>

        <div className="border-y border-white/12 bg-black/85">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:px-6 lg:px-8">
            {["RESPONSIVE_DESIGN", "CLEAN_UI", "FAST_DELIVERY", "DEPLOYMENT_SUPPORT"].map((point) => (
              <span key={point} className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-300 sm:text-xs sm:tracking-[0.2em]">
                {point}
              </span>
            ))}
          </div>
        </div>

        <ThreeDCardRevealSection
          id="services"
          label="/services"
          title="What I can build for you"
          subtitle="Focused website builds for small businesses, startups, students, and personal brands that need a clean online presence."
          cards={services}
        />

        <ProcessScrollSection steps={processSteps} />

        <ThreeDCardRevealSection
          id="projects"
          label="/queue"
          title="Build queue"
          subtitle="Intentional demos in development. Polished samples showcasing different website types for businesses, startups, and students. Each demo is built to completion before adding to the portfolio."
          cards={projects}
          mode="projects"
          cta={
            <MagneticButton href="#contact" className="w-full bg-white text-black hover:bg-black hover:text-white sm:w-auto">
              Want to be featured here?
              <ArrowRight size={16} />
            </MagneticButton>
          }
        />

        <RevealSection id="stack" className="relative min-h-0 overflow-hidden py-20 sm:py-28 lg:min-h-screen lg:pt-36">
          <StackBackground />
          <div className="grid gap-14 lg:grid-cols-[0.74fr_1.26fr] lg:items-center">
            <div>
              <SectionHeader
                label="/stack"
                title="Toolchain that ships"
                subtitle="A focused frontend workflow for building polished, responsive, client-ready websites without overcomplicating the stack."
              />
              <div className="mt-8 grid gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-white/44 sm:mt-10 sm:text-xs sm:tracking-[0.18em]">
                {["package.ready", "interface.clean", "responsive.true", "deploy.supported"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="h-px w-10 bg-white/35" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="stack-console relative border border-white/14 bg-black/78 p-4 shadow-[0_0_38px_rgba(255,255,255,0.055)] backdrop-blur sm:p-7">
              <div className="mb-5 flex items-center justify-between gap-3 border-b border-white/12 pb-4 font-mono text-[11px] text-white/42 sm:text-xs">
                <span>toolchain.map</span>
                <span>runtime: frontend</span>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {stackGroups.map((group, index) => (
                  <motion.article
                    key={group.title}
                    initial={{ opacity: 0, y: 28, rotateX: 10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * motionTimings.stagger, duration: motionTimings.card, ease: premiumEase }}
                    className="stack-module relative overflow-hidden border border-white/12 bg-white/[0.025] p-4"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/36">{group.command}</p>
                    <h3 className="font-display mt-5 text-lg font-black uppercase tracking-[-0.03em] text-white">{group.title}</h3>
                    <div className="mt-5 grid gap-2">
                      {group.items.map((item) => (
                        <span key={item} className="border border-white/10 bg-black/55 px-3 py-2 font-mono text-xs text-white/62">
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </div>
              <div className="mt-6 grid gap-2 border border-white/10 bg-black/60 p-4 font-mono text-xs leading-6 text-white/48">
                <span>&gt; build.interface()</span>
                <span>&gt; test.responsive()</span>
                <span>&gt; deploy.live_link()</span>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection id="pricing" className="relative min-h-0 overflow-hidden py-20 sm:py-28 lg:min-h-[112vh]">
          <PricingBackground />
          <SectionHeader
            label="/pricing"
            title="Simple starting prices"
            subtitle="Clear starting points for common website needs. Final scope depends on pages, content, timeline, and custom interface requirements."
          />
          
          <PricingMobileCarousel pricing={pricing} />

          <div className="hidden md:grid gap-6 lg:grid-cols-3">
            {pricing.map((plan, index) => (
              <motion.article
                key={plan.title}
                initial={{ opacity: 0, y: 54, rotateX: 8, scale: 0.96, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: index * motionTimings.stagger, duration: motionTimings.card, ease: premiumEase }}
                whileHover={{ y: -4, rotateX: 1.2, rotateY: index === 1 ? 0 : index === 0 ? -1.2 : 1.2 }}
                className={cn(
                  "pricing-panel group relative flex min-h-[318px] flex-col overflow-hidden border border-white/14 bg-black/78 p-5 shadow-[0_0_28px_rgba(255,255,255,0.045)] backdrop-blur sm:min-h-[354px] sm:p-7",
                  plan.featured && "border-white/48 shadow-[0_0_48px_rgba(255,255,255,0.12)]",
                )}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-white/12" />
                  <div className="absolute inset-x-6 top-0 h-px bg-white/45 shadow-[0_0_18px_rgba(255,255,255,0.5)]" />
                </div>
                <div className="pointer-events-none absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.24em] text-white/16">
                  scope_{String(index + 1).padStart(2, "0")}
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">{plan.featured ? "recommended" : "package"}</p>
                <h3 className="font-display mt-5 text-xl font-black uppercase tracking-[-0.025em] sm:text-2xl sm:tracking-[-0.035em]">{plan.title}</h3>
                <p className="mt-4 font-mono text-base font-semibold leading-7 text-white sm:text-lg">{plan.price}</p>
                <p className="mt-5 text-[15px] leading-7 text-white/64 sm:text-base sm:leading-8">{plan.detail}</p>
                <div className="mt-auto pt-6">
                  <MagneticButton href="#contact" className="w-full">
                    <TextScramble text="DISCUSS PROJECT" />
                    <ArrowRight size={16} />
                  </MagneticButton>
                </div>
              </motion.article>
            ))}
          </div>
        </RevealSection>

        <RevealSection id="contact" className="relative overflow-hidden py-20 sm:py-28">
          <ContactBackground />
          <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr]">
            <motion.div
              initial={{ opacity: 0, x: -36, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: motionTimings.section, ease: premiumEase }}
            >
              <SectionHeader label="/contact" title="Let's build your website" />
              <div className="mb-5 h-px w-full max-w-md overflow-hidden bg-white/10">
                <span className="contact-transmission-line block h-full w-1/2 bg-white/55" />
              </div>
              <p className="-mt-4 mb-8 max-w-xl text-[15px] leading-7 text-white/68 sm:-mt-5 sm:mb-9 sm:text-lg sm:leading-8">
                Have an idea, business, project, or brand that needs a clean website? Send me a message and I'll help you plan the next step.
              </p>
              <div className="mb-8">
                <FreelanceStatusBadge size="md" />
              </div>
              <div className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-white/40">
                Direct contact
              </div>
              <ContactLinksGroup
                variant="stack"
                animated
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 54, scale: 0.97, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: motionTimings.card, ease: premiumEase }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </RevealSection>
      </main>

      <CinematicFooter />
    </div>
  );
}

export default App;
