import type { Paper } from "./site-data";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="section-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {description ? <p>{description}</p> : <span aria-hidden="true" />}
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
          <div className="paper-year">{paper.year}</div>
          <div>
            <h3 className="paper-title">
              {paper.href ? <a href={paper.href}>{paper.title}</a> : paper.title}
            </h3>
            <p className="paper-authors">{paper.authors}</p>
            {paper.venue ? <p className="paper-venue">{paper.venue}</p> : null}
            {paper.links?.length ? (
              <div className="paper-links" aria-label={`Links for ${paper.title}`}>
                {paper.links.map((link) => (
                  <a href={link.href} key={`${paper.title}-${link.label}`}>
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
        </article>
      ))}
    </div>
  );
}
