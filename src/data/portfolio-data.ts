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
  brandName: "NYG Agency",
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
    "We design business automation, connected workflows, and modern websites that remove repetitive admin and help service businesses across the UAE run efficiently.",
  description:
    "NYG Agency is the trading brand of NYG Digital FZE LLC, a software-development and computer-systems consultancy registered in Ajman, United Arab Emirates.",
  overview:
    "Founded in 2026, NYG Agency helps businesses replace manual spreadsheets, delayed follow-ups, and disconnected tools with reliable, automated systems.",
  legalFooter:
    "© 2026 NYG Agency. NYG Agency is the trading brand of NYG Digital FZE LLC, a Free Zone Entity registered with Ajman NuVentures Centre Free Zone, Ajman, United Arab Emirates.",
};

export const PERSONAL_INFO = {
  name: "Phenyo Ntwayagae",
  brand: "NYG Agency",
  title: "Founder & Systems Engineer",
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
      href: "https://www.instagram.com/nygdigitalagency",
      iconName: "Instagram",
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@nygdigitalagency",
      iconName: "TikTok",
    },
    {
      label: "GitHub",
      href: "https://github.com/ntwayagaeaobakwe-dotcom",
      iconName: "Github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/nyg-digital/",
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
    title: "Web Platforms",
    desc: "Building clean, fast, mobile-friendly websites that explain your services simply and turn visitors into qualified inquiries.",
  },
  {
    title: "Connected Systems",
    desc: "Connecting your everyday business tools into unified workflows that save hours of manual data entry every week.",
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
  "Connected Business Systems",
  "User Experience Design",
];

