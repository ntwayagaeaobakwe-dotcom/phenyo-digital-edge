import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { HeaderNav } from "@/components/nyg/HeaderNav";
import { FooterSection } from "@/components/nyg/FooterSection";
import { HeroSection } from "@/components/nyg/HeroSection";
import { SiteBackdrop } from "@/components/nyg/ServicesBackdrop";
import { HomeContent } from "@/components/marketing/HomeContent";
import { HOMEPAGE_SERVICES } from "@/data/web-agency-content";
import { COMPANY_INFO, PERSONAL_INFO } from "@/data/portfolio-data";
import { getSiteUrl } from "@/lib/seo";

const ContactSection = lazy(() =>
  import("@/components/portfolio/ContactSection").then((module) => ({
    default: module.ContactSection,
  })),
);

const SITE_URL = getSiteUrl();
const PAGE_TITLE = "Web Design for Commercial Contractors | NYG Digital";
const PAGE_DESC =
  "NYG Digital is UAE-registered and builds websites for U.S. commercial contractors remotely, while serving clients in the UAE and other markets.";

const HOME_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: COMPANY_INFO.brandName,
      legalName: COMPANY_INFO.legalName,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/nyg-agency-monogram.svg` },
      image: `${SITE_URL}/og-image.png`,
      foundingDate: COMPANY_INFO.foundedDate,
      email: PERSONAL_INFO.email,
      telephone: PERSONAL_INFO.phone,
      description: COMPANY_INFO.description,
      founder: {
        "@type": "Person",
        name: PERSONAL_INFO.name,
        url: "https://www.linkedin.com/in/aobakwe-ntwayagae-3a8016423/",
      },
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: COMPANY_INFO.registeredLocality,
        addressCountry: "AE",
      },
      sameAs: PERSONAL_INFO.socials.map((social) => social.href),
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}#professional-service`,
      name: COMPANY_INFO.brandName,
      url: SITE_URL,
      description: PAGE_DESC,
      email: PERSONAL_INFO.email,
      telephone: PERSONAL_INFO.phone,
      parentOrganization: { "@id": `${SITE_URL}#organization` },
      areaServed: ["United States", "United Arab Emirates", "International remote clients"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Website design and development services",
        itemListElement: HOMEPAGE_SERVICES.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            url: `${SITE_URL}${service.href}`,
          },
        })),
      },
    },
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
      about: { "@id": `${SITE_URL}#professional-service` },
      primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/og-image.png` },
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
      { property: "og:image:alt", content: "NYG Digital web design and development agency" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
      { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
      { name: "twitter:image:alt", content: "NYG Digital web design and development agency" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(HOME_SCHEMA) }],
  }),
});

function Home() {
  const [motionPaused, setMotionPaused] = useState(false);
  return (
    <SiteBackdrop paused={motionPaused} className="web-agency-site">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <HeaderNav
        motionPaused={motionPaused}
        onToggleMotion={() => setMotionPaused((paused) => !paused)}
      />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <HomeContent />
        <Suspense
          fallback={
            <section id="contact" className="studio-section page-width">
              <h2>Discuss your website.</h2>
              <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
            </section>
          }
        >
          <ContactSection />
        </Suspense>
      </main>
      <FooterSection />
    </SiteBackdrop>
  );
}

export default Home;
