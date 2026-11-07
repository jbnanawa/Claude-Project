# AI Product Design Team

Six specialized AI agents, one lead: **you**. The agents do the legwork, and you make every product decision.

```
                 AI Product Design Lead (Janelle)
                 You make the final product decisions
                               │
   ┌──────────────┬────────────┼────────────┬──────────────┬──────────────┐
Research       Strategy        UX        Prototype      Testing      Case Study
finds patterns frames problems explores   builds working prepares tests documents
in evidence    & metrics       flows      concepts       & analyzes    decisions
```

## How a project flows

| Stage | Agent | Produces | Your checkpoint |
|---|---|---|---|
| 0 | (you) | `00-brief.md` | What are we solving? |
| 1 | Research | `01-research.md` | Which patterns matter? |
| 2 | Strategy | `02-strategy.md` | Is this the right problem and metric? |
| 3 | UX | `03-ux.md` | Which flow direction? |
| 4 | Prototype | `prototype/index.html` + `04-prototype.md` | Ready to test? |
| 5 | Testing | `05-test-plan.md`, then `06-test-results.md` | Ship, iterate, or rethink? |
| 6 | Case Study | `decision-log.md` (ongoing) + `07-case-study.md` | Portfolio-ready? |

Every project gets its own folder in `design-team/projects/`.

## How to use it (in Claude Code)

**Run the whole team, one stage at a time:**
```
/design-team journal-prompts Help users who skip journaling because they don't know what to write
```
The coordinator creates the brief, runs one agent, summarizes, and **stops for your decision** before the next stage.

**Call one agent directly:**
```
Use the research-agent to synthesize the notes in user-testing/ for project onboarding-dropoff
Use the ux-agent to explore flows for the goals screen
Use the case-study-agent to log my decision: we're going with the weekly check-in flow
```

**Skip stages when they're not needed.** A copy tweak doesn't need six agents. Overusing the pipeline is the most likely way this system wastes your time.

## Ground rules baked into every agent
- **No fake evidence.** Research and Testing only report what real data shows. The Testing Agent will not simulate users.
- **You decide.** Agents bring options with a recommendation; they don't pick for you.
- **Nothing ships without your yes.** No sending, publishing, deploying, or deleting.
- **Honest pushback.** The Strategy Agent will tell you when an idea doesn't need AI or isn't worth building.
- **You grow with each project.** Every output ends with a one-line "Skill note", and the Case Study Agent updates `skills-tracker.md`.

## Editing the team
Each agent is a plain text file in `.claude/agents/`. Open one, change the instructions in normal English, save. That's it. The coordinator lives in `.claude/commands/design-team.md`.
