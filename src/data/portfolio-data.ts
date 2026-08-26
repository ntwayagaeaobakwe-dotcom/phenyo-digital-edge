export interface SkillCategory {
  title: string;
  iconName: string;
  items: string[];
}

export interface ServiceItem {
  tag: string;
  title: string;
  problem: string;
  solution: string;
  potentialBenefit: string;
  supportingTools: string;
  processSteps: string[];
  desc: string;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tag: string;
  status:
    | "Completed Build"
    | "Personal Project"
    | "Capability Demonstration"
    | "Concept Project"
    | "Work in Progress";
  desc: string;
  problem: string;
  solution: string;
  howItWorks: string[];
  potentialValue: string;
  toolsUsed: string[];
  disclaimer?: string;
  /**
   * Screenshot(s) or workflow-diagram export(s) shown in a browser-chrome frame
   * on the project card and in the detail modal. Paths currently point at
   * placeholder files that do not exist yet — see the comment above PROJECTS
   * below for how to wire in real exports.
   */
  imageUrls?: string[];
  accent: string;
  // Backward compatibility fields
  challenge: string;
  objective: string;
  techStack: string[];
  features: string[];
  valueCreated: string;
}

export interface FocusArea {
  label: string;
  iconName: string;
}

export interface CompanyInfo {
  brandName: string;
  legalName: string;
  entityType: string;
  registeredJurisdiction: string;
  registeredLocality: string;
  registeredCountry: string;
  foundedDate: string;
  foundedYear: string;
  areaServed: string;
  contactEmail: string;
  headline: string;
  subheadline: string;
  description: string;
  overview: string;
  legalFooter: string;
}

export const COMPANY_INFO: CompanyInfo = {
  brandName: "NYG Digital",
  legalName: "NYG Digital FZE LLC",
  entityType: "Free Zone Entity (FZE LLC)",
  registeredJurisdiction: "Ajman NuVentures Centre Free Zone",
  registeredLocality: "Ajman",
  registeredCountry: "United Arab Emirates",
  foundedDate: "2026-08-04",
  foundedYear: "2026",
  areaServed: "United Arab Emirates",
  contactEmail: "support@nygagency.com",
  headline: "Systems that run. Without you.",
  subheadline:
    "We design business automation, workflow tools, connected systems, digital platforms and conversion-focused websites that help service businesses operate more clearly and efficiently across the UAE.",
  description:
    "NYG Digital is the trading brand of NYG Digital FZE LLC, a software-development and computer-systems consultancy registered in Ajman, United Arab Emirates.",
  overview:
    "Founded in 2026, NYG Digital combines software development, systems consultancy, data management and practical automation to transform disconnected business processes into dependable digital systems.",
  legalFooter:
    "© 2026 NYG Digital. NYG Digital is the trading brand of NYG Digital FZE LLC, a Free Zone Entity registered with Ajman NuVentures Centre Free Zone, Ajman, United Arab Emirates.",
};

