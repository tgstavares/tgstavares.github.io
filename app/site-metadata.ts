import type { Metadata } from "next";

export const SITE_NAME = "Tiago Tavares";
export const SITE_URL = new URL("https://www.tgstavares.com");
export const DEFAULT_TITLE = "Tiago Tavares · Economist";
export const DEFAULT_DESCRIPTION =
  "Academic website of Tiago Tavares, Assistant Professor of Economics at ISEG, University of Lisbon. Research in macroeconomics, sovereign debt, and firm dynamics.";

export const SOCIAL_IMAGE = {
  url: "/og.png",
  width: 1733,
  height: 909,
  alt: "Tiago Tavares · Economist",
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}`;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  const socialTitle = `${title} · ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      url: path,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@tgstavares",
      title: socialTitle,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  };
}

export const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tiago Gomes da Silva Tavares",
  givenName: "Tiago",
  familyName: "Tavares",
  url: SITE_URL.href,
  image: new URL("/images/tiago-tavares.jpg", SITE_URL).href,
  jobTitle: "Assistant Professor of Economics",
  worksFor: {
    "@type": "CollegeOrUniversity",
    name: "ISEG – Lisbon School of Economics & Management, University of Lisbon",
    url: "https://www.iseg.ulisboa.pt/en/",
  },
  sameAs: [
    "https://github.com/tgstavares",
    "https://x.com/tgstavares",
    "https://www.linkedin.com/in/tiago-tavares-b1612025b/",
  ],
  knowsAbout: [
    "Macroeconomics",
    "International macroeconomics",
    "Sovereign debt",
    "Firm dynamics",
    "Misallocation",
    "Firm investment",
  ],
};
