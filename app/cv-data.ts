export type CvDatedEntry = {
  period: string;
  text: string;
};

export type CvTalkYear = {
  year: string;
  entries: string[];
};

export type CvDetail = {
  label: string;
  text: string;
};

export type CvReference = {
  name: string;
  role?: string;
  institution: string;
  address: string[];
  phone?: string;
  email: string;
};

export const academicEmployment: CvDatedEntry[] = [
  {
    period: "2026-present",
    text: "Assistant Professor, University of Lisbon - ISEG (Portugal)",
  },
  {
    period: "2024-2026",
    text: "Assistant Professor, University of Minho and NIPE (Portugal)",
  },
  {
    period: "2024",
    text: "Visiting Scholar, CIDE (Mexico)",
  },
  {
    period: "2015-2024",
    text: "Assistant Professor, ITAM and CIE (Mexico)",
  },
];

export const education = [
  {
    institution: "University of Rochester",
    location: "USA",
    degrees: ["Ph.D., Economics, 2015", "M.A., Economics, 2011"],
  },
  {
    institution: "Universidade Católica Portuguesa",
    location: "Portugal",
    degrees: ["M.A., Economics, 2009", "B.S., Summa Cum Laude, Economics, 2007"],
  },
];

export const researchFields = [
  "Sovereign Default",
  "Firm Dynamics",
  "International Macroeconomics",
  "Macroeconomics",
  "Financial Crises",
  "COVID-19 Economics",
  "Labor Markets",
];

export const talks: CvTalkYear[] = [
  {
    year: "2026",
    entries: [
      "DGE/GPEARI (talk)",
      "Lisbon Macro Working Group (talk)",
      "19th Meeting of the Portuguese Economic Journal (presenter at conference)",
      "2026 UK Stata Conference, London (participant; joint work presented by Miguel Portela)",
    ],
  },
  {
    year: "2025",
    entries: [
      "Department of Economics, ISEG (talk)",
      "18th Meeting of the Portuguese Economic Journal (presenter at conference)",
    ],
  },
  {
    year: "2024",
    entries: [
      "Search and Matching in Labor, Monetary, and Financial Economics (presenter at conference)",
      "Católica Lisbon School of Business and Economics (talk)",
      "CIDE (talk)",
      "XI Christmas Workshop in Accounting and Finance (presenter at conference)",
    ],
  },
  {
    year: "2023",
    entries: [
      "1st Notre Dame-ITAM PODER Mini-Conference (presenter at conference, paper discussant)",
      "Stockman, URochester (presenter at conference)",
      "Fall 2023 Midwest Macroeconomics Meetings (presenter at conference)",
    ],
  },
  {
    year: "2022",
    entries: [
      "FGV-EPGE in Rio de Janeiro (talk)",
      "10th Luso-Brazilian Meeting in Macroeconomics (presenter at conference; paper discussant)",
      "Facultade de Ciencias Economicas e Empresariais de Vigo - Ecobas (talk)",
      "15th Annual Meeting of the PEJ (presenter at conference)",
      "ITAM-PIER Conference on Macro-Finance 2022 (organizer)",
    ],
  },
  {
    year: "2021",
    entries: [
      "ITAM-PIER Conference on Macro-Finance 2021 (organizer)",
      "2nd International Macro/Finance and Sovereign Debt Workshop at Sogang University (paper discussant)",
      "Sovereign Debt Workshop at the IMF (talk)",
    ],
  },
  {
    year: "2019",
    entries: [
      "GIC/Drexel LeBow Sovereign Debt Distress (paper discussant), Philadelphia",
      "Athens University of Economics and Business (talk)",
      "12th Meeting of the Portuguese Economic Journal (presenter at conference)",
      "St. Louis Fed (talk/visiting)",
      "Stockman, URochester (presenter at conference)",
    ],
  },
  {
    year: "2018",
    entries: [
      "SED, Mexico City (presenter at conference)",
      "LAMES 2018, Guayaquil (presenter at conference)",
      "Stockman, URochester (presenter at conference)",
      "Rochester Conference in Macro and International Economics (presenter at conference)",
      "NBER-EFG Research Meeting (participant)",
    ],
  },
  {
    year: "2017",
    entries: [
      "Universidad Iberoamericana (talk)",
      "17th SAET, Faro (presenter at conference)",
      "SED, Edinburgh (presenter at conference)",
      "10th Meeting of the Portuguese Economic Journal (presenter at conference)",
      "Stockman, URochester (presenter at conference)",
    ],
  },
  {
    year: "2016",
    entries: [
      "XXI Macro Workshop, Vigo (presenter at conference)",
      "9th Meeting of the Portuguese Economic Journal (presenter at conference)",
      "22nd Computing in Economics and Finance (presenter at conference)",
      "Stockman, URochester (presenter at conference)",
      "Banco de Mexico (talk)",
    ],
  },
  {
    year: "2015",
    entries: [
      "University of Rochester (talk)",
      "CESifo-Delphi, Athens (presenter at conference)",
      "ITAM-PIER Macroeconomics, UPenn (presenter at conference)",
      "Stockman, URochester (presenter at conference)",
      "Banco de Mexico (talk)",
    ],
  },
];

