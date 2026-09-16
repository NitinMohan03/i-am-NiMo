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
    "I like owning the whole problem, from the query plan to the last pixel. Three years at Accenture taught me what that actually costs: chasing an N+1 through Datadog traces at 427 requests a second, writing middleware that killed a whole class of injection bugs instead of patching them one at a time, caching OCR results so a document system stopped redoing work it had already done. At NYU I've been pointing the same instinct at GenAI, building RAG pipelines and agentic systems where retrieval quality, tenant isolation, and the behaviour on a bad response matter as much as the model does. That is the part of AI work I find interesting: everything that has to hold once someone actually depends on it.",

  // Short, human one-liner for the About header.
  intro:
    "Full-stack engineer turned AI builder. Three years of production systems at Accenture, now an M.S. at NYU pointed at GenAI.",

  // Capability areas, shown as chips under the hero. Deliberately areas of
  // work rather than job titles, so they read as range instead of a filter.
  roles: [
    "Software Engineering",
    "AI / ML & GenAI",
    "Backend & Distributed Systems",
    "Full-Stack & Cloud",
  ],

  // What I'm into right now — the About "currently" card.
  focus:
    "Building agentic and RAG-powered products: wiring LLMs to real tools, data, and users, while keeping the engineering underneath production-grade.",

  // Quick credibility stats for the About bento. Keep to 4.
  highlights: [
    { value: "3 yrs", label: "Production SWE" },
    { value: "500+", label: "SAST Vulns Eliminated" },
    { value: "150+ → <15", label: "DB Calls Per Request" },
    { value: "4.2s → 2.8s", label: "Page Load, 140+ Components" },
  ] as { value: string; label: string }[],

  // Longer narrative — feeds the About section and seeds the chat assistant.
  bio: [
    "Nitin Mohan is a full-stack software engineer with production-scale experience in distributed systems, GenAI, and cloud infrastructure. He spent three years at Accenture and is now completing an M.S. in Computer Science at New York University (GPA 3.89, expected May 2027).",
    "At Accenture, on full-stack and LLM work for enterprise healthcare clients, he eliminated 500+ critical SAST vulnerabilities across 8 applications by engineering middleware that resolved whole classes of XSS, SQL injection, and CSRF issues, then codified the fixes into Semgrep and SonarQube rules adopted as project-wide security standards. He diagnosed a GraphQL N+1 bottleneck throttling a 50M+ record dataset at 427 RPS peak using Datadog APM tracing, and replaced per-field resolver queries with DataLoader batching, cutting per-request database calls from 150+ to under 15 and p95 latency by 37%.",
    "He also designed a Redis caching layer for a distributed healthcare document system serving 6k+ daily requests across NA and EU clients, hitting a 73% cache hit ratio and cutting average response time by 74% by eliminating redundant OCR reprocessing, and led a frontend modernization migrating 140+ legacy class-based React components to React 17 with Hooks and centralized Redux, taking page load from 4.2s to 2.8s. His generative AI assistant PoC on Google Cloud Run, wiring Vertex AI APIs to a React frontend that streams LLM responses grounded in PDF-extracted content, contributed to Accenture's 2024 Google Cloud ML Partner of the Year award. He was promoted within 18 months, won the ACE Bright Beginners Award in his third month, was named Star Performer for Q2 2024, mentored 6 engineers to ticket-independent productivity within their first sprint, and ran React and D3.js knowledge-sharing sessions for 80-100 people across engineering, QA, and business teams.",
    "Earlier, as a remote backend infrastructure intern at Ernst & Young, he architected a distributed Apache Kafka streaming pipeline on AWS ingesting 1,842 daily industrial IoT sensor signals across 3 topics with MQTT broker integration, cut KPI dashboard query latency 85% (250ms to 38ms) with a Redis layer in front of Apache Spark aggregations, and eliminated silent data loss by routing 70 malformed signals a day to a dead-letter queue with real-time alerting on consumer lag.",
    "At NYU he focuses on GenAI, agentic systems, and cloud. He built a RAG research-paper assistant (FastAPI on Google Cloud Run, Pinecone vector search, multi-LLM routing via OpenRouter, Firestore) with multi-tenant isolation enforced at both the Pinecone namespace and Firestore rules layers, and SafeZone, a campus-safety platform (React 19, Vite, Mapbox GL JS, AWS Cognito) with a geospatial rerouting algorithm that computes flanking waypoints around incident clusters. He's open to full-time software engineering roles, and is most drawn to work where he sits close to users and ships systems that hold up in production. This portfolio's chat box is itself one of his GenAI demos.",
  ].join("\n\n"),

  status: "Open to full-time software roles · New Grad 2027",

  location: {
    city: "Brooklyn, New York",
    coordinates: "40.6415° N, 74.0235° W",
  },

  // Background-removed headshot, rendered floating over the hero's ring.
  photo: "/avatar-bridge.png" as string | null,
  initials: "NM",

  githubUsername: "NitinMohan03",

  // General résumé. Tailored versions go out with applications; this one just
  // means a recruiter never leaves empty-handed. Replace the file in /public
  // when the master changes so the two cannot drift apart.
  resumeUrl: "/nitin-mohan-resume.pdf",

  socials: {
    email: "nm5029@nyu.edu",
    linkedin: "https://www.linkedin.com/in/nitin-mohan1903",
    github: "https://github.com/NitinMohan03",
    phone: "+1 347-967-2954",
  },

  experience: [
    {
      company: "Accenture",
      role: "Software Engineer, Full-Stack LLM Development",
      location: "Bengaluru, India",
      start: "Aug 2022",
      end: "Jul 2025",
      bullets: [
        "Eliminated 500+ critical SAST vulnerabilities across 8 applications by engineering middleware that resolved entire classes of XSS, SQLi, and CSRF issues, codifying the fixes into Semgrep and SonarQube rules adopted as project-wide security standards.",
        "Diagnosed a large-scale GraphQL N+1 bottleneck throttling a 50M+ record dataset at 427 RPS peak load using Datadog APM tracing, replacing per-field resolver queries with DataLoader batching, cutting per-request database calls from 150+ to under 15 and p95 latency by 37%.",
        "Engineered a generative AI assistant for a client PoC on Google Cloud Run, integrating Vertex AI APIs with a React frontend to stream LLM responses grounded in PDF-extracted content, contributing to Accenture's 2024 Google Cloud ML Partner of the Year award.",
        "Designed a Redis caching layer for a distributed healthcare document system serving 6k+ daily requests across NA/EU clients, achieving a 73% cache hit ratio and cutting average response time by 74% by eliminating redundant OCR reprocessing.",
        "Led a frontend modernization migrating 140+ legacy class-based React components to React 17 with Hooks and centralized Redux state, eliminating unnecessary re-renders and reducing page load time from 4.2s to 2.8s.",
        "Mentored 6 engineers to ticket-independent productivity within their first sprint and led React and D3.js knowledge-sharing sessions for 80-100 employees across engineering, QA, and business teams.",
        "Promoted within 18 months; ACE Bright Beginners Award (month 3) and Star Performer Q2 2024.",
      ],
    },
    {
      company: "Ernst & Young",
      role: "Software Engineer Intern, Backend Infrastructure",
      location: "Remote",
      start: "May 2021",
      end: "Aug 2021",
      bullets: [
        "Architected a distributed Apache Kafka streaming pipeline on AWS ingesting 1,842 daily industrial IoT sensor signals across 3 topics, enabling high-throughput delivery to multiple downstream consumer groups via MQTT broker integration.",
        "Cut KPI dashboard query latency by 85%, from 250ms to 38ms, by engineering a Redis caching layer in front of Apache Spark aggregations using Python and SQL, reducing overhead on high-frequency operational metrics.",
        "Eliminated silent data loss in the ingestion pipeline by implementing real-time alerting on consumer lag and ingestion failures, routing 70 malformed signals daily (3.8% of total throughput) to a dead-letter queue instead of dropping them.",
      ],
    },
  ] as ExperienceItem[],

  education: [
    {
      school: "New York University",
      degree: "M.S. in Computer Science",
      detail: "GPA 3.89 / 4.0 · Algorithms, Cloud Computing & Big Data, Machine Learning, Internet Security, Software Engineering, Data Engineering",
      location: "Brooklyn, New York",
      start: "Aug 2025",
      end: "May 2027",
    },
    {
      school: "Amity University",
      degree: "B.Tech, Computer Science & Engineering",
      detail: "Data Structures, Databases, Web Development, Operating Systems · 3 independent research studies",
      location: "Uttar Pradesh, India",
      start: "Jul 2018",
      end: "May 2022",
    },
  ] as EducationItem[],

  skills: [
    {
      label: "Languages",
      items: ["Python", "JavaScript", "TypeScript", "Go", "Java", "C#", "C++", "C", "SQL", "Bash", "HTML", "CSS"],
    },
    {
      label: "Frameworks & APIs",
      items: ["React", "React Native", "FastAPI", "Java Spring Boot", "Node.js", "Angular", "REST APIs", "WebSocket", "OAuth 2.0", "JWT", "RBAC"],
    },
    {
      label: "Databases & Caching",
      items: ["PostgreSQL", "Redis", "DynamoDB", "TimescaleDB", "CosmosDB", "MySQL", "OpenSearch", "SQLite"],
    },
    {
      label: "Cloud & Infrastructure",
      items: ["AWS (Lambda, SQS, SNS, SES, API Gateway, Cognito, S3, EC2)", "Azure (AKS, Event Hubs, SignalR)", "GCP", "Docker", "Kubernetes", "Kafka", "Terraform", "Helm", "Linux/Unix"],
    },
    {
      label: "DevSecOps & Platform",
      items: ["GitHub Actions", "CI/CD", "Prometheus", "Semgrep", "SonarQube", "Unit Testing", "Integration Testing", "Automation Testing"],
    },
    {
      label: "AI & Machine Learning",
      items: ["LLM integration", "RAG pipelines", "Natural language processing", "Information retrieval", "LangChain", "LangSmith", "SageMaker", "Agentic AI", "Z-Score / EWMA anomaly detection", "GitHub Copilot", "Gemini"],
    },
  ] as SkillGroup[],

  projects: [
    {
      name: "rag-paper-assistant",
      number: "01",
      category: "AI / RAG",
      description:
        "End-to-end RAG pipeline for academic PDFs on Google Cloud Run: chunking, embedding, vector retrieval, and grounded generation, with a fallback to raw-text context when retrieval comes back empty. A routing engine picks between document-grounded and conversational modes per question across multiple LLMs, and multi-tenant isolation is enforced twice over, by Pinecone namespace-per-user and Firestore security rules, so no request can read another user's documents.",
      tech: ["Python", "FastAPI", "Google Cloud Run", "Pinecone", "OpenRouter", "Firestore", "pdfminer.six"],
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
        "Campus safety platform with a live incident feed, Mapbox heatmaps, and role-based admin moderation. The routing algorithm computes flanking waypoints around incident clusters using bearing offsets and point-to-line distance checks in Turf.js, reconverging on a collision-free path inside a bounded three-iteration loop before falling back to the direct route. Infrastructure is CloudFormation with least-privilege IAM, and auth runs dual-mode: real Cognito flows in production, a local path for demos.",
      tech: ["React 19", "Vite", "Tailwind CSS", "Mapbox GL JS", "AWS Cognito", "Cloudinary", "Make.com", "Playwright"],
      metrics: [
        { value: "Turf.js", label: "Geospatial Reroute" },
        { value: "3-iter", label: "Bounded Search" },
        { value: "IaC", label: "CloudFormation" },
        { value: "RBAC", label: "Cognito Groups" },
      ],
      specs: [
        { label: "Arch", value: "React 19 + Vite SPA" },
        { label: "Maps", value: "Mapbox GL JS + Turf.js" },
        { label: "Auth", value: "AWS Cognito (dual-mode)" },
        { label: "QA", value: "Playwright route mocks" },
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
