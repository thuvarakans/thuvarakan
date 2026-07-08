import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { ArrowUpRight, Mail, Linkedin, MapPin, Circle, X } from "lucide-react";
import { Cursor3D } from "@/components/Cursor3D";
import { Hero3DText } from "@/components/Hero3DText";

const EMAILJS_SERVICE_ID = "service_wh3smtp";
const EMAILJS_TEMPLATE_ID = "template_40y5g5k";
const EMAILJS_PUBLIC_KEY = "bQlsvw7kd0kI0nvnV";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const experience = [
  { role: "Digital Marketing Specialist", org: "Medfuture Healthcare", period: "Jan 2026 — Present", note: "Leading full-funnel growth, SEO strategy, and paid acquisition across healthcare verticals." },
  { role: "Co-Founder", org: "Softpac", period: "Jan 2026 — Present", note: "Building a marketing & product studio focused on performance-driven digital experiences." },
  { role: "Associate Digital Marketer", org: "SenzMate", period: "Jan 2023 — Sep 2025", note: "Owned SEO, campaigns, analytics, and marketing strategy for IoT and B2B clients." },
  { role: "Digital Marketing Trainee", org: "SenzMate", period: "Mar 2022 — Jan 2023", note: "Shipped on-page SEO, content ops, and paid experiments across Google & Meta." },
  { role: "Digital Marketing Intern", org: "SenzMate", period: "Sep 2021 — Mar 2022", note: "Foundational work in analytics, keyword research, and campaign reporting." },
];

const skillGroups = [
  { title: "Strategy", items: ["Digital Marketing Strategy", "Consumer Psychology", "Growth Frameworks", "Positioning"] },
  { title: "Paid Media", items: ["Google Ads", "Meta Ads", "Performance Marketing", "Conversion Tracking"] },
  { title: "SEO & Content", items: ["Technical SEO", "On-page SEO", "Content Marketing", "Copywriting"] },
  { title: "Technical & Dev", items: ["Web Development", "UI/UX", "AI Automation", "Marketing Automation"] },
];

const services = [
  { n: "01", t: "Web Development", d: "Modern, responsive websites engineered for speed, SEO and conversion." },
  { n: "02", t: "SEO Services", d: "Technical audits, on-page optimisation and content strategies that rank." },
  { n: "03", t: "Social Media Marketing", d: "Editorial systems and paid social that build community and revenue." },
  { n: "04", t: "Strategy Consulting", d: "Positioning, funnels and growth roadmaps grounded in behavioural psychology." },
  { n: "05", t: "Full Digital Marketing", d: "End-to-end ownership of your marketing engine — brand to pipeline." },
  { n: "06", t: "Performance Marketing", d: "ROI-focused paid campaigns across Google, Meta and programmatic." },
];

type CaseStudy = {
  title: string;
  cat: string;
  year: string;
  desc: string;
  tags: string[];
  cover: string;
  highlights: { value: string; label: string }[];
  overview: string;
  challenges: string[];
  strategy: { approach: string; tools: string[] };
  solutions: string[];
  results: string[];
};

