import type { ReactNode } from 'react';
import type { IconType } from '../../types';
import { cn } from '../../lib/utils';

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-line bg-white/[0.03] px-2 py-1 font-mono text-xs text-fg-2',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TagList({ items, label, className }: { items: string[]; label?: string; className?: string }) {
  return (
    <ul aria-label={label} className={cn('flex flex-wrap gap-2', className)}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}

export function Badge({
  children,
  icon: Icon,
  tone = 'accent',
}: {
  children: ReactNode;
  icon?: IconType;
  tone?: 'accent' | 'gold';
}) {
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        tone === 'gold' ? 'border-gold/25 bg-gold/10 text-gold' : 'border-accent/25 bg-accent/10 text-[#b7c4ff]',
      )}
    >
      {Icon && <Icon className="size-3.5" aria-hidden />}
      {children}
    </span>
  );
}
