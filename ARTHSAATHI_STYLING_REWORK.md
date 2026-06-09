# ArthSaathi — Desktop Website Design System
## Complete Styling & Layout Guide for Claude Code

---

## 0. Design Direction

ArthSaathi is a financial empowerment platform for India's gig workers and underserved earners. The design must communicate two things simultaneously: **institutional credibility** (so Rajesh trusts it with his money decisions) and **human warmth** (so he doesn't feel like a customer number).

The visual reference point is modern Indian fintech — think Fi.money meets a government digital services portal. Clean, data-dense, light, and precise. The **signature element** of this design is a left sidebar with a persistent health score indicator that changes as the user interacts — making the app feel like a living document of the user's financial journey, not a series of disconnected pages.

No dark mode. No gradients everywhere. No generic "AI product" glow effects. This is a tool people will use at a cyber cafe, on a shared laptop, in daylight. Light mode, sharp type, intentional color.

---

## 1. Color Palette

```css
/* src/index.css — full CSS custom properties */

:root {
  /* === BACKGROUNDS === */
  --bg-app:       #F0F4F8;   /* Cool blue-grey — slightly richer than pure slate-50 */
  --bg-surface:   #FFFFFF;   /* Pure white for cards */
  --bg-surface-2: #F8FAFC;   /* Nested card / inset background */
  --bg-sidebar:   #0F172A;   /* Deep navy — sidebar is the only dark element */
  --bg-sidebar-hover: #1E293B; /* Sidebar item hover */
  --bg-sidebar-active: #1D4ED8; /* Active nav item in sidebar — blue pop */

  /* === ACCENT / PRIMARY === */
  --color-primary:       #2563EB;  /* Blue 600 — primary actions, links */
  --color-primary-light: #EFF6FF;  /* Blue 50 — tinted backgrounds */
  --color-primary-mid:   #BFDBFE;  /* Blue 200 — progress fills, rings */
  --color-primary-dark:  #1D4ED8;  /* Blue 700 — hover states */

  /* === SEMANTIC COLORS === */
  --color-success:       #16A34A;  /* Green 600 */
  --color-success-light: #F0FDF4;  /* Green 50 */
  --color-success-mid:   #BBF7D0;  /* Green 200 */

  --color-warning:       #D97706;  /* Amber 600 */
  --color-warning-light: #FFFBEB;  /* Amber 50 */
  --color-warning-mid:   #FDE68A;  /* Amber 200 */

  --color-danger:        #DC2626;  /* Red 600 */
  --color-danger-light:  #FEF2F2;  /* Red 50 */
  --color-danger-mid:    #FECACA;  /* Red 200 */

  /* === TEXT === */
  --text-primary:   #0F172A;  /* Slate 900 — headings, key numbers */
  --text-secondary: #475569;  /* Slate 600 — body copy, labels */
  --text-muted:     #94A3B8;  /* Slate 400 — placeholders, disabled */
  --text-sidebar:   #CBD5E1;  /* Slate 300 — sidebar labels */
  --text-sidebar-muted: #64748B; /* Slate 500 — inactive sidebar items */

  /* === BORDERS === */
  --border-light:  #E2E8F0;  /* Slate 200 — standard card borders */
  --border-medium: #CBD5E1;  /* Slate 300 — input borders */
  --border-focus:  #93C5FD;  /* Blue 300 — focus rings */

  /* === SHADOWS === */
  --shadow-card:   0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
  --shadow-raised: 0 4px 12px rgba(15,23,42,0.08), 0 2px 4px rgba(15,23,42,0.04);
  --shadow-modal:  0 20px 60px rgba(15,23,42,0.12);
  --shadow-blue:   0 4px 14px rgba(37,99,235,0.18);  /* For primary buttons */

  /* === CHART COLORS (Financial Twin lines) === */
  --chart-pessimistic: #DC2626;  /* Red 600 */
  --chart-median:      #2563EB;  /* Blue 600 */
  --chart-optimistic:  #16A34A;  /* Green 600 */
  --chart-grid:        #F1F5F9;  /* Slate 100 */
}
```

**Tailwind config extension (`tailwind.config.js`):**
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        'app-bg': '#F0F4F8',
        'sidebar': '#0F172A',
        'sidebar-hover': '#1E293B',
        'sidebar-active': '#1D4ED8',
        primary: {
          DEFAULT: '#2563EB',
          light: '#EFF6FF',
          mid: '#BFDBFE',
          dark: '#1D4ED8',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card:   '0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)',
        raised: '0 4px 12px rgba(15,23,42,0.08), 0 2px 4px rgba(15,23,42,0.04)',
        blue:   '0 4px 14px rgba(37,99,235,0.18)',
      },
      maxWidth: {
        'content': '1280px',
      }
    }
  }
}
```

---

## 2. Typography Scale

Load in `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

| Role | Font | Size | Weight | Usage |
|---|---|---|---|---|
| Page Title | Space Grotesk | 24px / `text-2xl` | 700 | Page headings inside content area |
| Section Header | Space Grotesk | 18px / `text-lg` | 600 | Card titles, section labels |
| Stat Number | JetBrains Mono | 28px / `text-3xl` | 600 | Health score, rupee amounts |
| Stat Number (large) | JetBrains Mono | 36px / `text-4xl` | 600 | Hero income figure on dashboard |
| Body | Inter | 14px / `text-sm` | 400 | Descriptions, transaction details |
| Body (medium) | Inter | 15px / `text-[15px]` | 500 | Labels, button text |
| Caption | Inter | 12px / `text-xs` | 400 | Muted hints, timestamps |
| Sidebar Label | Inter | 13px / `text-[13px]` | 500 | Nav item text |
| Mono Small | JetBrains Mono | 13px / `text-[13px]` | 400 | Clause text, code-like content |

