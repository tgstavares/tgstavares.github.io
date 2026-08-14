import Image from "next/image";
import { FileText, Mail, UserRound } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PaperList, SectionHeading } from "./site-components";
import { publications, workingPapers } from "./site-data";

const recentWorkingPapers = workingPapers.slice(0, 4);

export default function Home() {
  return (
    <main className="home-shell">
      <h1 className="visually-hidden">Tiago Tavares</h1>
      <div className="home-document">
        <header className="home-intro" aria-labelledby="home-title">
          <div className="home-intro-grid">
            <Image
              className="profile-photo"
              src="/images/tiago-tavares.jpg"
              alt="Tiago Tavares"
              width="640"
              height="853"
              priority
            />
            <div className="intro-copy">
              <h2 id="home-title">Tiago Tavares</h2>
              <p className="field-line">
                Macroeconomics · International Economics · Firm Dynamics
              </p>
              <p>
                I am an Assistant Professor in the Department of Economics at the
                University of Minho. My research focuses on sovereign default, international
                macroeconomics, misallocation, firm investment, and macroeconomics
                more broadly. I study how financial constraints, fiscal policy, and
                information shape the decisions of governments, firms, and
                households.
              </p>
              <div className="profile-details">
                <p>
                  <UserRound aria-hidden="true" />
                  <span>
                    <strong>Full name:</strong> Tiago Gomes da Silva Tavares
                  </span>
                </p>
                <p>
                  <FileText aria-hidden="true" />
                  <span>
                    <strong>Curriculum Vitae:</strong>{" "}
                    <a href="/files/TiagoTavares_CV.pdf">PDF</a>
                  </span>
                </p>
                <p>
                  <Mail aria-hidden="true" />
                  <span>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:tgstavares@gmail.com">tgstavares@gmail.com</a>
                    <span aria-hidden="true"> / </span>
                    <a href="mailto:tgstavares@eeg.uminho.pt">
                      tgstavares@eeg.uminho.pt
                    </a>
                  </span>
                </p>
                <p>
                  <FaGithub aria-hidden="true" />
                  <span>
                    <strong>GitHub:</strong>{" "}
                    <a href="https://github.com/tgstavares">
                      github.com/tgstavares
                    </a>
                  </span>
                </p>
                <p>
                  <FaXTwitter aria-hidden="true" />
                  <span>
                    <strong>X:</strong>{" "}
                    <a href="https://x.com/tgstavares">x.com/tgstavares</a>
                  </span>
                </p>
                <p>
                  <FaLinkedin aria-hidden="true" />
                  <span>
                    <strong>LinkedIn:</strong>{" "}
                    <a href="https://www.linkedin.com/in/tiago-tavares-b1612025b/">
                      linkedin.com/in/tiago-tavares-b1612025b
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="document-section" id="working-papers">
          <SectionHeading title="Recent working papers" />
          <PaperList papers={recentWorkingPapers} showAbstracts />
        </section>

        <section className="document-section" id="publications">
          <SectionHeading title="Publications" />
          <PaperList papers={publications} showAbstracts />
        </section>
      </div>
    </main>
  );
}
