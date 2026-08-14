import type { ReactNode } from "react";

export type PaperLink = {
  label: string;
  href: string;
};

export type Paper = {
  year: string;
  title: string;
  authors: ReactNode;
  venue?: string;
  journal?: string;
  journalDetails?: string;
  href?: string;
  links?: PaperLink[];
  abstract?: string;
};

export const workingPapers: Paper[] = [
  {
    year: "2026",
    title: "xhdfe: Fast high-dimensional fixed-effects estimation in Stata",
    authors: (
      <>
        Tiago Tavares joint with{" "}
        <a href="https://reisportela.github.io">Miguel Portela</a>
      </>
    ),
    venue: "Working paper",
    href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7271338",
    links: [
      {
        label: "LINK",
        href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7271338",
      },
      {
        label: "GITHUB",
        href: "https://github.com/reisportela/xhdfe-xfe",
      },
    ],
    abstract:
      "xhdfe is a Stata command for linear regression with high-dimensional fixed effects. It targets the same partialled-out least-squares estimator as reghdfe on the overlapping specifications studied here, while moving the main absorption workload into a compiled C++ backend with multithreaded CPU execution and optional NVIDIA CUDA acceleration. The command preserves a Stata e-class interface while supporting multiple absorbed fixed effects, clustered and robust standard errors, heterogeneous slopes in the tested specifications, backend choices, saved fixed effects, residuals, fitted values, and stored results. We validate xhdfe on two large wage regressions using Portuguese matched employer-employee data. The command reproduces reghdfe coefficients and standard errors within tight numerical tolerances and delivers speedups above 100-fold with CPU execution and 200-fold with CUDA acceleration in the fastest configurations. Compared with alternative high-dimensional fixed-effects implementations, xhdfe records the shortest runtimes among the implementations and configurations reported here. The development history also provides a case study of AI-assisted software development. Agentic tools supported coding and review, while conventional numerical tests and reproducible benchmarks assessed the resulting changes.",
  },
  {
    year: "2026",
    title: "Financing Transformative Search: Runway, Control, and Frontier Innovation",
    authors: "Tiago Tavares",
    venue: "Working paper",
    href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6843799",
    links: [
      {
        label: "LINK",
        href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6843799",
      },
    ],
    abstract:
      "This paper develops a theory of financing and governing transformative search: costly search for a transformative opportunity whose timing, payoff, and implementation are uncertain. The central object is the runway-attainability wedge, the gap between desired runway and the runway that can be financed while preserving authority over search. The decomposition separates this wedge into financing-frontier and governance shortfalls. Liquidity is valuable because it buys discovery time and, after discovery, implementation capacity. The decision criterion is whether a financing architecture preserves attainable runway and search incentives, not how much capital it raises.",
  },
  {
    year: "2024",
    title: "Financially Constrained Households and Consumption Volatility in Open Economies",
    authors: (
      <>
        Tiago Tavares joint with{" "}
        <a href="https://s-anurag.github.io">Anurag Singh</a>
      </>
    ),
    venue: "Revise and resubmit",
    journal: "IMF Economic Review",
    href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5020698",
    links: [
      {
        label: "LINK",
        href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5020698",
      },
    ],
    abstract:
      "Emerging market economies often exhibit aggregate consumption that is more volatile than aggregate income, contrary to predictions of standard macro models based on consumption smoothing. We explore whether heterogeneity in access to financial services can explain this excess consumption volatility. We extend the standard small-open-economy RBC model by incorporating hand-to-mouth and unconstrained households alongside procyclical firm entry, and estimate the model using data for advanced, emerging, and low-income economies.",
  },
  {
    year: "2024",
    title: "Competition for Managers and the Rise in Skill Premium",
    authors: (
      <>
        Tiago Tavares joint with{" "}
        <a href="https://kaniskadam.weebly.com">Kaniska Dam</a> and{" "}
        <a href="https://faculty.itam.mx/en/facultad/tridib-sharma">
          Tridib Sharma
        </a>
      </>
    ),
    venue: "Submitted",
    href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4636773",
    links: [
      {
        label: "LINK",
        href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4636773",
      },
    ],
    abstract:
      "Managerial occupations represent a significant and expanding segment of the US labor force, while good managerial practices enhance production efficiency. We study how competition among firms for managerial services affects managerial compensation and, through firms' demand for other factors of production, the compensation of high-skill workers and the skill premium.",
  },
  {
    year: "2020",
    title: "Delays in Death Reports and their Implications for Tracking the Evolution of COVID-19",
    authors: (
      <>
        Tiago Tavares joint with{" "}
        <a href="https://www.emiliogutierrez.net">Emilio Gutierrez</a> and{" "}
        <a href="https://www.adrianrubli.com">Adrian Rubli</a>
      </>
    ),
    journal: "Covid Economics",
    journalDetails: "1(34): 116–144",
    href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3645304",
    links: [
      {
        label: "LINK",
        href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3645304",
      },
      { label: "PDF", href: "/files/GRT_Delays_Covid_Economics.pdf" },
    ],
    abstract:
      "Understanding the determinants and implications of delays in reporting COVID-19 deaths is important for managing the epidemic. Contrasting England and Mexico, we document that reporting delays in Mexico are larger on average, exhibit higher geographic heterogeneity, and are more responsive to the total number of occurred deaths in a given location-date. Simple SIR models illustrate the implications of not accounting for reporting delays.",
  },
  {
    year: "2017",
    title: "Heterogeneous Investment Dynamics of Greek Manufacturing Firms",
    authors: (
      <>
        Tiago Tavares joint with{" "}
        <a href="https://alexfakos.weebly.com">Alexandros Fakos</a>
      </>
    ),
    venue: "Under revision",
    href: "https://econpapers.repec.org/paper/redsed017/1597.htm",
    links: [
      {
        label: "LINK",
        href: "https://econpapers.repec.org/paper/redsed017/1597.htm",
      },
    ],
    abstract:
      "We study firm-level investment dynamics by incorporating an idiosyncratic investment-cost shock in a dynamic model of heterogeneous firms with adjustment costs. We estimate the model using micro-level data on Greek manufacturing firms and find that the investment wedge is correlated with measures of leverage and export intensity, suggesting an important financial channel in capital accumulation.",
  },
];

