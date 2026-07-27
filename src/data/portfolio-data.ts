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
  status: "Completed Build" | "Personal Project" | "Capability Demonstration" | "Concept Project" | "Work in Progress";
  desc: string;
  problem: string;
  solution: string;
  howItWorks: string[];
  potentialValue: string;
  toolsUsed: string[];
  disclaimer?: string;
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

export const PERSONAL_INFO = {
  name: "Phenyo",
  title: "Business Automation & Web Development Specialist",
  tagline: "Automations That Save You Time. Websites That Help You Grow.",
  headline: "Automations That Save You Time. Websites That Help You Grow.",
  subheadline:
    "I help businesses reduce repetitive work, connect their tools, organize leads, and build professional websites that turn more visitors into inquiries.",
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
      "Secure client login areas",
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
    solution:
      "I build automated workflows that handle these repetitive steps in the background.",
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
      "Built with secure login spaces, custom dashboards, and connected database tools.",
    processSteps: [
      "User logs into portal",
      "Views unified status",
      "Performs required action",
      "Records updated instantly",
    ],
    desc: "Secure web portals and operational dashboards that centralize client communication, account management, and team workflows.",
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

export const PROJECTS: ProjectItem[] = [
  {
    id: "lead-research-automation",
    title: "Automated Business Lead Research",
    tag: "Personal Project",
    status: "Personal Project",
    desc: "An automated system that researches target companies, enriches contact details via APIs, and delivers clean, structured spreadsheets.",
    problem:
      "Building a useful business lead list manually requires repeated searching, copying, checking, and spreadsheet updates.",
    solution:
      "A workflow that searches for relevant businesses, collects available details, organizes the information, and prepares it for review.",
    howItWorks: [
      "Defines target business criteria & search parameters",
      "Gathers public company data & contact information",
      "Cleans data, removes duplicates, & verifies fields",
      "Delivers formatted spreadsheet ready for review",
    ],
    potentialValue:
      "Designed to reduce manual research time and keep lead information consistent and organized.",
    toolsUsed: ["n8n Workflows", "Business Data APIs", "Google Sheets", "Data Formatting Logic"],
    accent: "from-cyan-500/15 to-transparent",
    challenge:
      "Building a useful business lead list manually requires repeated searching, copying, checking, and spreadsheet updates.",
    objective:
      "A workflow that searches for relevant businesses, collects available details, organizes the information, and prepares it for review.",
    techStack: ["n8n Workflows", "Business Data APIs", "Google Sheets", "Data Formatting Logic"],
    features: [
      "Defines target business criteria & search parameters",
      "Gathers public company data & contact information",
      "Cleans data, removes duplicates, & verifies fields",
      "Delivers formatted spreadsheet ready for review",
    ],
    valueCreated:
      "Designed to reduce manual research time and keep lead information consistent and organized.",
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
    potentialValue:
      "Intended to make inquiry handling faster, clearer, and more consistent.",
    toolsUsed: ["Webhooks", "n8n", "CRM Integration", "Instant Messaging APIs"],
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
    valueCreated:
      "Intended to make inquiry handling faster, clearer, and more consistent.",
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
    desc: "A high-performance modern web template designed to present professional services clearly and guide visitors toward booking an inquiry.",
    problem:
      "Many service business websites confuse prospective clients with complex jargon and unclear contact options.",
    solution:
      "A clean, responsive web application built with fast navigation, clear service positioning, and simple contact forms.",
    howItWorks: [
      "Visitor arrives on clear hero explaining core value",
      "Explores plain-language services & proof examples",
      "Calculates potential time savings on interactive tool",
      "Submits structured inquiry with clear scope details",
    ],
    potentialValue:
      "Built to improve visitor clarity, build immediate trust, and increase inquiry rates.",
    toolsUsed: ["React", "TypeScript", "Vite", "Tailwind CSS", "Responsive UI Design"],
    accent: "from-amber-500/15 to-transparent",
    challenge:
      "Many service business websites confuse prospective clients with complex jargon and unclear contact options.",
    objective:
      "A clean, responsive web application built with fast navigation, clear service positioning, and simple contact forms.",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Responsive UI Design"],
    features: [
      "Visitor arrives on clear hero explaining core value",
      "Explores plain-language services & proof examples",
      "Calculates potential time savings on interactive tool",
      "Submits structured inquiry with clear scope details",
    ],
    valueCreated:
      "Built to improve visitor clarity, build immediate trust, and increase inquiry rates.",
  },
  {
    id: "zoomex-capital",
    title: "Fintech Investor Portal Concept",
    tag: "Concept Project",
    status: "Concept Project",
    disclaimer:
      "Concept project created to demonstrate product design and web application architecture. It does not represent an active investment service or an offer of financial products.",
    desc: "A user portal design concept demonstrating account management screens, authentication flows, user dashboards, and administrative approvals.",
    problem:
      "Financial applications often struggle to present multi-step approvals and account metrics in an intuitive user dashboard.",
    solution:
      "A responsive portal layout with secure user views, administrative approval controls, and structured account summary screens.",
    howItWorks: [
      "User authenticates into secure portal environment",
      "Views account overview dashboard & activity history",
      "Administrator reviews pending approvals & status",
      "Notification triggers update user on account state",
    ],
    potentialValue:
      "Demonstrates how complex financial interfaces can be organized into a clearer experience for users and administrators.",
    toolsUsed: ["React", "TypeScript", "Secure Auth Architecture", "Tailwind CSS", "Dashboard Components"],
    accent: "from-fuchsia-500/15 to-transparent",
    challenge:
      "Financial applications often struggle to present multi-step approvals and account metrics in an intuitive user dashboard.",
    objective:
      "A responsive portal layout with secure user views, administrative approval controls, and structured account summary screens.",
    techStack: ["React", "TypeScript", "Secure Auth Architecture", "Tailwind CSS", "Dashboard Components"],
    features: [
      "User authenticates into secure portal environment",
      "Views account overview dashboard & activity history",
      "Administrator reviews pending approvals & status",
      "Notification triggers update user on account state",
    ],
    valueCreated:
      "Demonstrates how complex financial interfaces can be organized into a clearer experience for users and administrators.",
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

export const FORM_BUDGET_OPTIONS = [
  "Under $1,000",
  "$1,000 - $3,000",
  "$3,000 - $5,000",
  "$5,000+",
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

export const ROI_CALCULATOR_DEFAULTS = {
  hoursPerWeek: 15,
  teamSize: 3,
  hourlyCost: 45,
  automationPct: 70,
};
