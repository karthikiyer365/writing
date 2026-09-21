const KINDS = {
  note: { color: "var(--accent-blue)", tint: "#f6f9fc", label: "Note" },
  warn: { color: "var(--accent-pink)", tint: "#fdf4f9", label: "Watch out" },
  good: { color: "var(--accent-green)", tint: "#f4faf5", label: "Worth doing" },
} as const;

export default function Callout({
  kind = "note",
  label,
  children,
}: {
  kind?: keyof typeof KINDS;
  label?: string;
  children: React.ReactNode;
}) {
  const { color, tint, label: fallback } = KINDS[kind];
  return (
    <aside
      style={{
        borderLeft: `3px solid ${color}`,
        background: tint,
        borderRadius: "0 5px 5px 0",
        padding: "14px 18px",
        margin: "4px 0 26px",
      }}
    >
      <div
        className="mono"
        style={{
          fontSize: 10.5,
          letterSpacing: "0.09em",
          textTransform: "uppercase",
          color,
          marginBottom: 6,
        }}
      >
        {label ?? fallback}
      </div>
      <div style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-body)" }}>
        {children}
      </div>
    </aside>
  );
}
