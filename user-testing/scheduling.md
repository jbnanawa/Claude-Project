# Glow Within user testing — scheduling & intake

Import this into Notion (Import → Markdown) or paste sections into a Google Form.

Replace the placeholders before sharing:
- `LIVE_APP_URL` — Vercel URL after deploy (say “retry deploy” once logged in)
- `FIGMA_PROTOTYPE_URL` — Desktop: https://www.figma.com/proto/JKBlhw72H9rIvkcKSiKR14?node-id=15-2&starting-point-node-id=15-2&scaling=scale-down-width · Mobile: https://www.figma.com/proto/JKBlhw72H9rIvkcKSiKR14?node-id=32-2&starting-point-node-id=32-2&scaling=scale-down-width
- `SIGNUP_URL` — open `user-testing/signup.html` (or `/user-testing-signup.html` on the deployed host)
- `CALENDAR_LINK` — Calendly / Google Appointment schedule (optional)
- `YOUR_EMAIL` — where confirmations go

### Notion

1. Create a new Notion page → Import → Markdown → choose `scheduling.md`
2. Or create a database → Import → CSV → `notion-signups.csv`
3. Share the page with “Anyone with the link can fill” if using Notion forms (Notion Form / button → Form)

### Google Form

1. Open [Google Forms](https://forms.google.com) while signed in
2. Create a blank form titled **Glow Within — User testing signup**
3. Add the fields listed below (same as the HTML signup)
4. Paste the form link into your invite

Or share the ready HTML form: `user-testing/signup.html` (also at `/user-testing-signup.html` on the live app host).

---

## Page title

Glow Within — User testing signup

## Intro

Thanks for helping me test **Glow Within**, a cozy self-care app for daily check-ins, intentions, and vision boards.

- **Length:** 25–30 minutes on a video call  
- **What you’ll do:** Try a few simple tasks while thinking out loud  
- **Privacy:** The app keeps data in your browser only; session notes stay with me  
- **Thanks:** [optional gift — e.g. $10 coffee card]

Prefer to book yourself? → [CALENDAR_LINK]

---

## Form fields (Google Form / Notion form)

### 1. Full name *
Short answer

### 2. Email *
Short answer (email validation)

### 3. Preferred session times *
Paragraph  
Helper: “List 2–3 windows this week (include timezone).”

### 4. Device you’ll use *
Multiple choice  
- Phone  
- Laptop / desktop  
- Either is fine  

### 5. Have you used a journal, mood, or goals app in the last year? *
Multiple choice  
- Yes  
- No  
- Prefer not to say  

### 6. Recording preference *
Multiple choice  
- Video / screen recording is okay  
- Audio only  
- Notes only (no recording)  

### 7. Consent *
Checkboxes (require all)  
- I’m 18+ (or have guardian permission)  
- I understand this is feedback on the product, not a test of me  
- I’m okay with notes being taken for product improvement  

### 8. Anything I should know before we meet?
Paragraph (optional)

### Confirmation message (after submit)

Thank you! I’ll email you within 24 hours with a calendar invite, the consent reminder, and how we’ll access the app.

Questions? YOUR_EMAIL

---

## Facilitator links (keep private)

| Resource | URL |
|---|---|
| Live app | LIVE_APP_URL |
| Figma prototype | FIGMA_PROTOTYPE_URL |
| Facilitator guide | `user-testing/facilitator-guide.md` |
| Tasks | `user-testing/tasks.md` |
| Notes template | `user-testing/notes-template.md` |

## Email reply template (when someone signs up)

Subject: Glow Within testing — you’re in!

Hi [Name] —

Thanks for signing up. You’re scheduled for **[date/time + timezone]**.

**Join:** [video link]  
**Before we start:** please use a quiet spot; phone or laptop both work.  
**Product access:** we’ll use [LIVE_APP_URL or Figma]. Prefer a private/incognito window so you see the first-time flow.

Reply if you need to reschedule.

Looking forward to it,  
[Your name]
