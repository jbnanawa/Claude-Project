/* Glow Within — Intentions (daily & monthly goals) */
const { Card, Button, Input, Textarea, Select, SegmentedTabs, EmptyState, Tag } = window.GlowWithinDesignSystem_5614ce;

function IntentionsScreen({ app }) {
  const { goals, addGoal } = app;
  const [tab, setTab] = React.useState("Daily intentions");
  const [goal, setGoal] = React.useState("");
  const [cat, setCat] = React.useState("");
  const [why, setWhy] = React.useState("");
  const submit = () => { if (goal.trim()) { addGoal({ goal: goal.trim(), cat: cat || "Wellness", why }); setGoal(""); setCat(""); setWhy(""); } };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 40, letterSpacing: "-0.5px", color: "var(--text-primary)", margin: 0 }}>Intentions</h1>
        <p style={{ fontSize: 16, lineHeight: 1.5, color: "var(--text-secondary)", margin: "10px 0 0", maxWidth: 620 }}>Tend your daily goals and this month's focus — big or small, they all count.</p>
      </div>

      <div style={{ maxWidth: 520 }}><SegmentedTabs value={tab} onChange={setTab} /></div>

      <Card padding={32}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 24, letterSpacing: "-0.5px", color: "var(--text-primary)", margin: 0 }}>What are we working toward?</h2>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: "6px 0 24px" }}>Pick a category and tell me what you're reaching for.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div><label style={lbl}>Goal</label><Input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g. Morning walks three times a week" /></div>
          <div><label style={lbl}>Category</label>
            <Select placeholder="Choose one" value={cat} onChange={(e) => setCat(e.target.value)}>
              <option>Wellness</option><option>Mindset</option><option>Creativity</option><option>Connection</option>
            </Select>
          </div>
          <div><label style={lbl}>Why this one? (optional)</label><Textarea value={why} onChange={(e) => setWhy(e.target.value)} rows={3} placeholder="A little note to remind you why this matters…" /></div>
          <Button variant="primary" size="lg" full onClick={submit}>Add it to the list</Button>
        </div>
      </Card>

      <div>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 30, letterSpacing: "-0.5px", color: "var(--text-primary)", margin: "0 0 16px" }}>Everything you're growing</h2>
        {goals.length ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {goals.map((g, i) => (
              <Card key={i} padding={20}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 500, color: "var(--text-primary)" }}>{g.goal}</div>
                    {g.why && <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{g.why}</div>}
                  </div>
                  <Tag>{g.cat}</Tag>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState title="No goals yet — and that's okay" description="Add your first one above and it'll show up right here." />
        )}
      </div>
    </div>
  );
}
const lbl = { display: "block", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 8 };
window.IntentionsScreen = IntentionsScreen;
