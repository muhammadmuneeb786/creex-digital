import { Icon } from "./Icon";

/** Hero orbit graphic: gradient planet, spinning rings, asteroids and platform "satellites". */
export function OrbitGraphic() {
  const sat = (x: number, y: number, icon: "ig" | "fb" | "tt" | "li" | "yt") => (
    <g transform={`translate(${x} ${y})`}>
      <circle r={22} fill="#15151c" stroke="url(#og)" strokeWidth={2} />
      <g transform="translate(-11 -11) scale(.92)">
        <Icon name={icon} width={24} height={24} style={{ color: "#fff" }} />
      </g>
    </g>
  );
  return (
    <svg className="orbit" viewBox="0 0 520 520" role="img" aria-label="Orbit illustration: a gradient planet surrounded by social platforms">
      <defs>
        <linearGradient id="og" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#FF0B6B" /><stop offset="1" stopColor="#3E1ADB" /></linearGradient>
        <radialGradient id="planet" cx="35%" cy="30%" r="80%"><stop offset="0" stopColor="#ff5c9a" /><stop offset=".45" stopColor="#d21a9a" /><stop offset="1" stopColor="#2a0f9e" /></radialGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#7a3cff" stopOpacity=".55" /><stop offset="1" stopColor="#7a3cff" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="260" cy="260" r="200" fill="url(#glow)" />
      <g className="orbit__ring--spin"><circle cx="260" cy="260" r="244" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth={1.5} strokeDasharray="6 10" /></g>
      <g className="orbit__ring--spin-rev"><circle cx="260" cy="260" r="188" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth={1.5} strokeDasharray="2 12" /></g>
      <circle cx="260" cy="260" r="132" fill="none" stroke="rgba(164,124,255,.28)" strokeWidth={1} />
      <g stroke="rgba(255,255,255,.55)" strokeWidth={2} strokeLinecap="round"><path d="M260 6v22M260 492v22M6 260h22M492 260h22" /></g>
      <circle cx="260" cy="260" r="88" fill="url(#planet)" />
      <ellipse cx="260" cy="262" rx="150" ry="34" fill="none" stroke="url(#og)" strokeWidth={3} transform="rotate(-18 260 262)" opacity=".9" />
      <circle cx="260" cy="260" r="88" fill="none" stroke="rgba(255,255,255,.18)" />
      <g className="orbit__float" fill="#6d6a7c">
        <path d="M78 122l18-10 16 8 4 16-14 12-20-2-8-14z" />
        <path d="M40 150l30-12" stroke="rgba(255,255,255,.25)" strokeWidth={2} fill="none" strokeLinecap="round" />
      </g>
      <g className="orbit__float orbit__float--2" fill="#8b889b"><path d="M428 392l12-8 12 4 4 12-8 10-14 0-6-10z" /></g>
      <g className="orbit__float orbit__float--3" fill="#55526a"><path d="M120 420l10-6 10 3 2 10-7 7-11-1-4-8z" /></g>
      {sat(260, 16, "ig")}
      {sat(455, 130, "fb")}
      {sat(470, 370, "tt")}
      {sat(90, 400, "li")}
      {sat(40, 190, "yt")}
    </svg>
  );
}

export type ArtVariant = "posts" | "reels" | "ads" | "planner" | "design" | "report";

/** Abstract placeholder art used on service rows and portfolio tiles. */
export function Art({ variant, id }: { variant: ArtVariant; id: string }) {
  const g = `url(#ag-${id})`;
  const dim = "rgba(255,255,255,.08)";
  const line = "rgba(255,255,255,.18)";
  const shapes: Record<ArtVariant, React.ReactNode> = {
    posts: (
      <>
        <rect x="20" y="30" width="70" height="70" rx="12" fill={g} /><rect x="100" y="30" width="70" height="70" rx="12" fill={dim} /><rect x="180" y="30" width="70" height="70" rx="12" fill={dim} />
        <rect x="20" y="110" width="70" height="70" rx="12" fill={dim} /><rect x="100" y="110" width="70" height="70" rx="12" fill={g} opacity=".7" /><rect x="180" y="110" width="70" height="70" rx="12" fill={dim} />
      </>
    ),
    reels: (
      <>
        <rect x="60" y="10" width="150" height="190" rx="22" fill="rgba(255,255,255,.06)" stroke={line} /><path d="M118 80l44 25-44 25z" fill={g} />
        <rect x="80" y="160" width="110" height="8" rx="4" fill="rgba(255,255,255,.2)" /><rect x="80" y="160" width="60" height="8" rx="4" fill={g} />
      </>
    ),
    ads: (
      <>
        <rect x="30" y="40" width="210" height="130" rx="18" fill="rgba(255,255,255,.06)" stroke={line} /><path d="M50 150l45-50 35 30 40-55 40 75z" fill={g} opacity=".9" /><circle cx="210" cy="70" r="14" fill="#fff" opacity=".9" />
      </>
    ),
    planner: (
      <>
        <rect x="25" y="25" width="220" height="160" rx="16" fill="rgba(255,255,255,.05)" stroke={line} />
        {Array.from({ length: 21 }, (_, i) => (
          <rect key={i} x={40 + (i % 7) * 28} y={60 + Math.floor(i / 7) * 36} width="22" height="22" rx="6" fill={[2, 5, 9, 12, 16, 19].includes(i) ? g : "rgba(255,255,255,.12)"} />
        ))}
      </>
    ),
    design: (
      <>
        <circle cx="100" cy="105" r="60" fill={g} /><rect x="130" y="60" width="110" height="110" rx="20" fill={dim} stroke="rgba(255,255,255,.2)" /><path d="M150 150l30-45 25 30 20-25 15 40z" fill={g} opacity=".8" />
      </>
    ),
    report: (
      <>
        <rect x="30" y="30" width="210" height="150" rx="16" fill="rgba(255,255,255,.05)" stroke={line} />
        <g fill={g}><rect x="60" y="120" width="24" height="40" rx="5" /><rect x="100" y="95" width="24" height="65" rx="5" /><rect x="140" y="110" width="24" height="50" rx="5" /><rect x="180" y="70" width="24" height="90" rx="5" /></g>
        <path d="M60 100l40-25 40 15 40-40" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" opacity=".7" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 270 210" aria-hidden="true">
      <defs><linearGradient id={`ag-${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FF0B6B" /><stop offset="1" stopColor="#3E1ADB" /></linearGradient></defs>
      {shapes[variant]}
    </svg>
  );
}
