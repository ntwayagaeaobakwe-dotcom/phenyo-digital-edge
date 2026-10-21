export type MarketingPage = {
  path: string;
  section: "Services" | "Industries";
  eyebrow: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  audience: string;
  challengeTitle: string;
  challenges: string[];
  deliverableTitle: string;
  deliverables: Array<{ title: string; detail: string }>;
  process: Array<{ title: string; detail: string }>;
  outcome: string;
  related: Array<{ label: string; href: string }>;
};

export const PRIMARY_SERVICES = [
  {
    number: "01",
    title: "Website Design",
    href: "/services/web-design",
    summary:
      "A clear, polished website designed around your services, customers and enquiry journey.",
    problem: "For businesses that need a credible website built from the ground up.",
  },
  {
    number: "02",
    title: "Website Redesign",
    href: "/services/website-redesign",
    summary:
      "A strategic rebuild of an outdated or confusing site, with stronger structure and mobile usability.",
    problem: "For established businesses whose current website no longer reflects their quality.",
  },
  {
    number: "03",
    title: "Custom Web Development",
    href: "/services/custom-web-development",
    summary:
      "Purpose-built web experiences and integrations when an off-the-shelf template is not enough.",
    problem: "For requirements that need custom functionality, data or connected systems.",
  },
  {
    number: "04",
    title: "Booking & Lead Generation Websites",
    href: "/services/booking-websites",
    summary: "Focused customer journeys for enquiries, quotations, consultations and reservations.",
    problem: "For service businesses that need a clearer path from interest to action.",
  },
] as const;

// The homepage uses a focused set while the broader service catalog and booking route remain intact.
export const HOMEPAGE_SERVICES = [
  {
    number: "01",
    title: "Website Redesign for Commercial Contractors",
    href: "/services/website-redesign",
    description:
      "Modernize an existing contractor website so completed projects, sectors, and capabilities are easier to assess.",
    capabilities:
      "Project presentation · Sector clarity · Mobile navigation · Inquiry pathways · SEO preservation",
  },
  {
    number: "02",
    title: "Website Design & Development",
    href: "/services/web-design",
    description:
      "A new responsive website for commercial contractors that makes services, project experience, and company credentials clear.",
    capabilities:
      "Service and sector pages · Project portfolio structure · Technical SEO · Accessibility · Clear inquiry experience",
  },
  {
    number: "03",
    title: "Custom Web Development",
    href: "/services/custom-web-development",
    description:
      "Tailored functionality for requirements beyond a standard contractor website, scoped around the project.",
    capabilities:
      "Structured portfolio systems · Custom project inquiry or RFQ forms · Integrations · CMS when justified",
  },
] as const;

export const INDUSTRIES = [
  {
    title: "Home Services & Remodeling",
    href: "/industries/home-services",
    detail:
      "Make services, locations, project quality and quotation steps easy to understand on every screen.",
  },
  {
    title: "Interior Design & Fit-Out",
    href: "/industries/interior-design-fit-out",
    detail:
      "Present work with restraint, explain your process and turn considered interest into qualified briefs.",
  },
  {
    title: "Tourism & Private Charters",
    href: "/industries/tourism-charters",
    detail:
      "Help guests compare experiences, check essential details and move confidently toward an enquiry or booking.",
  },
] as const;

export const APPROACH = [
  ["Discovery", "Clarify the business, audience, offer, constraints and definition of success."],
  [
    "Customer journey & structure",
    "Plan the pages, information and actions people need before visual design begins.",
  ],
  [
    "Design",
    "Create a responsive interface that expresses the brand and keeps important decisions clear.",
  ],
  [
    "Development",
    "Build the approved experience with maintainable code, content and integrations.",
  ],
  [
    "Testing & launch",
    "Check devices, accessibility, speed, forms, metadata and redirects before release.",
  ],
] as const;