export const PERSONAL_INFO = {
  name: "Phenyo Ntwayagae",
  brand: "NYG Digital",
  title: "Founder & Systems Architect",
  tagline: "Automations That Save You Time. Websites That Help You Grow.",
  headline: "Automations That Save You Time. Websites That Help You Grow.",
  subheadline:
    "I help businesses reduce repetitive work, connect their tools, organize leads, and build professional websites that turn more visitors into inquiries.",
  status: "Available for select projects",
  location: "United Arab Emirates (GST UTC+4)",
  email: "support@nygagency.com",
  phone: "+971555170113",
  socials: [
    { label: "X / Twitter", href: "https://x.com/phenyont", iconName: "Twitter" },
    {
      label: "Instagram",
      href: "https://www.instagram.com/phenyontwayagae",
      iconName: "Instagram",
    },
    {
      label: "GitHub",
      href: "https://github.com/ntwayagaeaobakwe-dotcom",
      iconName: "Github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/aobakwe-ntwayagae-3a8016423/",
      iconName: "Linkedin",
    },
  ],
};

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "System Studio", href: "#system-studio" },
  { label: "Work", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const HERO_STATS = [
  { value: "100%", label: "Custom Workflows" },
  { value: "n8n & AI", label: "Automation Stack" },
  { value: "Fast", label: "Turnaround" },
];

export const TICKER_ITEMS = [
  "n8n Workflows",
  "API Integrations",
  "Web Design",
  "Client Portals",
  "Lead Research",
  "Supabase",
  "React",
  "Vite",
  "Process Automation",
  "Vercel",
  "GitHub",
  "Business Systems",
];

export const TRUST_SIGNALS = [
  { label: "Response target under 24h", iconName: "Clock" },
  { label: "Clear fixed-scope proposals", iconName: "FileCheck" },
  { label: "Direct WhatsApp access", iconName: "MessageSquare" },
  { label: "Website plus automation build", iconName: "Workflow" },
];

export const ABOUT_PILLARS = [
  {
    title: "Business Automation",
    desc: "Designing automated n8n workflows, API integrations, and lead systems that handle repetitive operations in the background.",
  },
  {
    title: "Web Platform Development",
    desc: "Building clean, fast, mobile-friendly websites and portals that present services clearly and turn visitors into inquiries.",
  },
  {
    title: "Operational Leverage",
    desc: "Connecting disconnected business tools into unified systems that save hours of manual data entry every week.",
  },
];

export const INTERESTS = [
  "Business Automation",
  "n8n Workflows",
  "Web Application Development",
  "Lead Research Systems",
  "Client Portals",
  "API Integrations",
  "Process Optimization",
  "Digital Systems Architecture",
  "User Experience Design",
];

export const EXPERTISE_SKILLS: SkillCategory[] = [
  {
    title: "Business Automation & Workflows",
    iconName: "Workflow",
    items: [
      "n8n custom workflows",
      "Connecting business tools via APIs",
      "Automated email & messaging updates",
      "Spreadsheet & CRM synchronization",
      "Data cleanup & formatting",
      "Error handling & reliability",
    ],
  },
  {
    title: "Websites & Web Applications",
    iconName: "Code2",
    items: [
      "Conversion-focused service websites",
      "Responsive mobile-friendly layouts",
      "React & Vite application architecture",
      "Fast load-time optimization",
      "Form integration & lead capture",
      "Vercel deployment & hosting",
    ],
  },
  {
    title: "Client Portals & Dashboards",
    iconName: "Layers",
    items: [
      "Client login areas",
      "Centralized operational dashboards",
      "User role & access management",
      "Supabase database integration",
      "Structured task & approval flows",
    ],
  },
  {
    title: "Lead Research & Organization",
    iconName: "Target",
    items: [
      "Automated business search workflows",
      "Lead detail enrichment via APIs",
      "Data deduplication & cleaning",
      "Structured spreadsheet delivery",
      "CRM import preparation",
    ],
  },
  {
    title: "Operational Strategy",
    iconName: "Brain",
    items: [
      "Workflow audit & mapping",
      "First-principles process design",
      "Tool integration evaluation",
      "Rapid prototyping & iteration",
    ],
  },
];

export const SERVICES: ServiceItem[] = [
  {
    tag: "01",
    title: "Business Automation",
    iconName: "Workflow",
    problem:
      "Your team spends too much time copying information, updating spreadsheets, sending routine messages, and moving data between different tools.",
    solution: "I build automated workflows that handle these repetitive steps in the background.",
    potentialBenefit:
      "Reduce manual work, avoid preventable mistakes, and give your team more time for customers and important decisions.",
    supportingTools:
      "Built with n8n, AI tools, APIs, spreadsheets, CRMs, and the applications your business already uses.",
    processSteps: [
      "Trigger event occurs",
      "Data verified & cleaned",
      "Tools synchronized",
      "Team notified automatically",
    ],
    desc: "Custom n8n workflows that connect your existing business applications, eliminate manual data entry, and automate routine updates.",
  },
  {
    tag: "02",
    title: "Websites That Generate Inquiries",
    iconName: "Rocket",
    problem:
      "Your current website looks outdated, confuses visitors, or does not give people a clear reason to contact you.",
    solution:
      "I design professional, mobile-friendly websites that clearly explain your offer and guide visitors toward taking action.",
    potentialBenefit:
      "Build credibility, make your services easier to understand, and turn more website visitors into inquiries.",
    supportingTools:
      "Built with modern web tools, responsive design, clear layouts, and fast loading performance.",
    processSteps: [
      "Visitor lands on site",
      "Understands clear offer",
      "Sees trust proof",
      "Submits inquiry form",
    ],
    desc: "Fast, modern websites engineered to build credibility, explain complex services simply, and capture qualified business inquiries.",
  },
  {
    tag: "03",
    title: "Client Portals and Business Dashboards",
    iconName: "Layers",
    problem:
      "Important information is spread across messages, spreadsheets, emails, and multiple applications.",
    solution:
      "I build easy-to-use portals and dashboards that bring important information and actions into one place.",
    potentialBenefit:
      "Make everyday operations clearer, reduce confusion, and give staff or customers a simpler experience.",
    supportingTools:
      "Built with dedicated login spaces, custom dashboards, and connected database tools.",
    processSteps: [
      "User logs into portal",
      "Views unified status",
      "Performs required action",
      "Records updated instantly",
    ],
    desc: "Dedicated web portals and operational dashboards that centralize client communication, account management, and team workflows.",
  },
  {
    tag: "04",
    title: "Lead Research and Organization",
    iconName: "Target",
    problem:
      "Finding suitable businesses and organizing their information manually takes too much time.",
    solution:
      "I create systems that research, collect, clean, and organize business information for responsible outreach.",
    potentialBenefit:
      "Spend less time preparing lead lists and more time having relevant business conversations.",
    supportingTools:
      "Built with automated search tools, lead enrichment APIs, and clean CRM / spreadsheet formatting.",
    processSteps: [
      "Business search",
      "Information collected",
      "Duplicates removed",
      "Lead list reviewed",
    ],
    desc: "Automated business research systems that gather, enrich, and format lead data directly into your spreadsheets or CRM.",
  },
];

// TODO: The imageUrls below point at /src/assets/placeholder-project-*.jpg files
// that do not exist yet. Drop real screenshots or n8n-workflow-canvas exports
// (PNG/JPG, ~1280x800) at those exact paths, then wire each one in with a real
// `import` at the top of this file (e.g. `import leadResearchImg from
// "@/assets/placeholder-project-lead-research.jpg";`) and reference the
// imported variable here instead of the literal string — that's required for
// Vite to fingerprint and bundle the asset correctly in production. Leaving
// them as plain strings for now keeps the build green until the files exist.
export const PROJECTS: ProjectItem[] = [
  {
    id: "lead-research-automation",
    title: "Automated Business Lead Research",
    tag: "Completed Build",
    status: "Completed Build",
    desc: "An n8n workflow that searched, enriched, and deduplicated business contact data across 15 target areas, delivering 600+ ready-to-contact leads directly into a spreadsheet.",
    problem:
      "Building a useful business lead list manually requires repeated searching, copying, checking, and spreadsheet updates.",
    solution:
      "Built and ran a workflow that searched for relevant businesses across 15 target areas, enriched each result with available contact details, removed duplicates, and delivered a clean spreadsheet ready for outreach.",
    howItWorks: [
      "Defined target business criteria & search parameters for 15 areas",
      "Gathered public company data & contact information per area",
      "Cleaned data, removed duplicates, & verified fields",
      "Delivered 600+ formatted, deduplicated leads ready for outreach",
    ],
    potentialValue:
      "Delivered 600+ deduplicated, ready-to-contact leads across 15 areas — replacing what would have been days of manual searching and spreadsheet cleanup.",
    toolsUsed: ["n8n Workflows", "Business Data APIs", "Google Sheets", "Data Formatting Logic"],
    imageUrls: ["/src/assets/placeholder-project-lead-research.jpg"],
    accent: "from-cyan-500/15 to-transparent",
    challenge:
      "Building a useful business lead list manually requires repeated searching, copying, checking, and spreadsheet updates.",
    objective:
      "Built and ran a workflow that searched for relevant businesses across 15 target areas, enriched each result with available contact details, removed duplicates, and delivered a clean spreadsheet ready for outreach.",
    techStack: ["n8n Workflows", "Business Data APIs", "Google Sheets", "Data Formatting Logic"],
    features: [
      "Defined target business criteria & search parameters for 15 areas",
      "Gathered public company data & contact information per area",
      "Cleaned data, removed duplicates, & verified fields",
      "Delivered 600+ formatted, deduplicated leads ready for outreach",
    ],
    valueCreated:
      "Delivered 600+ deduplicated, ready-to-contact leads across 15 areas — replacing what would have been days of manual searching and spreadsheet cleanup.",
  },
  {
    id: "inquiry-follow-up-workflow",
    title: "Customer Inquiry and Follow-Up Workflow",
    tag: "Capability Demonstration",
    status: "Capability Demonstration",
    desc: "A connected system that centralizes incoming website inquiries, notifies team members instantly, and drafts initial responses.",
    problem:
      "Website inquiries can be missed or handled inconsistently when they arrive through different channels.",
    solution:
      "A system that collects inquiries, organizes the details, notifies the correct person, and prepares the next follow-up step.",
    howItWorks: [
      "Visitor submits an inquiry form on the website",
      "System structures message data & checks urgency",
      "Team receives instant notification via email or chat",
      "Confirmation message sent & task assigned",
    ],
    potentialValue: "Intended to make inquiry handling faster, clearer, and more consistent.",
    toolsUsed: ["Webhooks", "n8n", "CRM Integration", "Instant Messaging APIs"],
    imageUrls: ["/src/assets/placeholder-project-inquiry-workflow.jpg"],
    accent: "from-primary/25 to-transparent",
    challenge:
      "Website inquiries can be missed or handled inconsistently when they arrive through different channels.",
    objective:
      "A system that collects inquiries, organizes the details, notifies the correct person, and prepares the next follow-up step.",
    techStack: ["Webhooks", "n8n", "CRM Integration", "Instant Messaging APIs"],
    features: [
      "Visitor submits an inquiry form on the website",
      "System structures message data & checks urgency",
      "Team receives instant notification via email or chat",
      "Confirmation message sent & task assigned",
    ],
    valueCreated: "Intended to make inquiry handling faster, clearer, and more consistent.",
  },
  {
    id: "business-operations-automation",
    title: "Business Operations Automation",
    tag: "Capability Demonstration",
    status: "Capability Demonstration",
    desc: "An automated operational backbone connecting spreadsheets, email notifications, and task records into a single background process.",
    problem:
      "Small businesses often manage recurring tasks across spreadsheets, emails, forms, and disconnected applications.",
    solution:
      "A connected workflow that collects information, organizes it, notifies the correct person, and records the completed action.",
    howItWorks: [
      "Information received from form or spreadsheet",
      "Workflow checks details & validates requirements",
      "Records updated automatically in central system",
      "Responsible team member notified & follow-up prepared",
    ],
    potentialValue:
      "Designed to reduce repeated administrative work and make routine operations more consistent.",
    toolsUsed: ["n8n", "APIs", "Google Sheets", "Email Notifications", "Database Sync"],
    imageUrls: ["/src/assets/placeholder-project-operations-automation.jpg"],
    accent: "from-emerald-500/15 to-transparent",
    challenge:
      "Small businesses often manage recurring tasks across spreadsheets, emails, forms, and disconnected applications.",
    objective:
      "A connected workflow that collects information, organizes it, notifies the correct person, and records the completed action.",
    techStack: ["n8n", "APIs", "Google Sheets", "Email Notifications", "Database Sync"],
    features: [
      "Information received from form or spreadsheet",
      "Workflow checks details & validates requirements",
      "Records updated automatically in central system",
      "Responsible team member notified & follow-up prepared",
    ],
    valueCreated:
      "Designed to reduce repeated administrative work and make routine operations more consistent.",
  },
  {
    id: "conversion-service-website",
    title: "Conversion-Focused Service Website",
    tag: "Personal Project",
    status: "Personal Project",
    desc: "A premium responsive service website built with clear messaging, structured services, interactive project explanations, an automation savings calculator, and direct email and WhatsApp inquiry paths.",
    problem:
      "Many service businesses have websites that look acceptable but fail to explain their offer clearly or guide visitors toward making an inquiry.",
    solution:
      "A premium responsive service website with clear messaging, structured services, interactive project explanations, an automation savings calculator, and direct email and WhatsApp inquiry paths.",
    howItWorks: [
      "Visitor arrives on clear hero explaining core value",
      "Explores plain-language services & proof examples",
      "Calculates potential time savings on interactive tool",
      "Sends direct inquiry via email or WhatsApp",
    ],
    potentialValue:
      "Designed to help a service provider communicate more clearly, build credibility, and make it easier for prospective customers to take the next step.",
    toolsUsed: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "TanStack Router",
      "Responsive UI Design",
    ],
    imageUrls: ["/src/assets/placeholder-project-conversion-website.jpg"],
    accent: "from-amber-500/15 to-transparent",
    challenge:
      "Many service businesses have websites that look acceptable but fail to explain their offer clearly or guide visitors toward making an inquiry.",
    objective:
      "A premium responsive service website with clear messaging, structured services, interactive project explanations, an automation savings calculator, and direct email and WhatsApp inquiry paths.",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "TanStack Router",
      "Responsive UI Design",
    ],
    features: [
      "Visitor arrives on clear hero explaining core value",
      "Explores plain-language services & proof examples",
      "Calculates potential time savings on interactive tool",
      "Sends direct inquiry via email or WhatsApp",
    ],
    valueCreated:
      "Designed to help a service provider communicate more clearly, build credibility, and make it easier for prospective customers to take the next step.",
  },
  {
    id: "shorts-content-repurposing",
    title: "Shorts Content Repurposing Workflow",
    tag: "Capability Demonstration",
    status: "Capability Demonstration",
    desc: "An automated workflow concept for selecting highlight clips from longer video recordings and formatting them into vertical video drafts.",
    problem:
      "Repurposing raw video recordings into short-form vertical content manually requires hours of clip scanning and script formatting.",
    solution:
      "A system that parses video transcripts for key highlight moments, formats listicle scripts, and prepares vertical clip templates.",
    howItWorks: [
      "Parses long-form video transcript for key points",
      "Formats engaging 60-second vertical video scripts",
      "Applies caption formatting & hook structures",
      "Exports structured clip assets for final review",
    ],
    potentialValue:
      "Intended to simplify content preparation and reduce manual video formatting time.",
    toolsUsed: ["Python Scripts", "n8n", "Speech-to-Text AI", "Video Formatting Logic"],
    imageUrls: ["/src/assets/placeholder-project-shorts-repurposing.jpg"],
    accent: "from-red-500/15 to-transparent",
    challenge:
      "Repurposing raw video recordings into short-form vertical content manually requires hours of clip scanning and script formatting.",
    objective:
      "A system that parses video transcripts for key highlight moments, formats listicle scripts, and prepares vertical clip templates.",
    techStack: ["Python Scripts", "n8n", "Speech-to-Text AI", "Video Formatting Logic"],
    features: [
      "Parses long-form video transcript for key points",
      "Formats engaging 60-second vertical video scripts",
      "Applies caption formatting & hook structures",
      "Exports structured clip assets for final review",
    ],
    valueCreated:
      "Intended to simplify content preparation and reduce manual video formatting time.",
  },
];

