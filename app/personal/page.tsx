import type { Metadata } from "next";
import { PageHeader } from "../site-components";

export const metadata: Metadata = {
  title: "Personal",
  description: "Personal links, notes, software, and archives from Tiago Tavares.",
};

const resources = [
  ["Gnuplot notes and gallery", "/legacy/archive/personal-software-gnuplot.html"],
  ["Emacs notes", "/legacy/archive/personal-software-emacs.html"],
  ["SED and Grep", "/legacy/archive/sed.html"],
  ["Parallel computing", "/legacy/archive/software-parallelization.html"],
  ["Economists and academic links", "/legacy/archive/personal-links-economists.html"],
  ["Historical galleries", "/legacy/contact.html"],
];

const references = [
  ["Yan Bai", "University of Rochester", "ybai7@z.rochester.edu"],
  ["Yongsung Chang", "University of Rochester", "yongsung.chang@rochester.edu"],
  ["George Alessandria", "University of Rochester", "george.alessandria@rochester.edu"],
];

export default function PersonalPage() {
  return (
    <main className="page-shell">
      <PageHeader
        eyebrow="Personal"
        title="Personal"
        description="A small collection of software notes, useful academic links, historical materials, and contact information."
      />

      <section className="page-section">
        <h2>Notes and resources</h2>
        <ul className="resource-list">
          {resources.map(([label, href]) => (
            <li key={label}>
              <a href={href}>
                <strong>{label}</strong>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="page-section">
        <h2>Academic references</h2>
        <ul className="reference-list">
          {references.map(([name, institution, email]) => (
            <li key={name}>
              <strong>{name}</strong>
              <span>{institution}</span>
              <span>
                <a href={`mailto:${email}`}>{email}</a>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="page-section">
        <h2>Contact</h2>
        <p>
          Department of Economics, University of Minho, Braga, Portugal<br />
          <a href="mailto:tgstavares@eeg.uminho.pt">tgstavares@eeg.uminho.pt</a><br />
          <a href="mailto:tgstavares@gmail.com">tgstavares@gmail.com</a>
        </p>
      </section>
    </main>
  );
}