export const publications: Paper[] = [
  {
    year: "2026",
    title: "Informality, Tax Distortions, and the Cyclicality of Fiscal Policy",
    authors: (
      <>
        Tiago Tavares joint with{" "}
        <a href="https://sites.google.com/view/carlos-urrutia/">Carlos Urrutia</a>
      </>
    ),
    journal: "IMF Economic Review",
    href: "https://doi.org/10.1057/s41308-026-00306-4",
    links: [
      { label: "DOI", href: "https://doi.org/10.1057/s41308-026-00306-4" },
      {
        label: "Working paper",
        href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4956510",
      },
    ],
    abstract:
      "A salient feature of emerging economies is that government spending is procyclical while labor taxes move countercyclically. We account for this behavior in a small open economy in which the government conducts fiscal policy optimally and can commit to future policies. The presence of an informal sector widens the set of parameters under which distorting labor taxes are negatively correlated with output by amplifying fluctuations in the tax base.",
  },
  {
    year: "2025",
    title: "The Role of International Reserves in Sovereign Debt Restructuring under Fiscal Adjustment",
    authors: "Tiago Tavares",
    journal: "Journal of Economic Dynamics and Control",
    journalDetails: "174",
    href: "https://doi.org/10.1016/j.jedc.2025.105080",
    links: [
      {
        label: "DOI",
        href: "https://doi.org/10.1016/j.jedc.2025.105080",
      },
      {
        label: "Working paper",
        href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4426904",
      },
    ],
    abstract:
      "Highly indebted developing economies commonly also hold large external reserves. I show that fiscal adjustments induced by sovereign default can generate strong demand for reserves when taxation is distortionary, while reserves also modify debt-restructuring negotiations. A calibrated model produces recovery-rate schedules increasing in reserves and replicates large positions in both reserves and debt.",
  },
  {
    year: "2022",
    title: "Investment Slumps during Financial Crises: The Real Effects of Credit Supply",
    authors: (
      <>
        Tiago Tavares joint with{" "}
        <a href="https://alexfakos.weebly.com">Alexandros Fakos</a> and{" "}
        <a href="https://sites.google.com/view/plutarchossakellaris">
          Plutarchos Sakellaris
        </a>
      </>
    ),
    journal: "Journal of Financial Economics",
    journalDetails: "145(1)",
    href: "https://doi.org/10.1016/j.jfineco.2022.04.004",
    links: [
      { label: "DOI", href: "https://doi.org/10.1016/j.jfineco.2022.04.004" },
      {
        label: "Working paper",
        href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3197369",
      },
    ],
    abstract:
      "How much do credit constraints contribute to investment slumps during financial crises? For the Greek crisis that erupted in 2010, we find that tightened credit constraints contributed to about half of the observed collapse in investment rates. A dynamic investment model with borrowing constraints subject to an aggregate collateral shock can account for the observed decline.",
  },
  {
    year: "2022",
    title: "Information and Behavioral Responses during a Pandemic: Evidence from Delays in COVID-19 Death Reports",
    authors: (
      <>
        Tiago Tavares joint with{" "}
        <a href="https://www.emiliogutierrez.net">Emilio Gutierrez</a> and{" "}
        <a href="https://www.adrianrubli.com">Adrian Rubli</a>
      </>
    ),
    journal: "Journal of Development Economics",
    journalDetails: "154",
    href: "https://doi.org/10.1016/j.jdeveco.2021.102774",
    links: [
      {
        label: "DOI",
        href: "https://doi.org/10.1016/j.jdeveco.2021.102774",
      },
      {
        label: "Working paper",
        href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3645317",
      },
    ],
    abstract:
      "Using a randomized online information intervention in Mexico, we show that failing to account for delays in death reports lowers perceived contagion risk and intended compliance with social distancing. An equilibrium model incorporating the behavioral response illustrates how reporting delays affect the evolution of an epidemic.",
  },
  {
    year: "2019",
    title: "Labor Market Distortions under Sovereign Debt Default Crises",
    authors: "Tiago Tavares",
    journal: "Journal of Economic Dynamics and Control",
    journalDetails: "108",
    href: "https://doi.org/10.1016/j.jedc.2019.103749",
    links: [
      {
        label: "DOI",
        href: "https://doi.org/10.1016/j.jedc.2019.103749",
      },
      { label: "Working paper", href: "/files/Deflab_TiagoTavares_RR.pdf" },
    ],
    abstract:
      "Labor-market distortions deteriorate substantially around sovereign default episodes. I evaluate the roles of labor taxes and working-capital financing costs in a dynamic equilibrium default model. Both mechanisms help reproduce the observed labor wedge and the substantial employment declines surrounding financial crises.",
  },
];