**Typography rules:**
- `font-display` ONLY for page title, section headers, and stat numbers. Not for body copy.
- All rupee amounts: `font-mono` always, no exceptions.
- Number formatting: always `toLocaleString('en-IN')` — `₹18,500` not `₹18500`.
- Line height: `leading-relaxed` for body text, `leading-tight` for headings.
- Letter spacing: `tracking-tight` on `text-2xl+` headings for polish.

---

## 3. Desktop Layout Architecture

### Overall Shell

```
┌─────────────────────────────────────────────────────────────────┐
│  SIDEBAR (fixed, 240px)     │  MAIN CONTENT AREA                │
│  bg-[#0F172A]               │  bg-[#F0F4F8]                     │
│  h-screen, overflow-y:auto  │  flex-1, overflow-y:auto          │
│                             │  px-8 py-7                        │
│  ┌──────────────────────┐   │  ┌──────────────────────────────┐ │
│  │  ArthSaathi logo     │   │  │  PAGE HEADER                 │ │
│  │  + tagline           │   │  │  Title + breadcrumb          │ │
│  ├──────────────────────┤   │  │  + Language toggle           │ │
│  │  Rajesh's mini card  │   │  └──────────────────────────────┘ │
│  │  Health Score: 47    │   │                                   │
│  │  ████░░░░░░░ 47/100  │   │  ┌──────────────────────────────┐ │
│  ├──────────────────────┤   │  │  PAGE CONTENT                │ │
│  │  NAV ITEMS           │   │  │  Grid / Cards / Tables       │ │
│  │  > Dashboard         │   │  │                              │ │
│  │    Scam Firewall     │   │  └──────────────────────────────┘ │
│  │    Financial Twin    │   │                                   │
│  │    Schemes           │   │                                   │
│  │    Documents         │   │                                   │
│  ├──────────────────────┤   │                                   │
│  │  Voice Input (bottom)│   │                                   │
│  └──────────────────────┘   │                                   │
└─────────────────────────────────────────────────────────────────┘
```

### CSS Structure

```jsx
// App shell layout — App.jsx
<div className="flex h-screen bg-app-bg overflow-hidden">
  {/* Sidebar — fixed, full height */}
  <aside className="w-60 flex-shrink-0 bg-[#0F172A] flex flex-col h-full overflow-y-auto">
    {/* Logo, user card, nav, voice */}
  </aside>

  {/* Main content — scrollable */}
  <main className="flex-1 overflow-y-auto">
    <div className="max-w-content mx-auto px-8 py-7">
      {/* Page header */}
      {/* Page content */}
    </div>
  </main>
</div>
```

### Sidebar anatomy (top to bottom):

```
┌──────────────────────────┐
│  [Logo mark]             │  ← 40px logo SVG/icon
│  ArthSaathi              │  ← font-display font-bold text-white text-lg
│  अर्थसाथी                │  ← text-[#64748B] text-xs font-body (Hindi tagline below)
├──────────────────────────┤
│  ┌─────────────────────┐ │
│  │  R                  │ │  ← Avatar: 36px circle, bg-blue-600, initials
│  │  Rajesh Kumar       │ │  ← text-white text-sm font-medium
│  │  Delivery Partner   │ │  ← text-[#64748B] text-xs
│  │  Pune               │ │
│  └─────────────────────┘ │
│  Health Score            │  ← text-[#94A3B8] text-xs uppercase tracking-wider
│  ████████░░  47          │  ← Progress bar + mono number
├──────────────────────────┤
│  NAVIGATION              │  ← section label: text-[#475569] text-[11px] uppercase tracking-widest px-3 mb-1
│                          │
│  ▪ Dashboard             │  ← Active: bg-[#1D4ED8] text-white rounded-lg
│    Scam Firewall         │  ← Inactive: text-[#94A3B8] hover:bg-[#1E293B] hover:text-white
│    Financial Twin        │
│    Schemes        [3]    │  ← Badge for scheme count
│    Documents             │
├──────────────────────────┤
│  [Mic icon]              │
│  Voice Navigation        │  ← At bottom of sidebar
│  "Say a page name..."    │
└──────────────────────────┘
```

**Sidebar nav item classes:**
```jsx
// Active
"flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#1D4ED8] text-white text-[13px] font-medium font-body transition-all"

// Inactive
"flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#E2E8F0] text-[13px] font-medium font-body transition-all cursor-pointer"

// Section label
"text-[#475569] text-[11px] uppercase tracking-widest px-3 mb-1 mt-5 font-body"
```

**Health score in sidebar:**
```jsx
<div className="mx-3 mt-4 p-3 rounded-xl bg-[#1E293B] border border-white/5">
  <div className="flex justify-between items-center mb-2">
    <span className="text-[#94A3B8] text-[11px] uppercase tracking-wider font-body">Health Score</span>
    <span className="text-white font-mono text-sm font-semibold">{score}</span>
  </div>
  {/* Progress bar */}
  <div className="h-1.5 bg-[#334155] rounded-full overflow-hidden">
    <div 
      className="h-full bg-blue-500 rounded-full transition-all duration-700"
      style={{ width: `${score}%` }}
    />
  </div>
</div>
```

