import type { ReactNode } from 'react';
import type { IconType } from '../../types';
import { cn } from '../../lib/utils';

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn('inline-flex items-center rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-fg-2', className)}
    >
      {children}
    </span>
  );
}

export function TagList({ items, label, className }: { items: string[]; label?: string; className?: string }) {
  return (
    <ul aria-label={label} className={cn('flex flex-wrap gap-1.5', className)}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}

/** Small accent label, e.g. a hackathon placement. */
export function Badge({ children, icon: Icon }: { children: ReactNode; icon?: IconType }) {
  return (
    <span className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent-fg">
      {Icon && <Icon className="size-4" aria-hidden />}
      {children}
    </span>
  );
}
