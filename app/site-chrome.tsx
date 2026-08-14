"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { useSyncExternalStore } from "react";
import { FaGithub } from "react-icons/fa";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/teaching", label: "Teaching" },
  { href: "/cv", label: "CV" },
];

const palettes = [
  { id: "cobalt", label: "Cobalt" },
  { id: "day", label: "Day" },
] as const;

type Palette = (typeof palettes)[number]["id"];

const paletteChangeEvent = "tiago-palette-change";

function getPaletteSnapshot(): Palette {
  const currentPalette = document.documentElement.dataset.palette;
  return currentPalette === "day" ? "day" : "cobalt";
}

function subscribeToPalette(onStoreChange: () => void) {
  window.addEventListener(paletteChangeEvent, onStoreChange);
  return () => window.removeEventListener(paletteChangeEvent, onStoreChange);
}

function selectPalette(nextPalette: Palette) {
  document.documentElement.dataset.palette = nextPalette;
  localStorage.setItem("tiago-palette", nextPalette);
  window.dispatchEvent(new Event(paletteChangeEvent));
}

function PalettePicker() {
  const activePalette = useSyncExternalStore(
    subscribeToPalette,
    getPaletteSnapshot,
    () => "cobalt",
  );

  return (
    <div className="palette-picker" aria-label="Color theme">
      {palettes.map((option) => (
        <button
          className={`palette-swatch palette-${option.id}`}
          type="button"
          key={option.id}
          onClick={() => selectPalette(option.id)}
          aria-label={`Use ${option.label} theme`}
          aria-pressed={activePalette === option.id}
          title={`${option.label} theme`}
        >
          <span aria-hidden="true" />
        </button>
      ))}
    </div>
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
            className="header-icon-link"
            href="mailto:tgstavares@eeg.uminho.pt"
            aria-label="Email Tiago Tavares"
            title="Email"
          >
            <Mail aria-hidden="true" />
          </a>
          <a
            className="header-icon-link"
            href="https://github.com/tgstavares"
            aria-label="Tiago Tavares on GitHub"
            title="GitHub"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub aria-hidden="true" />
          </a>
          <PalettePicker />
        </div>
      </div>
    </header>
  );
}
