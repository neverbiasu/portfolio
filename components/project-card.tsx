import type { Project } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

interface Props {
  project: Project;
  locale: Locale;
}

export function ProjectCard({ project, locale }: Props) {
  const title = project.title[locale];
  const summary = project.summary[locale];

  return (
    <article className="glassless-panel flex h-full flex-col justify-between rounded-surface p-6 transition-transform duration-200 ease-soft hover:-translate-y-1">
      <div>
        <h3 className="text-xl font-semibold text-mocha-primary">{title}</h3>
        <p className="mt-3 text-sm text-mocha-text/80">{summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-full bg-mocha-surface/80 px-3 py-1 text-xs font-mono uppercase tracking-[0.1em] text-mocha-text/70"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {project.links.map((link) => (
          <a
            key={`${project.title.en}-${link.label}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono uppercase tracking-[0.12em] text-mocha-primary transition-colors duration-200 hover:text-mocha-text"
          >
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}
