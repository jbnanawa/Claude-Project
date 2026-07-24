/* Glow Within — app shell: top nav + screen router + shared state */
const { TopNav } = window.GlowWithinDesignSystem_5614ce;

function App() {
  const [tab, setTab] = React.useState("Today");
  const [streak, setStreak] = React.useState(0);
  const [gratitudes, setGratitudes] = React.useState([]);
  const [goals, setGoals] = React.useState([]);
  const [visions, setVisions] = React.useState([]);

  const app = {
    streak, gratitudes, goals, visions,
    go: setTab,
    waterToday: () => setStreak((s) => Math.min(7, s + 1)),
    addGratitude: (t) => { setGratitudes((g) => [t, ...g]); setStreak((s) => Math.min(7, s + 1)); },
    addGoal: (g) => setGoals((prev) => [g, ...prev]),
    addVision: (v) => setVisions((prev) => [v, ...prev]),
  };

  const items = ["Today", "Garden", "Intentions", "Vision Board"].map((label) => ({ label, active: label === tab }));

  const Screen = {
    "Today": window.TodayScreen,
    "Garden": window.GardenScreen,
    "Intentions": window.IntentionsScreen,
    "Vision Board": window.VisionScreen,
  }[tab];

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-page)", backgroundAttachment: "fixed" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 10 }}>
        <TopNav items={items.map((it) => ({ ...it, href: "#", onClick: undefined }))} onClickCapture={(e) => {
          const a = e.target.closest("a"); if (a) { e.preventDefault(); setTab(a.textContent); }
        }} />
      </div>
      <main style={{ maxWidth: 1024, margin: "0 auto", padding: "48px 24px 96px", boxSizing: "border-box" }}>
        {Screen ? <Screen app={app} /> : null}
      </main>
      <footer style={{ textAlign: "center", padding: "0 0 40px", fontSize: 13, color: "var(--text-muted)" }}>Glow Within · made with love, just for you</footer>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
