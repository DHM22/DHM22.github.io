import type { Project } from '../types';

type Variant = NonNullable<Project['artwork']>;

// The drawing area of each artwork; 'fund' is framed tighter because its drawing is smaller
const VIEW_BOX: Record<Variant, string> = {
  dashboard: '0 0 800 500',
  fund: '110 80 640 400',
};

const LINE = 'rgba(255,255,255,0.08)';
const ACCENT = '#6e8bff';
const VIOLET = '#a18bff';

/**
 * Generated thumbnails for projects that don't have a screenshot yet.
 * The background is CSS and the drawing always fits whole, so it works in any card shape.
 */
export function ProjectArtwork({ variant }: { variant: Variant }) {
  return (
    <div className="relative size-full bg-[#0c0e13]">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(85%_70%_at_75%_0%,rgb(110_139_255_/_0.18),transparent_70%)]"
      />
      <svg
        viewBox={VIEW_BOX[variant]}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 size-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`fade-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={ACCENT} stopOpacity="0.35" />
            <stop offset="1" stopColor={ACCENT} stopOpacity="0" />
          </linearGradient>
        </defs>
        {variant === 'dashboard' && <Dashboard />}
        {variant === 'fund' && <Fund />}
      </svg>
    </div>
  );
}

const MONO = "'Geist Mono Variable', ui-monospace, monospace";

function House({ x, y, size, lit }: { x: number; y: number; size: number; lit?: boolean }) {
  const s = size;
  return (
    <g>
      <path
        d={`M${x - s} ${y + s * 0.9} V${y - s * 0.1} L${x} ${y - s} L${x + s} ${y - s * 0.1} V${y + s * 0.9} Z`}
        fill={lit ? 'rgba(110,139,255,0.22)' : '#141925'}
        stroke={lit ? ACCENT : 'rgba(150,170,255,0.45)'}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect x={x - s * 0.28} y={y + s * 0.25} width={s * 0.56} height={s * 0.65} rx="2" fill={lit ? ACCENT : 'rgba(255,255,255,0.15)'} />
    </g>
  );
}

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
        <linearGradient id="bar-fund" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={ACCENT} stopOpacity="0.55" />
          <stop offset="1" stopColor={ACCENT} />
        </linearGradient>
        <marker id="arrow-fund" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 1 L9 5 L0 9 Z" fill={VIOLET} />
        </marker>
      </defs>

      {/* Campaign progress: 84% funded, the bridge covers the rest */}
      <rect x={bar.x} y={bar.y} width={bar.w} height={bar.h} rx="12" fill="rgba(255,255,255,0.05)" stroke={LINE} />
      <rect
        x={bar.x + funded - 8}
        y={bar.y}
        width={bar.w - funded + 8}
        height={bar.h}
        rx="12"
        fill={VIOLET}
        fillOpacity="0.25"
        stroke={VIOLET}
        strokeDasharray="5 4"
      />
      <rect x={bar.x} y={bar.y} width={funded} height={bar.h} rx="12" fill="url(#bar-fund)" />
      <line x1={threshold} y1={bar.y - 12} x2={threshold} y2={bar.y + bar.h + 12} stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <text x={threshold} y={bar.y - 20} fill="#767d8a" fontSize="12" fontFamily={MONO} textAnchor="middle">
        threshold
      </text>
      <text x={bar.x} y={bar.y + bar.h + 34} fill="#a3a9b6" fontSize="14" fontFamily={MONO}>
        84% funded
      </text>
      <text x={bar.x + funded + (bar.w - funded) / 2} y={bar.y + bar.h + 34} fill={VIOLET} fontSize="14" fontFamily={MONO} textAnchor="middle">
        bridge
      </text>
      <House x={712} y={bar.y + bar.h / 2} size={18} lit />

      {/* The fund is repaid and moves on to the next family */}
      {arcs.map((d) => (
        <path key={d} d={d} fill="none" stroke={VIOLET} strokeOpacity="0.8" strokeWidth="2.5" markerEnd="url(#arrow-fund)" />
      ))}
      {homes.map((home, i) => (
        <House key={i} x={home.x} y={home.y} size={15} lit={i === 0} />
      ))}
      <circle cx={center.x} cy={center.y} r="30" fill="rgba(110,139,255,0.12)" stroke={ACCENT} strokeOpacity="0.7" />
      <text x={center.x} y={center.y + 5} fill="#c9d1ff" fontSize="14" fontFamily={MONO} textAnchor="middle" letterSpacing="1">
        SAR
      </text>
    </g>
  );
}

function Dashboard() {
  const chart: [number, number][] = [
    [232, 386],
    [270, 362],
    [308, 374],
    [346, 334],
    [384, 344],
    [422, 300],
    [460, 312],
    [500, 268],
  ];
  const linePath = chart.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');
  const statusColor = (i: number) => (i === 6 ? '#fbbf24' : i === 11 ? 'rgba(255,255,255,0.25)' : '#4ade80');

  return (
    <g>
      <rect x="60" y="48" width="680" height="404" rx="16" fill="#11141b" stroke={LINE} />
      {[86, 104, 122].map((cx) => (
        <circle key={cx} cx={cx} cy="72" r="5" fill="rgba(255,255,255,0.14)" />
      ))}
      <rect x="150" y="67" width="110" height="10" rx="5" fill="rgba(255,255,255,0.08)" />
      <line x1="60" y1="96" x2="740" y2="96" stroke={LINE} />
      <line x1="196" y1="96" x2="196" y2="452" stroke={LINE} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x="80"
          y={122 + i * 34}
          width={i === 0 ? 96 : 66 + (i % 3) * 12}
          height="10"
          rx="5"
          fill={i === 0 ? ACCENT : 'rgba(255,255,255,0.08)'}
          opacity={i === 0 ? 0.85 : 1}
        />
      ))}

      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${216 + i * 176} 116)`}>
          <rect width="160" height="72" rx="10" fill="#151923" stroke={LINE} />
          <rect x="16" y="18" width="56" height="7" rx="3.5" fill="rgba(255,255,255,0.12)" />
          <rect x="16" y="38" width={i === 0 ? 84 : 64} height="16" rx="5" fill={i === 0 ? ACCENT : 'rgba(255,255,255,0.18)'} />
        </g>
      ))}

      <rect x="216" y="204" width="300" height="232" rx="10" fill="#151923" stroke={LINE} />
      <rect x="232" y="222" width="90" height="8" rx="4" fill="rgba(255,255,255,0.12)" />
      {[270, 320, 370].map((y) => (
        <line key={y} x1="232" y1={y} x2="500" y2={y} stroke="rgba(255,255,255,0.05)" />
      ))}
      <path d={`${linePath} L500 416 L232 416 Z`} fill="url(#fade-dashboard)" />
      <path d={linePath} fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinejoin="round" />

      <rect x="532" y="204" width="196" height="232" rx="10" fill="#151923" stroke={LINE} />
      <rect x="548" y="222" width="70" height="8" rx="4" fill="rgba(255,255,255,0.12)" />
      {Array.from({ length: 16 }, (_, i) => {
        const x = 548 + (i % 4) * 44;
        const y = 244 + Math.floor(i / 4) * 44;
        return (
          <g key={i}>
            <rect x={x} y={y} width="32" height="32" rx="7" fill="#1a1f2b" stroke={LINE} />
            <circle cx={x + 24} cy={y + 8} r="3.5" fill={statusColor(i)} opacity="0.85" />
            <rect x={x + 7} y={y + 20} width="18" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
          </g>
        );
      })}
    </g>
  );
}
