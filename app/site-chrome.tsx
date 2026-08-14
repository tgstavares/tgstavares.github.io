"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/teaching", label: "Teaching" },
  { href: "/cv", label: "CV" },
  { href: "/personal", label: "Personal" },
];

function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.dataset.theme === "light");
  }, []);

  function toggleTheme() {
    const nextIsLight = !isLight;
    setIsLight(nextIsLight);
    document.documentElement.dataset.theme = nextIsLight ? "light" : "dark";
    localStorage.setItem("tiago-theme", nextIsLight ? "light" : "dark");
  }

  return (
    <button
      className="icon-button"
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Use dark theme" : "Use light theme"}
      title={isLight ? "Use dark theme" : "Use light theme"}
    >
      <span className="theme-symbol" aria-hidden="true">
        {isLight ? "☾" : "☀"}
      </span>
    </button>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/">
          Tiago Tavares
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href))
                  ? "page"
                  : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="icon-button"
            href="mailto:tgstavares@eeg.uminho.pt"
            aria-label="Email Tiago Tavares"
            title="Email"
          >
            <span className="header-symbol" aria-hidden="true">@</span>
          </a>
          <a
            className="icon-button"
            href="/files/TiagoTavares_CV.pdf"
            aria-label="Open curriculum vitae"
            title="Curriculum vitae"
          >
            <span className="header-symbol header-symbol-cv" aria-hidden="true">CV</span>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span>© {new Date().getFullYear()} Tiago Tavares</span>
        <div className="footer-links">
          <a href="mailto:tgstavares@eeg.uminho.pt">Email</a>
          <a href="/files/TiagoTavares_CV.pdf">CV</a>
          <a href="/legacy/archive.html">Legacy archive</a>
        </div>
      </div>
    </footer>
  );
}
