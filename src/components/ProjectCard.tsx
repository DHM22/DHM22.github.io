import { ExternalLink } from 'lucide-react';
import type { Project } from '../types';
import { asset, cn, externalLinkProps } from '../lib/utils';
import { ProjectArtwork } from './ProjectArtwork';
import { GitHubIcon } from './ui/BrandIcons';
import { ButtonLink } from './ui/Button';
import { Pending } from './ui/Pending';
import { Reveal } from './ui/Reveal';
import { Badge, TagList } from './ui/Tag';

interface ProjectCardProps {
  project: Project;
  /** Featured: image and text side by side on large screens */
  featured?: boolean;
  /** Put the image on the right (featured cards alternate) */
  flip?: boolean;
  delay?: number;
}

export function ProjectCard({ project, featured = false, flip = false, delay = 0 }: ProjectCardProps) {
  return (
    <Reveal delay={delay} className="h-full">
      <article
        id={`project-${project.id}`}
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface/80 transition-colors duration-300 hover:border-line-strong',
          featured && 'lg:grid lg:grid-cols-12',
        )}
      >
        <div
          className={cn(
            'relative aspect-[16/10] overflow-hidden border-b border-line',
            featured && 'lg:col-span-7 lg:aspect-auto lg:min-h-[26rem] lg:border-b-0',
            featured && (flip ? 'lg:order-2 lg:border-l' : 'lg:border-r'),
          )}
        >
          <ProjectMedia project={project} featured={featured} />
        </div>

        <div className={cn('flex flex-1 flex-col p-6 sm:p-8', featured && 'lg:col-span-5')}>
          {project.badge && (
            <div className="mb-5">
              <Badge icon={project.badge.icon} tone={project.badge.tone}>
                {project.badge.label}
              </Badge>
            </div>
          )}
          <h3 className="text-2xl font-semibold tracking-tight">
            {project.name}
            {project.subtitle && <span className="mt-1 block text-base font-normal text-fg-2">{project.subtitle}</span>}
          </h3>
          <p className="mt-4 leading-relaxed text-pretty text-fg-2">{project.description}</p>
          {project.role && (
            <p className="mt-3 text-sm leading-relaxed text-pretty text-fg-3">
              <span className="font-medium text-fg-2">My role: </span>
              {project.role}
            </p>
          )}

          {project.metrics && (
            <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col-reverse justify-end bg-surface p-3 sm:p-4">
                  <dt className="mt-1 text-xs leading-snug text-fg-3">{metric.label}</dt>
                  <dd className="text-lg font-semibold tracking-tight tabular-nums sm:text-xl">{metric.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <TagList items={project.tech} label="Technologies" className="mt-6" />

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
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
                <ExternalLink className="size-4" aria-hidden />
                Live Demo
              </ButtonLink>
            )}
            {project.note && <span className="ml-auto font-mono text-xs text-fg-3">{project.note}</span>}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function ProjectMedia({ project, featured }: { project: Project; featured: boolean }) {
  const { image, artwork } = project;

  // Featured screenshots sit in a frame and peek out from the bottom-right corner
  if (image && featured) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_0%_0%,rgb(110_139_255_/_0.2),transparent_60%),radial-gradient(90%_80%_at_100%_100%,rgb(161_139_255_/_0.14),transparent_60%)]">
        <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
        <img
          src={asset(image.src)}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          className="absolute top-8 left-8 size-[calc(100%-2rem)] rounded-tl-xl border-t border-l border-white/15 object-cover object-left-top shadow-2xl shadow-black/60 transition-[translate] duration-700 ease-out group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 sm:top-10 sm:left-10 sm:size-[calc(100%-2.5rem)]"
        />
      </div>
    );
  }

  if (image) {
    return (
      <img
        src={asset(image.src)}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    );
  }

  if (artwork) {
    return (
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
        <ProjectArtwork variant={artwork} />
      </div>
    );
  }

  return null;
}
