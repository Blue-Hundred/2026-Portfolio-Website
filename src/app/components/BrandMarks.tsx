import type { CSSProperties } from "react";

/**
 * Bauhaus-inspired geometric brand marks.
 * Recreated as crisp inline SVGs in the portfolio's accent palette so they
 * scale cleanly and can be reused anywhere as branding.
 */

const PALETTE = {
  orange: "#E9521E",
  gold: "#F4A93A",
  blue: "#5A86C4",
  green: "#4C8B3C",
  pink: "#EC8DA6",
  cream: "#F5EEDD",
} as const;

type MarkProps = {
  className?: string;
  style?: CSSProperties;
};

function Svg({ className, style, children }: MarkProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function MarkSunburst(props: MarkProps) {
  return (
    <Svg {...props}>
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="20"
          rx="8"
          ry="15"
          fill={PALETTE.gold}
          transform={`rotate(${i * 45} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="14" fill={PALETTE.cream} />
      <circle cx="50" cy="50" r="9" fill="none" stroke={PALETTE.orange} strokeWidth="5" />
    </Svg>
  );
}

export function MarkPinwheel(props: MarkProps) {
  const colors = [PALETTE.orange, PALETTE.gold, PALETTE.pink, PALETTE.cream];
  return (
    <Svg {...props}>
      {colors.map((color, i) => (
        <path
          key={i}
          d="M50,50 L50,14 A36,36 0 0 1 78,28 Z"
          fill={color}
          transform={`rotate(${i * 90} 50 50)`}
        />
      ))}
    </Svg>
  );
}

export function MarkDotGrid(props: MarkProps) {
  const grid = [
    [PALETTE.orange, PALETTE.green, PALETTE.cream],
    [PALETTE.pink, PALETTE.blue, PALETTE.orange],
    [PALETTE.green, PALETTE.cream, PALETTE.pink],
  ];
  const coords = [22, 50, 78];
  return (
    <Svg {...props}>
      {grid.map((row, r) =>
        row.map((color, c) => (
          <circle key={`${r}-${c}`} cx={coords[c]} cy={coords[r]} r="13" fill={color} />
        ))
      )}
    </Svg>
  );
}

export function MarkArches(props: MarkProps) {
  const base = 68;
  return (
    <Svg {...props}>
      <path d={`M${50 - 38},${base} A38,38 0 0 1 ${50 + 38},${base} Z`} fill={PALETTE.orange} />
      <path d={`M${50 - 27},${base} A27,27 0 0 1 ${50 + 27},${base} Z`} fill={PALETTE.gold} />
      <path d={`M${50 - 16},${base} A16,16 0 0 1 ${50 + 16},${base} Z`} fill={PALETTE.cream} />
    </Svg>
  );
}

export function MarkHourglass(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M22,20 L78,20 L50,50 Z" fill={PALETTE.orange} />
      <path d="M22,80 L78,80 L50,50 Z" fill={PALETTE.blue} />
      <circle cx="50" cy="50" r="15" fill={PALETTE.green} />
    </Svg>
  );
}

export function MarkLeaves(props: MarkProps) {
  const leaf = (cx: number) =>
    `M${cx},18 C${cx + 16},40 ${cx + 16},60 ${cx},82 C${cx - 16},60 ${cx - 16},40 ${cx},18 Z`;
  return (
    <Svg {...props}>
      <path d={leaf(38)} fill={PALETTE.gold} />
      <path d={leaf(62)} fill={PALETTE.orange} />
      <path d={leaf(50)} fill={PALETTE.blue} />
      <ellipse cx="50" cy="50" rx="8" ry="22" fill={PALETTE.green} />
    </Svg>
  );
}

export function MarkFourPetal(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="50" cy="26" r="19" fill={PALETTE.cream} />
      <circle cx="74" cy="50" r="19" fill={PALETTE.gold} />
      <circle cx="50" cy="74" r="19" fill={PALETTE.blue} />
      <circle cx="26" cy="50" r="19" fill={PALETTE.gold} />
      <circle cx="50" cy="50" r="13" fill={PALETTE.orange} />
      <circle cx="50" cy="50" r="5.5" fill={PALETTE.cream} />
    </Svg>
  );
}

export function MarkMagnet(props: MarkProps) {
  return (
    <Svg {...props}>
      <path
        d="M28,26 L28,54 A22,22 0 0 0 72,54 L72,26"
        fill="none"
        stroke={PALETTE.orange}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <circle cx="28" cy="27" r="6.5" fill={PALETTE.green} />
      <circle cx="72" cy="27" r="6.5" fill={PALETTE.green} />
    </Svg>
  );
}

export function MarkDiamonds(props: MarkProps) {
  const grid = [
    [PALETTE.green, PALETTE.cream, PALETTE.orange],
    [PALETTE.orange, PALETTE.blue, PALETTE.green],
    [PALETTE.pink, PALETTE.gold, PALETTE.blue],
  ];
  const coords = [30, 50, 70];
  return (
    <Svg {...props}>
      <g transform="rotate(45 50 50)">
        {grid.map((row, r) =>
          row.map((color, c) => (
            <rect
              key={`${r}-${c}`}
              x={coords[c] - 8}
              y={coords[r] - 8}
              width="16"
              height="16"
              rx="2"
              fill={color}
            />
          ))
        )}
      </g>
    </Svg>
  );
}

export function MarkTriangle(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M24,22 L76,22 L50,49 Z" fill={PALETTE.blue} />
      <path d="M24,22 L50,49 L24,76 Z" fill={PALETTE.gold} />
      <path d="M76,22 L50,49 L24,76 Z" fill={PALETTE.green} />
    </Svg>
  );
}

export function MarkStack(props: MarkProps) {
  return (
    <Svg {...props}>
      <rect x="20" y="28" width="60" height="13" rx="6.5" fill={PALETTE.blue} />
      <rect x="20" y="46" width="60" height="13" rx="6.5" fill={PALETTE.gold} />
      <rect x="20" y="64" width="60" height="13" rx="6.5" fill={PALETTE.orange} />
    </Svg>
  );
}

export function MarkQuarterPie(props: MarkProps) {
  return (
    <Svg {...props}>
      <rect x="20" y="20" width="30" height="30" fill={PALETTE.orange} />
      <path d="M50,20 L80,20 A30,30 0 0 1 50,50 Z" fill={PALETTE.gold} />
      <rect x="20" y="50" width="30" height="30" fill={PALETTE.cream} />
      <circle cx="65" cy="65" r="10" fill={PALETTE.blue} />
    </Svg>
  );
}

export const brandMarks = [
  MarkQuarterPie,
  MarkSunburst,
  MarkPinwheel,
  MarkDotGrid,
  MarkArches,
  MarkHourglass,
  MarkLeaves,
  MarkFourPetal,
  MarkMagnet,
  MarkDiamonds,
  MarkTriangle,
  MarkStack,
];
