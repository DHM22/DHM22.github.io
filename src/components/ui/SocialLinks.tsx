import { Mail } from 'lucide-react';
import { profile } from '../../data/profile';
import { cn, externalLinkProps } from '../../lib/utils';
import type { IconType } from '../../types';
import { GitHubIcon, LinkedInIcon } from './BrandIcons';

interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
  external: boolean;
}

export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: profile.linkedin, icon: LinkedInIcon, external: true },
  { label: 'GitHub', href: profile.github, icon: GitHubIcon, external: true },
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail, external: false },
];

/** Round icon buttons for LinkedIn, GitHub and email. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {socialLinks.map(({ label, href, icon: Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(external ? externalLinkProps : {})}
            className="grid size-11 place-items-center rounded-full border border-line text-fg-2 transition-colors hover:border-line-strong hover:text-fg"
          >
            <Icon className="size-[18px]" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