---

## 4. Page Header Component (Reused Across All Pages)

Sits at the top of every page's content area. Not a global topbar — it's part of the page layout.

```
┌─────────────────────────────────────────────────────────────┐
│  [Page Title]                    [EN] [हि] [म]  [🔔 Alerts] │
│  Subtitle or breadcrumb                                     │
└─────────────────────────────────────────────────────────────┘
```

```jsx
// PageHeader.jsx
<div className="flex items-start justify-between mb-7">
  <div>
    <h1 className="font-display text-2xl font-bold text-[#0F172A] tracking-tight">{title}</h1>
    {subtitle && <p className="text-[#475569] text-sm font-body mt-0.5">{subtitle}</p>}
  </div>
  <div className="flex items-center gap-3">
    <LanguageToggle />
    {/* Optional: notification bell */}
  </div>
</div>
```

---

## 5. Card System

Three card types used throughout the app:

### Stat Card (number + label)
```jsx
<div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-card">
  <p className="text-[#475569] text-xs font-body uppercase tracking-wider mb-1">{label}</p>
  <p className="font-mono text-3xl font-semibold text-[#0F172A] tracking-tight">{value}</p>
  <p className="text-[#475569] text-xs font-body mt-1">{subtext}</p>
</div>
```

### Content Card (card with internal sections)
```jsx
<div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-card overflow-hidden">
  <div className="px-6 py-4 border-b border-[#F1F5F9]">
    <h2 className="font-display text-[15px] font-semibold text-[#0F172A]">{title}</h2>
  </div>
  <div className="px-6 py-5">
    {/* content */}
  </div>
</div>
```

### Alert Card (colored border on left for urgency)
```jsx
// Success variant
<div className="bg-[#F0FDF4] border border-[#BBF7D0] border-l-4 border-l-[#16A34A] rounded-2xl p-5">
  {/* content */}
</div>

// Warning variant
<div className="bg-[#FFFBEB] border border-[#FDE68A] border-l-4 border-l-[#D97706] rounded-2xl p-5">
  {/* content */}
</div>

// Danger variant
<div className="bg-[#FEF2F2] border border-[#FECACA] border-l-4 border-l-[#DC2626] rounded-2xl p-5">
  {/* content */}
</div>

// Info / Primary variant
<div className="bg-[#EFF6FF] border border-[#BFDBFE] border-l-4 border-l-[#2563EB] rounded-2xl p-5">
  {/* content */}
</div>
```

---

## 6. Button System

```jsx
// Primary — for main CTAs
<button className="bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.97] text-white font-body text-[15px] font-medium px-5 py-2.5 rounded-xl shadow-blue transition-all duration-150">
  {label}
</button>

// Secondary — for secondary actions
<button className="bg-white hover:bg-[#F8FAFC] active:scale-[0.97] text-[#2563EB] font-body text-[15px] font-medium px-5 py-2.5 rounded-xl border border-[#BFDBFE] transition-all duration-150">
  {label}
</button>

// Ghost — for tertiary / destructive
<button className="hover:bg-[#F1F5F9] active:scale-[0.97] text-[#475569] font-body text-[15px] font-medium px-5 py-2.5 rounded-xl transition-all duration-150">
  {label}
</button>

// Danger
<button className="bg-[#FEF2F2] hover:bg-[#FEE2E2] active:scale-[0.97] text-[#DC2626] font-body text-[15px] font-medium px-5 py-2.5 rounded-xl border border-[#FECACA] transition-all duration-150">
  {label}
</button>

// Icon button (square)
<button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#475569] transition-all">
  <Icon size={16} />
</button>
```

**All buttons:** minimum `h-10` (40px) for clickability. No border-radius smaller than `rounded-xl` (12px).

---

## 7. Badge & Pill System

```jsx
// Severity badge
const SEVERITY = {
  high:   "bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]",
  medium: "bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]",
  low:    "bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]",
  info:   "bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]",
};
// Usage: <span className={`text-[11px] font-medium font-body px-2 py-0.5 rounded-full ${SEVERITY.high}`}>HIGH</span>

// Match score pill (for schemes)
<span className="bg-[#F0FDF4] text-[#16A34A] text-[11px] font-semibold font-body px-2.5 py-1 rounded-full border border-[#BBF7D0]">
  {matchScore}% match
</span>

// Count badge (notification dot)
<span className="bg-[#DC2626] text-white text-[10px] font-bold font-body min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
  {count}
</span>
```

---

## 8. Form & Input System

```jsx
// Text input
<input className="w-full h-10 px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-xl text-[#0F172A] text-sm font-body placeholder:text-[#94A3B8] focus:outline-none focus:border-[#93C5FD] focus:ring-2 focus:ring-[#93C5FD]/20 transition-all" />

// Textarea
<textarea className="w-full px-3.5 py-3 bg-white border border-[#CBD5E1] rounded-xl text-[#0F172A] text-sm font-body placeholder:text-[#94A3B8] focus:outline-none focus:border-[#93C5FD] focus:ring-2 focus:ring-[#93C5FD]/20 resize-none transition-all" />

// File upload zone
<div className="border-2 border-dashed border-[#CBD5E1] hover:border-[#93C5FD] hover:bg-[#EFF6FF]/50 rounded-2xl p-10 text-center cursor-pointer transition-all group">
  <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center mx-auto mb-3 group-hover:bg-[#BFDBFE] transition-all">
    <UploadCloud size={22} className="text-[#2563EB]" />
  </div>
  <p className="text-[#0F172A] font-body font-medium text-sm mb-1">Upload document</p>
  <p className="text-[#94A3B8] font-body text-xs">Loan letter, insurance policy, bank statement</p>
</div>

// Slider label
<div className="flex justify-between items-center mb-2">
  <label className="text-[#475569] text-sm font-body font-medium">{label}</label>
  <span className="font-mono text-[#0F172A] text-sm font-semibold">{value}</span>
</div>
```

