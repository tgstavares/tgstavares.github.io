import type { Metadata } from "next";
import { createPageMetadata } from "../site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Teaching",
  description:
    "Current and previous economics courses taught by Tiago Tavares, with links to course materials.",
  path: "/teaching",
});

type CourseLink = {
  label: string;
  href: string;
  external?: boolean;
};

type PreviousCourse = {
  title: string;
  links: CourseLink[];
};

const previousCourses: PreviousCourse[] = [
  {
    title: "International Economics",
    links: [
      { label: "Fall 2015", href: "/legacy/archive/2015finteco.html" },
      { label: "Spring 2016", href: "/legacy/archive/spring2016.html" },
      { label: "Fall 2016", href: "/legacy/archive/fall2016.html" },
      { label: "Spring 2017", href: "/legacy/archive/spring-2017.html" },
      { label: "Fall 2017", href: "/legacy/archive/fall-2017.html" },
      { label: "Spring 2018", href: "/legacy/archive/spring2018.html" },
      { label: "Fall 2018", href: "/legacy/archive/ei2018b.html" },
      { label: "Spring 2019", href: "/legacy/archive/spring2019.html" },
      { label: "Fall 2019", href: "/legacy/archive/fall2019.html" },
      { label: "Spring 2020", href: "/legacy/archive/spring2020.html" },
      { label: "Fall 2020", href: "/legacy/archive/fall2020.html" },
      { label: "Spring 2021", href: "/legacy/archive/spring2021.html" },
      { label: "Fall 2021", href: "/legacy/archive/fall2021.html" },
      { label: "Spring 2022", href: "/legacy/archive/spring2022.html" },
      { label: "Fall 2022", href: "/legacy/archive/fall2022.html" },
      { label: "Spring 2023", href: "/legacy/archive/spring2023.html" },
      { label: "Fall 2023", href: "/legacy/archive/fall2023.html" },
      { label: "Spring 2024", href: "/legacy/archive/spring2024.html" },
    ],
  },
  {
    title: "Applied Economics Research Workshop",
    links: [{ label: "Fall 2020", href: "/legacy/archive/fall2020.html" }],
  },
  {
    title: "Advanced International Macroeconomics",
    links: [{ label: "Spring 2024", href: "/legacy/archive/spring2024.html" }],
  },
  {
    title: "Advanced Macroeconomics II",
    links: [{ label: "Spring 2025", href: "/legacy/archive/spring2025.html" }],
  },
  {
    title: "Topics in Economics of Banking and Money",
    links: [
      { label: "Spring 2025", href: "/legacy/archive/spring2025.html" },
      { label: "Fall 2025", href: "/legacy/archive/fall2025.html" },
    ],
  },
  {
    title: "International Trade",
    links: [{ label: "Spring 2025", href: "/legacy/archive/spring2025.html" }],
  },
];

export default function TeachingPage() {
  return (
    <main className="page-shell teaching-shell">
      <h1 className="visually-hidden">Teaching</h1>
      <section className="page-section">
        <h2>Current</h2>
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
        <h2>Previous</h2>
        <ul className="course-list previous-course-list">
          {previousCourses.map((course) => (
            <li key={course.title}>
              <strong>{course.title}</strong>
              <span className="course-links">
                {course.links.map((link) => (
                  <a
                    href={link.href}
                    key={`${course.title}-${link.label}`}
                    rel={link.external ? "noreferrer" : undefined}
                    target={link.external ? "_blank" : undefined}
                  >
                    {link.label}
                  </a>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
