import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { SiteHeader } from "./site-chrome";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  PERSON_JSON_LD,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE,
} from "./site-metadata";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: DEFAULT_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "Tiago Tavares",
    "economist",
    "macroeconomics",
    "international macroeconomics",
    "sovereign debt",
    "firm dynamics",
    "University of Minho",
  ],
  alternates: { canonical: "/" },
  category: "education",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "200x200" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "/",
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@tgstavares",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [SOCIAL_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const themeScript = `
  try {
    const saved = localStorage.getItem('tiago-palette');
    const migrated = saved === 'day' || saved === 'monochrome' ? 'day' : 'cobalt';
    document.documentElement.dataset.palette = migrated;
    if (saved && saved !== migrated) localStorage.setItem('tiago-palette', migrated);
  } catch (_) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" data-palette="cobalt" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(PERSON_JSON_LD).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className={sourceSans.variable}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
