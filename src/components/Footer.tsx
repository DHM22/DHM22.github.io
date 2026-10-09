import { ArrowUp } from 'lucide-react';
import { profile } from '../data/profile';
import { externalLinkProps } from '../lib/utils';
import { socialLinks } from './ui/SocialLinks';

export function Footer() {
  return (
    <footer className="container-page">
      <div className="flex flex-col gap-6 border-t border-line py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-fg-3">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <nav aria-label="Social">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-fg-2">
            {socialLinks.map(({ label, href, external }) => (
              <li key={label}>
                <a href={href} {...(external ? externalLinkProps : {})} className="py-2 transition-colors hover:text-fg">
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a href="#top" className="inline-flex items-center gap-1.5 py-2 transition-colors hover:text-fg">
                Back to top
                <ArrowUp className="size-3.5" aria-hidden />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