---

## 9. Page Layouts — Per Page

### Dashboard (most complex)

```
┌─────────────────────────────────────────────────────────────────────┐
│  Good evening, Rajesh        [EN] [हि] [म]                          │
│  Monday, 25 November · Pune                                         │
├──────────────┬──────────────┬──────────────┬─────────────────────── │
│  Income      │  Floor       │  Buffer      │  Health Score          │
│  ₹17,400     │  ₹9,800      │  ₹2,200      │  47 / 100             │
│  This month  │  Survival    │  Current     │  [ring SVG]           │
└──────────────┴──────────────┴──────────────┴───────────────────────┘

┌────────────────────────────────────┬────────────────────────────────┐
│  Income Tier Breakdown             │  🔵 SCHEME ALERT               │
│  [3-tier bar, full width]          │  3 government schemes found    │
│  ▓▓▓▓▓▓░░░░░░ Floor ₹9,800        │  Total potential: ₹7.2 lakh+   │
│  ▒▒░░░░░░░░░░ Buffer ₹2.2k/₹8k    │  [View Schemes →]              │
│  ░░░░░░░░░░░░ Growth Zone          │                                │
└────────────────────────────────────┴────────────────────────────────┘

┌────────────────────────────────────┬────────────────────────────────┐
│  Recent Transactions               │  Debt Tracker                  │
│  Zomato payout    +₹4,200  Nov 28  │  EarlySalary  ₹8,000  36% pa  │
│  Rent            -₹5,500   Nov 27  │  MoneyTap     ₹5,000  24% pa  │
│  Swiggy payout   +₹3,100   Nov 26  │  Combined EMI: ₹1,840/mo      │
│  EarlySalary     -₹1,200   Nov 25  │  [High Rate] pill on each     │
│  [View all]                        │                                │
└────────────────────────────────────┴────────────────────────────────┘
```

**Grid classes:**
```jsx
// Stat card row: 4 columns
<div className="grid grid-cols-4 gap-4 mb-6">

// Content area: 2 columns (60/40 split)
<div className="grid grid-cols-5 gap-4 mb-6">
  <div className="col-span-3"> {/* Income tier */} </div>
  <div className="col-span-2"> {/* Scheme alert */} </div>
</div>

// Bottom row: 2 equal columns
<div className="grid grid-cols-2 gap-4">
```

**Health Score Ring:**
- SVG circle, 80px diameter
- `stroke-dasharray="251"` (circumference of r=40 circle)
- `stroke-dashoffset` = `251 - (score/100 * 251)`, animated on mount
- Stroke color: blue (`#2563EB`), track color: `#E2E8F0`
- Score number inside ring: `font-mono text-xl font-semibold text-[#0F172A]`
- Below ring: score label in tiny muted text

**3-tier income bar:**
```jsx
<div className="space-y-2 mt-4">
  {/* Floor */}
  <div className="flex items-center gap-3">
    <span className="text-[#475569] text-xs font-body w-24 text-right">Survival Floor</span>
    <div className="flex-1 h-2.5 bg-[#F1F5F9] rounded-full overflow-hidden">
      <div className="h-full bg-[#DC2626]/70 rounded-full" style={{ width: '53%' }} />
    </div>
    <span className="font-mono text-[#0F172A] text-xs w-16">₹9,800</span>
  </div>
  {/* Buffer */}
  <div className="flex items-center gap-3">
    <span className="text-[#475569] text-xs font-body w-24 text-right">Safety Buffer</span>
    <div className="flex-1 h-2.5 bg-[#F1F5F9] rounded-full overflow-hidden">
      {/* Current buffer fill (small — shows the problem) */}
      <div className="h-full bg-[#D97706] rounded-full relative" style={{ width: '28%' }}>
        {/* Target marker */}
      </div>
    </div>
    <span className="font-mono text-[#D97706] text-xs w-16">₹2,200</span>
  </div>
  {/* Growth */}
  <div className="flex items-center gap-3">
    <span className="text-[#94A3B8] text-xs font-body w-24 text-right">Growth Zone</span>
    <div className="flex-1 h-2.5 bg-[#F1F5F9] rounded-full overflow-hidden">
      <div className="h-full bg-[#16A34A]/40 rounded-full" style={{ width: '0%' }} />
    </div>
    <span className="font-mono text-[#94A3B8] text-xs w-16">₹0</span>
  </div>
</div>
```

---

### Scam Firewall

**Layout (2-column when results are showing):**

```
┌──────────────────────────────────────┬──────────────────────────────────┐
│  INPUT PANEL                         │  RESULTS PANEL                   │
│  (full width until results)          │  (slides in from right)          │
│                                      │                                  │
│  [Textarea — 5 rows]                 │  VERDICT BANNER                  │
│  Paste any message or forward...     │  🔴 SCAM DETECTED — 3 techniques │
│                                      │                                  │
│  [Try Sample]    [Analyse →]         │  Technique cards (expandable)    │
│                                      │  ① False Promise of Safety       │
│  ─── or try a sample ───             │  ② Artificial Urgency            │
│  [Sample WhatsApp scam message       │  ③ Authority Impersonation       │
│   shown in a muted preview card]     │                                  │
│                                      │  💡 What this teaches you        │
└──────────────────────────────────────┴──────────────────────────────────┘
```