export const MARKETING_PAGES: Record<string, MarketingPage> = {
  webDesign: {
    path: "/services/web-design",
    section: "Services",
    eyebrow: "Professional website design",
    title: "Professional Website Design Services | NYG Digital",
    description:
      "NYG Digital designs polished, responsive business websites with clear customer journeys, strong content structure and practical enquiry paths.",
    h1: "Professional website design built around your business.",
    intro:
      "A business website should make your value easy to understand and the next step easy to take. We combine strategy, content structure, interface design and development so the finished site works as one coherent customer experience.",
    audience:
      "This service is for established service businesses creating a new website or replacing a temporary online presence with a professional platform they can build on.",
    challengeTitle: "A website has to do more than look current.",
    challenges: [
      "Visitors need to understand the offer without translating internal language.",
      "Services, proof and contact options need a clear hierarchy on mobile and desktop.",
      "The site needs to feel credible without relying on unsupported claims or decorative excess.",
    ],
    deliverableTitle: "A complete business website, designed as a working system.",
    deliverables: [
      {
        title: "Page and journey planning",
        detail:
          "A practical structure for the questions customers ask and the actions they need to take.",
      },
      {
        title: "Responsive interface design",
        detail:
          "A polished visual system that adapts cleanly across phones, tablets and larger screens.",
      },
      {
        title: "Production development",
        detail:
          "Maintainable implementation, accessible interactions and dependable contact paths.",
      },
      {
        title: "Search foundations",
        detail:
          "Semantic content, page metadata, crawlable links, image guidance and technical SEO basics.",
      },
    ],
    process: APPROACH.map(([title, detail]) => ({ title, detail })),
    outcome:
      "You receive a website that presents the business clearly, supports real customer decisions and is ready for ongoing improvement after launch.",
    related: [
      { label: "Website redesign", href: "/services/website-redesign" },
      { label: "Custom web development", href: "/services/custom-web-development" },
      { label: "Home services websites", href: "/industries/home-services" },
    ],
  },
  websiteRedesign: {
    path: "/services/website-redesign",
    section: "Services",
    eyebrow: "Business website redesign",
    title: "Business Website Redesign Services | NYG Digital",
    description:
      "Redesign an outdated business website with clearer messaging, better mobile usability, faster performance and a stronger enquiry journey.",
    h1: "Turn an outdated website into a stronger business asset.",
    intro:
      "A redesign is an opportunity to fix the reasons a website feels difficult to use or no longer represents the business. We review the current experience, keep what remains useful and rebuild the structure, presentation and technical foundation around today’s priorities.",
    audience:
      "This service suits established businesses with a live website that looks dated, performs poorly on mobile, is hard to update or does not guide prospects toward the right action.",
    challengeTitle: "The visible design is only part of the problem.",
    challenges: [
      "Important services may be buried under an old navigation or unclear page structure.",
      "Mobile layouts, slow assets or weak contrast can make the experience harder to use.",
      "Legacy content and URLs need careful handling so useful search equity is not discarded.",
    ],
    deliverableTitle: "A measured redesign with continuity where it matters.",
    deliverables: [
      {
        title: "Existing-site review",
        detail:
          "A practical audit of content, journeys, page inventory, technology, metadata and working integrations.",
      },
      {
        title: "Content and navigation reset",
        detail:
          "A clearer hierarchy that helps customers find services, proof and contact options.",
      },
      {
        title: "Responsive redesign",
        detail:
          "A refined visual direction that respects the brand and works across current devices.",
      },
      {
        title: "Migration and redirects",
        detail:
          "A controlled launch plan for retained content, changed URLs, analytics and contact functionality.",
      },
    ],
    process: [
      {
        title: "Audit",
        detail:
          "Review the current pages, content, search visibility, performance and technical constraints.",
      },
      {
        title: "Prioritize",
        detail:
          "Agree what to preserve, rewrite, remove or add based on customer and business needs.",
      },
      {
        title: "Redesign",
        detail: "Create the new structure and interface before committing to the production build.",
      },
      {
        title: "Rebuild",
        detail:
          "Develop the responsive site, migrate approved content and reconnect essential tools.",
      },
      {
        title: "Validate & launch",
        detail:
          "Test forms, devices, metadata, analytics and redirects before the new version goes live.",
      },
    ],
    outcome:
      "The result is a faster, clearer website that reflects the business today while protecting important routes and operational connections during the change.",
    related: [
      { label: "Website design", href: "/services/web-design" },
      { label: "Custom web development", href: "/services/custom-web-development" },
      {
        label: "Interior design and fit-out websites",
        href: "/industries/interior-design-fit-out",
      },
    ],
  },
  customDevelopment: {
    path: "/services/custom-web-development",
    section: "Services",
    eyebrow: "Custom web development",
    title: "Custom Web Development Agency | NYG Digital",
    description:
      "Custom web development for business websites, interactive tools and connected digital experiences that need more than a standard template.",
    h1: "Custom web development for requirements that do not fit a template.",
    intro:
      "Some websites need tailored interactions, structured data, third-party connections or application-like features. We translate those requirements into a focused web solution without making the experience feel technical to the people using it.",
    audience:
      "This service is for businesses that have moved beyond a basic brochure site and need a dependable interface shaped around a specific workflow, data source or customer journey.",
    challengeTitle: "Custom functionality should simplify the experience.",
    challenges: [
      "Generic plugins can force the business into a workflow that does not match how it operates.",
      "Multiple tools may need to exchange information without exposing complexity to customers.",
      "A feature-rich website still needs to remain usable, fast, accessible and maintainable.",
    ],
    deliverableTitle: "Purpose-built functionality with a clear operational role.",
    deliverables: [
      {
        title: "Technical discovery",
        detail:
          "Requirements, data, integrations, risks and user roles translated into a buildable scope.",
      },
      {
        title: "Interface and interaction design",
        detail:
          "Flows and screen states designed around real tasks, including errors and edge cases.",
      },
      {
        title: "Application development",
        detail:
          "Custom front-end and connected services using the appropriate existing or agreed stack.",
      },
      {
        title: "Testing and handover",
        detail:
          "Responsive, accessibility and functional testing with clear operational documentation.",
      },
    ],
    process: [
      {
        title: "Requirements",
        detail: "Define users, jobs, data, integrations and the smallest valuable release.",
      },
      {
        title: "Solution design",
        detail: "Map the experience and technical boundaries before development begins.",
      },
      { title: "Prototype", detail: "Validate important interactions and assumptions early." },
      {
        title: "Build",
        detail: "Develop in clear stages with review points around working software.",
      },
      { title: "Release", detail: "Test, deploy, monitor and hand over the finished system." },
    ],
    outcome:
      "You receive a web experience shaped around the requirement, with the interface, integrations and technical decisions documented clearly.",
    related: [
      { label: "Booking website development", href: "/services/booking-websites" },
      { label: "Website design", href: "/services/web-design" },
      { label: "Tourism and charter websites", href: "/industries/tourism-charters" },
    ],
  },
  bookingWebsites: {
    path: "/services/booking-websites",
    section: "Services",
    eyebrow: "Enquiry and booking websites",
    title: "Booking & Lead Generation Website Development | NYG Digital",
    description:
      "Websites for bookings, quotations and qualified enquiries, with clear service choices, practical forms and connected follow-up paths.",
    h1: "Make it easier for the right customer to enquire or book.",
    intro:
      "The strongest conversion path gives people enough information to make a decision, asks only for useful details and sets a clear expectation for what happens next. We design the complete journey around your service and operating process.",
    audience:
      "This service is suited to contractors, consultants, tourism operators and other service businesses whose website needs to support quotations, consultations, availability requests or direct bookings.",
    challengeTitle: "Forms work best when the journey around them is clear.",
    challenges: [
      "Prospects may abandon a request when services, availability or next steps are ambiguous.",
      "A generic contact form often misses the details the team needs to respond usefully.",
      "Booking tools and notifications need to fit the operating workflow rather than creating another inbox to monitor.",
    ],
    deliverableTitle: "A focused path from interest to a useful request.",
    deliverables: [
      {
        title: "Journey and form design",
        detail: "Questions, decision points and confirmation states matched to the service.",
      },
      {
        title: "Responsive service pages",
        detail: "Clear information that prepares the customer before they enquire or book.",
      },
      {
        title: "Booking or enquiry integration",
        detail:
          "Connection to the appropriate existing calendar, inbox, CRM or approved booking service.",
      },
      {
        title: "Measurement foundations",
        detail:
          "Consent-aware event points that can be connected to the business’s existing analytics setup.",
      },
    ],
    process: [
      {
        title: "Map the current path",
        detail:
          "Understand how requests arrive, what information is needed and where delays occur.",
      },
      {
        title: "Design the decision journey",
        detail:
          "Structure services, reassurance, questions and calls to action in the right order.",
      },
      {
        title: "Build and connect",
        detail: "Develop the interface and connect the agreed booking, email or data destination.",
      },
      {
        title: "Test real scenarios",
        detail: "Check mobile completion, validation, confirmations and failure states.",
      },
      {
        title: "Launch and improve",
        detail: "Release the flow and use real enquiry quality to guide later refinements.",
      },
    ],
    outcome:
      "The finished website helps prospects choose the right path and gives your team a cleaner, more useful starting point for every new request.",
    related: [
      { label: "Tourism and charter websites", href: "/industries/tourism-charters" },
      { label: "Home services websites", href: "/industries/home-services" },
      { label: "Custom web development", href: "/services/custom-web-development" },
    ],
  },
  homeServices: {
    path: "/industries/home-services",
    section: "Industries",
    eyebrow: "Websites for contractors and home services",
    title: "Home Services & Contractor Website Design | NYG Digital",
    description:
      "Professional websites for remodeling, roofing, HVAC and home service businesses, built around trust, service clarity and quotation enquiries.",
    h1: "Websites that help home service businesses earn the next conversation.",
    intro:
      "Before inviting a contractor into a property, customers look for clear services, relevant work, service areas and a straightforward way to request help. We organize those signals into a professional website that works well on the phone in their hand.",
    audience:
      "We design for remodeling and renovation contractors, HVAC and roofing providers, specialist trades and established home service companies serving defined locations.",
    challengeTitle: "Customers are evaluating confidence and fit.",
    challenges: [
      "Similar service names can make it hard for a homeowner to know whether the company handles their job.",
      "Project images need useful context rather than an unexplained gallery.",
      "Service areas, response expectations and quotation steps need to be easy to find on mobile.",
    ],
    deliverableTitle: "A practical contractor website structure.",
    deliverables: [
      {
        title: "Clear service architecture",
        detail:
          "Dedicated, useful paths for priority services without creating repetitive location pages.",
      },
      {
        title: "Project presentation",
        detail:
          "Case-study or gallery patterns that explain scope using only verified work and facts.",
      },
      {
        title: "Location and trust context",
        detail:
          "Accurate service-area information, business identity and contact details placed where needed.",
      },
      {
        title: "Quotation journey",
        detail:
          "A mobile-friendly request path that gathers the information your team actually uses.",
      },
    ],
    process: APPROACH.map(([title, detail]) => ({ title, detail })),
    outcome:
      "The website helps a prospective customer understand what you do, where you work and how to start a well-informed quotation request.",
    related: [
      { label: "Website design", href: "/services/web-design" },
      { label: "Booking and lead generation websites", href: "/services/booking-websites" },
      { label: "Website redesign", href: "/services/website-redesign" },
    ],
  },
  interiorDesign: {
    path: "/industries/interior-design-fit-out",
    section: "Industries",
    eyebrow: "Websites for interiors and fit-out",
    title: "Interior Design & Fit-Out Website Design | NYG Digital",
    description:
      "Refined websites for interior design and fit-out companies, with considered project presentation, service clarity and qualified enquiry paths.",
    h1: "A considered digital presence for interior design and fit-out firms.",
    intro:
      "Your website needs to let the work lead while still explaining capability, project types and the client experience. We create restrained, image-aware websites that turn visual interest into a better-informed project conversation.",
    audience:
      "This service is for interior design studios, commercial and residential fit-out contractors, space planners and related firms that need a professional portfolio-led presence.",
    challengeTitle: "Beautiful imagery still needs useful context.",
    challenges: [
      "Large project photography can become slow or awkward on mobile when it is not prepared carefully.",
      "Prospects may admire the work without understanding services, sectors, scope or delivery process.",
      "An open-ended contact page can attract requests with too little information to qualify properly.",
    ],
    deliverableTitle: "Portfolio presentation connected to a clear business journey.",
    deliverables: [
      {
        title: "Project-led information design",
        detail:
          "A structure for verified projects, services and sectors that remains easy to navigate.",
      },
      {
        title: "Premium responsive layouts",
        detail: "Careful typography, spacing and image treatment across mobile and larger screens.",
      },
      {
        title: "Performance-aware media",
        detail:
          "Modern formats, useful alt text and responsive delivery for approved project imagery.",
      },
      {
        title: "Qualified project enquiries",
        detail: "A concise brief path that sets expectations and captures useful project context.",
      },
    ],
    process: APPROACH.map(([title, detail]) => ({ title, detail })),
    outcome:
      "The finished site gives the portfolio room to breathe while making the firm’s expertise, process and enquiry path easier to understand.",
    related: [
      { label: "Website design", href: "/services/web-design" },
      { label: "Website redesign", href: "/services/website-redesign" },
      { label: "Booking and enquiry websites", href: "/services/booking-websites" },
    ],
  },
  tourismCharters: {
    path: "/industries/tourism-charters",
    section: "Industries",
    eyebrow: "Websites for tourism and private charters",
    title: "Tourism & Charter Website Development | NYG Digital",
    description:
      "Fast, mobile-friendly websites for tours, yacht and private charter businesses, with clear experiences, availability enquiries and booking paths.",
    h1: "Turn travel interest into a clear enquiry or booking path.",
    intro:
      "Tourism customers often compare options on mobile and across time zones. They need to understand the experience, what is included, practical constraints and how availability works before they are ready to act.",
    audience:
      "We build for tour operators, yacht and boat charter companies, private experience providers and booking-based tourism businesses serving local and international guests.",
    challengeTitle: "The website has to answer practical questions quickly.",
    challenges: [
      "Strong images can attract attention while package details, inclusions and policies remain unclear.",
      "A WhatsApp-only path can make comparison and structured request handling difficult for some guests.",
      "Booking integrations need clear confirmation and failure states across devices and connection speeds.",
    ],
    deliverableTitle: "A mobile-first experience from discovery to availability.",
    deliverables: [
      {
        title: "Experience and package structure",
        detail:
          "Clear pages for what guests can choose, what is included and what they need to know.",
      },
      {
        title: "Fast visual presentation",
        detail:
          "Responsive, optimized media that supports the offer without blocking important information.",
      },
      {
        title: "Enquiry or booking flow",
        detail:
          "A suitable path for availability, group details and preferred dates using approved tools.",
      },
      {
        title: "International usability",
        detail:
          "Clear contact options, mobile interaction and content that works for remote trip planning.",
      },
    ],
    process: APPROACH.map(([title, detail]) => ({ title, detail })),
    outcome:
      "The site helps potential guests move from inspiration to a practical request with the details needed for your team to respond well.",
    related: [
      { label: "Booking website development", href: "/services/booking-websites" },
      { label: "Custom web development", href: "/services/custom-web-development" },
      { label: "Website design", href: "/services/web-design" },
    ],
  },
};