export const EXPERTISE_SKILLS: SkillCategory[] = [
  {
    title: "Business Automation & Workflows",
    iconName: "Workflow",
    items: [
      "Custom n8n workflows",
      "Connecting business tools via APIs",
      "Automated email & messaging alerts",
      "Spreadsheet & CRM synchronization",
      "Data cleanup & formatting",
      "Error handling & reliability safeguards",
    ],
  },
  {
    title: "Websites & Web Applications",
    iconName: "Code2",
    items: [
      "High-converting service websites",
      "Responsive mobile-friendly layouts",
      "Modern React & Vite web applications",
      "Fast load-time optimization",
      "Form integration & lead capture",
      "Secure cloud hosting & deployment",
    ],
  },
  {
    title: "Client Portals & Dashboards",
    iconName: "Layers",
    items: [
      "Dedicated client login areas",
      "Centralized operational dashboards",
      "User role & access management",
      "Database & CRM integration",
      "Structured task & approval flows",
    ],
  },
  {
    title: "Lead Research & Organization",
    iconName: "Target",
    items: [
      "Automated business search workflows",
      "Lead detail verification via APIs",
      "Data deduplication & cleaning",
      "Structured spreadsheet delivery",
      "CRM import preparation",
    ],
  },
  {
    title: "Workflow Strategy",
    iconName: "Brain",
    items: [
      "Workflow review & process mapping",
      "Practical systems design",
      "Tool integration evaluation",
      "Rapid prototyping & testing",
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
      "Reduce manual work, avoid preventable mistakes, and give your team more time for clients and high-value priorities.",
    supportingTools:
      "Built with n8n, APIs, spreadsheets, CRMs, and the applications your business already uses.",
    processSteps: [
      "Trigger event occurs",
      "Data verified & formatted",
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
      "Your current website looks outdated, confuses visitors, or does not give people a clear reason to reach out.",
    solution:
      "I design professional, mobile-friendly websites that clearly explain your services and guide visitors toward booking a call or submitting an inquiry.",
    potentialBenefit:
      "Build credibility, make your services easy to understand, and turn more website visitors into inquiries.",
    supportingTools:
      "Built with modern web frameworks, responsive layouts, clear copy, and fast loading performance.",
    processSteps: [
      "Visitor lands on site",
      "Understands clear offer",
      "Sees trust proof",
      "Submits inquiry form",
    ],
    desc: "Fast, modern websites engineered to build credibility, explain services simply, and capture qualified business inquiries.",
  },
  {
    tag: "03",
    title: "Client Portals and Business Dashboards",
    iconName: "Layers",
    problem:
      "Important information is scattered across WhatsApp chats, spreadsheets, emails, and multiple disconnected tools.",
    solution:
      "I build easy-to-use portals and dashboards that bring project details, client communication, and status tracking into one place.",
    potentialBenefit:
      "Make everyday operations clearer, reduce confusion, and give your staff and clients a seamless experience.",
    supportingTools:
      "Built with secure login spaces, custom dashboards, and connected database tools.",
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
      "Finding relevant business leads and organizing their contact information manually takes too much time.",
    solution:
      "I build systems that search, collect, verify, and organize prospect data directly into your spreadsheets or CRM.",
    potentialBenefit:
      "Spend less time preparing lead lists and more time having relevant business conversations.",
    supportingTools:
      "Built with automated search workflows, data enrichment APIs, and structured CRM formatting.",
    processSteps: [
      "Business search",
      "Information collected",
      "Duplicates removed",
      "Clean list delivered",
    ],
    desc: "Automated business research systems that gather, verify, and format lead data directly into your spreadsheets or CRM.",
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
    title: "Automated Business Lead Research System",
    tag: "Completed Build",
    status: "Completed Build",
    desc: "An automated n8n workflow that searched, verified, and deduplicated business contact data across 15 target areas, delivering 600+ clean leads directly into a spreadsheet.",
    problem:
      "Building a qualified business lead list manually requires hours of repetitive searching, copy-pasting, and spreadsheet cleanup.",
    solution:
      "Built an automated workflow that searched 15 target areas, gathered verified contact details, filtered duplicates, and delivered ready-to-contact leads directly into Google Sheets.",
    howItWorks: [
      "Defined target business criteria and search parameters for 15 areas",
      "Gathered public company data and contact details automatically",
      "Cleaned data, removed duplicates, and validated email & phone records",
      "Delivered 600+ formatted, deduplicated leads ready for outreach",
    ],
    potentialValue:
      "Delivered 600+ deduplicated, ready-to-contact leads across 15 areas — replacing days of manual searching and spreadsheet cleanup.",
    toolsUsed: ["n8n Workflows", "Business Data APIs", "Google Sheets", "Data Cleaning Logic"],
    imageUrls: ["/workflow-studio/lead-research-actual.png"],
    accent: "from-cyan-500/15 to-transparent",
    challenge:
      "Building a qualified business lead list manually requires hours of repetitive searching, copy-pasting, and spreadsheet cleanup.",
    objective:
      "Built an automated workflow that searched 15 target areas, gathered verified contact details, filtered duplicates, and delivered ready-to-contact leads directly into Google Sheets.",
    techStack: ["n8n Workflows", "Business Data APIs", "Google Sheets", "Data Cleaning Logic"],
    features: [
      "Defined target business criteria and search parameters for 15 areas",
      "Gathered public company data and contact details automatically",
      "Cleaned data, removed duplicates, and validated email & phone records",
      "Delivered 600+ formatted, deduplicated leads ready for outreach",
    ],
    valueCreated:
      "Delivered 600+ deduplicated, ready-to-contact leads across 15 areas — replacing days of manual searching and spreadsheet cleanup.",
  },
  {
    id: "inquiry-follow-up-workflow",
    title: "Instant Lead Routing & Follow-Up System",
    tag: "Capability Demonstration",
    status: "Capability Demonstration",
    desc: "A connected system that centralizes incoming website inquiries, alerts team members instantly via WhatsApp or email, and prepares the next follow-up step.",
    problem:
      "Website inquiries can be missed or handled with delays when incoming messages arrive through scattered channels.",
    solution:
      "A connected system that captures inquiries instantly, extracts key details, alerts the right team member, and prepares a rapid response.",
    howItWorks: [
      "Visitor submits an inquiry form on the website",
      "System organizes contact details, project need, and urgency",
      "Assigned team member receives an instant alert via WhatsApp or email",
      "Instant confirmation sent to client with clear next steps",
    ],
    potentialValue:
      "Ensures no inquiry is missed and cuts response time from hours to under 60 seconds.",
    toolsUsed: ["n8n Workflows", "Webhooks", "CRM Integration", "Instant Messaging & Email Alerts"],
    imageUrls: ["/src/assets/placeholder-project-inquiry-workflow.jpg"],
    accent: "from-primary/25 to-transparent",
    challenge:
      "Website inquiries can be missed or handled with delays when incoming messages arrive through scattered channels.",
    objective:
      "A connected system that captures inquiries instantly, extracts key details, alerts the right team member, and prepares a rapid response.",
    techStack: ["n8n Workflows", "Webhooks", "CRM Integration", "Instant Messaging & Email Alerts"],
    features: [
      "Visitor submits an inquiry form on the website",
      "System organizes contact details, project need, and urgency",
      "Assigned team member receives an instant alert via WhatsApp or email",
      "Instant confirmation sent to client with clear next steps",
    ],
    valueCreated:
      "Ensures no inquiry is missed and cuts response time from hours to under 60 seconds.",
  },
  {
    id: "business-operations-automation",
    title: "Automated Business Admin & Task Dispatch",
    tag: "Capability Demonstration",
    status: "Capability Demonstration",
    desc: "A centralized workflow connecting forms, spreadsheets, and task alerts to handle routine administration automatically in the background.",
    problem:
      "Teams waste hours every week updating spreadsheets, assigning routine tasks manually, and chasing status updates.",
    solution:
      "A connected background workflow that validates incoming project data, updates records in a central sheet, and assigns tasks to team members automatically.",
    howItWorks: [
      "Information received from form or spreadsheet update",
      "Workflow checks details and validates required information",
      "Central records and dashboards update automatically",
      "Responsible team member notified with clear deadlines",
    ],
    potentialValue:
      "Eliminates repetitive data entry and gives managers real-time visibility without manual status chasing.",
    toolsUsed: ["n8n Workflows", "Google Sheets", "Task Management APIs", "Automated Alerts"],
    imageUrls: ["/src/assets/placeholder-project-operations-automation.jpg"],
    accent: "from-emerald-500/15 to-transparent",
    challenge:
      "Teams waste hours every week updating spreadsheets, assigning routine tasks manually, and chasing status updates.",
    objective:
      "A connected background workflow that validates incoming project data, updates records in a central sheet, and assigns tasks to team members automatically.",
    techStack: ["n8n Workflows", "Google Sheets", "Task Management APIs", "Automated Alerts"],
    features: [
      "Information received from form or spreadsheet update",
      "Workflow checks details and validates required information",
      "Central records and dashboards update automatically",
      "Responsible team member notified with clear deadlines",
    ],
    valueCreated:
      "Eliminates repetitive data entry and gives managers real-time visibility without manual status chasing.",
  },
  {
    id: "conversion-service-website",
    title: "High-Converting Service Website & Booking Flow",
    tag: "Personal Project",
    status: "Personal Project",
    desc: "A fast, responsive service website with clear messaging, structured service offerings, interactive workflow demonstrations, and direct WhatsApp and inquiry paths.",
    problem:
      "Many service websites look generic, confuse visitors with jargon, and fail to generate consistent inquiries.",
    solution:
      "A custom responsive website that explains complex services simply, demonstrates credibility, and gives visitors clear paths to reach out.",
    howItWorks: [
      "Visitor lands on a clean hero explaining the core value",
      "Explores plain-language services and interactive demonstrations",
      "Selects specific business challenges and sees practical solutions",
      "Sends a direct inquiry or starts a WhatsApp conversation",
    ],
    potentialValue:
      "Designed to help a service provider communicate clearly, build credibility, and turn more visitors into active inquiries.",
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
      "Many service websites look generic, confuse visitors with jargon, and fail to generate consistent inquiries.",
    objective:
      "A custom responsive website that explains complex services simply, demonstrates credibility, and gives visitors clear paths to reach out.",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "TanStack Router",
      "Responsive UI Design",
    ],
    features: [
      "Visitor lands on a clean hero explaining the core value",
      "Explores plain-language services and interactive demonstrations",
      "Selects specific business challenges and sees practical solutions",
      "Sends a direct inquiry or starts a WhatsApp conversation",
    ],
    valueCreated:
      "Designed to help a service provider communicate clearly, build credibility, and turn more visitors into active inquiries.",
  },
  {
    id: "shorts-content-repurposing",
    title: "Automated Video Repurposing Workflow",
    tag: "Capability Demonstration",
    status: "Capability Demonstration",
    desc: "An automated workflow concept that extracts key highlights from long recordings and drafts ready-to-edit short-form video scripts.",
    problem:
      "Manually re-watching long video recordings to find highlights and format clips takes hours of editor time.",
    solution:
      "A system that transcribes recordings, identifies key takeaway moments, and formats concise video scripts for review.",
    howItWorks: [
      "Extracts transcript from long-form video recording",
      "Identifies key takeaway points and hooks",
      "Formats structured 60-second video script drafts",
      "Prepares clip outlines for final production review",
    ],
    potentialValue: "Reduces hours of manual footage scanning into ready-to-produce video drafts.",
    toolsUsed: ["Python Scripts", "n8n Workflows", "AI Transcription", "Content Formatting"],
    imageUrls: ["/src/assets/placeholder-project-shorts-repurposing.jpg"],
    accent: "from-red-500/15 to-transparent",
    challenge:
      "Manually re-watching long video recordings to find highlights and format clips takes hours of editor time.",
    objective:
      "A system that transcribes recordings, identifies key takeaway moments, and formats concise video scripts for review.",
    techStack: ["Python Scripts", "n8n Workflows", "AI Transcription", "Content Formatting"],
    features: [
      "Extracts transcript from long-form video recording",
      "Identifies key takeaway points and hooks",
      "Formats structured 60-second video script drafts",
      "Prepares clip outlines for final production review",
    ],
    valueCreated: "Reduces hours of manual footage scanning into ready-to-produce video drafts.",
  },
];

export const FOCUS_AREAS: FocusArea[] = [
  { label: "Building custom n8n business automation workflows", iconName: "Workflow" },
  { label: "Designing high-converting service websites & portals", iconName: "Layers" },
  { label: "Connecting business tools & software systems via APIs", iconName: "Zap" },
  { label: "Creating automated lead research & data verification systems", iconName: "Target" },
  { label: "Building client portals & central operational dashboards", iconName: "Code2" },
  { label: "Cloud hosting, fast deployment & modern web technologies", iconName: "Cpu" },
];

export const CREDENTIALS_SUMMARY = [
  "Specialized Business Automation & n8n Workflow Builder",
  "Modern Web Developer specializing in React, Vite & high-converting design",
  "Experienced API Integration & Connected Systems Specialist",
];

export const FORM_SERVICE_OPTIONS = [
  "Web Development",
  "AI Solutions",
  "Business Automation",
  "Websites That Generate Inquiries",
  "Client Portals & Dashboards",
  "Lead Research & Organization",
  "Software & Digital Solutions",
  "Digital Marketing",
  "Creative Services",
  "Business Consulting",
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