const projects: CaseStudy[] = [
  {
    title: "BOOK DOWNLOAD SEO WORKS & WEBSITE DEVELOPMENT",
    cat: "Web Dev & SEO",
    year: "2022",
    desc: "900+ daily users, 93% organic traffic, average position 6. A WordPress book-download platform built and optimised with on-page and off-page SEO to drive sustained organic growth.",
    tags: ["Web Dev", "UI", "UX", "SEO", "WordPress", "Onpage SEO", "Off Page SEO"],
    cover: "https://softpac.co/wp-content/uploads/2025/04/Daily-Free-ebooks-Our-Works-1-min-1536x864.png",
    highlights: [
      { value: "—", label: "Highlight One" },
      { value: "—", label: "Highlight Two" },
      { value: "—", label: "Highlight Three" },
    ],
    overview:
      "A WordPress-based book download platform built from the ground up with a focus on discoverability, performance and long-term organic growth. The project combined web development, UX and a full SEO programme to turn a content library into a compounding traffic engine.",
    challenges: [
      "Low domain authority and near-zero organic visibility at launch.",
      "Thin, duplicate metadata across hundreds of book pages.",
      "Slow WordPress theme with poor Core Web Vitals on mobile.",
      "No structured internal linking between categories, authors and titles.",
    ],
    strategy: {
      approach:
        "A three-track strategy: rebuild the site on a lean WordPress stack, ship a scalable on-page SEO template for every book, and run an ongoing off-page programme to grow authority.",
      tools: ["WordPress", "Yoast SEO", "Google Search Console", "Google Analytics 4", "Ahrefs", "Screaming Frog"],
    },
    solutions: [
      "Custom WordPress theme optimised for Core Web Vitals and mobile-first indexing.",
      "Programmatic title, meta and schema templates for every book, category and author.",
      "Silo-based internal linking between categories, tags and related titles.",
      "Off-page outreach and digital PR to earn contextual backlinks from readers, blogs and directories.",
    ],
    results: [
      "900+ daily active users sustained month over month.",
      "93% of traffic driven by organic search.",
      "Average keyword position of 6 across tracked terms.",
      "Consistent compounding growth without paid acquisition.",
    ],
  },
  {
    title: "FASHION ECOMMERCE SEO & WEBSITE DEVELOPMENT",
    cat: "eCommerce SEO",
    year: "2025",
    desc: "+52% clicks and +44% impressions within 4 months. A fashion eCommerce SEO project covering technical SEO, on-page optimisation, off-page strategy and full audits.",
    tags: ["SEO", "Technical SEO", "Onpage SEO", "Offpage SEO", "SEO Audit"],
    cover: "https://softpac.co/wp-content/uploads/2025/03/Decoroy-Our-Works-min-1536x864.png",
    highlights: [
      { value: "—", label: "Highlight One" },
      { value: "—", label: "Highlight Two" },
      { value: "—", label: "Highlight Three" },
    ],
    overview:
      "A four-month SEO engagement for a fashion eCommerce brand, covering a full technical audit, on-page optimisation across the catalogue, an off-page authority programme and continuous performance reporting.",
    challenges: [
      "Crawl and indexation issues across faceted category pages.",
      "Cannibalisation between similar product and collection URLs.",
      "Weak backlink profile compared with direct competitors.",
      "Underperforming product pages with generic copy and no schema.",
    ],
    strategy: {
      approach:
        "Audit-first approach: fix crawl and indexation, then rebuild on-page SEO across collections and products, then layer a targeted off-page programme aligned with priority commercial queries.",
      tools: ["Google Search Console", "GA4", "Ahrefs", "Semrush", "Screaming Frog", "Shopify / WooCommerce SEO stack"],
    },
    solutions: [
      "Full technical SEO audit and prioritised fix roadmap.",
      "Rewritten titles, metas and copy across collections and top products.",
      "Product and breadcrumb schema deployed sitewide.",
      "Off-page campaign focused on fashion editorials, niche blogs and digital PR.",
    ],
    results: [
      "+52% clicks from organic search within 4 months.",
      "+44% impressions across tracked queries.",
      "Improved rankings on high-intent commercial keywords.",
      "Stronger, more diversified backlink profile.",
    ],
  },
  {
    title: "ESCAPL FINANCE WEBSITE DEVELOPMENT",
    cat: "Web Dev",
    year: "2024",
    desc: "Launched in 5 days, under 2s load time, fully mobile-responsive. A fast, conversion-focused finance website built on WordPress with clean UX and UI.",
    tags: ["Web Dev", "UX", "UI", "WordPress"],
    cover: "https://softpac.co/wp-content/uploads/2025/04/ESCAPL-Our-Works-min-1536x864.png",
    highlights: [
      { value: "—", label: "Highlight One" },
      { value: "—", label: "Highlight Two" },
      { value: "—", label: "Highlight Three" },
    ],
    overview:
      "A rapid-turnaround finance website built on WordPress with a strong focus on trust, clarity and conversion. Designed and shipped end-to-end in under a week without compromising performance or brand quality.",
    challenges: [
      "Tight 5-day launch deadline ahead of a business milestone.",
      "Need to communicate complex finance services simply and credibly.",
      "Strict performance budget for mobile users on variable networks.",
      "Zero existing brand assets or content structure to build on.",
    ],
    strategy: {
      approach:
        "Component-driven WordPress build with a conversion-first information architecture. Prioritised speed, mobile UX and clear CTAs over heavy visual effects.",
      tools: ["WordPress", "Elementor / Custom Blocks", "Figma", "PageSpeed Insights", "GA4"],
    },
    solutions: [
      "Clean, minimal UI aligned with a trustworthy finance brand tone.",
      "Optimised assets, caching and lazy loading for sub-2s load times.",
      "Mobile-first responsive layout across every breakpoint.",
      "Clear service pages and CTAs mapped to core business goals.",
    ],
    results: [
      "Launched in 5 days from kickoff to live.",
      "Under 2s load time on mobile and desktop.",
      "Fully mobile-responsive across all core devices.",
      "Immediately usable as a sales and credibility asset.",
    ],
  },
];


