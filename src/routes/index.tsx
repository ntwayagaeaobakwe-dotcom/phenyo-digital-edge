import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroImg from "@/assets/phenyo-hero.jpg";
import bgGrid from "@/assets/bg-grid.jpg";
import {
  ArrowUpRight, TrendingUp, Bot, Code2, Sparkles, Brain, LineChart,
  Workflow, Rocket, Mail, Phone, MapPin, Github, Twitter, Instagram,
  Linkedin, ChevronRight, Zap, Target, Layers, Cpu,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Phenyo | Day Trader, AI Automation Builder & Digital Nomad" },
      { name: "description", content: "Phenyo is a day trader and AI automation builder focused on forex, XAUUSD, intelligent workflows, content systems, and digital business infrastructure." },
      { name: "keywords", content: "Phenyo, day trader, AI automation, forex, XAUUSD, n8n, digital nomad, AI workflows, trading content, vibe coding" },
      { property: "og:title", content: "Phenyo | Day Trader & AI Automation Builder" },
      { property: "og:description", content: "Trading markets. Building systems. Creating digital freedom." },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: "Phenyo | Day Trader & AI Automation Builder" },
      { name: "twitter:description", content: "Trading markets. Building systems. Creating digital freedom." },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Phenyo",
        jobTitle: "Day Trader & AI Automation Builder",
        description: "Day trader focused on XAUUSD and AI automation builder crafting workflows, content systems and digital business infrastructure.",
        knowsAbout: ["Forex Trading", "XAUUSD", "AI Automation", "n8n", "Prompt Engineering", "Web Development"],
      }),
    }],
  }),
});

