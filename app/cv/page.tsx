import type { Metadata } from "next";
import { FiDownload, FiExternalLink } from "react-icons/fi";
import { PaperList } from "../site-components";
import type { Paper } from "../site-data";
import { publications, workingPapers } from "../site-data";
import { createPageMetadata } from "../site-metadata";
import {
  academicEmployment,
  computerSkills,
  education,
  fellowships,
  languages,
  refereeing,
  references,
  researchFields,
  talks,
  teachingExperience,
} from "../cv-data";

export const metadata: Metadata = createPageMetadata({
  title: "Curriculum Vitae",
  description:
    "Academic curriculum vitae of Tiago Tavares, including research, teaching, employment, and education.",
  path: "/cv",
});

const publicationDates: Record<string, string> = {
  "Informality, Tax Distortions, and the Cyclicality of Fiscal Policy": "May 2026",
  "The Role of International Reserves in Sovereign Debt Restructuring under Fiscal Adjustment":
    "May 2025",
  "Investment Slumps during Financial Crises: The Real Effects of Credit Supply":
    "July 2022",
  "Information and Behavioral Responses during a Pandemic: Evidence from Delays in COVID-19 Death Reports":
    "January 2022",
  "Labor Market Distortions under Sovereign Debt Default Crises": "November 2019",
};

const cvPublications = publications.map((paper) => ({
  ...paper,
  year: publicationDates[paper.title] ?? paper.year,
}));

const cvWorkingPapers: Paper[] = [
  ...workingPapers.map((paper) =>
    paper.title === "Financing Transformative Search: Runway, Control, and Frontier Innovation"
      ? { ...paper, year: "May 2026" }
      : paper,
  ),
  {
    year: "2015",
    title: "Noisy Information About the Trend and Sovereign Default Risk",
    authors: "Tiago Tavares",
    venue: "Under revision",
  },
];

export default function CvPage() {
  return (
    <main className="page-shell cv-shell">
      <header className="cv-titlebar">
        <div>
          <p className="section-eyebrow">Curriculum Vitae</p>
          <h1>Tiago Tavares</h1>
          <p className="cv-updated">Last updated September 2026</p>
        </div>
        <div className="cv-actions" aria-label="CV PDF options">
          <a className="button-link" href="/files/TiagoTavares_CV.pdf" download>
            <FiDownload aria-hidden="true" />
            Download PDF
          </a>
          <a className="button-link" href="/files/TiagoTavares_CV.pdf" target="_blank">
            <FiExternalLink aria-hidden="true" />
            Open PDF
          </a>
        </div>
      </header>

      <section className="cv-contact" aria-label="Contact information">
        <div className="cv-contact-address">
          <p className="cv-contact-label">Address</p>
          <address>
            Department of Economics
            <br />
            ISEG – Lisbon School of Economics &amp; Management
            <br />
            University of Lisbon
            <br />
            Rua do Quelhas, 6
            <br />
            1200-781 Lisbon, Portugal
          </address>
        </div>
        <dl className="cv-contact-list">
          <dt>Phone</dt>
          <dd>
            <a href="tel:+351928063175">+351 928 063 175</a>
          </dd>
          <dt>Email</dt>
          <dd className="cv-contact-emails">
            <a href="mailto:tgstavares@eeg.uminho.pt">tgstavares@eeg.uminho.pt</a>
            <a href="mailto:tgstavares@gmail.com">tgstavares@gmail.com</a>
          </dd>
          <dt>Homepage</dt>
          <dd>
            <a href="https://www.tgstavares.com">www.tgstavares.com</a>
          </dd>
          <dt>Citizenship</dt>
          <dd>Portugal</dd>
        </dl>
      </section>

      <section className="cv-web-section">
        <h2>Academic employment</h2>
        <ol className="cv-timeline">
          {academicEmployment.map((entry) => (
            <li key={`${entry.period}-${entry.text}`}>
              <span className="cv-period">{entry.period}</span>
              <span>{entry.text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="cv-web-section">
        <h2>Education</h2>
        <ul className="cv-education-list">
          {education.map((item) => (
            <li key={item.institution}>
              <p>
                <strong>{item.institution}</strong>
                <span>{item.location}</span>
              </p>
              <ul>
                {item.degrees.map((degree) => (
                  <li key={degree}>{degree}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="cv-web-section">
        <h2>Research fields</h2>
        <p className="cv-inline-copy">{researchFields.join("; ")}</p>
      </section>

      <section className="cv-web-section cv-paper-section">
        <h2>Publications</h2>
        <PaperList papers={cvPublications} />
      </section>

      <section className="cv-web-section cv-paper-section">
        <h2>Working papers</h2>
        <PaperList papers={cvWorkingPapers} />
      </section>

      <section className="cv-web-section">
        <h2>Talks and conferences</h2>
        <ol className="cv-talk-list">
          {talks.map((item) => (
            <li key={item.year}>
              <span className="cv-period">{item.year}</span>
              <span>{item.entries.join("; ")}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="cv-web-section">
        <h2>Refereeing</h2>
        <p className="cv-inline-copy">
          {refereeing.map((journal, index) => (
            <span key={journal}>
              <em>{journal}</em>
              {index < refereeing.length - 1 ? "; " : null}
            </span>
          ))}
        </p>
      </section>

      <section className="cv-web-section">
        <h2>Teaching experience</h2>
        <ul className="cv-detail-list">
          {teachingExperience.map((item) => (
            <li key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="cv-web-section">
        <h2>Fellowships, scholarships, and awards</h2>
        <ul className="cv-compact-list">
          {fellowships.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="cv-web-section cv-short-section">
        <h2>Computer skills</h2>
        <p className="cv-inline-copy">{computerSkills.join(", ")}</p>
      </section>

      <section className="cv-web-section cv-short-section">
        <h2>Languages</h2>
        <p className="cv-inline-copy">{languages.join("; ")}</p>
      </section>

      <section className="cv-web-section">
        <h2>References</h2>
        <div className="cv-reference-grid">
          {references.map((reference) => (
            <article className="cv-reference" key={reference.name}>
              <h3>{reference.name}</h3>
              {reference.role ? <p className="cv-reference-role">{reference.role}</p> : null}
              <address>
                {reference.institution}
                <br />
                {reference.address.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
                {reference.phone ? (
                  <>
                    Phone: {reference.phone}
                    <br />
                  </>
                ) : null}
                <a href={`mailto:${reference.email}`}>{reference.email}</a>
              </address>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
