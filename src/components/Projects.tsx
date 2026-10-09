import { projects } from '../data/projects';
import { CompactProject, LeadProject, ProjectCard } from './ProjectCard';
import { Section } from './ui/Section';

export function Projects() {
  const [lead, ...featured] = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <Section
      id="projects"
      title="Selected projects"
      description="AI, software engineering and data, from hackathon wins to a graduation project."
    >
      {lead && <LeadProject project={lead} />}

      {featured.length > 0 && (
        <ul className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-10">
          {featured.map((project, i) => (
            <li key={project.id}>
              <ProjectCard project={project} delay={(i % 2) * 100} />
            </li>
          ))}
        </ul>
      )}

      {others.length > 0 && (
        <div className="mt-20 border-t border-line pt-10">
          <h3 className="text-xl font-semibold tracking-tight">More projects</h3>
          <ul className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2">
            {others.map((project, i) => (
              <li key={project.id}>
                <CompactProject project={project} delay={(i % 2) * 100} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
