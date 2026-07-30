/* Glow Within — Today dashboard screen */
const { Card, Button, Tag, Eyebrow, ProgressBar, DayTracker, Icon } = window.GlowWithinDesignSystem_5614ce;

function StatRow({ label, children }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{children}</div>;
}

function TodayScreen({ app }) {
  const { streak, waterToday, goals, visions, go } = app;
  const seedLeft = Math.max(0, 3 - streak);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      {/* Greeting */}
      <div>
        <Eyebrow>Good afternoon</Eyebrow>
        <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 48, letterSpacing: "-0.5px", color: "var(--text-primary)", margin: "6px 0 10px", lineHeight: 1.05 }}>Janelle</h1>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--text-secondary)", margin: 0 }}>Your little corner for goals, daily pep talks, and the dreams you're making real.</p>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 16 }}>
          <span style={{ fontSize: 14, color: "var(--text-muted)" }}>You're focusing on:</span>
          <Tag>Wellness</Tag><Tag>Mindset</Tag><Tag>Creativity</Tag>
        </div>
      </div>

      {/* Affirmation */}
      <Card padding={40}>
        <Eyebrow>A little reminder for you</Eyebrow>
        <div style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 4 }}>Thursday, July 23</div>
        <p style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 30, lineHeight: 1.3, letterSpacing: "-0.5px", color: "var(--text-primary)", margin: "18px 0 0" }}>“Abundance finds me when I stay open, grounded, and true.”</p>
      </Card>

      {/* Growth journey */}
      <Card padding={0} style={{ overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 40, padding: 32, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 380px", minWidth: 300 }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 24, letterSpacing: "-0.5px", color: "var(--text-primary)", margin: 0 }}>Your Growth Journey</h2>
            <p style={{ fontSize: 14, lineHeight: 1.625, color: "var(--text-secondary)", margin: "8px 0 20px" }}>Each check-in, reflection, and gratitude moment helps your garden grow. No pressure — just small moments of showing up for yourself.</p>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", display: "grid", placeItems: "center", background: "var(--gw-sage-tint-2)", border: "1px solid #fff", boxShadow: "inset 0 1px 0 0 rgba(255,255,255,.8)", fontSize: 42 }}>🌱</div>
              <div>
                <Eyebrow tone="green">Current season</Eyebrow>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, color: "var(--text-primary)", margin: "2px 0" }}>Ready to grow</div>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0 }}>Your first check-in grows the first seed of your future.</p>
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <Button variant="sage" onClick={waterToday} icon={<Icon name="droplet" size={16} color="#fff" />}>Water with gratitude</Button>
            </div>
          </div>
          <div style={{ flex: "0 1 320px", minWidth: 260 }}>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0 }}>You've shown up <span style={{ fontFamily: "var(--font-serif)", fontSize: 20 }}>{streak}</span> {streak === 1 ? "day" : "days"} for yourself.</p>
            <div style={{ margin: "14px 0" }}><ProgressBar value={Math.min(100, (streak / 3) * 100)} /></div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-secondary)", fontSize: 14 }}>
              <span>🌱</span> {seedLeft > 0 ? `Seed in ${seedLeft} more ${seedLeft === 1 ? "day" : "days"}` : "Seed season reached!"}
            </div>
            <div style={{ marginTop: 20 }}>
              <Eyebrow tone="green">This week</Eyebrow>
              <div style={{ marginTop: 12 }}>
                <DayTracker days={["S","M","T","W","T","F","S"].map((l, i) => ({ label: l, state: i < streak ? "watered" : i === 4 ? "today" : "empty" }))} />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Monthly preview */}
      <Card padding={32}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <div>
            <Eyebrow tone="green">July</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 24, letterSpacing: "-0.5px", color: "var(--text-primary)", margin: "2px 0 0" }}>This month at a glance</h2>
          </div>
          <Button variant="ghost" onClick={() => go("Intentions")} iconRight={<Icon name="arrow-up-right" size={16} />}>Set them</Button>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.625, color: "var(--text-secondary)", margin: "16px 0 0" }}>No intentions planted for July yet. Set a focus and a few priorities on Intentions — they'll bloom here as you mark progress.</p>
      </Card>

      {/* Two cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <Card padding={32}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 24, letterSpacing: "-0.5px", color: "var(--text-primary)", margin: 0 }}>Today's Goals</h3>
            <Button variant="ghost" onClick={() => go("Intentions")} iconRight={<Icon name="arrow-up-right" size={16} />}>Add goals</Button>
          </div>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: "16px 0 0" }}>{goals.length ? `${goals.length} goal${goals.length>1?"s":""} in motion — keep tending them.` : "Nothing here yet — add your first goal and let's get things moving."}</p>
        </Card>
        <Card padding={32}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 24, letterSpacing: "-0.5px", color: "var(--text-primary)", margin: 0 }}>Vision board</h3>
            <Button variant="ghost" onClick={() => go("Vision Board")} iconRight={<Icon name="arrow-up-right" size={16} />}>Add vision</Button>
          </div>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: "16px 0 18px" }}>{visions.length ? `${visions.length} pinned — future you is taking shape.` : "Nothing pinned yet. Add a photo, image link, or quote that feels like your future — one piece is enough to start."}</p>
          {!visions.length && <Button variant="sage" onClick={() => go("Vision Board")}>Set up my board</Button>}
        </Card>
      </div>
    </div>
  );
}
window.TodayScreen = TodayScreen;
