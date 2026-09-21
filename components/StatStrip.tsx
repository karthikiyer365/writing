export default function StatStrip({
  stats,
}: {
  stats: { value: string; label: string; accent?: boolean }[];
}) {
  return (
    <div
      style={{
        display: "flex",
        border: "1px solid var(--line-subtle)",
        borderRadius: 6,
        overflow: "hidden",
        margin: "0 0 34px",
        flexWrap: "wrap",
      }}
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          style={{
            flexGrow: 1,
            minWidth: 120,
            padding: "15px 18px",
            borderRight:
              i === stats.length - 1 ? "none" : "1px solid var(--line-subtle)",
          }}
        >
          <div
            className="mono"
            style={{
              fontSize: 21,
              fontWeight: 500,
              color: s.accent ? "var(--accent-pink)" : "var(--ink)",
            }}
          >
            {s.value}
          </div>
          <div style={{ fontSize: 11.5, color: "var(--ink-muted)", marginTop: 3 }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