export const discussions: Paper[] = [
  {
    year: "2023",
    title: "Mind the Gaps: Gender Complementarities in Migration and FDI",
    authors: "Federico Carril-Caccia, Ana Cuadros, and Jordi Paniagua",
    venue: "1st Notre Dame–ITAM PODER Mini-Conference",
    href: "/files/FDI_disc.pdf",
    links: [{ label: "PDF", href: "/files/FDI_disc.pdf" }],
  },
  {
    year: "2022",
    title: "Heterogeneous Beliefs and Business Cycles",
    authors: "Saki Bigio, Dejanir Silva, and Eduardo Zilberman",
    venue: "10th Luso-Brazilian Meeting in Macroeconomics",
    href: "/files/Discussion_Dejanir_lubramacro_2022.pdf",
    links: [
      { label: "PDF", href: "/files/Discussion_Dejanir_lubramacro_2022.pdf" },
    ],
  },
  {
    year: "2021",
    title: "Trade Collapses and Sovereign Debt Restructurings",
    authors: "Tamon Asonuma, Marcos Chamon, and Akira Sasahara",
    venue: "International Macro/Finance and Sovereign Debt Workshop",
    href: "/files/Presentation_Sogang_2021.pdf",
    links: [{ label: "PDF", href: "/files/Presentation_Sogang_2021.pdf" }],
  },
  {
    year: "2019",
    title: "Official Sector Lending Strategies During the Euro Area Crisis",
    authors: "Giancarlos Corsetti, Aitor Erce, and Timothy Uy",
    venue: "Sovereign Debt Restructuring Conference",
    href: "/files/TiagoDiscussion_Erce.pdf",
    links: [{ label: "PDF", href: "/files/TiagoDiscussion_Erce.pdf" }],
  },
];
