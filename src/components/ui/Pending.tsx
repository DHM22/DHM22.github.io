import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

/**
 * Marks information that hasn't been filled in yet.
 * Shown while running `npm run dev`; removed from the production build, so the live site never shows it.
 */
export function Pending({ children, className }: { children: ReactNode; className?: string }) {
  if (!import.meta.env.DEV) return null;
  return (
    <span
      title="Placeholder: only visible in development"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border border-dashed border-amber-400/40 bg-amber-400/[0.06] px-2 py-1 font-mono text-[11px] leading-snug text-amber-200/90',
        className,
      )}
    >
      <span aria-hidden>+</span>
      {children}
    </span>
  );
}
