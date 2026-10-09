import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
/** compact: touch-sized on phones, small from the sm breakpoint up */
type Size = 'sm' | 'compact' | 'md';

interface StyleProps {
  variant?: Variant;
  size?: Size;
}

const base =
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-[background-color,border-color,color,translate] duration-200 disabled:pointer-events-none disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-linear-to-b from-[#7f98ff] to-accent text-white shadow-[0_10px_30px_-12px_rgb(110_139_255_/_0.7),inset_0_1px_0_rgb(255_255_255_/_0.22)] hover:from-[#90a6ff] hover:to-[#7b95ff] active:translate-y-px',
  secondary:
    'border border-line-strong bg-white/[0.03] text-fg hover:border-white/25 hover:bg-white/[0.07] active:translate-y-px',
  ghost: 'text-fg-2 hover:bg-white/[0.06] hover:text-fg',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  compact: 'h-11 px-4 text-sm sm:h-9 sm:px-3.5',
  md: 'h-12 px-5 text-[15px]',
};

function buttonClass({ variant = 'primary', size = 'md' }: StyleProps, className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function ButtonLink({ variant, size, className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & StyleProps) {
  return <a className={buttonClass({ variant, size }, className)} {...props} />;
}

export function Button({
  variant,
  size,
  className,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & StyleProps) {
  return <button type={type} className={buttonClass({ variant, size }, className)} {...props} />;
}
