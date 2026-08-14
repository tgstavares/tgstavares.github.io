export type PaperLink = {
  label: string;
  href: string;
};

export type Paper = {
  year: string;
  title: string;
  authors: string;
  venue?: string;
  href?: string;
  links?: PaperLink[];
  abstract?: string;
};

export const workingPapers: Paper[] = [
  {
    year: "2026",
    title: "Financing Transformative Search: Runway, Control, and Frontier Innovation",
    authors: "Tiago Tavares",
    venue: "Working paper",
    href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6843799",
    links: [
      {
        label: "SSRN",
        href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6843799",
      },
    ],
    abstract:
      "This paper develops a theory of financing and governing transformative search: costly search for a transformative opportunity whose timing, payoff, and implementation are uncertain. The central object is the runway-attainability wedge, the gap between desired runway and the runway that can be financed while preserving authority over search. The decomposition separates this wedge into financing-frontier and governance shortfalls. Liquidity is valuable because it buys discovery time and, after discovery, implementation capacity. The decision criterion is whether a financing architecture preserves attainable runway and search incentives, not how much capital it raises.",
  },
  {
    year: "2024",
    title: "Financially Constrained Households and Consumption Volatility in Open Economies",
    authors: "with Anurag Singh",
    venue: "Revise and resubmit, IMF Economic Review",
    href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5020698",
    links: [
      {
        label: "SSRN",
        href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5020698",
      },
    ],
    abstract:
      "Emerging market economies often exhibit aggregate consumption that is more volatile than aggregate income, contrary to predictions of standard macro models based on consumption smoothing. We explore whether heterogeneity in access to financial services can explain this excess consumption volatility. We extend the standard small-open-economy RBC model by incorporating hand-to-mouth and unconstrained households alongside procyclical firm entry, and estimate the model using data for advanced, emerging, and low-income economies.",
  },
  {
    year: "2024",
    title: "Competition for Managers and the Rise in Skill Premium",
    authors: "with Kaniska Dam and Tridib Sharma",
    venue: "Submitted",
    href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4636773",
    links: [
      {
        label: "SSRN",
        href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4636773",
      },
      { label: "PDF", href: "/files/Dam_Sharma_Tavares_2023_manpremium.pdf" },
    ],
    abstract:
      "Managerial occupations represent a significant and expanding segment of the US labor force, while good managerial practices enhance production efficiency. We study how competition among firms for managerial services affects managerial compensation and, through firms' demand for other factors of production, the compensation of high-skill workers and the skill premium.",
  },
  {
    year: "2020",
    title: "Delays in Death Reports and their Implications for Tracking the Evolution of COVID-19",
    authors: "with Emilio Gutierrez and Adrian Rubli",
    venue: "Covid Economics 1(34): 116–144",
    href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3645304",
    links: [
      {
        label: "SSRN",
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
    authors: "with Alexandros Fakos",
    venue: "Under revision",
    href: "https://econpapers.repec.org/paper/redsed017/1597.htm",
    links: [
      {
        label: "RePEc",
        href: "https://econpapers.repec.org/paper/redsed017/1597.htm",
      },
    ],
    abstract:
      "We study firm-level investment dynamics by incorporating an idiosyncratic investment-cost shock in a dynamic model of heterogeneous firms with adjustment costs. We estimate the model using micro-level data on Greek manufacturing firms and find that the investment wedge is correlated with measures of leverage and export intensity, suggesting an important financial channel in capital accumulation.",
  },
  {
    year: "2015",
    title: "Noisy Information About the Trend and Sovereign Default Risk",
    authors: "Tiago Tavares",
    venue: "Under revision",
    abstract:
      "We build a dynamic stochastic model in which agents cannot perfectly distinguish between trend and transitory components of observed endowments and learn through a signal-extraction problem. Extending the model to include endogenous default risk shows that, for similar endowment and debt levels, greater uncertainty about trend growth implies larger default risk.",
  },
];

export const publications: Paper[] = [
  {
    year: "2026",
    title: "Informality, Tax Distortions, and the Cyclicality of Fiscal Policy",
    authors: "with Carlos Urrutia",
    venue: "IMF Economic Review",
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
    venue: "Journal of Economic Dynamics and Control, 174",
    href: "https://www.sciencedirect.com/science/article/abs/pii/S0165188925000466",
    links: [
      {
        label: "Article",
        href: "https://www.sciencedirect.com/science/article/abs/pii/S0165188925000466",
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
    authors: "with Alexandros Fakos and Plutarchos Sakellaris",
    venue: "Journal of Financial Economics, 145(1)",
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
    authors: "with Emilio Gutierrez and Adrian Rubli",
    venue: "Journal of Development Economics, 154",
    href: "https://www.sciencedirect.com/science/article/pii/S0304387821001346",
    links: [
      {
        label: "Article",
        href: "https://www.sciencedirect.com/science/article/pii/S0304387821001346",
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
    venue: "Journal of Economic Dynamics and Control, 108",
    href: "https://www.sciencedirect.com/science/article/abs/pii/S0165188919301484",
    links: [
      {
        label: "Article",
        href: "https://www.sciencedirect.com/science/article/abs/pii/S0165188919301484",
      },
      { label: "PDF", href: "/files/Deflab_TiagoTavares_RR.pdf" },
    ],
    abstract:
      "Labor-market distortions deteriorate substantially around sovereign default episodes. I evaluate the roles of labor taxes and working-capital financing costs in a dynamic equilibrium default model. Both mechanisms help reproduce the observed labor wedge and the substantial employment declines surrounding financial crises.",
  },
];

export const discussions = [
  {
    title: "Mind the Gaps: Gender Complementarities in Migration and FDI",
    authors: "Federico Carril-Caccia, Ana Cuadros, and Jordi Paniagua",
    event: "1st Notre Dame–ITAM PODER Mini-Conference, 2023",
    href: "/files/FDI_disc.pdf",
  },
  {
    title: "Heterogeneous Beliefs and Business Cycles",
    authors: "Saki Bigio, Dejanir Silva, and Eduardo Zilberman",
    event: "10th Luso-Brazilian Meeting in Macroeconomics, 2022",
    href: "/files/Discussion_Dejanir_lubramacro_2022.pdf",
  },
  {
    title: "Trade Collapses and Sovereign Debt Restructurings",
    authors: "Tamon Asonuma, Marcos Chamon, and Akira Sasahara",
    event: "International Macro/Finance and Sovereign Debt Workshop, 2021",
    href: "/files/Presentation_Sogang_2021.pdf",
  },
  {
    title: "Official Sector Lending Strategies During the Euro Area Crisis",
    authors: "Giancarlos Corsetti, Aitor Erce, and Timothy Uy",
    event: "Sovereign Debt Restructuring Conference, 2019",
    href: "/files/TiagoDiscussion_Erce.pdf",
  },
];