**Before any result:** Input panel takes `col-span-2` (full width).  
**After result:** `grid grid-cols-2 gap-6`. Results panel slides in with `framer-motion` `x: 20 → 0, opacity: 0 → 1`.

**Sample text preview card:**
```jsx
<div className="mt-4 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl cursor-pointer hover:border-[#BFDBFE] hover:bg-[#EFF6FF]/50 transition-all" onClick={loadSample}>
  <div className="flex items-center gap-2 mb-2">
    <div className="w-5 h-5 rounded bg-[#E2E8F0] flex items-center justify-center">
      <MessageSquare size={11} className="text-[#64748B]" />
    </div>
    <span className="text-[#475569] text-xs font-body font-medium">Sample: WhatsApp Investment Scam</span>
  </div>
  <p className="text-[#94A3B8] text-xs font-body line-clamp-2 italic">
    "Guaranteed 40% returns... RBI approved... offer ends tonight..."
  </p>
  <p className="text-[#2563EB] text-xs font-body font-medium mt-2">Click to load →</p>
</div>
```

**Verdict banner:**
```jsx
// Danger
<div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-4 flex items-center gap-3 mb-4">
  <div className="w-10 h-10 rounded-full bg-[#DC2626] flex items-center justify-center flex-shrink-0">
    <ShieldX size={20} className="text-white" />
  </div>
  <div>
    <p className="font-display font-semibold text-[#DC2626] text-base">Scam Detected</p>
    <p className="text-[#475569] text-sm font-body">{count} manipulation techniques identified</p>
  </div>
</div>

// Safe
<div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-4 flex items-center gap-3 mb-4">
  <div className="w-10 h-10 rounded-full bg-[#16A34A] flex items-center justify-center flex-shrink-0">
    <ShieldCheck size={20} className="text-white" />
  </div>
  <div>
    <p className="font-display font-semibold text-[#16A34A] text-base">Looks Clean</p>
    <p className="text-[#475569] text-sm font-body">No manipulation tactics detected</p>
  </div>
</div>
```

