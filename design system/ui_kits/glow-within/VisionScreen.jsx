/* Glow Within — Vision Board */
const { Card, Button, Textarea, EmptyState, Icon } = window.GlowWithinDesignSystem_5614ce;

function VisionScreen({ app }) {
  const { visions, addVision } = app;
  const [mode, setMode] = React.useState("upload"); // upload | link | quote
  const [value, setValue] = React.useState("");
  const [meaning, setMeaning] = React.useState("");
  const submit = () => {
    addVision({ mode, value: value.trim() || (mode === "quote" ? "A calm, spacious morning" : "Sunlit studio"), meaning: meaning.trim() });
    setValue(""); setMeaning("");
  };

  const modeBtn = (m, label) => (
    <Button variant={mode === m ? "primary" : "secondary"} full onClick={() => setMode(m)}>{label}</Button>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 40, letterSpacing: "-0.5px", color: "var(--text-primary)", margin: 0 }}>Vision Board</h1>
        <p style={{ fontSize: 16, lineHeight: 1.5, color: "var(--text-secondary)", margin: "10px 0 0", maxWidth: 640 }}>Collect images and words that feel like the life you're growing into. Start with one piece — upload a photo, paste an image link, or make a quote card.</p>
      </div>

      <div style={{ border: "1px dashed var(--border-dashed)", borderRadius: 24, padding: 28 }}>
        <div className="gw-eyebrow" style={{ marginBottom: 14 }}>Getting started</div>
        <ol style={{ margin: 0, paddingLeft: 20, color: "var(--text-secondary)", fontSize: 15, lineHeight: 2 }}>
          <li>Choose upload, paste a direct image link, or create a quote card.</li>
          <li>Tell me what it represents for you.</li>
          <li>Pin it — your board grows from here.</li>
        </ol>
      </div>

      <Card padding={32}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 24, letterSpacing: "-0.5px", color: "var(--text-primary)", margin: 0 }}>Pin your first vision</h2>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: "6px 0 22px" }}>One image or quote is enough to begin. You can always add more later.</p>
        <label style={lbl2}>How do you want to add it?</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {modeBtn("upload", "Upload image")}
          {modeBtn("link", "Paste image link")}
          {modeBtn("quote", "Create quote card")}
        </div>
        {mode !== "upload" && (
          <div style={{ marginBottom: 20 }}>
            <label style={lbl2}>{mode === "link" ? "Image URL" : "Your quote"}</label>
            <input value={value} onChange={(e) => setValue(e.target.value)} placeholder={mode === "link" ? "https://…" : "A line that feels like your future…"}
              style={{ width: "100%", boxSizing: "border-box", fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--text-primary)", background: "var(--surface-input)", border: "1px solid var(--border-input)", borderRadius: 16, padding: "14px 16px", outline: "none" }} />
          </div>
        )}
        <label style={lbl2}>What does this represent?</label>
        <div style={{ marginBottom: 20 }}><Textarea value={meaning} onChange={(e) => setMeaning(e.target.value)} rows={3} placeholder="The feeling, the life, the moment you're picturing…" /></div>
        <Button variant="sage" size="lg" full onClick={submit}>Pin it to the board</Button>
      </Card>

      {visions.length ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
          {visions.map((v, i) => (
            <Card key={i} padding={0} style={{ overflow: "hidden" }}>
              {v.mode === "quote" ? (
                <div style={{ padding: 24, minHeight: 140, display: "grid", placeItems: "center", background: "var(--gw-sage-tint-2)" }}>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: 20, textAlign: "center", color: "var(--text-primary)", margin: 0 }}>“{v.value}”</p>
                </div>
              ) : (
                <div style={{ height: 150, background: "linear-gradient(135deg,var(--gw-blush),var(--gw-sage-tint))", display: "grid", placeItems: "center", color: "var(--text-muted)" }}>
                  <Icon name="image" size={28} color="var(--text-muted)" />
                </div>
              )}
              {v.meaning && <div style={{ padding: 16, fontSize: 13, color: "var(--text-secondary)" }}>{v.meaning}</div>}
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState title="Your board is waiting for its first pin" description="Use the form above — future you will love looking back at these." />
      )}
    </div>
  );
}
const lbl2 = { display: "block", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 10 };
window.VisionScreen = VisionScreen;
