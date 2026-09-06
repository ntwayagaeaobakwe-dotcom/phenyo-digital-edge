import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/nyg/HeroSection";
import { HeaderNav } from "@/components/nyg/HeaderNav";
import { ServicesSection } from "@/components/nyg/ServicesSection";
import { AGENCY_SERVICES } from "@/data/agency-services";
import { SystemStudio } from "@/components/portfolio/SystemStudio";
import { BottleneckConfigurator } from "@/components/portfolio/BottleneckConfigurator";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { CapabilitySection } from "@/components/portfolio/CapabilitySection";
import { EngagementBlueprint } from "@/components/portfolio/EngagementBlueprint";
import { lazy, Suspense } from "react";
const ContactSection = lazy(() =>
  import("@/components/portfolio/ContactSection").then((module) => ({
    default: module.ContactSection,
  })),
);
import { FooterSection } from "@/components/nyg/FooterSection";
import { getSiteUrl } from "@/lib/seo";
import { COMPANY_INFO, PERSONAL_INFO } from "@/data/portfolio-data";

const SITE_URL = getSiteUrl();
const PAGE_TITLE = "Web Development, AI & Automation in UAE | NYG Agency";
const PAGE_DESC =
  "NYG Agency is an Ajman-based computer-systems consultancy for web development, AI solutions, and n8n business automation serving Dubai and the UAE.";

const AREA_SERVED = [
  { "@type": "City", name: "Ajman" },
  { "@type": "City", name: "Dubai" },
  { "@type": "Country", name: "United Arab Emirates" },
];

const SERVICE_SCHEMA = AGENCY_SERVICES.map((service, index) => ({
  "@type": "Service",
  "@id": `${SITE_URL}#service-${index + 1}`,
  name: service.title,
  serviceType: service.title,
  description: service.text,
  provider: { "@id": `${SITE_URL}#organization` },
  areaServed: AREA_SERVED,
  url: `${SITE_URL}#services`,
}));

const FAQ_SCHEMA = [
  {
    "@type": "Question",
    name: "What does NYG Agency build?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "NYG Agency builds websites and web applications, practical AI integrations, and connected business automation systems around the way your team works.",
    },
  },
  {
    "@type": "Question",
    name: "Do you work with businesses in Dubai and Ajman?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes. NYG Agency is registered in Ajman and serves businesses in Dubai and across the wider United Arab Emirates.",
    },
  },
  {
    "@type": "Question",
    name: "What is n8n workflow automation?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "n8n workflow automation connects forms, APIs, CRM tools, spreadsheets, and alerts so information moves between the tools your business already uses.",
    },
  },
];

const HOME_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: COMPANY_INFO.brandName,
      legalName: COMPANY_INFO.legalName,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/nyg-agency-horizontal.svg` },
      image: `${SITE_URL}/og-image.png`,
      foundingDate: COMPANY_INFO.foundedDate,
      email: PERSONAL_INFO.email,
      telephone: PERSONAL_INFO.phone,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: PERSONAL_INFO.email,
        telephone: PERSONAL_INFO.phone,
        areaServed: "AE",
        availableLanguage: "en",
      },
      description: COMPANY_INFO.description,
      knowsAbout: [
        "Web development",
        "AI solutions",
        "Business automation",
        "n8n workflow automation",
        "Computer systems consultancy",
      ],
      founder: {
        "@type": "Person",
        name: PERSONAL_INFO.name,
        sameAs: PERSONAL_INFO.socials.map((social) => social.href),
      },
      areaServed: AREA_SERVED,
      address: {
        "@type": "PostalAddress",
        addressLocality: COMPANY_INFO.registeredLocality,
        addressCountry: "AE",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}#professional-service`,
      name: COMPANY_INFO.brandName,
      url: SITE_URL,
      description: PAGE_DESC,
      email: PERSONAL_INFO.email,
      telephone: PERSONAL_INFO.phone,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NYG Agency capabilities",
        itemListElement: SERVICE_SCHEMA.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@id": service["@id"] },
        })),
      },
      parentOrganization: { "@id": `${SITE_URL}#organization` },
      areaServed: AREA_SERVED,
      address: {
        "@type": "PostalAddress",
        addressLocality: COMPANY_INFO.registeredLocality,
        addressCountry: "AE",
      },
    },
    ...SERVICE_SCHEMA,
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: COMPANY_INFO.brandName,
      inLanguage: "en-AE",
      publisher: { "@id": `${SITE_URL}#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}#webpage`,
      url: SITE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESC,
      inLanguage: "en-AE",
      isPartOf: { "@id": `${SITE_URL}#website` },
      about: { "@id": `${SITE_URL}#organization` },
      primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/og-image.png` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}#faq`,
      url: `${SITE_URL}#faq`,
      mainEntity: FAQ_SCHEMA,
    },
  ],
};

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { name: "author", content: PERSONAL_INFO.name },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: SITE_URL },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: COMPANY_INFO.brandName },
      { property: "og:locale", content: "en_AE" },
      { property: "og:image", content: `${SITE_URL}/og-image.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "NYG Agency — web development, AI, and business automation in the UAE",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
      { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
      {
        name: "twitter:image:alt",
        content: "NYG Agency — web development, AI, and business automation in the UAE",
      },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(HOME_SCHEMA),
      },
    ],
  }),
});

function Home() {
  return (
    <div className="nyg-site">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <HeaderNav />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <SystemStudio />
        <BottleneckConfigurator />
        <CapabilitySection />
        <EngagementBlueprint />
        <Suspense
          fallback={
            <section id="contact" className="studio-section page-width">
              <h2>Have an idea? Let’s build it.</h2>
              <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
            </section>
          }
        >
          <ContactSection />
        </Suspense>
      </main>
      <FooterSection />
    </div>
  );
}
export default Home;
