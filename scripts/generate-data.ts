
import fs from 'fs';
import path from 'path';

// Type definitions
interface GithubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
  homepage?: string; // Live demo URL
}

interface WakatimeStats {
  languages: { name: string; percent: number; text: string }[];
  total_seconds?: number;
  daily_average?: number;
}

interface GeneratedData {
  github: GithubRepo[];
  wakatime: WakatimeStats;
  last_updated: string;
}

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'neverbiasu';
const DATA_PATH = path.join(process.cwd(), 'src/data/generated.json');

async function fetchGithubData(): Promise<GithubRepo[]> {
  console.log('Fetching GitHub data...');
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
         headers: process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {},
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API failed: ${response.statusText}`);
    }

    const repos: any[] = await response.json();
    
    // Filter and map relevant data
    // We can filter by specific topics if needed, e.g., 'portfolio-showcase'
    // For now, we take non-fork repos or repos with Star > 0
    return repos
      .filter((repo: any) => !repo.fork && repo.stargazers_count >= 0) 
      .map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        language: repo.language,
        topics: repo.topics,
        updated_at: repo.updated_at,
        homepage: repo.homepage,
      }))
      .sort((a, b) => b.stargazers_count - a.stargazers_count); // Sort by stars
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return [];
  }
}

async function fetchWakatimeData(): Promise<WakatimeStats> {
  // Placeholder for Wakatime fetch logic
  // Needs WAKATIME_API_KEY
  console.log('Fetching Wakatime data...');
  // Logic to be implemented or mocked if no key
  return {
    languages: [],
  };
}

async function main() {
  const githubData = await fetchGithubData();
  const wakatimeData = await fetchWakatimeData();

  const data: GeneratedData = {
    github: githubData,
    wakatime: wakatimeData,
    last_updated: new Date().toISOString(),
  };

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  console.log(`Data generated at ${DATA_PATH}`);
}

main();
