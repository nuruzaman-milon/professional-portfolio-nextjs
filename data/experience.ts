export type ExperienceItem = {
  period: string;
  company: string;
  role: string;
  desc: string;
};

// Static fallback — served when the database is not configured or empty.
export const experiences: ExperienceItem[] = [
  {
    period: "Mar 2023 – Present",
    company: "Bayshore Communication",
    role: "Software Engineer",
    desc: "Leading frontend of SWOP — a Web2/Web3 social platform — with wallet integration, social feed, and SmartSite builder. Also built a full-stack e-commerce platform from scratch.",
  },
  {
    period: "Jan 2022 – Feb 2023",
    company: "Peoples IT Solution",
    role: "Software Engineer",
    desc: "Built a modern ERP frontend covering account, dealer, product & labour modules. Automated workflows cutting manual operational effort by 70–80%.",
  },
  {
    period: "Jun 2021 – Sep 2021",
    company: "Kodeeo Limited",
    role: "Software Engineer Intern",
    desc: "Built web features with PHP & Laravel following MVC architecture. Collaborated in an agile team on real-world full-stack implementations.",
  },
];
