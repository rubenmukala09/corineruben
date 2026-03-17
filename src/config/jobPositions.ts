export interface JobPosition {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  featured: boolean;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  perks?: string[];
}

export const JOB_POSITIONS: JobPosition[] = [
  {
    id: 1,
    title: "Senior AI Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $160k",
    description: "Build AI systems that protect families from scams — deepfake detection, voice cloning analysis, and phishing prevention models.",
    featured: true,
    responsibilities: [
      "Design and implement ML models for real-time scam detection",
      "Optimize inference pipelines for sub-second threat analysis",
      "Collaborate with security researchers to stay ahead of emerging threats",
      "Mentor junior engineers and drive architectural decisions",
    ],
    requirements: [
      "5+ years in ML/AI engineering with production deployments",
      "Strong Python, TensorFlow or PyTorch experience",
      "Experience with NLP, audio analysis, or computer vision",
      "BS/MS in Computer Science or related field",
    ],
    niceToHave: [
      "Experience with adversarial ML or security research",
      "Published papers in relevant domains",
      "Familiarity with edge deployment and model compression",
    ],
    perks: ["$5k annual conference budget", "GPU cloud credits", "Published research opportunities"],
  },
  {
    id: 2,
    title: "Customer Success Manager",
    department: "Support",
    location: "Columbus, OH / Hybrid",
    type: "Full-time",
    salary: "$60k - $80k",
    description: "Be the trusted advisor for families using our platform — onboarding, training, and ensuring every customer feels safe and supported.",
    featured: false,
    responsibilities: [
      "Onboard new customers and guide them through platform setup",
      "Proactively monitor customer health scores and engagement",
      "Conduct quarterly business reviews with key accounts",
      "Gather feedback to drive product improvements",
    ],
    requirements: [
      "3+ years in customer success, account management, or support",
      "Excellent written and verbal communication skills",
      "Experience with CRM tools (HubSpot, Salesforce, etc.)",
      "Genuine empathy for seniors and non-technical users",
    ],
    niceToHave: [
      "Experience in cybersecurity or tech support",
      "Bilingual (English/Spanish)",
    ],
  },
  {
    id: 3,
    title: "Content Writer",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    salary: "$50k - $70k",
    description: "Create clear, actionable educational content that helps families recognize and avoid AI-powered scams.",
    featured: false,
    responsibilities: [
      "Write blog posts, guides, and eBooks on scam prevention topics",
      "Develop email sequences and newsletter content",
      "Create social media copy aligned with brand voice",
      "Research emerging scam trends for timely, relevant content",
    ],
    requirements: [
      "2+ years of professional writing (tech, cybersecurity, or education preferred)",
      "Strong SEO writing fundamentals",
      "Portfolio demonstrating clear, audience-appropriate writing",
      "Ability to simplify complex topics for non-technical readers",
    ],
    niceToHave: [
      "Experience writing for senior audiences",
      "Familiarity with AI/ML concepts",
    ],
  },
  {
    id: 4,
    title: "Business Development Rep",
    department: "Sales",
    location: "Columbus, OH",
    type: "Full-time",
    salary: "$50k + Commission",
    description: "Help businesses discover our AI protection solutions — outbound prospecting, demos, and building pipeline for enterprise accounts.",
    featured: false,
    responsibilities: [
      "Generate qualified leads through outbound prospecting",
      "Conduct discovery calls and product demos",
      "Build and manage a healthy sales pipeline",
      "Collaborate with marketing on lead generation campaigns",
    ],
    requirements: [
      "1-3 years in B2B sales or business development",
      "Strong cold-calling and email outreach skills",
      "Self-motivated with a hunter mentality",
      "Experience with sales tools (LinkedIn Sales Nav, Outreach, etc.)",
    ],
    niceToHave: [
      "Experience selling SaaS or cybersecurity solutions",
      "Existing network in Ohio business community",
    ],
    perks: ["Uncapped commission", "President's Club trip", "Fast-track to AE role"],
  },
  {
    id: 5,
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    salary: "$80k - $110k",
    description: "Design accessible, intuitive interfaces that seniors love — our users depend on clarity and simplicity to stay safe.",
    featured: true,
    responsibilities: [
      "Lead end-to-end design for new features from research to handoff",
      "Conduct usability testing with senior users",
      "Build and maintain our design system in Figma",
      "Champion accessibility standards (WCAG 2.1 AA minimum)",
    ],
    requirements: [
      "4+ years of product design experience",
      "Strong Figma proficiency with component-driven design",
      "Portfolio showcasing accessible, user-centered design",
      "Experience designing for diverse age groups or accessibility-focused products",
    ],
    niceToHave: [
      "Experience with security or healthcare UX",
      "Motion design or prototyping skills (Framer, Principle)",
      "Understanding of front-end development constraints",
    ],
    perks: ["Figma team license", "Design conference budget", "Quarterly design sprints"],
  },
  {
    id: 6,
    title: "Scam Analyst",
    department: "Operations",
    location: "Remote",
    type: "Full-time",
    salary: "$55k - $75k",
    description: "Analyze scam patterns, investigate emerging threats, and update our protection algorithms to stay ahead of bad actors.",
    featured: false,
    responsibilities: [
      "Investigate and classify incoming scam reports",
      "Identify patterns and trends in fraud data",
      "Collaborate with engineering to update detection models",
      "Produce weekly threat intelligence briefings",
    ],
    requirements: [
      "2+ years in fraud analysis, threat intelligence, or cybersecurity",
      "Strong analytical and critical thinking skills",
      "Experience with data analysis tools (SQL, Excel, Python)",
      "Detail-oriented with excellent documentation skills",
    ],
    niceToHave: [
      "OSINT or social engineering knowledge",
      "Certified Fraud Examiner (CFE) or similar",
    ],
  },
  {
    id: 7,
    title: "Part-Time Trainer",
    department: "Training",
    location: "Columbus, OH",
    type: "Part-time",
    salary: "$25-$35/hour",
    description: "Teach seniors how to stay safe online — conduct workshops, create training materials, and empower vulnerable communities.",
    featured: false,
    responsibilities: [
      "Deliver in-person and virtual training sessions for seniors",
      "Develop curriculum and training materials",
      "Adapt teaching methods for different learning levels",
      "Track participant progress and gather feedback",
    ],
    requirements: [
      "Experience teaching or training adults (especially seniors)",
      "Patient, clear communication style",
      "Basic understanding of online safety and scam types",
      "Reliable transportation for Columbus-area sessions",
    ],
    niceToHave: [
      "Teaching certification or adult education background",
      "Bilingual capabilities",
    ],
  },
  {
    id: 8,
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $140k",
    description: "Build and maintain our protection platform — React front-end, Supabase backend, and edge functions powering real-time security.",
    featured: true,
    responsibilities: [
      "Develop new features across the full stack (React, TypeScript, Supabase)",
      "Write clean, tested, well-documented code",
      "Optimize performance for real-time threat detection UIs",
      "Participate in code reviews and architectural planning",
    ],
    requirements: [
      "3-5 years full-stack development experience",
      "Proficient in React, TypeScript, and modern CSS",
      "Experience with PostgreSQL and serverless architectures",
      "Understanding of web security best practices",
    ],
    niceToHave: [
      "Experience with Supabase, Firebase, or similar BaaS",
      "Familiarity with Tailwind CSS and component libraries",
      "Open-source contributions",
    ],
    perks: ["Home office stipend", "Latest MacBook", "Flexible hours"],
  },
  {
    id: 9,
    title: "Marketing Manager",
    department: "Marketing",
    location: "Remote / Hybrid",
    type: "Full-time",
    salary: "$70k - $95k",
    description: "Lead marketing campaigns that reach families who need protection — content strategy, paid acquisition, and community building.",
    featured: false,
    responsibilities: [
      "Develop and execute multi-channel marketing strategies",
      "Manage paid advertising campaigns (Google, Meta, LinkedIn)",
      "Own marketing analytics and report on KPIs",
      "Build partnerships with community organizations",
    ],
    requirements: [
      "4+ years in digital marketing with B2C or mission-driven brands",
      "Experience managing $50k+ monthly ad budgets",
      "Strong analytics skills (GA4, Mixpanel, or similar)",
      "Excellent copywriting and storytelling abilities",
    ],
    niceToHave: [
      "Experience marketing to senior demographics",
      "PR or media relations experience",
    ],
  },
  {
    id: 10,
    title: "Security Researcher",
    department: "Security",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $130k",
    description: "Research emerging threats, reverse-engineer scam techniques, and help build the next generation of AI-powered protection.",
    featured: true,
    responsibilities: [
      "Research and document emerging AI-powered scam techniques",
      "Conduct vulnerability assessments on our detection systems",
      "Publish internal threat reports and external advisories",
      "Collaborate with law enforcement on high-priority cases",
    ],
    requirements: [
      "3+ years in security research, penetration testing, or threat intelligence",
      "Deep understanding of social engineering and phishing techniques",
      "Experience with reverse engineering or malware analysis",
      "Strong technical writing skills",
    ],
    niceToHave: [
      "Bug bounty experience or CVE publications",
      "OSCP, GREM, or similar certifications",
      "Experience with deepfake or voice cloning analysis",
    ],
    perks: ["Conference speaker sponsorship", "Research publication support", "Security tool budget"],
  },
];

export const DEPARTMENTS = [
  "all",
  ...Array.from(new Set(JOB_POSITIONS.map((job) => job.department))),
];
