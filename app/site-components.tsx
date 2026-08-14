import type { Paper } from "./site-data";

export function SectionHeading({
  title,
}: {
  title: string;
}) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="page-header">
      <div>
        <p className="section-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
      </div>
      <p>{description}</p>
    </header>
  );
}

export function PaperList({
  papers,
  showAbstracts = false,
}: {
  papers: Paper[];
  showAbstracts?: boolean;
}) {
  return (
    <div className="paper-list">
      {papers.map((paper) => (
        <article className="paper-item" key={paper.title}>
          <div className="paper-mainline">
            <p className="paper-title">
              <span className="paper-title-mark">
                {paper.href ? <a href={paper.href}>{paper.title}</a> : paper.title}
              </span>
            </p>
            <span className="paper-year">{paper.year}</span>
          </div>
          <div className="paper-details">
            <p className="paper-authors">{paper.authors}</p>
            <div className="paper-meta">
              {paper.venue || paper.journal ? (
                <p className="paper-venue">
                  {paper.venue}
                  {paper.venue && paper.journal ? ", " : null}
                  {paper.journal ? (
                    <strong className="journal-name">
                      <em>{paper.journal}</em>
                    </strong>
                  ) : null}
                  {paper.journalDetails ? `, ${paper.journalDetails}` : null}
                </p>
              ) : null}
              {paper.links?.length ? (
                <div className="paper-links" aria-label={`Links for ${paper.title}`}>
                  {paper.links.map((link) => (
                    <a
                      href={link.href}
                      key={`${paper.title}-${link.label}`}
                      aria-label={`${link.label} for ${paper.title}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
              {showAbstracts && paper.abstract ? (
                <details className="paper-abstract">
                  <summary className="abstract-toggle">Abstract</summary>
                  <p className="abstract-copy">{paper.abstract}</p>
                </details>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
