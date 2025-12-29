
/**
 * GitHub Linguist official language colors
 * Source: https://github.com/ozh/github-colors
 */
export const languageColors: Record<string, string> = {
  "Python": "#3572A5",
  "TypeScript": "#3178C6",
  "JavaScript": "#f1e05a",
  "Java": "#b07219",
  "Jupyter Notebook": "#DA5B0B",
  "Vue": "#41b883",
  "Shell": "#89e051",
  "HTML": "#e34c26",
  "CSS": "#563d7c",
  "SCSS": "#c6538c",
  "Go": "#00ADD8",
  "Rust": "#dea584",
  "C++": "#f34b7d",
  "C": "#555555",
  "C#": "#178600",
  "PHP": "#4F5D95",
  "Ruby": "#701516",
  "Swift": "#F05138",
  "Kotlin": "#A97BFF",
  "Dart": "#00B4AB",
  "Lua": "#000080",
  "R": "#198CE7",
  "MATLAB": "#e16737",
  "Dockerfile": "#384d54",
  "Makefile": "#427819",
  "Markdown": "#083fa1",
};

/**
 * Get color for a programming language
 * Returns a default gray if language not found
 */
export function getLanguageColor(language: string | null | undefined): string {
  if (!language) return "#6e7681";
  return languageColors[language] || "#6e7681";
}

/**
 * Language icons mapping (using Simple Icons slug)
 * Can be used with react-icons or simple-icons
 */
export const languageIcons: Record<string, string> = {
  "Python": "python",
  "TypeScript": "typescript",
  "JavaScript": "javascript",
  "Java": "java",
  "Jupyter Notebook": "jupyter",
  "Vue": "vuedotjs",
  "Shell": "gnubash",
  "HTML": "html5",
  "CSS": "css3",
  "Go": "go",
  "Rust": "rust",
  "C++": "cplusplus",
  "C": "c",
  "C#": "csharp",
  "PHP": "php",
  "Ruby": "ruby",
  "Swift": "swift",
  "Kotlin": "kotlin",
  "Dart": "dart",
};

