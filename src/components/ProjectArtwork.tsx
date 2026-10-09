import type { CSSProperties } from 'react';
import type { Project } from '../types';

type Variant = NonNullable<Project['artwork']>;

// The drawing area of each artwork
const VIEW_BOX: Record<Variant, string> = {
  fund: '110 80 640 400',
};

// Theme tokens, so the diagram follows light and dark mode
const ACCENT = 'var(--color-accent)';
const FG = 'var(--color-fg)';
const FG_2 = 'var(--color-fg-2)';
const FG_3 = 'var(--color-fg-3)';
const LINE = 'var(--color-line-strong)';
const SURFACE = 'var(--color-surface)';

const MONO = "'Geist Mono Variable', ui-monospace, monospace";

/**
 * Explanatory diagrams for projects that don't have a screenshot yet.
 * The drawing always fits whole, so it works in any card shape.
 */
export function ProjectArtwork({ variant }: { variant: Variant }) {
  return (
    <div className="relative size-full bg-surface-2">
      <svg
        viewBox={VIEW_BOX[variant]}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 size-full"
        aria-hidden="true"
      >
        {variant === 'fund' && <Fund />}
      </svg>
    </div>
  );
}

function House({ x, y, size, lit }: { x: number; y: number; size: number; lit?: boolean }) {
  const s = size;
  return (
    <g>
      <path
        d={`M${x - s} ${y + s * 0.9} V${y - s * 0.1} L${x} ${y - s} L${x + s} ${y - s * 0.1} V${y + s * 0.9} Z`}
        style={{ fill: lit ? ACCENT : SURFACE, stroke: lit ? ACCENT : FG_3, fillOpacity: lit ? 0.18 : 1 }}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect
        x={x - s * 0.28}
        y={y + s * 0.25}
        width={s * 0.56}
        height={s * 0.65}
        rx="2"
        style={{ fill: lit ? ACCENT : FG_3, fillOpacity: lit ? 1 : 0.5 }}
      />
    </g>
  );
}

const text = (fill: string, extra?: CSSProperties): CSSProperties => ({ fill, fontFamily: MONO, ...extra });

/** Sukna: a campaign stuck below 100%, the bridge closing the gap, and the fund revolving to the next family. */
function Fund() {
  const bar = { x: 140, y: 128, w: 520, h: 24 };
  const funded = bar.w * 0.84;
  const threshold = bar.x + bar.w * 0.8;

  const center = { x: 400, y: 345 };
  const radius = 88;
  const point = (deg: number) => ({
    x: center.x + radius * Math.cos((deg * Math.PI) / 180),
    y: center.y + radius * Math.sin((deg * Math.PI) / 180),
  });
  const arcs = [
    [-66, 6],
    [54, 126],
    [174, 246],
  ].map(([from, to]) => {
    const a = point(from);
    const b = point(to);
    return `M${a.x.toFixed(1)} ${a.y.toFixed(1)} A${radius} ${radius} 0 0 1 ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  });
  const homes = [-90, 30, 150].map(point);

  return (
    <g>
      <defs>
        <marker id="arrow-fund" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 1 L9 5 L0 9 Z" style={{ fill: FG_2 }} />
        </marker>
      </defs>

      {/* Campaign progress: 84% funded, the bridge covers the rest */}
      <rect x={bar.x} y={bar.y} width={bar.w} height={bar.h} rx="12" style={{ fill: SURFACE, stroke: LINE }} />
      <rect
        x={bar.x + funded - 8}
        y={bar.y}
        width={bar.w - funded + 8}
        height={bar.h}
        rx="12"
        style={{ fill: ACCENT, fillOpacity: 0.15, stroke: ACCENT }}
        strokeDasharray="5 4"
      />
      <rect x={bar.x} y={bar.y} width={funded} height={bar.h} rx="12" style={{ fill: FG }} />
      <line
        x1={threshold}
        y1={bar.y - 12}
        x2={threshold}
        y2={bar.y + bar.h + 12}
        style={{ stroke: ACCENT }}
        strokeWidth="2"
      />
      <text x={threshold} y={bar.y - 20} fontSize="12" textAnchor="middle" style={text(FG_3)}>
        threshold
      </text>
      <text x={bar.x} y={bar.y + bar.h + 34} fontSize="14" style={text(FG_2)}>
        84% funded
      </text>
      <text x={bar.x + funded + (bar.w - funded) / 2} y={bar.y + bar.h + 34} fontSize="14" textAnchor="middle" style={text(ACCENT)}>
        bridge
      </text>
      <House x={712} y={bar.y + bar.h / 2} size={18} lit />

      {/* The fund is repaid and moves on to the next family */}
      {arcs.map((d) => (
        <path key={d} d={d} fill="none" style={{ stroke: FG_2 }} strokeWidth="2" markerEnd="url(#arrow-fund)" />
      ))}
      {homes.map((home, i) => (
        <House key={i} x={home.x} y={home.y} size={15} lit={i === 0} />
      ))}
      <circle cx={center.x} cy={center.y} r="30" style={{ fill: SURFACE, stroke: LINE }} />
      <text x={center.x} y={center.y + 5} fontSize="14" textAnchor="middle" letterSpacing="1" style={text(FG)}>
        SAR
      </text>
    </g>
  );
}
