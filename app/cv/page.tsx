import type { Metadata } from "next";
import { PageHeader } from "../site-components";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description: "Curriculum vitae of Tiago Tavares.",
};

export default function CvPage() {
  return (
    <main className="page-shell">
      <PageHeader
        eyebrow="Curriculum vitae"
        title="CV"
        description="Education, academic employment, publications, teaching, presentations, and professional service."
      />
      <div className="cv-actions">
        <a className="button-link" href="/files/TiagoTavares_CV.pdf" download>
          <span aria-hidden="true">↓</span> Download PDF
        </a>
        <a className="button-link" href="/files/TiagoTavares_CV.pdf" target="_blank">
          Open in new tab <span aria-hidden="true">↗</span>
        </a>
      </div>
      <iframe
        className="cv-frame"
        src="/files/TiagoTavares_CV.pdf"
        title="Curriculum vitae of Tiago Tavares"
      />
    </main>
  );
}
