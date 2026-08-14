import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { SiteFooter, SiteHeader } from "./site-chrome";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") ? "http" : "https");
  const siteUrl = host ? `${protocol}://${host}` : "https://www.tgstavares.com";
  const description =
    "Academic website of Tiago Tavares, economist at the University of Minho.";

  return {
    title: {
      default: "Tiago Tavares · Economist",
      template: "%s · Tiago Tavares",
    },
    description,
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
    },
    openGraph: {
      type: "website",
      title: "Tiago Tavares · Economist",
      description,
      url: siteUrl,
      images: [{ url: `${siteUrl}/og.png`, width: 1733, height: 909 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Tiago Tavares · Economist",
      description,
      images: [`${siteUrl}/og.png`],
    },
  };
}

const themeScript = `
  try {
    const saved = localStorage.getItem('tiago-theme');
    document.documentElement.dataset.theme = saved === 'light' ? 'light' : 'dark';
  } catch (_) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