export const refereeing = [
  "International Economic Review",
  "Journal of International Economics",
  "Journal of Economic Dynamics and Control",
  "American Economic Journal: Economic Policy",
  "Journal of Financial Research",
  "IMF Economic Review",
  "Latin American Economic Review",
  "Journal of Political Economy",
  "Latin American Journal of Central Banking",
  "Journal of Macroeconomics",
];

export const teachingExperience: CvDetail[] = [
  {
    label: "Supervising PhD students",
    text: "Mariana Santos, University of Minho (2025-present)",
  },
  {
    label: "Supervising undergraduate and master theses",
    text: "2016-present",
  },
  {
    label: "Main instructor for PhD-level courses",
    text: "Advanced Macroeconomics, 2025",
  },
  {
    label: "Main instructor for master's-level courses",
    text: "Economics of Banking and Credit, 2025-2026; Finance, 2024; Research Seminar - Data Analysis, 2020",
  },
  {
    label: "Main instructor for undergraduate-level courses",
    text: "International Macroeconomics, 2026; Introduction to Macroeconomics, 2026; Financial Markets, 2024-2025; International Macro, 2024; International Trade, 2015-2025; Economic Statistics, 2014; Intermediate Macroeconomics, 2013",
  },
  {
    label: "Teaching assistant for undergraduate-level courses",
    text: "Intermediate Microeconomics, 2011 and 2014; Public Finance, 2014; Intermediate Macroeconomics, 2013; Economic Statistics, 2012-2013; Econometrics, 2012",
  },
];

export const fellowships = [
  "Graduate Fellowship and Tuition Scholarship, University of Rochester, 2012-2014",
  "Fulbright Scholarship, 2009-2011",
  "Honors Tuition Scholarship, Universidade Católica Portuguesa, 2003-2008",
];

export const computerSkills = [
  "Codex",
  "Claude Code",
  "C",
  "Fortran",
  "Julia",
  "Mathematica",
  "MATLAB",
  "Dynare",
  "OpenMP",
  "MPI",
  "Stata",
  "R",
  "AWS-EC2",
  "OpenACC",
];

export const languages = [
  "Portuguese (native)",
  "English and Spanish (fluent)",
  "French (basic)",
];

export const references: CvReference[] = [
  {
    name: "Professor Yan Bai",
    role: "Advisor",
    institution: "Department of Economics, University of Rochester",
    address: ["Harkness Hall", "Rochester, NY 14627, USA"],
    phone: "(585) 275-4196",
    email: "ybai7@z.rochester.edu",
  },
  {
    name: "Professor George Alessandria",
    role: "Advisor",
    institution: "Department of Economics, University of Rochester",
    address: ["Harkness Hall", "Rochester, NY 14627, USA"],
    phone: "(585) 275-3096",
    email: "george.alessandria@rochester.edu",
  },
  {
    name: "Professor Yongsung Chang",
    institution: "Department of Economics, Seoul National University",
    address: ["Gwanak-ro 1", "Gwanak-gu, Seoul 08826, Korea"],
    email: "yongsung.chang@gmail.com",
  },
];
