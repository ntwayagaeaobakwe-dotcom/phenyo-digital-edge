import type { MarketingPage } from "@/data/web-agency-content";
import { COMPANY_INFO, PERSONAL_INFO } from "@/data/portfolio-data";
import { getSiteUrl } from "@/lib/seo";

const SITE_URL = getSiteUrl();

export function marketingPageHead(page: MarketingPage) {
  const url = `${SITE_URL}${page.path}`;
  const image = `${SITE_URL}/og-image.png`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        inLanguage: "en-AE",
        isPartOf: { "@id": `${SITE_URL}#website` },
        about: { "@id": `${url}#service` },
        breadcrumb: { "@id": `${url}#breadcrumbs` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.h1,
        serviceType: page.eyebrow,
        description: page.intro,
        url,
        provider: {
          "@type": "Organization",
          "@id": `${SITE_URL}#organization`,
          name: COMPANY_INFO.brandName,
          legalName: COMPANY_INFO.legalName,
          url: SITE_URL,
          email: PERSONAL_INFO.email,
        },
        areaServed: [
          { "@type": "Country", name: "United Arab Emirates" },
          { "@type": "Country", name: "United States" },
        ],
        audience: { "@type": "Audience", audienceType: page.audience },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: page.section,
            item: `${SITE_URL}/#${page.section.toLowerCase()}`,
          },
          { "@type": "ListItem", position: 3, name: page.eyebrow, item: url },
        ],
      },
    ],
  };

  return {
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: COMPANY_INFO.brandName },
      { property: "og:locale", content: "en_AE" },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "NYG Digital web design and development agency" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: page.title },
      { name: "twitter:description", content: page.description },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: "NYG Digital web design and development agency" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
  };
}
