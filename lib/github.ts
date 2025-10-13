export const trackedRepositories = [
  "neverbiasu/ComfyUI-SAM2",
  "neverbiasu/ComfyUI-BAGEL",
  "neverbiasu/IELTSDuck",
  "neverbiasu/Awesome-Portraits-Style-Transfer",
  "neverbiasu/ComfyUI-Image-Captioner",
  "neverbiasu/hf-mirror-hub",
] as const;

export type RepositorySlug = (typeof trackedRepositories)[number];

export interface RepositorySnapshot {
  slug: RepositorySlug;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  description: string | null;
  pushedAt: string;
  defaultBranch: string;
}

const GITHUB_API_BASE = "https://api.github.com/repos";

export async function fetchRepositorySnapshot(
  slug: RepositorySlug,
  options: { signal?: AbortSignal } = {},
): Promise<RepositorySnapshot> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(`${GITHUB_API_BASE}/${slug}`, {
    headers,
    signal: options.signal,
    next: { revalidate: 60 * 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch repository metadata for ${slug}`);
  }

  const json = (await response.json()) as {
    stargazers_count: number;
    forks_count: number;
    subscribers_count: number;
    open_issues_count: number;
    description: string | null;
    pushed_at: string;
    default_branch: string;
  };

  return {
    slug,
    stars: json.stargazers_count,
    forks: json.forks_count,
    watchers: json.subscribers_count,
    openIssues: json.open_issues_count,
    description: json.description,
    pushedAt: json.pushed_at,
    defaultBranch: json.default_branch,
  };
}

export async function fetchAllRepositorySnapshots(
  options: { signal?: AbortSignal } = {},
): Promise<RepositorySnapshot[]> {
  return Promise.all(
    trackedRepositories.map((slug) => fetchRepositorySnapshot(slug, options)),
  );
}
