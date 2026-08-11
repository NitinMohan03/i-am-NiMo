import { SectionHead } from "./SectionHead";
import { profile } from "@/data/profile";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
};

const USERNAME =
  process.env.NEXT_PUBLIC_GITHUB_USERNAME || profile.githubUsername;

async function getRepos(): Promise<Repo[] | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers: { Accept: "application/vnd.github+json" },
        // Cache for an hour to stay well under the unauthenticated rate limit.
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return null;
    const data: Repo[] = await res.json();
    return data
      .filter((r) => !r.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);
  } catch {
    return null;
  }
}

const LANG_COLOR: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
};

export async function GitHubActivity() {
  const repos = await getRepos();

  return (
    <section
      id="github"
      data-spy="github"
      className="relative z-[1] scroll-mt-24 border-t border-line-soft px-[clamp(20px,5vw,72px)] py-[clamp(80px,11vh,140px)]"
    >
      <SectionHead
        index="04"
        label="Activity"
        title="Latest from GitHub."
        maxWidth="max-w-[20ch]"
      />

      {repos && repos.length > 0 ? (
        <div
          data-reveal="up"
          className="grid gap-px border border-line bg-line [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]"
        >
          {repos.map((r) => (
            <a
              key={r.id}
              href={r.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 bg-ground px-7 py-[30px] transition-colors duration-[400ms] hover:bg-ground-panel"
            >
              <span className="flex items-center gap-2.5">
                <GitHubMark />
                <span className="truncate font-display text-lg font-bold tracking-[-0.02em] text-ink transition-colors group-hover:text-coral">
                  {r.name}
                </span>
              </span>
              <span className="flex-1 text-[15px] leading-[1.7] text-ink-muted [text-wrap:pretty]">
                {r.description || "No description provided."}
              </span>
              <span className="mt-auto flex flex-wrap items-center gap-4 pt-2 font-mono text-[11.5px] text-ink-dim">
                {r.language && (
                  <span className="flex items-center gap-1.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: LANG_COLOR[r.language] || "#7d8798" }}
                    />
                    {r.language}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <StarIcon />
                  {r.stargazers_count}
                </span>
                <span className="flex items-center gap-1.5">
                  <ForkIcon />
                  {r.forks_count}
                </span>
              </span>
            </a>
          ))}
        </div>
      ) : (
        <p data-reveal="up" className="text-[16px] leading-[1.75] text-ink-muted">
          Couldn&apos;t load live GitHub data right now;{" "}
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-coral hover:text-coral-light"
          >
            browse the repos directly
          </a>
          .
        </p>
      )}

      <div data-reveal="up" data-delay="80" className="mt-10">
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-sm border border-coral/35 bg-coral/[0.12] px-[22px] py-3 text-[14.5px] text-coral transition-colors duration-300 hover:bg-coral hover:text-ground"
        >
          View all on GitHub
          <span className="font-mono text-xs" aria-hidden>
            &#8599;
          </span>
        </a>
      </div>
    </section>
  );
}

function GitHubMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-ink-dim" aria-hidden>
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-1.7c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 5 18.3 5.3 18.3 5.3c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-label="stars">
      <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5-4.7-4.6 6.5-.9L12 3z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-label="forks">
      <circle cx="6" cy="4" r="2.2" />
      <circle cx="18" cy="4" r="2.2" />
      <circle cx="12" cy="20" r="2.2" />
      <path d="M6 6.2v3.3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V6.2M12 12.5v5.3" />
    </svg>
  );
}
