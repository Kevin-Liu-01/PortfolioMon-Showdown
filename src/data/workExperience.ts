export interface WorkExperienceEntry {
  role: string;
  company: string;
  date: string;
  description: string;
}

export const workExperience: WorkExperienceEntry[] = [
  {
    role: "Founding Engineer",
    company: "Dedalus Labs",
    date: "Jan 2026 – Present",
    description:
      "Building dedaluslabs.ai (Y Combinator S25). Ship AI agents in 5 lines of code with MCP.",
  },
  {
    role: "Founding Engineer",
    company: "Sevenfold AI",
    date: "Jun 2025 – Nov 2025",
    description:
      "Built MVP for an end-to-end, agentic research workflow using contextual intelligence.",
  },
  {
    role: "Software Development Engineer Intern – FBA Inventory",
    company: "Amazon",
    date: "May 2025 - Aug 2025",
    description:
      "Built API devtools for internal metrics migrations, accelerating approval pipeline and response time by 37%.",
  },
  {
    role: "Software Engineering Intern – Core Products (DT-CADEA)",
    company: "Bloomberg L.P.",
    date: "Summer 2024",
    description:
      "Developed Random Forest ML pipeline to classify 2k+ filings per week, accelerating classification by 55% and streamlining reporting workflows by 30%.",
  },
  {
    role: "AI Research Intern – NLP & Intelligent Agents",
    company: "AT&T Labs Research",
    date: "Fall 2023",
    description:
      "Designed autonomous agents with Mixture-of-Experts LLMs to accurately digest enterprise documents, acheiving analysis savings of 850k/quarter.",
  },
  {
    role: "Software Engineering Intern – Financial Instruments (DT-FI)",
    company: "Bloomberg L.P.",
    date: "Summer 2023",
    description:
      "Built a real-time market feed platform using Next.js to track treasury bonds, improving remediation speed and time-to-market by 4x.",
  },
  {
    role: "Full Stack Software Engineer",
    company: "Johns Hopkins University – uCredit.me",
    date: "Fall 2022",
    description:
      "Built a full-stack course selection platform using React and AWS for 6k+ students.",
  },
];
