/* Glow Within — Garden (gratitude + growth calendar) */
const { Card, Button, EmptyState, Icon } = window.GlowWithinDesignSystem_5614ce;

function GardenScreen({ app }) {
  const { gratitudes, addGratitude, streak } = app;
  const [text, setText] = React.useState("");
  const submit = () => { if (text.trim()) { addGratitude(text.trim()); setText(""); } };

  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const labels = ["W","T","F","S","S","M","T"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 40, letterSpacing: "-0.5px", color: "var(--text-primary)", margin: 0 }}>Garden</h1>
        <p style={{ fontSize: 16, lineHeight: 1.5, color: "var(--text-secondary)", margin: "10px 0 0", maxWidth: 620 }}>Add a gratitude moment to water your plant. Every day you show up becomes one drop of care, helping your season slowly grow.</p>
      </div>

      <Card padding={32}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 24, letterSpacing: "-0.5px", color: "var(--text-primary)", margin: "0 0 16px" }}>Today I'm grateful for…</h2>
        <input
          value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="e.g. Morning light through the window"
          style={{ width: "100%", boxSizing: "border-box", fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--text-primary)", background: "var(--surface-input)", border: "1px solid var(--border-input)", borderRadius: 16, padding: "16px 18px", outline: "none" }}
          onFocus={(e) => { e.target.style.borderColor = "var(--border-focus)"; e.target.style.boxShadow = "0 0 0 3px rgba(143,166,142,0.18)"; }}
          onBlur={(e) => { e.target.style.borderColor = "var(--border-input)"; e.target.style.boxShadow = "none"; }}
        />
        <div style={{ marginTop: 16 }}>
          <Button variant="sage" size="lg" full onClick={submit} icon={<Icon name="droplet" size={18} color="#fff" />}>Water with gratitude</Button>
        </div>
      </Card>

      <Card padding={32}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 24, letterSpacing: "-0.5px", color: "var(--text-primary)", margin: 0 }}>Your growth calendar</h2>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: "6px 0 20px" }}>Every day you water gets a plant from your current season.</p>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <button style={ghostIcon}><Icon name="chevron-left" size={18} color="var(--text-muted)" /></button>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 500, color: "var(--text-primary)" }}>July 2026</span>
          <button style={ghostIcon}><Icon name="chevron-right" size={18} color="var(--text-muted)" /></button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8 }}>
          {days.slice(0, 21).map((d) => {
            const watered = d <= gratitudes.length;
            return (
              <div key={d} style={{ aspectRatio: "1", borderRadius: 12, display: "grid", placeItems: "center", background: watered ? "var(--gw-sage-tint-2)" : "transparent", border: watered ? "1px solid var(--gw-sage)" : "1px dashed var(--border-input)", position: "relative" }}>
                {watered ? <span style={{ fontSize: 18 }}>🌱</span> : <>
                  <span style={{ position: "absolute", top: 6, left: 8, fontSize: 10, color: "var(--text-muted)" }}>{labels[(d-1)%7]}</span>
                  <span style={{ fontSize: 16, color: "var(--text-muted)" }}>{d}</span>
                </>}
              </div>
            );
          })}
        </div>
      </Card>

      <div>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 30, letterSpacing: "-0.5px", color: "var(--text-primary)", margin: "0 0 16px" }}>Past waters</h2>
        {gratitudes.length ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {gratitudes.map((g, i) => (
              <Card key={i} padding={20}>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <span style={{ fontSize: 24 }}>🌱</span>
                  <div>
                    <div style={{ fontSize: 15, color: "var(--text-primary)" }}>{g}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Watered today</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState title="Nothing planted yet" description="Once you water a day, your moments will grow here." />
        )}
      </div>
    </div>
  );
}
const ghostIcon = { width: 32, height: 32, borderRadius: 10, border: "1px solid var(--border-soft)", background: "rgba(255,255,255,0.5)", display: "grid", placeItems: "center", cursor: "pointer" };
window.GardenScreen = GardenScreen;
