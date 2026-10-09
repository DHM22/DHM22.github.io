import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { Section } from './ui/Section';

export function Projects() {
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <Section
      id="projects"
      index="05"
      eyebrow="Projects"
      title="Featured Projects"
      description="Selected work across AI, software engineering and data, from hackathon wins to coursework."
    >
      <div className="space-y-6">
        {featured.map((project, i) => (
          <ProjectCard key={project.id} project={project} featured flip={i % 2 === 1} />
        ))}
      </div>

      {others.length > 0 && (
        <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {others.map((project, i) => (
            <li key={project.id}>
              <ProjectCard project={project} delay={(i % 2) * 80} />
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
