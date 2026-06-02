// ---------------------------------------------------------------------------
// Single source of truth for all personal content on the site.
// Edit anything here and it flows through the whole portfolio + the AI chat box.
// (The chat system prompt in lib/anthropic.ts is built from this object too.)
// ---------------------------------------------------------------------------

export type SkillGroup = { label: string; items: string[] };

export type ExperienceItem = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
};

export type EducationItem = {
  school: string;
  degree: string;
  detail: string;
  location: string;
  start: string;
  end: string;
};

export type Project = {
  name: string;
  // Two-digit display number, e.g. "01"
  number: string;
  category: string;
  description: string;
  tech: string[];
  // Tailwind gradient classes for the card preview area
  gradient: string;
  // Links — set to null where unknown so the UI hides the button.
  repo: string | null;
  demo: string | null;
};

export const profile = {
  firstName: "Nitin",
  lastName: "Mohan",
  name: "Nitin Mohan",
  title: "Software Engineer",
  tagline:
    "I build scalable, AI-powered web platforms — from RAG pipelines and GenAI services to fast, real-time React frontends.",

  // Used by the About bento and the chat system prompt.
  mindset:
    "Building more than software. I trace problems end-to-end — from the data layer to the pixel — and I care about performance, security, and shipping things people can actually rely on.",

  // Longer narrative — feeds the About section and seeds the chat assistant.
  bio: [
    "Nitin Mohan is a software engineer with three years of full-stack experience at Accenture and a current M.S. in Computer Science at New York University (GPA 3.89).",
    "At Accenture he worked on large-scale healthcare applications built with React and Node.js: he built PDF ingestion pipelines that extracted medical data (ICD diagnosis codes, patient demographics, provider details) and rendered them as interactive, auditable digital forms; led a frontend modernization migrating legacy class-based React to React 17 with Hooks and Redux, cutting unnecessary re-renders by ~40%; and personally remediated 84+ critical security vulnerabilities (XSS, SQL injection, insecure headers) surfaced by enterprise DAST/SAST scans.",
    "He was promoted to Software Engineer within 18 months, won the ACE Bright Beginners Award in his third month, and was named Star Performer for Q2 2024. He served as technical lead and single point of contact for a D3.js/React reporting dashboard, and onboarded and mentored 6 new engineers.",
    "Earlier he interned at Ernst & Young as a Full Stack Developer, building a Python + TimescaleDB time-series ingestion pipeline (42% faster queries) and a deterministic simulation engine for hardware anomalies.",
    "Now at NYU he focuses on GenAI and cloud: he's built a serverless RAG research-paper assistant (FastAPI on Cloud Run, Pinecone vector search, dynamic LLM routing via OpenRouter), a real-time campus-safety mapping platform (React/TypeScript, Mapbox, AWS Cognito, WebSockets), and several AWS-native AI applications. This portfolio's chat box is itself one of his GenAI demos.",
  ].join("\n\n"),

  status: "Open to full-time SWE roles (New Grad / 2027)",

  location: {
    city: "Brooklyn, New York",
    coordinates: "40.6415° N, 74.0235° W",
  },

  // Avatar: drop a real photo at /public/avatar.jpg and set photo to "/avatar.jpg".
  // Until then `photo` is null and a styled gradient/initials avatar is shown.
  photo: null as string | null,
  initials: "NM",

  githubUsername: "NitinMohan03",

  socials: {
    email: "nitinmohanofficial@gmail.com",
    linkedin: "https://www.linkedin.com/in/nitin-mohan1903",
    github: "https://github.com/NitinMohan03",
    phone: "+1 347-967-2954",
  },

  experience: [
    {
      company: "Accenture",
      role: "Software Engineer",
      location: "Bengaluru, India",
      start: "Aug 2022",
      end: "Jul 2025",
      bullets: [
        "Architected scalable REST API integrations on cloud-native microservices (Node.js, FastAPI) with async processing, reducing data-processing latency by 30%.",
        "Refactored legacy architectures and added monitoring, improving system response times by 35% and accelerating production-issue resolution.",
        "Owned the end-to-end deployment lifecycle, integrating automated quality gates into CI/CD to cut the production bug backlog by 20%.",
        "Built customer-facing React frontends, standardizing 45+ components across 8 enterprise apps and migrating legacy class components to Hooks + Redux (~40% fewer re-renders).",
        "Hardened systems with input sanitization and parameterized queries, remediating 84+ critical security vulnerabilities across 5 high-traffic applications.",
        "Promoted within 18 months; ACE Bright Beginners Award (month 3) and Star Performer Q2 2024; mentored 6 new engineers.",
      ],
    },
    {
      company: "Ernst & Young",
      role: "Full Stack Developer Intern",
      location: "Gurugram, India",
      start: "May 2021",
      end: "Aug 2021",
      bullets: [
        "Engineered a Python + TimescaleDB time-series ingestion pipeline on Linux, optimizing query execution by 42%.",
        "Built a deterministic Python simulation engine to recreate hardware anomalies, cutting root-cause analysis time by 35%.",
        "Architected RESTful web services feeding a React frontend with real-time diagnostics.",
      ],
    },
  ] as ExperienceItem[],

  education: [
    {
      school: "New York University",
      degree: "M.S. in Computer Science",
      detail: "GPA 3.89 / 4.0 · Cloud Computing & Big Data, Computer Security, Software Engineering",
      location: "Brooklyn, New York",
      start: "Aug 2025",
      end: "May 2027",
    },
    {
      school: "Amity University",
      degree: "B.Tech, Computer Science & Engineering",
      detail: "",
      location: "Uttar Pradesh, India",
      start: "Jul 2018",
      end: "May 2022",
    },
  ] as EducationItem[],

  skills: [
    {
      label: "Languages & Core CS",
      items: ["Java", "Python", "C++", "TypeScript", "JavaScript (ES6+)", "SQL", "OOD"],
    },
    {
      label: "Cloud & Backend",
      items: ["AWS (S3, EC2, Lambda, Cognito)", "GCP (Cloud Run)", "Docker", "Node.js", "Express.js", "FastAPI", "REST", "GraphQL", "Serverless"],
    },
    {
      label: "Frontend",
      items: ["React (Hooks, Context, Redux)", "Next.js", "Tailwind CSS", "D3.js", "Mapbox GL JS"],
    },
    {
      label: "AI / ML",
      items: ["RAG", "Pinecone (Vector DB)", "LLM Prompt Orchestration", "OpenRouter", "Anthropic API", "OpenAI Embeddings"],
    },
    {
      label: "Databases & Tools",
      items: ["PostgreSQL", "MongoDB", "TimescaleDB", "Git/GitHub", "CI/CD", "Agile/Scrum", "Playwright", "Jest", "Linux"],
    },
  ] as SkillGroup[],

  projects: [
    {
      name: "StudyBuddyAI",
      number: "01",
      category: "AI / RAG",
      description:
        "Serverless GenAI research assistant: chat with academic PDFs, auto-summaries, and quiz generation grounded in the document via Retrieval-Augmented Generation.",
      tech: ["FastAPI", "RAG", "Pinecone", "Cloud Run", "OpenRouter", "Firebase"],
      gradient: "from-violet-500 via-fuchsia-500 to-pink-500",
      repo: "https://github.com/NitinMohan03",
      demo: null,
    },
    {
      name: "SafeZone",
      number: "02",
      category: "Full-Stack / Real-Time",
      description:
        "Community safety platform: live incident feed, Mapbox heatmaps, safety-aware route planning, and role-based admin moderation — with a real-time sync layer over WebSockets.",
      tech: ["React", "TypeScript", "Mapbox GL JS", "AWS Cognito", "WebSockets", "Playwright"],
      gradient: "from-sky-500 via-indigo-500 to-purple-600",
      repo: "https://github.com/NitinMohan03",
      demo: null,
    },
    {
      name: "F1 Tyre Degradation",
      number: "03",
      category: "Data / Streaming",
      description:
        "Near-real-time Formula 1 tyre-degradation and race-pace anomaly monitoring: a Lambda-style pipeline replaying driver-lap events through Spark Streaming into a live dashboard.",
      tech: ["PySpark", "Kafka", "Redis", "Streamlit", "FastF1", "Docker"],
      gradient: "from-rose-500 via-orange-500 to-amber-400",
      repo: "https://github.com/NitinMohan03",
      demo: null,
    },
    {
      name: "AI Photo Search",
      number: "04",
      category: "AI / Serverless",
      description:
        "Natural-language photo album on AWS — upload images and search them with queries like “photos with dogs in a park,” powered by Rekognition labeling and OpenSearch indexing.",
      tech: ["AWS Lambda", "Lex", "Rekognition", "OpenSearch", "API Gateway", "S3"],
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      repo: "https://github.com/NitinMohan03",
      demo: null,
    },
    {
      name: "Dining Concierge",
      number: "05",
      category: "AI / Serverless",
      description:
        "Conversational restaurant-recommendation chatbot: collects preferences via Lex, queues with SQS, looks up restaurants in OpenSearch + DynamoDB, and emails suggestions via SES.",
      tech: ["AWS Lambda", "Lex V2", "SQS", "OpenSearch", "DynamoDB", "SES"],
      gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
      repo: "https://github.com/NitinMohan03",
      demo: null,
    },
  ] as Project[],

  // "What I build" chips for the About bento.
  builds: ["GenAI / RAG", "React + Next.js", "Cloud / Serverless", "Secure APIs"],
};

export type Profile = typeof profile;