export const FOCUS_AREAS: FocusArea[] = [
  { label: "Building custom n8n business automation workflows", iconName: "Workflow" },
  { label: "Designing conversion-focused websites & web applications", iconName: "Layers" },
  { label: "Connecting tools & software systems via APIs", iconName: "Zap" },
  { label: "Creating automated lead research & cleanup systems", iconName: "Target" },
  { label: "Building client portals & central operational dashboards", iconName: "Code2" },
  { label: "Cloud hosting, Vercel deployment & modern web tech", iconName: "Cpu" },
];

export const CREDENTIALS_SUMMARY = [
  "Specialized Business Automation & n8n Workflow Builder",
  "Modern Web Developer specializing in React, Vite & conversion design",
  "Experienced API Integration & Data Systems Specialist",
];

export const FORM_SERVICE_OPTIONS = [
  "Business Automation",
  "Websites That Generate Inquiries",
  "Client Portals & Dashboards",
  "Lead Research & Organization",
  "Not Sure — I'll Describe the Problem",
];

export const DEMO_TERMINAL_TABS = [
  {
    id: "tasks",
    label: "Repetitive Tasks",
    items: [
      { label: "Common problem", value: "Manual data entry across disconnected apps" },
      { label: "Automated solution", value: "n8n workflow connects tools automatically" },
      { label: "Customer outcome", value: "Hours saved on routine administrative work" },
    ],
  },
  {
    id: "websites",
    label: "Websites & Inquiries",
    items: [
      { label: "Common problem", value: "Outdated website confuses prospective clients" },
      { label: "Automated solution", value: "Clear, fast, mobile-friendly responsive design" },
      { label: "Customer outcome", value: "More website visitors turn into active inquiries" },
    ],
  },
  {
    id: "leads",
    label: "Leads & Follow-Up",
    items: [
      { label: "Common problem", value: "Scattered lead lists & delayed response times" },
      { label: "Automated solution", value: "Organized data delivery & instant notifications" },
      { label: "Customer outcome", value: "Faster, more consistent business outreach" },
    ],
  },
];

