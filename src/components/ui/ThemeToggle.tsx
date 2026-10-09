import { useEffect, useState, type MouseEvent } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '../../lib/utils';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const systemQuery = '(prefers-color-scheme: light)';
// Browser chrome color for each theme, matching --color-bg in index.css
const chromeColor: Record<Theme, string> = { dark: '#0c0c0e', light: '#f4f4f5' };

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function systemTheme(): Theme {
  return window.matchMedia(systemQuery).matches ? 'light' : 'dark';
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
    meta.setAttribute('content', chromeColor[theme]);
  }
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Private mode or blocked storage: the choice just won't be remembered
  }
}

/**
 * Light/dark switch. Follows the system until the visitor picks a theme, then remembers it.
 * Where the browser supports view transitions, the new theme spreads in a circle from the button.
 * Pass the size in className (e.g. size-9).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(() => readStored() ?? systemTheme());

  // While the visitor hasn't picked, keep following the system setting
  useEffect(() => {
    const media = window.matchMedia(systemQuery);
    const onChange = () => {
      if (!readStored()) setTheme(systemTheme());
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.startViewTransition || reduceMotion) {
      applyTheme(next);
      setTheme(next);
      return;
    }

    // Grow a circle from the button's center to the farthest corner of the viewport
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = document.startViewTransition(() => applyTheme(next));
    setTheme(next);
    transition.ready
      .then(() =>
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' },
        ),
      )
      .catch(() => {
        // The theme is already applied; only the animation was skipped
      });
  }

  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        'relative grid shrink-0 place-items-center overflow-hidden rounded-full border border-line text-fg-2 transition-[color,border-color,scale] duration-200 hover:border-line-strong hover:text-fg active:scale-[0.94]',
        className,
      )}
    >
      {/* Both icons stay mounted so they can swap with a short turn */}
      <Sun
        aria-hidden
        className={cn(
          'col-start-1 row-start-1 size-[18px] transition-[rotate,scale,opacity] duration-500 ease-[var(--ease-soft)] motion-reduce:transition-none',
          theme === 'dark' ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-90 opacity-0',
        )}
      />
      <Moon
        aria-hidden
        className={cn(
          'col-start-1 row-start-1 size-[18px] transition-[rotate,scale,opacity] duration-500 ease-[var(--ease-soft)] motion-reduce:transition-none',
          theme === 'light' ? 'scale-100 rotate-0 opacity-100' : 'scale-50 rotate-90 opacity-0',
        )}
      />
    </button>
  );
}
