import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '../../lib/utils';

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers, or clipboard access blocked: fall back to a hidden textarea
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
    document.body.append(field);
    field.select();
    const ok = document.execCommand('copy');
    field.remove();
    return ok;
  }
}

/** Copies `value` and confirms with a check mark for two seconds. */
export function CopyButton({ value, label, className }: { value: string; label: string; className?: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<number>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function handleClick() {
    const ok = await copyText(value);
    setState(ok ? 'copied' : 'failed');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState('idle'), 2000);
  }

  const copied = state === 'copied';
  const text = copied ? 'Copied' : state === 'failed' ? 'Copy failed' : label;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'inline-flex h-9 items-center gap-2 rounded-full border border-line px-3.5 text-sm font-medium transition-[color,border-color,scale] duration-200 hover:border-line-strong active:scale-[0.97]',
        copied ? 'text-accent-fg' : 'text-fg-2 hover:text-fg',
        className,
      )}
    >
      <span className="grid size-4 place-items-center">
        <Copy
          aria-hidden
          className={cn(
            'col-start-1 row-start-1 size-4 transition-[scale,opacity] duration-300 ease-[var(--ease-soft)] motion-reduce:transition-none',
            copied ? 'scale-50 opacity-0' : 'scale-100 opacity-100',
          )}
        />
        <Check
          aria-hidden
          className={cn(
            'col-start-1 row-start-1 size-4 transition-[scale,opacity] duration-300 ease-[var(--ease-soft)] motion-reduce:transition-none',
            copied ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
          )}
        />
      </span>
      {/* Announced to screen readers when it changes */}
      <span aria-live="polite">{text}</span>
    </button>
  );
}