export const HERO_TERMINAL_TABS = DEMO_TERMINAL_TABS;

// ─── Industry Automation Demo ─────────────────────────────────────────────────

export interface DemoMessage {
  from: "customer" | "bot" | "system";
  text: string;
  /** Speaker label shown visually and in the sr-only transcript */
  label: string;
  /** 0-indexed step that activates when this message becomes visible */
  activatesStep?: number;
}

export interface WorkflowStep {
  label: string;
  description: string;
}

export interface IndustryDemoIndustry {
  id: string;
  label: string;
  messages: DemoMessage[];
  workflowSteps: WorkflowStep[];
  problems: string[];
  capabilities: string[];
  benefitStatement: string;
  ctaLabel: string;
  /** Stored in sessionStorage and appended to the email inquiry body */
  ctaIndustryContext: string;
  formServiceValue: string;
}

export const INDUSTRY_DEMOS: IndustryDemoIndustry[] = [
  {
    id: "real-estate",
    label: "Real Estate",
    messages: [
      {
        from: "customer",
        text: "Hi, is the two-bedroom apartment still available?",
        label: "Customer",
        activatesStep: 0,
      },
      {
        from: "bot",
        text: "Thanks for your inquiry. When are you hoping to move?",
        label: "Automated Assistant",
        activatesStep: 1,
      },
      {
        from: "customer",
        text: "Next month.",
        label: "Customer",
      },
      {
        from: "bot",
        text: "Would you prefer to request a viewing on Thursday evening or Saturday morning?",
        label: "Automated Assistant",
      },
      {
        from: "customer",
        text: "Saturday morning.",
        label: "Customer",
        activatesStep: 2,
      },
      {
        from: "system",
        text: "Viewing preference recorded. An agent can now review the request and confirm availability.",
        label: "Automated Assistant",
        activatesStep: 3,
      },
    ],
    workflowSteps: [
      {
        label: "Receive",
        description: "Inquiry arrives from website, WhatsApp Business, or contact form",
      },
      {
        label: "Understand",
        description: "System asks qualifying questions and records the requirements",
      },
      {
        label: "Organize",
        description: "Customer details collected and prepared for the agent",
      },
      {
        label: "Continue",
        description: "Agent notified with full context - ready to confirm and follow up",
      },
    ],
    problems: [
      "Inquiries arrive outside working hours without acknowledgment",
      "Agents repeatedly ask the same qualifying questions",
      "Information is spread across portals, messages, email, and spreadsheets",
      "Viewing requests require excessive back-and-forth",
      "Follow-ups can be missed during busy periods",
    ],
    capabilities: [
      "Inquiry-response and lead-qualification workflows",
      "Viewing-request collection and preparation",
      "Agent notification with full lead context",
      "CRM or spreadsheet updates",
      "Property landing pages and inquiry forms",
      "Follow-up reminders and lead-routing systems",
    ],
    benefitStatement:
      "Collect the information an agent needs before continuing the conversation, keep the lead organized, and reduce repetitive back-and-forth.",
    ctaLabel: "Discuss My Property Inquiry Process",
    ctaIndustryContext: "Real Estate - Property Inquiry and Viewing Process",
    formServiceValue: "Business Automation",
  },
  {
    id: "cleaning-services",
    label: "Cleaning Services",
    messages: [
      {
        from: "customer",
        text: "Hi, I need a deep clean for a two-bedroom apartment.",
        label: "Customer",
        activatesStep: 0,
      },
      {
        from: "bot",
        text: "Certainly. Is the property furnished, and which area is it located in?",
        label: "Automated Assistant",
        activatesStep: 1,
      },
      {
        from: "customer",
        text: "It is furnished and located in Dubai Marina.",
        label: "Customer",
      },
      {
        from: "bot",
        text: "Thank you. When would you prefer the service?",
        label: "Automated Assistant",
      },
      {
        from: "customer",
        text: "Saturday morning.",
        label: "Customer",
        activatesStep: 2,
      },
      {
        from: "system",
        text: "Request recorded. The team can now review the details and prepare a quote or availability for review.",
        label: "Automated Assistant",
        activatesStep: 3,
      },
    ],
    workflowSteps: [
      {
        label: "Receive",
        description: "Service request arrives from website, WhatsApp Business, or form",
      },
      {
        label: "Understand",
        description: "System collects property details, location, and service type",
      },
      {
        label: "Organize",
        description: "Job details recorded and prepared for the operations team",
      },
      {
        label: "Continue",
        description: "Team notified with complete details - ready to quote or schedule",
      },
    ],
    problems: [
      "Staff repeatedly request the same property information",
      "Quote requests arrive through several channels without a consistent process",
      "Scheduling requires unnecessary back-and-forth messages",
      "Job details can arrive incomplete",
      "Review requests and recurring-service reminders are forgotten",
    ],
    capabilities: [
      "Service-request intake and quote-information collection",
      "Booking-request workflows and team notifications",
      "Job dashboards and operational summaries",
      "Review-request automations",
      "Recurring-service reminders",
      "Conversion-focused service pages and inquiry forms",
    ],
    benefitStatement:
      "Collect complete job details earlier, organize each request, and make quoting, scheduling, and follow-up easier to manage.",
    ctaLabel: "Discuss My Quote and Booking Process",
    ctaIndustryContext: "Cleaning Services - Quote and Booking Process",
    formServiceValue: "Business Automation",
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    label: "Receive",
    description:
      "An inquiry arrives through your website, WhatsApp Business, advertisement, or contact form.",
  },
  {
    number: "02",
    label: "Understand",
    description: "The system asks the essential questions and records what the customer needs.",
  },
  {
    number: "03",
    label: "Organize",
    description:
      "The request is saved and sent to the correct place - a spreadsheet, CRM, or internal tool.",
  },
  {
    number: "04",
    label: "Continue",
    description:
      "Your team receives the context needed to quote, confirm, follow up, or complete the next action.",
  },
];
