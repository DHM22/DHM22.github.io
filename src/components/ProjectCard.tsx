import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../types';
import { asset, cn, externalLinkProps } from '../lib/utils';
import { ProjectArtwork } from './ProjectArtwork';
import { GitHubIcon } from './ui/BrandIcons';
import { ButtonLink } from './ui/Button';
import { Pending } from './ui/Pending';
import { Reveal } from './ui/Reveal';
import { Badge, TagList } from './ui/Tag';

/** The first featured project: a wide image, then the story beside the numbers. */
export function LeadProject({ project }: { project: Project }) {
  return (
    <Reveal>
      <article id={`project-${project.id}`} className="group">
        <Media project={project} className="aspect-[16/10] sm:aspect-[16/9]" eager />

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Heading project={project} large />
            <p className="mt-5 max-w-[62ch] leading-relaxed text-pretty text-fg-2 sm:text-lg">{project.description}</p>
            <Role project={project} />
            <Links project={project} className="mt-7" />
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            {project.metrics && (
              <dl className="grid grid-cols-3 gap-6 lg:grid-cols-1 lg:gap-7">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col-reverse justify-end">
                    <dt className="mt-1 text-sm leading-snug text-fg-3">{metric.label}</dt>
                    <dd className="text-3xl font-semibold tracking-tighter tabular-nums sm:text-4xl">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <TagList items={project.tech} label="Technologies" className="mt-8" />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/** Featured projects after the first, shown in pairs. */
export function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article id={`project-${project.id}`} className="group flex h-full flex-col">
        <Media project={project} className="aspect-[16/10]" />
        <div className="mt-7 flex flex-1 flex-col">
          <Heading project={project} />
          <p className="mt-4 leading-relaxed text-pretty text-fg-2">{project.description}</p>
          <Role project={project} />

          {project.metrics && (
            <dl className="mt-7 grid grid-cols-3 gap-4">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col-reverse justify-end">
                  <dt className="mt-1 text-xs leading-snug text-fg-3 sm:text-sm">{metric.label}</dt>
                  <dd className="text-2xl font-semibold tracking-tighter tabular-nums">{metric.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <TagList items={project.tech} label="Technologies" className="mt-7" />
          <Links project={project} className="mt-auto pt-7" />
        </div>
      </article>
    </Reveal>
  );
}

/** Smaller projects: a thumbnail (when there is one) beside a short description. */
export function CompactProject({ project, delay = 0 }: { project: Project; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article id={`project-${project.id}`} className="group flex h-full flex-col gap-5 sm:flex-row">
        {project.image && <Media project={project} className="aspect-[16/10] sm:aspect-square sm:w-36 sm:shrink-0" />}
        <div className="flex flex-1 flex-col">
          {project.badge && <p className="text-sm text-fg-3">{project.badge.label}</p>}
          <h4 className="mt-1 text-lg font-semibold tracking-tight">{project.name}</h4>
          <p className="mt-2 text-sm leading-relaxed text-pretty text-fg-2">{project.description}</p>
          <TagList items={project.tech} label="Technologies" className="mt-4" />
          <Links project={project} className="mt-auto pt-5" />
        </div>
      </article>
    </Reveal>
  );
}

function Heading({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <>
      {project.badge && <Badge icon={project.badge.icon}>{project.badge.label}</Badge>}
      <h3 className={cn('mt-3 font-semibold tracking-tight', large ? 'text-3xl sm:text-4xl' : 'text-2xl')}>
        {project.name}
      </h3>
      {project.subtitle && <p className={cn('mt-1 text-fg-2', large && 'text-lg')}>{project.subtitle}</p>}
    </>
  );
}

function Role({ project }: { project: Project }) {
  if (!project.role && !project.note) return null;
  return (
    <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-pretty text-fg-3">
      {project.role && (
        <>
          <span className="font-medium text-fg-2">My role: </span>
          {project.role}
        </>
      )}
      {project.note && <span className="block text-fg-3">{project.note}</span>}
    </p>
  );
}

function Links({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {project.github ? (
        <ButtonLink
          href={project.github}
          {...externalLinkProps}
          variant="secondary"
          size="compact"
          aria-label={`${project.name} on GitHub`}
        >
          <GitHubIcon className="size-4" />
          GitHub
        </ButtonLink>
      ) : (
        <Pending>GitHub link</Pending>
      )}
      {project.demo && (
        <ButtonLink
          href={project.demo}
          {...externalLinkProps}
          variant="ghost"
          size="compact"
          aria-label={`${project.name} live demo`}
        >
          Live demo
          <ArrowUpRight className="size-4" aria-hidden />
        </ButtonLink>
      )}
    </div>
  );
}

function Media({ project, className, eager = false }: { project: Project; className?: string; eager?: boolean }) {
  const { image, artwork } = project;
  if (!image && !artwork) return null;

  return (
    <div className={cn('relative overflow-hidden rounded-xl border border-line bg-surface-2', className)}>
      {image ? (
        <img
          src={asset(image.src)}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="size-full object-cover object-top transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.025]"
        />
      ) : (
        artwork && (
          <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.025]">
            <ProjectArtwork variant={artwork} />
          </div>
        )
      )}
    </div>
  );
}