**Technique card:**
```jsx
<div className="border border-[#E2E8F0] rounded-xl overflow-hidden mb-3">
  <button 
    className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F8FAFC] transition-all"
    onClick={() => toggle(id)}
  >
    <div className="flex items-center gap-3">
      <span className="w-6 h-6 rounded-full bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] text-xs font-bold font-body flex items-center justify-center flex-shrink-0">
        {index}
      </span>
      <div>
        <p className="font-body font-semibold text-[#0F172A] text-sm">{technique}</p>
        <p className="text-[#94A3B8] text-xs font-body mt-0.5">"{matchedKeyword}" detected</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className={`text-[11px] font-medium font-body px-2 py-0.5 rounded-full border ${SEVERITY_CLASSES[severity]}`}>
        {severity.toUpperCase()}
      </span>
      <ChevronDown size={15} className={`text-[#94A3B8] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </div>
  </button>
  {/* Expanded content */}
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
        className="overflow-hidden"
      >
        <div className="px-4 pb-4 pt-0 border-t border-[#F1F5F9]">
          <p className="text-[#475569] text-sm font-body leading-relaxed mt-3">{explanation}</p>
          <p className="text-[#94A3B8] text-xs font-body mt-2 italic">{legalContext}</p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>
```

---

### Financial Twin

**Layout (3-column):**

```
┌──────────────┬────────────────────────────────┬──────────────────┐
│  CONTROLS    │  CHART                         │  SUMMARY         │
│  (280px)     │  (flexible)                    │  (280px)         │
│              │                                │                  │
│  Monthly     │  [Recharts LineChart]          │  At 10 years:    │
│  ₹2,000      │  3 animated lines              │                  │
│  [slider]    │  with legend                   │  Savings acc.    │
│              │                                │  ₹8,40,000      │
│  Risk Level  │  Year markers on X axis        │                  │
│  [3 buttons] │  ₹L formatting on Y axis       │  Liquid fund     │
│  Conservative│                                │  ₹11,20,000     │
│  Balanced    │                                │                  │
│  Growth      │                                │  Difference      │
│              │                                │  +₹2,80,000     │
│              │                                │  ──────────      │
│              │                                │  Probability     │
│              │                                │  ████████░ 73%  │
└──────────────┴────────────────────────────────┴──────────────────┘
```

```jsx
<div className="grid grid-cols-[280px_1fr_280px] gap-5 items-start">
  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-card">
    {/* Controls */}
  </div>
  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-card">
    {/* Chart */}
  </div>
  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-card">
    {/* Summary */}
  </div>
</div>
```

**Risk level segmented control:**
```jsx
<div className="flex rounded-xl border border-[#E2E8F0] p-1 bg-[#F8FAFC] gap-1">
  {['Conservative', 'Balanced', 'Growth'].map(level => (
    <button
      key={level}
      onClick={() => setRisk(level.toLowerCase())}
      className={`flex-1 py-1.5 text-xs font-medium font-body rounded-lg transition-all ${
        risk === level.toLowerCase()
          ? 'bg-white text-[#2563EB] shadow-card font-semibold'
          : 'text-[#94A3B8] hover:text-[#475569]'
      }`}
    >
      {level}
    </button>
  ))}
</div>
```

**Summary numbers:**
```jsx
<div className="space-y-3">
  <div className="p-3 bg-[#F8FAFC] rounded-xl">
    <p className="text-[#94A3B8] text-xs font-body mb-1">Savings Account (3.5%)</p>
    <p className="font-mono text-xl font-semibold text-[#475569]">₹{savingsAmt}</p>
  </div>
  <div className="p-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl">
    <p className="text-[#2563EB] text-xs font-body font-medium mb-1">Liquid Fund (6.5%)</p>
    <p className="font-mono text-xl font-semibold text-[#0F172A]">₹{liquidAmt}</p>
  </div>
  <div className="p-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl">
    <p className="text-[#16A34A] text-xs font-body font-medium mb-1">You earn extra</p>
    <p className="font-mono text-xl font-semibold text-[#16A34A]">+₹{diff}</p>
  </div>
</div>
```

**Chart legend:**
```jsx
<div className="flex items-center gap-5 mb-3">
  {[
    { color: '#DC2626', dash: true, label: 'Pessimistic' },
    { color: '#2563EB', dash: false, label: 'Median' },
    { color: '#16A34A', dash: true, label: 'Optimistic' },
  ].map(({ color, dash, label }) => (
    <div key={label} className="flex items-center gap-1.5">
      <svg width="20" height="8">
        <line x1="0" y1="4" x2="20" y2="4" stroke={color} strokeWidth="2" strokeDasharray={dash ? '4 3' : undefined} />
      </svg>
      <span className="text-[#475569] text-xs font-body">{label}</span>
    </div>
  ))}
</div>
```

---

### Scheme Eligibility

**Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Header + subtitle                                                   │
│  "Based on your profile, you qualify for 3 schemes"                 │
├──────────────────┬──────────────────┬────────────────────────────── │
│  SCHEME CARD 1   │  SCHEME CARD 2   │  SCHEME CARD 3                │
│  PM-JAY          │  e-SHRAM         │  PMSBY                        │
│  ₹5L coverage   │  ₹2L + pension   │  ₹2L @ ₹20/yr                │
│  97% match       │  94% match       │  99% match                    │
│  [How to Apply]  │  [How to Apply]  │  [How to Apply]               │
└──────────────────┴──────────────────┴────────────────────────────── │
```

```jsx
<div className="grid grid-cols-3 gap-5">
  {schemes.map(scheme => <SchemeCard key={scheme.id} scheme={scheme} />)}
</div>
```

**Scheme card:**
```jsx
<div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-card overflow-hidden hover:shadow-raised hover:-translate-y-0.5 transition-all">
  {/* Top color bar */}
  <div className="h-1.5" style={{ backgroundColor: scheme.color }} />
  
  <div className="p-5">
    {/* Icon + name */}
    <div className="flex items-start justify-between mb-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${scheme.color}15` }}>
        <Icon size={20} style={{ color: scheme.color }} />
      </div>
      <span className="text-[11px] font-semibold font-body px-2.5 py-1 rounded-full border" 
            style={{ backgroundColor: `${scheme.color}10`, color: scheme.color, borderColor: `${scheme.color}30` }}>
        {scheme.matchBadge}
      </span>
    </div>
    
    <h3 className="font-display font-semibold text-[#0F172A] text-base mb-0.5">{scheme.name}</h3>
    <p className="font-mono font-semibold text-xl mb-2" style={{ color: scheme.color }}>
      {scheme.benefit}
    </p>
    
    {/* Match bar */}
    <div className="mb-3">
      <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" 
             style={{ width: `${scheme.matchScore}%`, backgroundColor: scheme.color }} />
      </div>
    </div>
    
    <p className="text-[#475569] text-xs font-body leading-relaxed mb-4 italic">
      {scheme.matchReason}
    </p>
    
    <button onClick={() => setSelected(scheme)} className="w-full bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-[#E2E8F0] hover:border-[#BFDBFE] text-[#2563EB] font-body text-sm font-medium py-2 rounded-xl transition-all">
      How to apply →
    </button>
  </div>
</div>
```

**Application guide modal/drawer:**

When a scheme is selected, show a slide-over from the right side (not a centered modal):

```jsx
// Fixed full-height right panel
<motion.div
  initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
  className="fixed right-0 top-0 h-full w-[480px] bg-white shadow-modal z-50 overflow-y-auto"
