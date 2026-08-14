import type { Metadata } from "next";
import { PageHeader, PaperList } from "../site-components";
import { discussions, publications, workingPapers } from "../site-data";

export const metadata: Metadata = {
  title: "Research",
  description: "Research by Tiago Tavares in macroeconomics and finance.",
};

export default function ResearchPage() {
  return (
    <main className="page-shell">
      <PageHeader
        eyebrow="Research"
        title="Research"
        description="Working papers, peer-reviewed publications, and conference discussions in sovereign debt, international macroeconomics, fiscal policy, firm dynamics, and financial crises."
      />

      <section className="page-section">
        <h2>Working papers</h2>
        <PaperList papers={workingPapers} showAbstracts />
      </section>

      <section className="page-section">
        <h2>Publications</h2>
        <PaperList papers={publications} showAbstracts />
      </section>

      <section className="page-section">
        <h2>Paper discussions</h2>
        <ul className="discussion-list">
          {discussions.map((discussion) => (
            <li key={discussion.title}>
              <a href={discussion.href}>
                <strong>{discussion.title}</strong>
              </a>
              <span>{discussion.authors}</span>
              <span>{discussion.event}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
