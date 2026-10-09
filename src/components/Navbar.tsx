import { useEffect, useRef, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { navItems, profile } from '../data/profile';
import { useActiveSection, useScrolled } from '../lib/hooks';
import { asset, cn } from '../lib/utils';
import { ButtonLink } from './ui/Button';

const sectionIds = navItems.map((item) => item.id);
const cvFileName = profile.cv.split('/').pop();

export function Navbar() {
  const scrolled = useScrolled(12);
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu with Escape, and when the window grows to desktop width
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 64rem)');
    const onResize = () => desktop.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300',
        scrolled || open ? 'border-line bg-bg/80 backdrop-blur-xl' : 'border-transparent bg-transparent',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-3 rounded-lg" aria-label={`${profile.name}, back to top`}>
          <span
            aria-hidden
            className="grid size-9 place-items-center rounded-xl border border-white/10 bg-linear-to-br from-accent/30 to-accent-2/20 font-mono text-[13px] font-semibold"
          >
            AD
          </span>
          {/* Hidden at lg only, where the full nav needs the room */}
          <span className="text-[15px] font-semibold tracking-tight lg:hidden xl:inline">{profile.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'location' : undefined}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm transition-colors',
                    active === item.id ? 'bg-white/[0.06] text-fg' : 'text-fg-2 hover:text-fg',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <ButtonLink href={asset(profile.cv)} download={cvFileName} variant="secondary" size="sm">
              <Download className="size-4" aria-hidden />
              Download CV
            </ButtonLink>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="grid size-11 place-items-center rounded-xl border border-line text-fg transition-colors hover:bg-white/[0.05] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          'border-t border-line transition-[opacity,translate,visibility] duration-200 lg:hidden',
          open ? 'visible translate-y-0 opacity-100' : 'invisible absolute inset-x-0 -translate-y-2 opacity-0',
        )}
      >
        <nav aria-label="Mobile" className="container-page py-4">
          <ul className="grid gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? 'location' : undefined}
                  className={cn(
                    'flex h-12 items-center rounded-xl px-4 text-base transition-colors',
                    active === item.id ? 'bg-white/[0.06] text-fg' : 'text-fg-2 hover:bg-white/[0.04] hover:text-fg',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink
            href={asset(profile.cv)}
            download={cvFileName}
            className="mt-4 w-full"
            onClick={() => setOpen(false)}
          >
            <Download className="size-4" aria-hidden />
            Download CV
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
