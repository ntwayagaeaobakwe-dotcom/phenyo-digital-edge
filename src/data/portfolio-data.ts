export interface SkillCategory {
  title: string;
  iconName: string;
  items: string[];
}

export interface ServiceItem {
  tag: string;
  title: string;
  desc: string;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tag: string;
  desc: string;
  challenge: string;
  objective: string;
  techStack: string[];
  features: string[];
  valueCreated: string;
  accent: string;
}

export interface FocusArea {
  label: string;
  iconName: string;
}

export const PERSONAL_INFO = {
  name: "Phenyo",
  title: "Day Trader & AI Automation Architect",
  tagline: "Market Discipline. AI Leverage. Digital Dominance.",
  headline: "Trading Markets. Building Systems. Creating Digital Freedom.",
  subheadline:
    "Phenyo is a day trader and AI automation builder focused on XAUUSD trading, intelligent n8n workflows, content systems, and high-converting digital business infrastructure.",
  status: "Available for select projects · Q1 2026",
  location: "Digital Nomad · International (UTC+4 / GMT)",
  email: "ntwayagaeaobakwe@gmail.com",
  phone: "+971555170113",
  socials: [
    { label: "X / Twitter", href: "https://x.com", iconName: "Twitter" },
    { label: "Instagram", href: "https://instagram.com", iconName: "Instagram" },
    { label: "GitHub", href: "https://github.com", iconName: "Github" },
    { label: "LinkedIn", href: "https://linkedin.com", iconName: "Linkedin" },
  ],
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "ROI Calculator", href: "#roi-calculator" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const HERO_STATS = [
  { value: "XAUUSD", label: "Primary Gold Pair" },
  { value: "n8n", label: "Automation Stack" },
  { value: "24/7", label: "Autonomous Systems" },
];

export const TICKER_ITEMS = [
  "XAUUSD",
  "Forex",
  "n8n Workflows",
  "Claude 3.7",
  "Lovable",
  "Supabase",
  "Vercel",
  "GitHub",
  "AI Agents",
  "Automation Pipelines",
  "Vibe Coding",
  "Digital Nomad",
  "Chess Strategy",
];

export const ABOUT_PILLARS = [
  {
    title: "Market Execution",
    desc: "Precision XAUUSD gold trading focused on technical analysis, market structure, risk control, and psychological discipline.",
  },
  {
    title: "AI Systems Engineering",
    desc: "Designing autonomous n8n workflows, API integrations, and AI agent architectures that automate complex operations.",
  },
  {
    title: "Digital Leverage",
    desc: "Building high-converting web apps and content pipelines designed to scale online presence and business impact effortlessly.",
  },
];

export const INTERESTS = [
  "Forex & XAUUSD Trading",
  "AI Workflow Automation",
  "n8n Pipelines",
  "Prompt Engineering",
  "Vibe Coding",
  "Full-Stack Web Dev",
  "Digital Nomad Lifestyle",
  "Chess & Decision Strategy",
  "Online Leverage & Scaling",
];

export const EXPERTISE_SKILLS: SkillCategory[] = [
  {
    title: "Trading & Market Analysis",
    iconName: "LineChart",
    items: [
      "Forex trading",
      "XAUUSD / gold-focused trading",
      "Technical & fundamental analysis",
      "Trading psychology & discipline",
      "Strict risk management",
      "Market structure & liquidity",
    ],
  },
  {
    title: "AI & Workflow Automation",
    iconName: "Bot",
    items: [
      "n8n custom workflows",
      "Autonomous AI agents",
      "REST API integrations",
      "Lead generation engines",
      "Content automation pipelines",
      "CRM & Google Sheets sync",
    ],
  },
  {
    title: "Web & Product Building",
    iconName: "Code2",
    items: [
      "Vibe coding & AI-assisted dev",
      "High-converting landing pages",
      "Vite & React architecture",
      "Supabase backend systems",
      "Vercel & CI/CD deployment",
      "Git & GitHub workflows",
    ],
  },
  {
    title: "Content & Brand Engines",
    iconName: "Sparkles",
    items: [
      "Short-form video concepts",
      "AI influencer architectures",
      "Automated social pipelines",
      "YouTube Shorts ranking formats",
      "Twitter/X forex insights",
      "Content repurposing workflows",
    ],
  },
  {
    title: "Strategic Execution",
    iconName: "Brain",
    items: [
      "Chess-inspired strategy",
      "First-principles systems design",
      "Digital nomad business models",
      "Rapid iteration & deployment",
    ],
  },
];

export const SERVICES: ServiceItem[] = [
  {
    tag: "01",
    title: "AI Automation Workflows",
    desc: "Bespoke automation pipelines using n8n, custom APIs, AI agents, and Google Workspace to eliminate manual work, capture leads, and scale online operations.",
    iconName: "Workflow",
  },
  {
    tag: "02",
    title: "Trading Content Systems",
    desc: "Automated content generation engines for forex and gold creators — producing daily posts, slides, market commentary, and video scripts on autopilot.",
    iconName: "LineChart",
  },
  {
    tag: "03",
    title: "AI-Powered Web Apps",
    desc: "Modern, high-converting websites and digital platforms engineered with AI-assisted development, clean UI/UX, responsive layouts, and production-ready code.",
    iconName: "Rocket",
  },
  {
    tag: "04",
    title: "Digital Brand Strategy",
    desc: "Strategic brand positioning for traders, creators, and online operators wanting high-end visual presence, structured offerings, and leverage.",
    iconName: "Target",
  },
  {
    tag: "05",
    title: "AI Creator Systems",
    desc: "Concept development and technical pipelines for AI influencers, faceless video accounts, viral shorts formats, and automated publishing flows.",
    iconName: "Sparkles",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "zoomex-capital",
    title: "ZoomEx Capital",
    tag: "Trading Brand Infrastructure",
    desc: "Institutional-grade digital branding and client acquisition portal tailored for financial trading and market advisory services.",
    challenge: "Connecting high-frequency market authority with a seamless, trust-building onboarding experience.",
    objective: "Engineered a high-converting web portal with live risk parameters and clear client conversion pathways.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "n8n Pipelines", "TradingView Widgets"],
    features: [
      "Institutional dark UI/UX design",
      "Automated trader inquiry funnel",
      "Market metrics preview display",
      "Lead qualification & CRM sync",
    ],
    valueCreated: "Structured for scalable workflows and premium market credibility.",
    accent: "from-amber-500/15 to-transparent",
  },
  {
    id: "ms-a-ai",
    title: "Ms. A — AI Influencer",
    tag: "AI Creator System",
    desc: "A luxury visual AI influencer concept focused on consistent character identity, cinematic social media content, and automated AI video production pipelines.",
    challenge: "Maintaining photorealistic visual consistency across dynamic multi-platform video and image assets.",
    objective: "Built a repeatable AI content generation engine using state-of-the-art generative video models and custom prompt stacks.",
    techStack: ["Higgsfield AI", "Kling AI", "Veo", "n8n", "ComfyUI"],
    features: [
      "Consistent AI character model",
      "Short-form cinematic reels",
      "Luxury black & gold asset suite",
      "Automated caption & script generation",
      "Multi-platform publishing workflow",
    ],
    valueCreated: "Created as a premium concept for faceless digital media scaling.",
    accent: "from-fuchsia-500/15 to-transparent",
  },
  {
    id: "xauusd-automation",
    title: "XAUUSD Content Automation",
    tag: "Content Pipeline",
    desc: "Autonomous workflow system generating daily gold trading analysis for X/Twitter — compiling market insights, visual charts, and post scheduling.",
    challenge: "Manual gold market analysis formatting and chart creation was consuming 3+ hours of daily operator bandwidth.",
    objective: "Automated gold market data synthesis, chart graphic generation, and scheduled Twitter/X publishing.",
    techStack: ["n8n", "Claude 3.7 API", "Twitter API v2", "Google Sheets", "Node.js"],
    features: [
      "Daily gold market commentary",
      "n8n automated scheduling",
      "XAUUSD technical insights",
      "Prompt-engineered copy generation",
      "Zero-friction automated publishing",
    ],
    valueCreated: "Designed to save 15+ hours weekly while maintaining daily publishing consistency.",
    accent: "from-primary/25 to-transparent",
  },
  {
    id: "shorts-engine",
    title: "Shorts Ranking Engine",
    tag: "YouTube Shorts System",
    desc: "A viral YouTube Shorts production framework designed to turn long-form clips and ranking lists into automated, engaging short-form video assets.",
    challenge: "Repurposing raw video archives into high-retention 60-second vertical ranking formats was slow and labor-intensive.",
    objective: "Engineered automated clip selection, script formatting, dynamic captions, and YouTube upload prep.",
    techStack: ["Python", "n8n", "Whisper AI", "Claude API", "YouTube Data API"],
    features: [
      "Viral listicle video formats",
      "Clip parsing & ranking scripts",
      "Shorts SEO optimization",
      "Repeatable video templates",
      "AI title & hook generator",
    ],
    valueCreated: "Built to improve operational clarity and speed for short-form content channels.",
    accent: "from-red-500/15 to-transparent",
  },
  {
    id: "lead-gen-n8n",
    title: "Lead Generation Automation",
    tag: "n8n Workflow",
    desc: "Automated business research engine extracting targeted company metrics, enriching lead details via APIs, and outputting clean data directly to CRM.",
    challenge: "Manual lead enrichment was slow, inconsistent, and prone to inaccurate data entry.",
    objective: "Built an autonomous web scraping and API enrichment pipeline targeting high-intent business leads.",
    techStack: ["n8n", "Google Places API", "Clearbit API", "Google Sheets", "Supabase"],
    features: [
      "Automated business research",
      "API data enrichment & verification",
      "Google Sheets & CRM integration",
      "Outreach automation readiness",
      "Error-handling & retry logic",
    ],
    valueCreated: "Structured for scalable workflows, handling hundreds of leads automatically per batch.",
    accent: "from-cyan-500/15 to-transparent",
  },
];

export const FOCUS_AREAS: FocusArea[] = [
  { label: "Day trading & XAUUSD market analysis", iconName: "LineChart" },
  { label: "Building AI-assisted digital products & web apps", iconName: "Layers" },
  { label: "Architecting autonomous n8n automation workflows", iconName: "Workflow" },
  { label: "Developing trading & content publishing systems", iconName: "Sparkles" },
  { label: "Experimenting with cutting-edge AI tools & agents", iconName: "Zap" },
  { label: "Cloud VPS, Vercel, Supabase & web infrastructure", iconName: "Cpu" },
];

export const CREDENTIALS_SUMMARY = [
  "Specialized XAUUSD Gold Trader with strict risk management principles",
  "Experienced n8n & API Automation Architect for digital businesses",
  "Vite, React & AI-assisted Web Application Developer",
];

export const FORM_SERVICE_OPTIONS = [
  "n8n AI Automation",
  "Trading Content Engine",
  "AI Website / Web App",
  "Lead Generation System",
  "Digital Brand Strategy",
  "Not Sure Yet",
];

export const FORM_BUDGET_OPTIONS = [
  "Under $1,000",
  "$1,000 - $3,000",
  "$3,000 - $5,000",
  "$5,000+",
];

export const HERO_TERMINAL_TABS = [
  {
    id: "xauusd",
    label: "XAUUSD",
    items: [
      { label: "Market focus", value: "Gold / XAUUSD" },
      { label: "Discipline", value: "Risk-first execution" },
      { label: "Signal style", value: "Technical + fundamental awareness" },
    ],
  },
  {
    id: "workflow",
    label: "AI Workflow",
    items: [
      { label: "Stack", value: "n8n · APIs · AI Agents" },
      { label: "Use case", value: "Lead enrichment, CRM sync, reporting" },
      { label: "Goal", value: "Reduce manual operations" },
    ],
  },
  {
    id: "content",
    label: "Content Engine",
    items: [
      { label: "Channels", value: "X/Twitter · Shorts · Instagram" },
      { label: "Use case", value: "Market commentary, slides, scripts" },
      { label: "Goal", value: "Consistent publishing at scale" },
    ],
  },
];

export const ROI_CALCULATOR_DEFAULTS = {
  hoursPerWeek: 15,
  teamSize: 3,
  hourlyCost: 45,
  automationPct: 70,
};
