import type { Metadata } from "next";
import { Fragment } from "react";
import { createPageMetadata } from "../site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Econ Resources",
  description:
    "A curated collection of useful and enjoyable resources for economists, covering teaching, research, computation, data, careers, and lighter reading.",
  path: "/resources",
});

type ResourceComponent = {
  title: string;
  href: string;
};

const resourceGroups = [
  { id: "teaching", title: "Teaching & Course Materials" },
  { id: "computation", title: "Computation" },
  { id: "data", title: "Data" },
  { id: "research", title: "Research & Literature" },
  { id: "careers", title: "Graduate Study & Careers" },
  { id: "fun", title: "Economics for Fun" },
] as const;

type ResourceGroupId = (typeof resourceGroups)[number]["id"];

type EconResource = {
  title: string;
  source: string;
  description: string;
  href: string;
  group: ResourceGroupId;
  components?: ResourceComponent[];
};

const resources: EconResource[] = [
  {
    title: "Sovereign Default Reading List",
    source: "Gabriel Mihalache",
    description:
      "A graduate-level, topic-organized bibliography on quantitative sovereign-default models and evidence, with a downloadable BibTeX file.",
    href: "https://gmihalache.com/teaching/sov-debt-and-default/",
    group: "teaching",
  },
  {
    title: "Resources on Computation",
    source: "Gabriel Mihalache",
    description:
      "Lecture notes and tools for computational economics, including Fortran, MATLAB, C++, Julia, machine learning, LaTeX, graphics, and Stata.",
    href: "https://gmihalache.com/computation/",
    group: "computation",
  },
  {
    title: "QuantEcon",
    source: "QuantEcon",
    description:
      "Open lecture series, textbooks, and code libraries for quantitative and computational economics in Python and Julia.",
    href: "https://quantecon.org/",
    group: "computation",
  },
  {
    title: "Dynare",
    source: "Dynare",
    description:
      "Free, open-source software for solving and estimating DSGE, OLG, heterogeneous-agent, perfect-foresight, and related macroeconomic models.",
    href: "https://www.dynare.org/",
    group: "computation",
  },
  {
    title: "Preparing for Graduate School",
    source: "American Economic Association",
    description:
      "Advice on economics graduate degrees, application timelines, funding, mathematical preparation, program rankings, and the job market.",
    href: "https://www.aeaweb.org/resources/students/grad-prep",
    group: "careers",
  },
  {
    title: "Applying to Economics PhD Programs",
    source: "Ben Davies",
    description:
      "First-person advice on preparation, program choice, application materials, interviews, and admissions.",
    href: "https://bldavies.com/blog/applying-economics-phd-programs/",
    group: "careers",
  },
  {
    title: "Job Market Resources",
    source: "Johannes Pfeifer",
    description:
      "Advice on economics PhD applications, graduate school, the academic job market, research writing, and presentations.",
    href: "https://sites.google.com/site/pfeiferecon/job-market-resources",
    group: "careers",
  },
  {
    title: "AEA Job Openings for Economists",
    source: "American Economic Association",
    description:
      "Current academic and nonacademic job openings for economists, searchable by field, position type, and location.",
    href: "https://www.aeaweb.org/joe/listings",
    group: "careers",
  },
  {
    title: "EconJobMarket",
    source: "Econ Job Market",
    description:
      "Economics job listings and application tools for candidates, reference writers, and recruiting institutions.",
    href: "https://econjobmarket.org/",
    group: "careers",
  },
  {
    title: "Fun Economics Links",
    source: "Johannes Pfeifer",
    description:
      "A collection of playful and irreverent scientific papers on topics ranging from interstellar trade to the optimal destruction of vampires.",
    href: "https://sites.google.com/site/pfeiferecon/fun-economics-links",
    group: "fun",
  },
  {
    title: "The Optimal Taxation of Height",
    source: "N. Gregory Mankiw and Matthew Weinzierl",
    description:
      "How standard utilitarian tax logic can imply taxing height, and what that reveals about distributive justice.",
    href: "https://www.aeaweb.org/articles?id=10.1257/pol.2.1.155",
    group: "fun",
  },
  {
    title: "The Deadweight Loss of Christmas",
    source: "Joel Waldfogel",
    description:
      "The classic argument that recipients may value gifts below what givers paid, creating a deadweight loss from holiday gift-giving.",
    href: "https://www.jstor.org/stable/2117564?seq=1",
    group: "fun",
  },
  {
    title: "George Alessandria’s Teaching Resources",
    source: "George Alessandria",
    description:
      "Graduate macro and international trade and macroeconomics syllabi, with selected materials on DSGE models, trade, and firm heterogeneity.",
    href: "https://sites.google.com/site/georgealessandria2/teaching/teaching",
    group: "teaching",
  },
  {
    title: "Ph.D. Macro Theory II",
    source: "Eric Sims",
    description:
      "Notes and problem sets on dynamic programming, DSGE methods, RBC and New Keynesian models, and fiscal and monetary policy.",
    href: "https://sites.nd.edu/esims/courses/ph-d-macro-theory-ii/",
    group: "teaching",
  },
  {
    title: "Macroeconomics",
    source: "Azzimonti, Krusell, McKay, Mukoyama, and contributors",
    description:
      "A research-oriented first-year Ph.D. macro textbook connecting theory with data, with chapter summaries and selected slides.",
    href: "https://phdmacrobook.org",
    group: "teaching",
  },
  {
    title: "World Bank Open Data",
    source: "World Bank",
    description:
      "World Development Indicators and other global datasets, with country and indicator browsing, downloads, and tools.",
    href: "https://data.worldbank.org/",
    group: "data",
  },
  {
    title: "IMF Data",
    source: "International Monetary Fund",
    description:
      "Macroeconomic and financial data including the World Economic Outlook, national accounts, balance of payments, fiscal indicators, and APIs.",
    href: "https://data.imf.org/",
    group: "data",
  },
  {
    title: "OECD Data Explorer",
    source: "OECD",
    description:
      "The OECD statistical data warehouse, covering member and partner economies with search, visualization, downloads, and API access.",
    href: "https://data-explorer.oecd.org/",
    group: "data",
  },
  {
    title: "BIS Data Portal",
    source: "Bank for International Settlements",
    description:
      "Central-bank statistics on international banking, credit, global liquidity, exchange rates, debt securities, property prices, and payments.",
    href: "https://data.bis.org/",
    group: "data",
  },
  {
    title: "ECB Data Portal",
    source: "European Central Bank",
    description:
      "Euro-area monetary, financial, banking, external-sector, exchange-rate, and real-economy data, with downloads and API access.",
    href: "https://data.ecb.europa.eu/",
    group: "data",
  },
  {
    title: "Global Capital Allocation Project",
    source: "Global Capital Allocation Project",
    description:
      "Research, data tools, and events on international capital allocation, macro-finance, and geoeconomics, including the Geoeconomic Monitor.",
    href: "https://www.globalcapitalallocation.com",
    group: "data",
  },
  {
    title: "IDEAS/RePEc",
    source: "Research Papers in Economics",
    description:
      "Search and browse economics working papers, journal articles, books, software, authors, institutions, and curated bibliographies.",
    href: "https://ideas.repec.org/",
    group: "research",
  },
  {
    title: "NBER Working Papers",
    source: "National Bureau of Economic Research",
    description:
      "New research by NBER affiliates circulated before peer review, with searchable working papers and weekly updates.",
    href: "https://www.nber.org/papers",
    group: "research",
  },
  {
    title: "CEPR Discussion Papers",
    source: "Centre for Economic Policy Research",
    description:
      "A searchable discussion-paper series covering the full range of economics, with filters by topic, author, date, and JEL classification.",
    href: "https://cepr.org/publications/discussion-papers",
    group: "research",
  },
  {
    title: "Global Macro Database",
    source: "Müller, Xu, Lehbib, and Chen",
    description:
      "Harmonized historical and current macroeconomic series across countries, with downloads, documentation, and software packages.",
    href: "https://www.globalmacrodata.com/index.html",
    group: "data",
  },
  {
    title: "GGDC Productivity Databases",
    source: "Groningen Growth and Development Centre",
    description:
      "Complementary cross-country productivity databases that differ in country, period, industry, and indicator coverage.",
    href: "https://www.rug.nl/ggdc/productivity/",
    group: "data",
    components: [
      {
        title: "Penn World Table",
        href: "https://www.rug.nl/ggdc/productivity/pwt/",
      },
      {
        title: "EU KLEMS",
        href: "https://www.rug.nl/ggdc/productivity/eu-klems/",
      },
      {
        title: "Productivity Level Database",
        href: "https://www.rug.nl/ggdc/productivity/pld/",
      },
      {
        title: "WorldKLEMS Initiative",
        href: "https://www.rug.nl/ggdc/productivity/worldklems-initiative",
      },
    ],
  },
  {
    title: "IPUMS",
    source: "IPUMS",
    description:
      "Harmonized census and survey microdata, summary tables, and geographic information for social and economic research.",
    href: "https://www.ipums.org",
    group: "data",
    components: [
      {
        title: "IPUMS USA",
        href: "https://usa.ipums.org/",
      },
      {
        title: "IPUMS CPS",
        href: "https://cps.ipums.org/",
      },
      {
        title: "IPUMS International",
        href: "https://international.ipums.org/",
      },
      {
        title: "IPUMS Global Health",
        href: "https://globalhealth.ipums.org/",
      },
      {
        title: "IPUMS NHGIS",
        href: "https://www.nhgis.org/",
      },
      {
        title: "IPUMS Time Use",
        href: "https://timeuse.ipums.org/",
      },
    ],
  },
  {
    title: "Eurostat",
    source: "European Union",
    description:
      "Official European statistics, with a searchable database, thematic browsing, interactive publications, visualizations, and a release calendar.",
    href: "https://ec.europa.eu/eurostat",
    group: "data",
  },
  {
    title: "FRED Economic Data",
    source: "Federal Reserve Bank of St. Louis",
    description:
      "A searchable collection of economic time series from many sources, with charts, downloads, release information, and data tools.",
    href: "https://fred.stlouisfed.org",
    group: "data",
  },
];

export default function ResourcesPage() {
  return (
    <main className="page-shell resources-shell">
      <h1 className="visually-hidden">Econ Resources</h1>

      {resourceGroups.map((group) => (
        <section
          className="page-section resource-group"
          aria-labelledby={`${group.id}-resources-heading`}
          key={group.id}
        >
          <h2 id={`${group.id}-resources-heading`}>{group.title}</h2>
          <ul className="resource-list">
            {resources
              .filter((resource) => resource.group === group.id)
              .map((resource) => (
                <li key={resource.href}>
                  <strong>
                    <a
                      href={resource.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${resource.title} (opens in a new tab)`}
                    >
                      {resource.title}
                    </a>
                  </strong>
                  <span>
                    {resource.source} · {resource.description}
                    {resource.components
                      ? resource.components.map((component, index) => (
                          <Fragment key={component.href}>
                            {index === 0 ? " " : "\u00a0· "}
                            <a
                              className="resource-component-link"
                              href={component.href}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`${component.title} (opens in a new tab)`}
                            >
                              {component.title}
                            </a>
                          </Fragment>
                        ))
                      : null}
                  </span>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
