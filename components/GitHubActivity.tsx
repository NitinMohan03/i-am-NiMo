import { SectionHeading } from "./SectionHeading";
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
    <section id="github" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16">
      <SectionHeading
        title="GitHub"
        accent="Activity"
        subtitle="Latest public repositories, fetched live from the GitHub API."
      />

      {repos && repos.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((r) => (
            <a
              key={r.id}
              href={r.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="panel group flex flex-col rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--border-strong)]"
            >
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--text-muted)]">
                  <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-1.7c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 5 18.3 5.3 18.3 5.3c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
                </svg>
                <h3 className="truncate font-medium transition-colors group-hover:text-[var(--accent-text)]">
                  {r.name}
                </h3>
              </div>
              <p className="mt-2 line-clamp-2 flex-1 text-sm text-[var(--text-muted)]">
                {r.description || "No description provided."}
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-[var(--text-muted)]">
                {r.language && (
                  <span className="flex items-center gap-1.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: LANG_COLOR[r.language] || "#888" }}
                    />
                    {r.language}
                  </span>
                )}
                <span className="flex items-center gap-1">★ {r.stargazers_count}</span>
                <span className="flex items-center gap-1">⑂ {r.forks_count}</span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-center text-[var(--text-muted)]">
          Couldn&apos;t load live GitHub data right now;{" "}
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--accent-text)] hover:underline"
          >
            browse the repos directly
          </a>
          .
        </p>
      )}

      <div className="mt-10 text-center">
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-5 py-2.5 text-sm font-medium transition-colors hover:border-[var(--border-strong)]"
        >
          View all on GitHub
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