>
  {/* Header */}
  <div className="sticky top-0 bg-white border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between">
    <div>
      <h2 className="font-display font-semibold text-[#0F172A]">{scheme.name}</h2>
      <p className="text-[#475569] text-sm font-body">{scheme.benefit}</p>
    </div>
    <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-all">
      <X size={15} className="text-[#475569]" />
    </button>
  </div>
  
  {/* Steps */}
  <div className="px-6 py-5">
    {scheme.applicationSteps.map((step, i) => (
      <div key={step.step} className="flex gap-4 mb-5 last:mb-0">
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white font-body font-bold text-sm flex items-center justify-center">
            {step.step}
          </div>
          {i < scheme.applicationSteps.length - 1 && (
            <div className="w-px flex-1 bg-[#E2E8F0] mt-2 min-h-[24px]" />
          )}
        </div>
        <div className="pb-5">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-body font-semibold text-[#0F172A] text-sm">{step.title}</p>
            <span className="bg-[#FFFBEB] border border-[#FDE68A] text-[#D97706] text-[11px] font-body px-2 py-0.5 rounded-full">
              ⏱ {step.time}
            </span>
          </div>
          <p className="text-[#475569] text-sm font-body leading-relaxed">{step.detail}</p>
        </div>
      </div>
    ))}
  </div>
</motion.div>

{/* Backdrop */}
<motion.div
  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
  className="fixed inset-0 bg-[#0F172A]/40 z-40 backdrop-blur-sm"
  onClick={() => setSelected(null)}
/>
```

---

### Document Intelligence

**Layout:**

```
┌──────────────────────────────────┬──────────────────────────────────┐
│  UPLOAD PANEL (left)             │  ANALYSIS PANEL (right)          │
│  (stays visible after upload)    │  (hidden → analyzing → results)  │
│                                  │                                  │
│  [Upload zone — large]           │  Document: QuickCash Loan        │
│                                  │  Personal Loan · ₹25,000         │
│  — or use our sample —           │                                  │
│  [Sample card]                   │  30-second summary               │
│                                  │  ─────────────────               │
│                                  │  [Summary text]                  │
│                                  │                                  │
│                                  │  3 Issues Found                  │
│                                  │  ─────────────────               │
│                                  │  [Issue cards — expandable]      │
│                                  │                                  │
│                                  │  Recommendation                  │
│                                  │  [Recommendation text]           │
└──────────────────────────────────┴──────────────────────────────────┘
```

**Analyzing state (right panel):**
```jsx
<div className="space-y-2.5">
  {ANALYZING_STEPS.map((step, i) => (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.4 }}
      className="flex items-center gap-2.5"
    >
      <CheckCircle2 size={15} className="text-[#16A34A] flex-shrink-0" />
      <span className="text-[#475569] text-sm font-body">{step}</span>
    </motion.div>
  ))}
</div>
```

**Flagged clause display (inside expanded issue):**
```jsx
<div className="mt-3 bg-[#F8FAFC] border-l-4 border-[#DC2626] rounded-r-xl p-4 font-mono text-[13px] text-[#475569] leading-relaxed">
  "{clause}"
</div>
<p className="text-[#475569] text-sm font-body leading-relaxed mt-3">{explanation}</p>
```

---

## 10. Language Toggle Component

Sits in top-right of every page header. Light mode version:

```jsx
<div className="flex rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-1 gap-0.5">
  {LANGS.map(({ code, label }) => (
    <button
      key={code}
      onClick={() => i18n.changeLanguage(code)}
      className={`px-3 py-1.5 text-xs font-body font-medium rounded-lg transition-all ${
        i18n.language === code
          ? 'bg-white text-[#2563EB] shadow-card'
          : 'text-[#94A3B8] hover:text-[#475569]'
      }`}
    >
      {label}
    </button>
  ))}
</div>
```

---

## 11. Voice Input (Sidebar, Bottom)

In the sidebar at bottom — not a floating button:

```jsx
<div className="mt-auto mx-3 mb-4">
  <button
    onClick={startListening}
    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all ${
      isListening
        ? 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]'
        : 'bg-[#1E293B] border-transparent text-[#94A3B8] hover:text-[#E2E8F0] hover:bg-[#334155]'
    }`}
  >
    <div className={`relative ${isListening ? 'animate-pulse' : ''}`}>
      <Mic size={15} />
    </div>
    <div className="text-left">
      <p className="text-[13px] font-body font-medium leading-none mb-0.5">
        {isListening ? 'Listening...' : 'Voice Navigation'}
      </p>
      <p className="text-[11px] font-body opacity-60">
        {isListening ? transcript || 'Speak now...' : 'Say "Scam", "Schemes"...'}
      </p>
    </div>
  </button>
</div>
```

---

## 12. Toast / Notification System

Health score boost toasts appear from top-right:

```jsx
// Fixed top-right position
<div className="fixed top-5 right-5 z-[100] space-y-2">
  <AnimatePresence>
    {toast && (
      <motion.div
        initial={{ opacity: 0, x: 20, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 20, scale: 0.95 }}
        className="bg-white border border-[#BBF7D0] shadow-raised rounded-xl px-4 py-3 flex items-center gap-3"
      >
        <div className="w-7 h-7 rounded-full bg-[#F0FDF4] flex items-center justify-center flex-shrink-0">
          <TrendingUp size={14} className="text-[#16A34A]" />
        </div>
        <div>
          <p className="font-body font-semibold text-[#16A34A] text-sm">{toast}</p>
          <p className="font-body text-[#475569] text-xs">Health score improved</p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>
```

---

## 13. Transaction Row Component

Used in dashboard and anywhere transactions appear:

```jsx
const CATEGORY_ICONS = {
  gig: { icon: Zap, color: '#2563EB', bg: '#EFF6FF' },
  housing: { icon: Home, color: '#7C3AED', bg: '#F5F3FF' },
  food: { icon: ShoppingCart, color: '#D97706', bg: '#FFFBEB' },
  debt: { icon: AlertTriangle, color: '#DC2626', bg: '#FEF2F2' },
  transport: { icon: Car, color: '#475569', bg: '#F8FAFC' },
  utilities: { icon: Wifi, color: '#16A34A', bg: '#F0FDF4' },
};

// Row
<div className="flex items-center gap-3 py-3 border-b border-[#F1F5F9] last:border-0">
  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" 
       style={{ backgroundColor: CATEGORY_ICONS[tx.category].bg }}>
    <CategoryIcon size={16} style={{ color: CATEGORY_ICONS[tx.category].color }} />
  </div>
  <div className="flex-1 min-w-0">
    <p className="font-body font-medium text-[#0F172A] text-sm truncate">{tx.description}</p>
    <p className="text-[#94A3B8] text-xs font-body">{formattedDate}</p>
  </div>
  <div className="text-right">
    <p className={`font-mono font-semibold text-sm ${tx.type === 'income' ? 'text-[#16A34A]' : 'text-[#0F172A]'}`}>
      {tx.type === 'income' ? '+' : '−'}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
    </p>
    {tx.category === 'debt' && (
      <span className="text-[10px] font-body font-semibold text-[#DC2626] bg-[#FEF2F2] px-1.5 py-0.5 rounded-full">
        High Rate
      </span>
    )}
  </div>
</div>
```

