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

export type Metric = { value: string; label: string };
export type Spec = { label: string; value: string };

export type Project = {
  name: string;
  // Two-digit display number, e.g. "01"
  number: string;
  category: string;
  description: string;
  tech: string[];
  // Headline numbers shown as small tiles under the title. 2-4 looks best.
  metrics?: Metric[];
  // Key/value "spec sheet" rows. Currently unused by the UI — kept as data.
  specs?: Spec[];
  // Screenshot shown in the project row. Null renders the hatched placeholder.
  image?: string | null;
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
    "I build AI products that survive contact with real users: RAG pipelines, agentic systems, and the fast React frontends that make them usable.",

  // Used by the About bento and the chat system prompt.
  mindset:
    "I like owning the whole problem, tracing it from the data layer to the last pixel, and lately I've been pointing that instinct at AI. Three years shipping production React and Node systems at Accenture taught me to sweat performance, security, and reliability. My work at NYU pushes that into GenAI: RAG pipelines, LLM orchestration, and agentic systems that do things, not just chat. What I want to build are AI products that hold up in front of real users, not just in a demo.",

  // Short, human one-liner for the About header.
  intro:
    "Full-stack engineer turned AI builder. I ship reliable software and the agentic systems on top of it.",

  // Target roles — shown as chips, signals what I'm aiming for.
  roles: [
    "Forward-Deployed Engineer",
    "AI / Agentic Engineer",
    "Full-Stack Software Engineer",
  ],

  // What I'm into right now — the About "currently" card.
  focus:
    "Building agentic and RAG-powered products: wiring LLMs to real tools, data, and users, while keeping the engineering underneath production-grade.",

  // Quick credibility stats for the About bento. Keep to 4.
  highlights: [
    { value: "3 yrs", label: "Production SWE" },
    { value: "350+", label: "Total Vulns Resolved" },
    { value: "86+", label: "Total Components Shipped" },
    { value: "3.89", label: "GPA @ NYU" },
  ] as { value: string; label: string }[],

  // Longer narrative — feeds the About section and seeds the chat assistant.
  bio: [
    "Nitin Mohan is a software engineer with three years of full-stack experience at Accenture and a current M.S. in Computer Science at New York University (GPA 3.89).",
    "At Accenture he worked on large-scale healthcare applications built with React and Node.js: he built PDF ingestion pipelines that extracted medical data (ICD diagnosis codes, patient demographics, provider details) and rendered them as interactive, auditable digital forms; led a frontend modernization migrating legacy class-based React to React 17 with Hooks and Redux, cutting unnecessary re-renders by ~40%; and personally remediated 84+ critical security vulnerabilities (XSS, SQL injection, insecure headers) surfaced by enterprise DAST/SAST scans.",
    "He was promoted to Software Engineer within 18 months, won the ACE Bright Beginners Award in his third month, and was named Star Performer for Q2 2024. He served as technical lead and single point of contact for a D3.js/React reporting dashboard, and onboarded and mentored 6 new engineers.",
    "Earlier he interned at Ernst & Young as a Full Stack Developer, building a Python + TimescaleDB time-series ingestion pipeline (42% faster queries) and a deterministic simulation engine for hardware anomalies.",
    "Now at NYU he focuses on GenAI, agentic systems, and cloud: he's built a serverless RAG research-paper assistant (FastAPI on Cloud Run, Pinecone vector search, dynamic LLM routing via OpenRouter), a real-time campus-safety mapping platform (React/TypeScript, Mapbox, AWS Cognito, WebSockets), and several AWS-native AI applications that wire LLMs to real tools and data. He's targeting Forward-Deployed Engineer, AI/agentic, and full-stack SWE roles, work where he can sit close to users and ship AI products that hold up in production. This portfolio's chat box is itself one of his GenAI demos.",
  ].join("\n\n"),

  status: "Open to Forward-Deployed, AI/Agentic & Full-Stack roles (New Grad 2027)",

  location: {
    city: "Brooklyn, New York",
    coordinates: "40.6415° N, 74.0235° W",
  },

  // Background-removed headshot, rendered floating over the hero's ring.
  // The uncut original stays at /avatar.jpg.
  photo: "/avatar-cutout.png" as string | null,
  initials: "NM",

  githubUsername: "NitinMohan03",

  socials: {
    email: "nm5029@nyu.edu",
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
      name: "rag-paper-assistant",
      number: "01",
      category: "AI / RAG",
      description:
        "Serverless research assistant for academic PDFs: chat, structured summaries, and auto-generated quizzes, all grounded in the source document through a RAG pipeline. Pinecone holds the embeddings and OpenRouter routes each question to a free LLM, so the app scales to zero between sessions.",
      tech: ["FastAPI", "RAG", "Pinecone", "Cloud Run", "OpenRouter", "Firebase"],
      metrics: [
        { value: "<2s", label: "First Token" },
        { value: "Top-K", label: "Retrieval" },
        { value: "Multi", label: "LLM Routing" },
        { value: "0", label: "Idle Cost" },
      ],
      specs: [
        { label: "Arch", value: "Serverless (Cloud Run)" },
        { label: "Data", value: "Pinecone Vector Store" },
        { label: "AI/ML", value: "RAG, OpenRouter routing" },
        { label: "Auth", value: "Firebase" },
      ],
      image: "/projects/rag-paper-assistant.png",
      repo: "https://github.com/NitinMohan03/rag-paper-assistant",
      demo: null,
    },
    {
      name: "safezone-campus-safety",
      number: "02",
      category: "Full-Stack / Real-Time",
      description:
        "Campus safety platform with a live incident feed, Mapbox heatmaps, safety-aware route planning, and a role-based admin moderation dashboard. A WebSocket sync layer keeps every client current, and AWS Cognito groups gate the User and Admin views.",
      tech: ["React", "TypeScript", "Mapbox GL JS", "AWS Cognito", "WebSockets", "Playwright"],
      metrics: [
        { value: "<200ms", label: "Live Sync" },
        { value: "Real-Time", label: "Incident Feed" },
        { value: "RBAC", label: "Moderation" },
        { value: "E2E", label: "Tested" },
      ],
      specs: [
        { label: "Arch", value: "React SPA + WebSocket layer" },
        { label: "Maps", value: "Mapbox GL JS heatmaps" },
        { label: "Auth", value: "AWS Cognito (RBAC)" },
        { label: "QA", value: "Playwright E2E" },
      ],
      image: "/projects/safezone-campus-safety.png",
      repo: "https://github.com/NitinMohan03/safezone-campus-safety",
      demo: null,
    },
    {
      name: "f1-tyre-degradation-pipeline",
      number: "03",
      category: "Data / Streaming",
      description:
        "Near-real-time Formula 1 tyre-degradation and race-pace anomaly monitor. PySpark builds per-stint baselines in batch, Kafka replays driver-lap events at adjustable speed, Spark Structured Streaming scores risk into Redis, and a Streamlit dashboard reads the live state. Alerts fire on two consecutive high-risk laps.",
      tech: ["PySpark", "Kafka", "Redis", "Streamlit", "FastF1", "Docker"],
      metrics: [
        { value: "20 cars", label: "Live Streams" },
        { value: "Sub-sec", label: "Latency" },
        { value: "Anomaly", label: "Detection" },
        { value: "Kappa", label: "Pipeline" },
      ],
      specs: [
        { label: "Arch", value: "Spark Streaming (Kappa)" },
        { label: "Ingest", value: "Kafka event replay" },
        { label: "State", value: "Redis hot store" },
        { label: "Source", value: "FastF1 telemetry" },
      ],
      image: "/projects/f1-tyre-degradation-pipeline.png",
      repo: "https://github.com/NitinMohan03/f1-tyre-degradation-pipeline",
      demo: null,
    },
    {
      name: "semantic-photo-search",
      number: "04",
      category: "AI / Serverless",
      description:
        "Natural-language photo album on AWS: upload an image and search it with queries like “photos with dogs in a park.” Each upload triggers a Lambda that labels the image with Rekognition and indexes it in OpenSearch; a second Lambda turns the query into keywords through Amazon Lex and returns matches. The whole pipeline is event-driven and serverless.",
      tech: ["AWS Lambda", "Lex", "Rekognition", "OpenSearch", "API Gateway", "S3"],
      metrics: [
        { value: "NL Query", label: "Search" },
        { value: "Auto", label: "Labeling" },
        { value: "Event", label: "Driven" },
        { value: "0", label: "Servers" },
      ],
      specs: [
        { label: "Arch", value: "Event-driven Lambda" },
        { label: "Vision", value: "Rekognition labels" },
        { label: "Index", value: "OpenSearch" },
        { label: "NLP", value: "Amazon Lex" },
      ],
      repo: "https://github.com/NitinMohan03/semantic-photo-search",
      demo: null,
    },
    {
      name: "serverless-dining-concierge",
      number: "05",
      category: "AI / Serverless",
      description:
        "Conversational restaurant-recommendation chatbot. Amazon Lex V2 collects cuisine, location, time, and party size through slot filling; an SQS queue decouples the request from a worker Lambda that looks up matches in OpenSearch, hydrates details from DynamoDB, and emails the suggestions through SES. The queue keeps the chat responsive while delivery runs asynchronously.",
      tech: ["AWS Lambda", "Lex V2", "SQS", "OpenSearch", "DynamoDB", "SES"],
      metrics: [
        { value: "Async", label: "Decoupled" },
        { value: "Conv.", label: "Lex Intents" },
        { value: "Email", label: "Delivery" },
        { value: "0", label: "Servers" },
      ],
      specs: [
        { label: "Arch", value: "SQS-decoupled Lambdas" },
        { label: "NLP", value: "Lex V2 slot filling" },
        { label: "Data", value: "OpenSearch + DynamoDB" },
        { label: "Delivery", value: "SES email" },
      ],
      repo: "https://github.com/NitinMohan03/serverless-dining-concierge",
      demo: null,
    },
  ] as Project[],

  // "What I build" chips for the About bento.
  builds: [
    "Agentic AI Systems",
    "RAG Pipelines",
    "LLM Orchestration",
    "React + Next.js",
    "Cloud / Serverless",
    "Secure APIs",
  ],
};

export type Profile = typeof profile;