function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Cursor3D />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Skills />
      <Services />
      <Work />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="font-display font-bold text-lg tracking-tight">
          THUVARAKAN<span className="text-accent">®</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {["about", "work", "services", "contact"].map((s) => (
            <a key={s} href={`#${s}`} className="hover:text-accent transition-colors capitalize">{s}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Available for Projects
          </span>
          <a href="#contact" className="text-sm font-medium underline underline-offset-4 decoration-1 hover:text-accent transition-colors">Start Project</a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-16 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />
      <div className="mx-auto max-w-[1400px] relative">
        <div className="flex justify-between items-start mb-8">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <div>Portfolio / 2026</div>
            <div>Colombo → Worldwide</div>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-5xl md:text-6xl font-display font-bold leading-none">120<span className="text-accent">+</span></div>
            <div className="text-xs text-muted-foreground mt-2 uppercase tracking-widest">campaigns shipped</div>
          </div>
        </div>

        <Hero3DText
          text="THUVARAKAN"
          accent="·"
          className="text-display text-[18vw] md:text-[13vw] leading-[0.85] break-words select-none"
        />


        <div className="mt-10 grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <p className="text-xl md:text-2xl font-display leading-tight max-w-2xl">
              Digital Marketing Specialist — blending <em className="text-accent not-italic">psychology</em>, SEO and performance marketing to build brands that actually convert.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-wrap gap-3">
            <a href="#work" className="group inline-flex items-center gap-3 bg-foreground text-background px-6 py-4 rounded-full text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
              View My Work
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-3 border border-foreground px-6 py-4 rounded-full text-sm font-medium hover:bg-foreground hover:text-background transition-colors">
              Contact Me <Circle className="w-3 h-3 fill-current" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["SEO", "Performance Marketing", "Google Ads", "Meta Ads", "Content Strategy", "AI Automation", "UX", "Analytics"];
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="border-y border-border py-6 overflow-hidden bg-secondary">
      <div className="flex marquee-track whitespace-nowrap">
        {doubled.map((w, i) => (
          <span key={i} className="text-3xl md:text-5xl font-display font-bold px-8 flex items-center gap-8">
            {w} <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-8">
      <span className="text-accent">({n})</span>
      <span>—— {label}</span>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="px-6 md:px-10 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <SectionLabel n="01" label="About" />
          <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
            A curious marketer with an experimenter's mindset.
          </h2>
        </div>
        <div className="md:col-span-7 md:col-start-6 space-y-6 text-lg leading-relaxed">
          <p>
            I'm Sivanesasuntharam Thuvarakan — a self-driven digital marketer obsessed with the intersection of <span className="text-accent">psychology, marketing, and technology</span>. I don't just run campaigns; I diagnose problems, test hypotheses and build systems that compound.
          </p>
          <p className="text-muted-foreground">
            Over the last five years I've helped SaaS, healthcare and eCommerce brands turn ambiguous goals into measurable growth — through SEO, paid media, automation, and a healthy respect for how humans actually decide.
          </p>
          <div className="pt-6 grid sm:grid-cols-2 gap-4">
            <EduCard
              school="Cardiff Metropolitan University"
              deg="BA (Hons) Digital Marketing"
              period="Sep 2022 — Oct 2023"
              grade="Second Class, Division One"
            />
            <EduCard
              school="ICBT Campus"
              deg="Higher Diploma in Digital Marketing"
              period="Sep 2020 — Jul 2022"
              grade="Foundation to Advanced"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function EduCard({ school, deg, period, grade }: { school: string; deg: string; period: string; grade: string }) {
  return (
    <div className="p-5 border border-border rounded-xl bg-card hover:border-accent transition-colors">
      <div className="text-xs font-mono text-muted-foreground mb-2">{period}</div>
      <div className="font-display font-semibold">{school}</div>
      <div className="text-sm text-muted-foreground mt-1">{deg}</div>
      <div className="text-xs mt-3 text-accent">{grade}</div>
    </div>
  );
}

function Experience() {
  return (
    <section className="px-6 md:px-10 py-24 md:py-32 bg-secondary border-y border-border">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel n="02" label="Experience" />
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-16 leading-none">Where I've<br/>built <span className="text-accent">growth.</span></h2>
        <div className="divide-y divide-border border-y border-border">
          {experience.map((e, i) => (
            <div key={i} className="group grid grid-cols-12 gap-4 py-8 hover:bg-background transition-colors cursor-pointer">
              <div className="col-span-1 font-mono text-sm text-muted-foreground">0{i + 1}</div>
              <div className="col-span-12 md:col-span-4">
                <div className="text-xl md:text-2xl font-display font-semibold group-hover:text-accent transition-colors">{e.role}</div>
              </div>
              <div className="col-span-6 md:col-span-3 text-muted-foreground">{e.org}</div>
              <div className="col-span-6 md:col-span-3 font-mono text-sm text-muted-foreground">{e.period}</div>
              <div className="col-span-12 md:col-span-1 flex justify-end">
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all" />
              </div>
              <div className="col-span-12 md:col-start-2 md:col-span-11 text-sm text-muted-foreground max-w-3xl">{e.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="px-6 md:px-10 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-5">
            <SectionLabel n="03" label="Capabilities" />
            <h2 className="text-5xl md:text-6xl font-display font-bold leading-[0.9]">The full<br/>marketing<br/><span className="text-accent">stack.</span></h2>
          </div>
          <p className="md:col-span-6 md:col-start-7 text-lg text-muted-foreground self-end">
            A T-shaped skill set — deep in SEO and paid, broad across content, automation and development. I ship end-to-end.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillGroups.map((g) => (
            <div key={g.title} className="p-6 rounded-2xl border border-border bg-card hover:bg-foreground hover:text-background transition-colors group">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground group-hover:text-background/60 mb-6">{g.title}</div>
              <ul className="space-y-3">
                {g.items.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-base font-display">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="px-6 md:px-10 py-24 md:py-32 bg-foreground text-background">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-background/60 mb-8">
          <span className="text-accent">(04)</span>
          <span>—— Services</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-16 leading-none">
          Six ways I can <span className="text-accent">move</span><br/>your numbers.
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-background/10">
          {services.map((s) => (
            <div key={s.n} className="p-8 bg-foreground group hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer min-h-[220px] flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="font-mono text-sm text-background/50 group-hover:text-accent-foreground/60">{s.n}</span>
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-semibold mb-3">{s.t}</h3>
                <p className="text-sm text-background/70 group-hover:text-accent-foreground/80">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  const [active, setActive] = useState<CaseStudy | null>(null);

  return (
    <section id="work" className="px-6 md:px-10 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel n="05" label="Selected Work" />
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-16 leading-none">Case<br/>studies<span className="text-accent">.</span></h2>
        <div className="space-y-6">
          {projects.map((p) => (
            <article key={p.title} className="group grid md:grid-cols-12 gap-6 p-6 md:p-8 rounded-3xl border border-border hover:border-foreground transition-colors">
              <div className="md:col-span-5 aspect-[4/3] rounded-2xl bg-secondary overflow-hidden relative">
                <img
                  src={p.cover}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute inset-0 flex items-end p-6">
                  <span className="text-5xl md:text-6xl font-display font-bold text-background mix-blend-difference">{p.title.split(" ")[0]}</span>
                </div>
              </div>
              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{p.cat} · {p.year}</span>
                    <button
                      onClick={() => setActive(p)}
                      className="group/btn inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-full text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      See Results
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
                    </button>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-display font-bold mb-4 leading-tight group-hover:text-accent transition-colors">{p.title}</h3>
                  <p className="text-muted-foreground max-w-xl leading-relaxed">{p.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-6">
                  {p.tags.map((t) => (
                    <span key={t} className="px-3 py-1 text-xs border border-border rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {active && <CaseStudyModal study={active} onClose={() => setActive(null)} />}
    </section>
  );
}

function CaseStudyModal({ study, onClose }: { study: CaseStudy; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-background/85 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="min-h-full flex items-start justify-center p-4 md:p-8">
        <div
          className="relative w-full max-w-5xl rounded-3xl border border-border bg-card shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="fixed md:absolute top-6 right-6 z-10 p-3 rounded-full border border-border bg-card hover:bg-foreground hover:text-background transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Cover */}
          <div className="relative aspect-[16/7] w-full bg-secondary overflow-hidden">
            <img src={study.cover} alt={study.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          </div>

          <div className="p-6 md:p-14 space-y-14">
            {/* Header */}
            <header>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
                <span className="text-accent">Case Study</span>
                <span>——</span>
                <span>{study.cat} · {study.year}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
                {study.title}
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {study.tags.map((t) => (
                  <span key={t} className="px-3 py-1 text-xs border border-border rounded-full">{t}</span>
                ))}
              </div>
            </header>

            {/* Highlights */}
            <section>
              <SubLabel n="01" label="Highlights" />
              <div className="grid sm:grid-cols-3 gap-4">
                {study.highlights.map((h, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-border bg-background">
                    <div className="text-4xl md:text-5xl font-display font-bold text-accent leading-none">{h.value}</div>
                    <div className="mt-3 text-sm text-muted-foreground uppercase tracking-widest font-mono">{h.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Overview */}
            <section className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-4"><SubLabel n="02" label="Overview" /></div>
              <p className="md:col-span-8 text-lg leading-relaxed text-muted-foreground">{study.overview}</p>
            </section>

            {/* Challenges */}
            <section className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-4"><SubLabel n="03" label="Challenges" /></div>
              <ul className="md:col-span-8 space-y-3">
                {study.challenges.map((c, i) => (
                  <li key={i} className="flex gap-3 text-base leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Strategy & Tools */}
            <section className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-4"><SubLabel n="04" label="Strategy & Tools" /></div>
              <div className="md:col-span-8 space-y-6">
                <p className="text-base leading-relaxed text-muted-foreground">{study.strategy.approach}</p>
                <div className="flex flex-wrap gap-2">
                  {study.strategy.tools.map((t) => (
                    <span key={t} className="px-3 py-1 text-xs font-mono border border-border rounded-full bg-background">{t}</span>
                  ))}
                </div>
              </div>
            </section>

            {/* Solutions */}
            <section className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-4"><SubLabel n="05" label="Solutions" /></div>
              <ul className="md:col-span-8 space-y-3">
                {study.solutions.map((s, i) => (
                  <li key={i} className="flex gap-3 text-base leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Results */}
            <section className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-4"><SubLabel n="06" label="Results" /></div>
              <ul className="md:col-span-8 space-y-3">
                {study.results.map((r, i) => (
                  <li key={i} className="flex gap-3 text-base leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* CTA */}
            <section className="rounded-3xl border border-border bg-background p-8 md:p-12 text-center">
              <h3 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                Want results like this for <span className="text-accent italic">your brand?</span>
              </h3>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Let's talk about your goals and how we can turn them into a measurable growth story.
              </p>
              <a
                href="#contact"
                onClick={onClose}
                className="mt-8 group inline-flex items-center gap-3 bg-foreground text-background px-6 py-4 rounded-full text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Contact Us
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
      <span className="text-accent">({n})</span>
      <span>—— {label}</span>
    </div>
  );
}


function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          from_name: form.name,
          email: form.email,
          from_email: form.email,
          reply_to: form.email,
          user_email: form.email,
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      toast.success("Message sent — I'll be in touch shortly.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Couldn't send message. Please try again or email me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="px-6 md:px-10 py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-12">
        <div className="md:col-span-6">
          <SectionLabel n="06" label="Contact" />
          <h2 className="text-6xl md:text-8xl font-display font-bold leading-[0.85] mb-10">
            Let's build<br/>something<br/><span className="text-accent italic">worth clicking.</span>
          </h2>
          <div className="space-y-4">
            <a href="mailto:Thuvarakan@Softpac.co" className="flex items-center gap-3 text-lg hover:text-accent transition-colors group">
              <Mail className="w-5 h-5" /> Thuvarakan@Softpac.co
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href="https://www.linkedin.com/in/thuvarakan-/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-lg hover:text-accent transition-colors group">
              <Linkedin className="w-5 h-5" /> linkedin.com/in/thuvarakan-
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <div className="flex items-center gap-3 text-lg text-muted-foreground">
              <MapPin className="w-5 h-5" /> Colombo, Sri Lanka
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="md:col-span-6 space-y-6 p-8 rounded-3xl border border-border bg-card"
        >
          <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <div>
            <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-2 w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 resize-none text-base"
              placeholder="Tell me about your project…"
            />
          </div>
          <button type="submit" disabled={sending} className="w-full group inline-flex items-center justify-center gap-3 bg-foreground text-background px-6 py-5 rounded-full text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            {sending ? "Sending…" : "Let's Work Together"}
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-base"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="px-6 md:px-10 py-10 border-t border-border">
      <div className="mx-auto max-w-[1400px] flex flex-col md:flex-row justify-between gap-4 text-sm text-muted-foreground">
        <div>© 2026 Sivanesasuntharam Thuvarakan. All rights reserved.</div>
        <div className="font-mono">Built with intent · Colombo → ∞</div>
      </div>
    </footer>
  );
}
