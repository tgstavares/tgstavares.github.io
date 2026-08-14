import Link from "next/link";
import { PaperList, SectionHeading } from "./site-components";
import { publications, workingPapers } from "./site-data";

export default function Home() {
  return (
    <main>
      <section className="intro section-shell" aria-labelledby="home-title">
        <aside className="profile-rail">
          <img
            className="profile-photo"
            src="/images/tiago-tavares.jpg"
            alt="Tiago Tavares"
            width="640"
            height="853"
          />
          <div className="profile-links" aria-label="Primary contact links">
            <a href="mailto:tgstavares@eeg.uminho.pt">
              <span aria-hidden="true">@</span> Email
            </a>
            <a href="/files/TiagoTavares_CV.pdf">
              <span aria-hidden="true">CV</span> Curriculum vitae
            </a>
          </div>
        </aside>

        <div className="intro-copy">
          <p className="kicker">Economist · University of Minho</p>
          <h1 id="home-title">Tiago Tavares</h1>
          <p className="intro-lead">
            I am an Assistant Professor in the Department of Economics at the
            University of Minho.
          </p>
          <p>
            My research focuses on sovereign default, international
            macroeconomics, misallocation, firm investment, and macroeconomics
            more broadly. I study how financial constraints, fiscal policy, and
            information shape the decisions of governments, firms, and
            households.
          </p>
          <div className="research-fields" aria-label="Research fields">
            <span>Sovereign debt</span>
            <span>International macroeconomics</span>
            <span>Firm dynamics</span>
            <span>Financial crises</span>
          </div>
          <p className="affiliation-note">
            Department of Economics · School of Economics, Management and
            Political Science · Braga, Portugal
          </p>
        </div>
      </section>

      <section className="content-section section-shell" id="working-papers">
        <SectionHeading
          eyebrow="Research"
          title="Working papers"
          description="Current projects in macroeconomics, finance, and firm dynamics."
        />
        <PaperList papers={workingPapers} showAbstracts />
        <Link className="section-link" href="/research">
          Complete research record <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="content-section section-shell" id="publications">
        <SectionHeading
          eyebrow="Published work"
          title="Publications"
          description="Peer-reviewed research on sovereign risk, investment, fiscal policy, and information."
        />
        <PaperList papers={publications} showAbstracts />
      </section>

      <section className="content-section section-shell" id="teaching">
        <SectionHeading
          eyebrow="Teaching"
          title="Courses"
          description="Macroeconomics and international economics at undergraduate and graduate levels."
        />
        <div className="teaching-feature">
          <div>
            <p className="item-meta">Spring 2026 · University of Minho</p>
            <h3>Introduction to Macroeconomics</h3>
            <p>
              Course materials are distributed through the university platform,
              with an auxiliary public course website.
            </p>
          </div>
          <a href="https://tgstavares.github.io/intro_macro/">
            Course website <span aria-hidden="true">→</span>
          </a>
        </div>
        <Link className="section-link" href="/teaching">
          All teaching <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="content-section section-shell" id="personal">
        <SectionHeading eyebrow="Personal" title="Notes and tools" />
        <div className="personal-summary">
          <p>
            I keep a small collection of notes on research software, numerical
            work, Gnuplot, Emacs, and parallel computing, together with older
            course material from previous versions of this website.
          </p>
          <Link className="section-link" href="/personal">
            Personal links and archive <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
