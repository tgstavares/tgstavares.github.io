import type { Metadata } from "next";
import { PaperList } from "../site-components";
import { discussions, publications, workingPapers } from "../site-data";
import { createPageMetadata } from "../site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Research",
  description:
    "Publications, working papers, and paper discussions by Tiago Tavares in macroeconomics, sovereign debt, and firm dynamics.",
  path: "/research",
});

export default function ResearchPage() {
  return (
    <main className="page-shell research-shell">
      <h1 className="visually-hidden">Research</h1>
      <section className="page-section">
        <h2>Publications</h2>
        <PaperList papers={publications} showAbstracts />
      </section>

      <section className="page-section">
        <h2>Working papers</h2>
        <PaperList papers={workingPapers} showAbstracts />
      </section>

      <section className="page-section">
        <h2>Paper discussions</h2>
        <PaperList papers={discussions} />
      </section>
    </main>
  );
}
