import type { Metadata } from "next";
import { PageHeader } from "../site-components";

export const metadata: Metadata = {
  title: "Teaching",
  description: "Teaching by Tiago Tavares.",
};

const previousCourses = [
  ["Advanced Macroeconomics II", "2025"],
  ["Topics in Economics of Banking and Money", "2025"],
  ["International Trade", "2015–2025"],
  ["Advanced International Macroeconomics", "2024"],
  ["Applied Economics Research Workshop", "2020"],
  ["International Economics", "2015–2024"],
  ["Economic Statistics", "2014"],
  ["Introduction to Macroeconomics", "2013"],
];

export default function TeachingPage() {
  return (
    <main className="page-shell">
      <PageHeader
        eyebrow="Teaching"
        title="Teaching"
        description="Current and previous courses in macroeconomics, international economics, banking, trade, and applied research."
      />

      <section className="page-section">
        <h2>Latest listed teaching</h2>
        <ul className="course-list">
          <li>
            <strong>Introduction to Macroeconomics</strong>
            <span>Spring 2026 · University of Minho</span>
            <span>
              Materials: <a href="https://tgstavares.github.io/intro_macro/">auxiliary course website</a> · <a href="https://elearning.uminho.pt">university platform</a>
            </span>
          </li>
        </ul>
      </section>

      <section className="page-section">
        <h2>Previous courses</h2>
        <ul className="course-list">
          {previousCourses.map(([course, years]) => (
            <li key={`${course}-${years}`}>
              <strong>{course}</strong>
              <span>{years}</span>
            </li>
          ))}
        </ul>
        <a className="section-link" href="/legacy/archive.html">
          Historical course pages and materials
        </a>
      </section>
    </main>
  );
}
