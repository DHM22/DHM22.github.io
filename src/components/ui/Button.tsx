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
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,border-color,color,scale,filter] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-on-accent hover:brightness-110',
  secondary: 'border border-line-strong text-fg hover:border-fg-3 hover:bg-fg/[0.04]',
  ghost: 'text-fg-2 hover:bg-fg/[0.06] hover:text-fg',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  compact: 'h-11 px-4 text-sm sm:h-9',
  md: 'h-12 px-6 text-[15px]',
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
