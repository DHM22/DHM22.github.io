import { ArrowUp } from 'lucide-react';
import { profile } from '../data/profile';
import { externalLinkProps } from '../lib/utils';
import { socialLinks } from './ui/SocialLinks';

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold tracking-tight">{profile.name}</p>
          <p className="mt-1 text-sm text-fg-3">AI • Software Engineering • Data</p>
        </div>
        <nav aria-label="Social">
          <ul className="flex items-center text-sm text-fg-2">
            {socialLinks.map(({ label, href, external }, i) => (
              <li key={label} className="flex items-center">
                {i > 0 && (
                  <span aria-hidden className="px-3 text-fg-3/60">
                    |
                  </span>
                )}
                <a
                  href={href}
                  {...(external ? externalLinkProps : {})}
                  className="rounded py-2 transition-colors hover:text-fg"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col-reverse gap-3 py-6 text-xs text-fg-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <a href="#top" className="inline-flex w-fit items-center gap-1.5 py-1 transition-colors hover:text-fg">
            Back to top
            <ArrowUp className="size-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