function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-clip">
      <Nav />
      <Hero />
      <Ticker />
      <About />
      <Expertise />
      <Services />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------- NAV ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["About", "#about"],
    ["Expertise", "#expertise"],
    ["Services", "#services"],
    ["Projects", "#projects"],
    ["Contact", "#contact"],
  ];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "py-3" : "py-5"}`}>
      <div className={`mx-auto max-w-6xl px-4 sm:px-6 transition-all ${scrolled ? "" : ""}`}>
        <div className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 ${scrolled ? "glass" : ""}`}>
          <a href="#" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">P</span>
            <span>Phenyo<span className="text-primary">.</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {links.map(([l, h]) => (
              <a key={h} href={h} className="hover:text-foreground transition">{l}</a>
            ))}
          </nav>
          <a href="#contact" className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
            Work with me <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative pt-40 pb-24 sm:pt-48 sm:pb-32">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div
        className="absolute inset-0 -z-10 opacity-20 mix-blend-screen"
        style={{ backgroundImage: `url(${bgGrid})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            Available for select projects · Q1 2026
          </div>
          <h1 className="mt-6 font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
            Trading Markets.
            <br />
            Building Systems.
            <br />
            <span className="text-gradient-gold">Creating Digital Freedom.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Phenyo is a day trader and AI automation builder focused on XAUUSD trading,
            intelligent workflows, content systems, and digital business infrastructure.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition shadow-[var(--shadow-gold)]">
              View my work <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium hover:bg-white/5 transition">
              Work with me
            </a>
            <a href="#services" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition">
              Explore services <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            {[["XAUUSD", "Primary Pair"], ["n8n", "Automation Stack"], ["24/7", "Digital Nomad"]].map(([v, l]) => (
              <div key={l}>
                <div className="text-2xl font-display font-bold text-gradient-gold">{v}</div>
                <div className="text-xs text-muted-foreground mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-float">
          <div className="absolute -inset-8 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative gold-border rounded-3xl overflow-hidden aspect-[4/5] shadow-[var(--shadow-elegant)]">
            <img
              src={heroImg}
              alt="Phenyo — day trader and AI automation builder"
              width={1024}
              height={1280}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
              <div className="glass-gold rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Now</div>
                  <div className="text-sm font-medium">Building · Trading · Shipping</div>
                </div>
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
          {/* floating cards */}
          <div className="hidden sm:block absolute -left-8 top-10 glass rounded-2xl p-4 w-44 shadow-[var(--shadow-elegant)]">
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><Cpu className="h-3.5 w-3.5 text-primary" /> AI Workflow</div>
            <div className="mt-2 text-sm font-semibold">n8n · Claude · APIs</div>
            <div className="mt-3 flex gap-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-6 flex-1 rounded-sm bg-primary/80" style={{ opacity: 0.3 + i * 0.12 }} />
              ))}
            </div>
          </div>
          <div className="hidden sm:block absolute -right-6 bottom-24 glass rounded-2xl p-4 w-40 shadow-[var(--shadow-elegant)]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">XAUUSD</span>
              <span className="text-primary">+1.24%</span>
            </div>
            <svg viewBox="0 0 100 40" className="mt-2 w-full h-10">
              <polyline
                fill="none"
                stroke="oklch(0.82 0.15 85)"
                strokeWidth="1.5"
                points="0,30 12,26 22,28 32,20 42,22 52,14 62,16 72,10 82,12 100,6"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- TICKER ---------- */
function Ticker() {
  const items = ["XAUUSD", "Forex", "n8n", "Claude", "Lovable", "Supabase", "Vercel", "GitHub", "AI Agents", "Automation", "Vibe Coding", "Digital Nomad", "Chess Strategy"];
  return (
    <div className="border-y border-border/60 py-5 overflow-hidden bg-black/30">
      <div className="flex gap-10 whitespace-nowrap animate-ticker">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="text-sm text-muted-foreground flex items-center gap-3">
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span className="font-display uppercase tracking-widest">{t}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- ABOUT ---------- */
function About() {
  const interests = [
    "Forex & XAUUSD trading", "AI automation", "n8n workflows", "Prompt engineering",
    "Vibe coding", "Web app development", "Digital nomad lifestyle", "Chess & strategy",
    "Online business systems",
  ];
  return (
    <Section id="about" eyebrow="About" title={<>Operating at the intersection of <span className="text-gradient-gold">markets, AI & automation</span>.</>}>
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10">
        <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
          <p>
            Phenyo operates at the intersection of financial markets, artificial intelligence,
            automation, and digital business. As a day trader, he studies market movement, risk,
            psychology, and execution — with a sharp focus on <span className="text-foreground">XAUUSD</span>.
          </p>
          <p>
            As a builder, he experiments with AI tools, workflow automation, web platforms, and
            content systems designed to scale online presence and business operations —
            engineering leverage where most people trade time.
          </p>
          <p className="text-foreground">
            Confident. Curious. Systems-first. Built for the digital edge.
          </p>
        </div>
        <div className="glass rounded-2xl p-6">
          <div className="text-xs uppercase tracking-widest text-primary">Interests</div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {interests.map((i) => (
              <li key={i} className="rounded-full border border-border px-3 py-1.5 text-sm hover:border-primary/60 transition">
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ---------- EXPERTISE ---------- */
function Expertise() {
  const skills = [
    {
      icon: LineChart, title: "Trading & Market Analysis",
      items: ["Forex trading", "XAUUSD / gold-focused trading", "Technical & fundamental analysis", "Trading psychology", "Risk management", "Market structure awareness"],
    },
    {
      icon: Bot, title: "AI Automation",
      items: ["n8n workflow automation", "AI agent workflows", "API integrations", "Lead generation systems", "Content automation pipelines", "Google Sheets & CRM automation"],
    },
    {
      icon: Code2, title: "Web & Product Building",
      items: ["Vibe coding", "Landing page creation", "Lovable / Claude-assisted dev", "Supabase-based systems", "Vercel deployment", "GitHub workflows"],
    },
    {
      icon: Sparkles, title: "Content Systems",
      items: ["Short-form video concepts", "AI influencer systems", "Social media automation", "YouTube Shorts ranking content", "Twitter/X forex content", "Viral research & repurposing"],
    },
    {
      icon: Brain, title: "Strategic Thinking",
      items: ["Chess-inspired decision-making", "Systems thinking", "Digital nomad business building", "Experimentation & rapid iteration"],
    },
  ];
  return (
    <Section id="expertise" eyebrow="Core Expertise" title={<>Five disciplines. <span className="text-gradient-gold">One operator.</span></>}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map((s) => (
          <div key={s.title} className="glass rounded-2xl p-6 hover:border-primary/40 transition group">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
            </div>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              {s.items.map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- SERVICES ---------- */
function Services() {
  const services = [
    { icon: Workflow, tag: "01", title: "AI Automation Workflows", desc: "Custom automation systems using n8n, APIs, Google Sheets, AI agents, and workflow logic to save time, generate leads, organize data, and scale online operations." },
    { icon: LineChart, tag: "02", title: "Trading Content Systems", desc: "Content strategy and automated daily pipelines for forex traders — especially XAUUSD-focused creators who want consistent posts, slides, shorts, and market commentary." },
    { icon: Rocket, tag: "03", title: "AI-Powered Websites", desc: "Modern, high-converting websites and landing pages built with AI-assisted development, clean UI, strong copywriting, and deployment-ready structure." },
    { icon: Target, tag: "04", title: "Digital Brand Strategy", desc: "Helping creators, traders, and entrepreneurs shape their online identity with better positioning, content ideas, automation, and monetization direction." },
    { icon: Sparkles, tag: "05", title: "AI Creator Systems", desc: "Concept development for AI influencers, faceless content accounts, viral short-form formats, and automated social media workflows." },
  ];
  return (
    <Section id="services" eyebrow="Services" title={<>What I <span className="text-gradient-gold">build for you</span>.</>}>
      <div className="grid md:grid-cols-2 gap-5">
        {services.map((s, i) => (
          <div key={s.title} className={`glass rounded-2xl p-7 hover:border-primary/40 transition ${i === 0 ? "md:col-span-2 gold-border" : ""}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-primary font-mono">{s.tag}</div>
                  <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="mt-4 text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- PROJECTS ---------- */
function Projects() {
  const projects = [
    {
      title: "Ms. A — AI Influencer", tag: "AI Creator System",
      desc: "A visual AI influencer concept focused on consistent identity, cinematic social content, luxury branding, and AI-generated media workflows across TikTok, Instagram, Higgsfield, Kling, and Veo.",
      features: ["Consistent character identity", "Short-form social videos", "Luxury black/gold/espresso branding", "AI image/video prompts", "IG/TikTok content direction"],
      accent: "from-fuchsia-500/15 to-transparent",
    },
    {
      title: "XAUUSD Content Automation", tag: "Content Pipeline",
      desc: "Automation concept for generating daily forex content for X/Twitter — gold trading insights, slides, hooks, captions, and market-related posts using AI and n8n.",
      features: ["Daily content automation", "Forex market commentary", "XAUUSD-focused strategy", "Prompt-engineered generation", "Publishing workflow"],
      accent: "from-primary/25 to-transparent",
    },
    {
      title: "Shorts Ranking Engine", tag: "YouTube Shorts System",
      desc: "A content system concept for creating viral YouTube Shorts using clipped content, rankings, and formats like Top 5 fails, cringe moments, shocking moments, and other list-based videos.",
      features: ["Viral ranking formats", "Clip-based content", "Shorts optimization", "Repeatable templates", "AI script & title generation"],
      accent: "from-red-500/15 to-transparent",
    },
    {
      title: "Lead Generation Automation", tag: "n8n Workflow",
      desc: "n8n-based workflows for researching businesses, extracting company details, enriching data, and saving structured outputs into spreadsheets for outreach and business development.",
      features: ["Google Places API workflows", "Data extraction & enrichment", "Google Sheets integration", "Business research automation", "API troubleshooting"],
      accent: "from-cyan-500/15 to-transparent",
    },
  ];
  return (
    <Section id="projects" eyebrow="Selected Work" title={<>Systems shipped, <span className="text-gradient-gold">stories told</span>.</>}>
      <div className="grid gap-5">
        {projects.map((p, i) => (
          <article key={p.title} className="glass rounded-2xl p-7 lg:p-9 group relative overflow-hidden hover:border-primary/40 transition">
            <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${p.accent} opacity-60`} />
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 items-start">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-primary">0{i + 1}</span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">{p.tag}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl lg:text-3xl font-semibold">{p.title}</h3>
                <a href="#contact" className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary hover:gap-2.5 transition-all">
                  View case study <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              <div>
                <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.features.map((f) => (
                    <span key={f} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{f}</span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ---------- EXPERIENCE ---------- */
function Experience() {
  const focus = [
    { icon: LineChart, label: "Day trading & market analysis" },
    { icon: Layers, label: "Building AI-assisted digital products" },
    { icon: Workflow, label: "Creating automation workflows" },
    { icon: Sparkles, label: "Developing trading & content systems" },
    { icon: Zap, label: "Experimenting with AI tools for business, media & web" },
    { icon: Cpu, label: "Cloud, VPS, deployment & web infrastructure" },
  ];
  return (
    <Section id="experience" eyebrow="Experience & Focus Areas" title={<>A working <span className="text-gradient-gold">operating system</span>.</>}>
      <div className="grid md:grid-cols-2 gap-5">
        {focus.map((f) => (
          <div key={f.label} className="glass rounded-2xl p-5 flex items-center gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
              <f.icon className="h-5 w-5" />
            </div>
            <div className="font-medium">{f.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 glass rounded-2xl p-6 border-dashed text-sm text-muted-foreground space-y-1">
        <div>[ Add previous job titles, companies and employment dates here if needed ]</div>
        <div>[ Add educational background here if needed ]</div>
        <div>[ Add certificates, trading programs or relevant courses here if needed ]</div>
      </div>
    </Section>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  const socials = [
    { icon: Twitter, label: "X / Twitter", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
  ];
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="glass-gold rounded-3xl p-8 sm:p-14 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start relative">
            <div>
              <div className="text-xs uppercase tracking-widest text-primary">Contact</div>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Let's build something <span className="text-gradient-gold">smart</span>.
              </h2>
              <p className="mt-5 text-lg text-muted-foreground max-w-lg">
                Whether it's a trading content system, an AI automation workflow, or a modern
                digital brand — let's build something that works.
              </p>
              <div className="mt-8 space-y-3 text-sm">
                <ContactRow icon={Mail} label="Email" value="[ your email here ]" />
                <ContactRow icon={Phone} label="Phone / WhatsApp" value="[ your phone number here ]" />
                <ContactRow icon={MapPin} label="Location" value="Digital nomad — currently based internationally" />
              </div>
            </div>
            <div className="space-y-4">
              <a href="#" className="group flex items-center justify-between rounded-2xl bg-primary px-6 py-5 text-primary-foreground font-medium hover:opacity-90 transition shadow-[var(--shadow-gold)]">
                Start a conversation
                <ArrowUpRight className="h-5 w-5 group-hover:rotate-45 transition-transform" />
              </a>
              <div className="grid grid-cols-2 gap-3">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} className="glass rounded-xl p-4 flex items-center gap-3 hover:border-primary/40 transition">
                    <s.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm">{s.label}</span>
                    <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-foreground">{value}</div>
      </div>
    </div>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-display font-bold text-foreground">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground text-xs">P</span>
          Phenyo<span className="text-primary">.</span>
        </div>
        <div>© {new Date().getFullYear()} Phenyo. Built between trades.</div>
      </div>
    </footer>
  );
}

/* ---------- SECTION SHELL ---------- */
function Section({
  id, eyebrow, title, children,
}: { id: string; eyebrow: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
            <span className="h-px w-8 bg-primary" /> {eyebrow}
          </div>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