---

## 14. Onboarding Page

The onboarding is full-screen, **no sidebar**, no navbar — clean immersive experience.

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│          ArthSaathi                           [Skip intro →]        │
│          अर्थसाथी                                                   │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Welcome, Rajesh.                                            │   │
│  │  Before I help, let me understand                            │   │
│  │  your financial world.                                       │   │
│  │                                                              │   │
│  │  [Question 1 — typewriter]                                   │   │
│  │  "When did you last feel stressed about money?"              │   │
│  │                                                              │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  Building your Financial Fingerprint...                             │
│  ████████████████░░░░ 78%                                           │
│                                                                     │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐     │
│  │Income   │ │Risk     │ │Trust    │ │Literacy │ │Stress   │     │
│  │Type     │ │Profile  │ │Level    │ │Level    │ │Triggers │     │
│  │Variable │ │Loss-    │ │Cautious │ │Basic    │ │Debt,    │     │
│  │Gig      │ │Averse   │ │         │ │         │ │Job Sec. │     │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

Centered `max-w-2xl mx-auto` layout. White `bg-white` card in center with subtle shadow. Fingerprint items appear in a 5-column grid (or 3-col then 2-col) as small cards.

**Fingerprint item card (light):**
```jsx
<motion.div
  initial={{ opacity: 0, y: 12, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ delay }}
  className="bg-white border border-[#E2E8F0] rounded-xl p-3 shadow-card"
>
  <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] flex items-center justify-center mb-2">
    <Icon size={14} className="text-[#2563EB]" />
  </div>
  <p className="text-[#94A3B8] text-[10px] uppercase tracking-wider font-body mb-0.5">{label}</p>
  <p className="text-[#0F172A] text-xs font-body font-semibold">{value}</p>
</motion.div>
```

---

## 15. Global CSS Utilities

Add to `src/index.css`:

```css
/* Base */
* { box-sizing: border-box; }
body {
  font-family: 'Inter', sans-serif;
  background-color: #F0F4F8;
  color: #0F172A;
  -webkit-font-smoothing: antialiased;
}

/* Hide scrollbar while maintaining function */
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* Sidebar scrollbar — very subtle */
aside::-webkit-scrollbar { width: 3px; }
aside::-webkit-scrollbar-track { background: transparent; }
aside::-webkit-scrollbar-thumb { background: #334155; border-radius: 999px; }

/* Number animation */
@keyframes count-up {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
.count-animate { animation: count-up 0.4s ease-out; }

/* Breathing glow for scheme badge */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.4); }
  50% { box-shadow: 0 0 0 6px rgba(37,99,235,0); }
}
.pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus ring */
*:focus-visible {
  outline: 2px solid #93C5FD;
  outline-offset: 2px;
}
```

---

## 16. Component Summary Cheatsheet

For quick reference while building:

| Element | Classes |
|---|---|
| Page background | `bg-[#F0F4F8] min-h-screen` |
| Sidebar | `w-60 bg-[#0F172A] h-screen` |
| Content area | `flex-1 overflow-y-auto px-8 py-7` |
| White card | `bg-white border border-[#E2E8F0] rounded-2xl shadow-card` |
| Tinted card | `bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl` |
| Page title | `font-display text-2xl font-bold text-[#0F172A] tracking-tight` |
| Section title | `font-display text-[15px] font-semibold text-[#0F172A]` |
| Large number | `font-mono text-3xl font-semibold text-[#0F172A]` |
| Body text | `font-body text-sm text-[#475569] leading-relaxed` |
| Muted label | `font-body text-xs text-[#94A3B8] uppercase tracking-wider` |
| Primary button | `bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-body text-[15px] font-medium px-5 py-2.5 rounded-xl shadow-blue transition-all active:scale-[0.97]` |
| Sidebar nav active | `bg-[#1D4ED8] text-white rounded-lg px-3 py-2.5` |
| Sidebar nav inactive | `text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#E2E8F0] rounded-lg px-3 py-2.5` |
| Input field | `bg-white border border-[#CBD5E1] rounded-xl px-3.5 py-2 text-sm focus:border-[#93C5FD] focus:ring-2 focus:ring-[#93C5FD]/20` |
| Danger alert | `bg-[#FEF2F2] border border-[#FECACA] border-l-4 border-l-[#DC2626] rounded-2xl` |
| Success alert | `bg-[#F0FDF4] border border-[#BBF7D0] border-l-4 border-l-[#16A34A] rounded-2xl` |
| Info alert | `bg-[#EFF6FF] border border-[#BFDBFE] border-l-4 border-l-[#2563EB] rounded-2xl` |

---

*ArthSaathi Design System — Desktop Website Mode*
*Palette: Slate/Blue light mode · Type: Space Grotesk + Inter + JetBrains Mono · Layout: Fixed sidebar + scrollable content*
