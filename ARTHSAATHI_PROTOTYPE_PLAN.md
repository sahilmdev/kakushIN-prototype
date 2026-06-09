# ArthSaathi — Claude Code Implementation Guide
## Complete Prototype Build Plan

---

## 0. What You're Building

**ArthSaathi** is a financial literacy and empowerment app for underserved Indians. This prototype is a fully static, browser-only demo built for a hackathon presentation.

**Demo persona:** Rajesh — a 34-year-old gig delivery worker in Pune with irregular income, no formal financial products, and a history of predatory loan app usage.

**Goal of this prototype:** Convince judges in 5 minutes that this product is technically real, emotionally resonant, and genuinely different from every other "financial chatbot" they'll see that day.

**Everything is faked intelligently** — all AI responses are pre-written strings, all data is static JSON, all "analysis" is hardcoded — but it must feel alive.

---

## 1. Project Setup

```
arthsaathi/
├── public/
│   └── favicon.ico
├── src/
│   ├── data/                    ← All static JSON
│   │   ├── rajesh.json          ← Profile + transactions
│   │   ├── schemes.json         ← 3 matched govt schemes
│   │   ├── scam-keywords.json   ← Keyword → manipulation type mapping
│   │   └── document-analysis.json ← Pre-written flagged clause output
│   ├── i18n/
│   │   ├── en.json
│   │   ├── hi.json
│   │   └── mr.json
│   ├── components/
│   │   ├── ui/                  ← Shadcn components
│   │   ├── VoiceInput.jsx
│   │   ├── ThinkingAnimation.jsx
│   │   ├── HealthScoreRing.jsx
│   │   ├── LanguageToggle.jsx
│   │   └── NavBar.jsx
│   ├── pages/
│   │   ├── Onboarding.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ScamFirewall.jsx
│   │   ├── FinancialTwin.jsx
│   │   ├── SchemeEligibility.jsx
│   │   └── DocumentIntelligence.jsx
│   ├── hooks/
│   │   ├── useVoiceNav.js       ← Web Speech API hook
│   │   └── useHealthScore.js    ← Score state manager
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

### package.json dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "framer-motion": "^10.16.0",
    "recharts": "^2.10.0",
    "i18next": "^23.7.0",
    "react-i18next": "^13.5.0",
    "lucide-react": "^0.294.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.1.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

Install Shadcn/UI via CLI after Vite setup. Use the `default` style, `slate` base color.

---

## 2. Visual Design System

This is a financial app for low-to-middle income Indians. The design must feel **trustworthy, warm, and modern** — not corporate, not condescending. Think: a knowledgeable friend's interface, not a bank's.

### Color Palette

```css
/* src/index.css — CSS custom properties */
:root {
  --color-bg: #0F1117;           /* Deep near-black — primary background */
  --color-surface: #1A1D27;      /* Card backgrounds */
  --color-surface-raised: #22263A; /* Elevated cards, modals */
  --color-accent: #6C63FF;       /* Primary purple — trust, intelligence */
  --color-accent-glow: rgba(108, 99, 255, 0.2); /* Glow for rings, halos */
  --color-success: #22C55E;      /* Green — good signals, safe verdict */
  --color-warning: #F59E0B;      /* Amber — caution, partial risk */
  --color-danger: #EF4444;       /* Red — scam alerts, danger */
  --color-text-primary: #F1F5F9; /* Primary text */
  --color-text-secondary: #94A3B8; /* Secondary/muted text */
  --color-text-accent: #A78BFA;  /* Purple-tinted text for highlights */
  --color-border: rgba(255,255,255,0.07); /* Subtle borders */
  
  /* Chart line colors for Financial Twin */
  --color-pessimistic: #EF4444;
  --color-median: #6C63FF;
  --color-optimistic: #22C55E;
}
```

### Typography

Use **Google Fonts** loaded in `index.html`:
- **Display/Headings:** `Space Grotesk` — geometric, modern, distinctive
- **Body:** `Inter` — clean, readable at small sizes
- **Numbers/Data:** `JetBrains Mono` — monospaced for financial figures, feels precise

```html
<!-- in index.html <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
```

```css
/* tailwind.config.js extend */
fontFamily: {
  display: ['Space Grotesk', 'sans-serif'],
  body: ['Inter', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
}
```

### Component Style Rules

- **Cards:** `bg-[#1A1D27] border border-white/7 rounded-2xl p-5`
- **Accent buttons:** `bg-[#6C63FF] hover:bg-[#5B52E8] text-white rounded-xl px-5 py-2.5 font-medium transition-all`
- **Ghost buttons:** `border border-[#6C63FF] text-[#A78BFA] hover:bg-[#6C63FF]/10 rounded-xl px-5 py-2.5`
- **Badges/pills:** `rounded-full px-3 py-1 text-xs font-semibold`
- All `border-radius` should be `rounded-2xl` for cards, `rounded-xl` for buttons, `rounded-full` for badges
- Subtle box shadows: `shadow-[0_0_30px_rgba(108,99,255,0.1)]` for elevated elements
- Page background: `bg-[#0F1117] min-h-screen`

### Spacing & Layout

- Max content width: `max-w-md mx-auto` (mobile-first, centered on desktop)
- Page padding: `px-4 py-6`
- Card gap: `space-y-4`
- Section headings: `font-display text-lg font-semibold text-slate-100`

---

## 3. Static Data Files

### `src/data/rajesh.json`

```json
{
  "profile": {
    "name": "Rajesh Kumar",
    "age": 34,
    "city": "Pune",
    "occupation": "Delivery Partner (Zomato/Swiggy)",
    "language": "hi",
    "incomeType": "irregular",
    "fingerprint": {
      "riskProfile": "loss-averse",
      "trustProfile": "skeptical-of-banks",
      "literacyBaseline": "basic",
      "incomeTier": "variable-gig",
      "stressTriggers": ["debt", "job-insecurity"],
      "preferenceStyle": "simple-numbers"
    },
    "healthScore": {
      "initial": 47,
      "current": 47,
      "max": 100,
      "components": {
        "emergencyFund": 20,
        "debtControl": 35,
        "savingsHabit": 55,
        "fraudProtection": 80
      }
    }
  },
  "income": {
    "monthlyMedian": 18500,
    "monthlyMin": 11000,
    "monthlyMax": 32000,
    "lastThreeMonths": [15200, 21800, 17400],
    "survivalFloor": 9800,
    "stabilityBuffer": 8000,
    "currentBuffer": 2200
  },
  "transactions": [
    { "id": 1, "date": "2024-11-28", "description": "Zomato payout", "amount": 4200, "type": "income", "category": "gig" },
    { "id": 2, "date": "2024-11-27", "description": "Rent", "amount": -5500, "type": "expense", "category": "housing" },
    { "id": 3, "date": "2024-11-26", "description": "Swiggy payout", "amount": 3100, "type": "income", "category": "gig" },
    { "id": 4, "date": "2024-11-25", "description": "EarlySalary repayment", "amount": -1200, "type": "expense", "category": "debt" },
    { "id": 5, "date": "2024-11-24", "description": "Grocery - BigBazaar", "amount": -1850, "type": "expense", "category": "food" },
    { "id": 6, "date": "2024-11-23", "description": "Zomato payout", "amount": 2800, "type": "income", "category": "gig" },
    { "id": 7, "date": "2024-11-22", "description": "Phone recharge", "amount": -299, "type": "expense", "category": "utilities" },
    { "id": 8, "date": "2024-11-21", "description": "Swiggy payout", "amount": 3600, "type": "income", "category": "gig" },
    { "id": 9, "date": "2024-11-20", "description": "Fuel", "amount": -800, "type": "expense", "category": "transport" },
    { "id": 10, "date": "2024-11-19", "description": "MoneyTap loan interest", "amount": -640, "type": "expense", "category": "debt" }
  ],
  "debts": [
    { "name": "EarlySalary", "principal": 8000, "monthlyEMI": 1200, "annualRate": 36, "type": "predatory-app" },
    { "name": "MoneyTap", "principal": 5000, "monthlyEMI": 640, "annualRate": 24, "type": "predatory-app" }
  ],
  "goals": [
    { "id": "emergency", "name": "Emergency Fund", "target": 30000, "current": 2200, "priority": 1, "status": "critical" },
    { "id": "bike", "name": "New Bike (work)", "target": 45000, "current": 0, "priority": 2, "status": "not-started" }
  ]
}
```

### `src/data/schemes.json`

```json
[
  {
    "id": "pmjay",
    "name": "Ayushman Bharat PM-JAY",
    "shortName": "PM-JAY",
    "benefit": "₹5 lakh health coverage",
    "benefitAmount": 500000,
    "description": "Free health insurance of ₹5 lakh per year for hospitalisation",
    "matchReason": "Your income (₹18,500/month) is below the ₹25,000 eligibility threshold. No existing health insurance detected.",
    "matchScore": 97,
    "matchBadge": "97% match",
    "icon": "shield-plus",
    "color": "#22C55E",
    "applicationSteps": [
      { "step": 1, "title": "Find your nearest CSC centre", "detail": "Visit locator.csccloud.in — there are 3 centres within 5km of your PIN code (411001).", "time": "10 min" },
      { "step": 2, "title": "Carry these documents", "detail": "Aadhaar card (original + copy), ration card if available, income proof (any 2 Zomato/Swiggy payment screenshots).", "time": "Prepare beforehand" },
      { "step": 3, "title": "Get your e-card generated", "detail": "The CSC operator will verify your eligibility on PMJAY portal and generate your Golden Card on the spot.", "time": "20-30 min at CSC" },
      { "step": 4, "title": "Download and save the e-card", "detail": "Save the card PDF to your phone. You can also access it anytime at beneficiary.nha.gov.in", "time": "2 min" }
    ],
    "potentialSaving": "Protects against a single hospitalisation bill that could otherwise wipe out months of income."
  },
  {
    "id": "epfo",
    "name": "EPFO Unorganised Worker Registration",
    "shortName": "e-SHRAM",
    "benefit": "₹2 lakh accident cover + future pension",
    "benefitAmount": 200000,
    "description": "National database for unorganised workers with accident insurance and social security benefits",
    "matchReason": "Gig workers are explicitly covered. Registration takes 10 minutes with just Aadhaar + mobile number.",
    "matchScore": 94,
    "matchBadge": "94% match",
    "icon": "users",
    "color": "#6C63FF",
    "applicationSteps": [
      { "step": 1, "title": "Go to eshram.gov.in", "detail": "Open on your phone browser. No app needed.", "time": "1 min" },
      { "step": 2, "title": "Register with Aadhaar + mobile OTP", "detail": "Your mobile number must be linked to Aadhaar. If not, update at nearest Aadhaar centre first.", "time": "5 min" },
      { "step": 3, "title": "Fill occupation details", "detail": "Select 'Transport' → 'Delivery Worker' from the dropdown. Add your bank account for future benefit transfers.", "time": "5 min" },
      { "step": 4, "title": "Download your e-SHRAM card", "detail": "UAN (Universal Account Number) is generated instantly. The ₹2 lakh accident cover is active immediately.", "time": "1 min" }
    ],
    "potentialSaving": "₹2 lakh accident insurance is free. Future social security benefits will compound over your working years."
  },
  {
    "id": "pmsby",
    "name": "Pradhan Mantri Suraksha Bima Yojana",
    "shortName": "PMSBY",
    "benefit": "₹2 lakh accident insurance @ ₹20/year",
    "benefitAmount": 200000,
    "description": "Accidental death and disability insurance for ₹20 per year — cheapest insurance in India",
    "matchReason": "Any bank account holder aged 18-70 qualifies. You have a savings account. You're currently uninsured.",
    "matchScore": 99,
    "matchBadge": "99% match",
    "icon": "life-buoy",
    "color": "#F59E0B",
    "applicationSteps": [
      { "step": 1, "title": "Open your bank's app or visit branch", "detail": "Available at all public sector banks and most private banks. Can be done in net banking under 'Insurance' tab.", "time": "5 min" },
      { "step": 2, "title": "Select PMSBY and link your savings account", "detail": "₹20 is auto-debited from your account on June 1 each year. That's less than one delivery order.", "time": "2 min" },
      { "step": 3, "title": "Note your policy number", "detail": "Save the SMS confirmation. Nominees can claim ₹2 lakh in case of accidental death or full disability.", "time": "1 min" }
    ],
    "potentialSaving": "₹20/year for ₹2 lakh coverage. If you skip one chai, your family is protected for a year."
  }
]
```

### `src/data/scam-keywords.json`

```json
{
  "patterns": [
    {
      "id": "guaranteed-returns",
      "keywords": ["guaranteed return", "guaranteed profit", "fixed return", "pakka return", "guaranteed 40%", "guaranteed 30%", "guaranteed 20%", "100% return", "assured return", "fixed 2% daily", "2% per day"],
      "severity": "high",
      "technique": "False Promise of Safety",
      "explanation": "No legitimate investment can legally guarantee returns. SEBI explicitly prohibits this. Anyone promising guaranteed returns is either lying or running an illegal scheme.",
      "legalContext": "Prohibited under SEBI (Investment Advisers) Regulations, 2013"
    },
    {
      "id": "urgency",
      "keywords": ["offer ends tonight", "last 24 hours", "limited slots", "only 10 spots", "expires today", "act now", "don't miss", "abhi karo", "kal se band", "sirf aaj", "last chance"],
      "severity": "medium",
      "technique": "Artificial Urgency (FOMO)",
      "explanation": "Creating a fake deadline forces you to make a rushed decision without researching. Legitimate investments are available tomorrow. Fake ones need you to act before you think.",
      "legalContext": "Common in Ponzi schemes and pump-and-dump operations"
    },
    {
      "id": "exclusivity",
      "keywords": ["only for you", "secret scheme", "exclusive members", "VIP group", "referral only", "select few", "sirf aapke liye", "special invite", "private group", "WhatsApp group"],
      "severity": "medium",
      "technique": "False Exclusivity",
      "explanation": "Making you feel specially chosen lowers your guard and makes you feel you'd be foolish to refuse. Real financial products don't work through secret WhatsApp groups.",
      "legalContext": "Classic social engineering used in pyramid and MLM schemes"
    },
    {
      "id": "authority-impersonation",
      "keywords": ["RBI approved", "SEBI approved", "government scheme", "PM modi scheme", "government approved", "RBI registered", "authorised by government", "RBI certified"],
      "severity": "high",
      "technique": "Authority Impersonation",
      "explanation": "Using RBI or SEBI's name creates false trust. The RBI does not approve individual investment schemes. SEBI does not endorse specific returns. Always verify at sebi.gov.in or rbi.org.in directly.",
      "legalContext": "Impersonating government bodies is a criminal offense under IPC Section 416"
    },
    {
      "id": "social-proof",
      "keywords": ["1000 people joined", "lakhs earning", "mera profit", "log kamaare", "everyone is doing", "my friend earned", "neighbour ne kiya", "already 50,000 members"],
      "severity": "low",
      "technique": "Fake Social Proof",
      "explanation": "Claiming thousands of happy investors creates a herd mentality. These numbers are unverifiable. In Ponzi schemes, early investors do genuinely earn — until the scheme collapses and everyone else loses.",
      "legalContext": "Fraudulent misrepresentation under IPC Section 420"
    }
  ],
  "safeMessage": {
    "title": "Looks clean",
    "description": "No manipulation tactics detected in this message. That said, always verify company registration at sebi.gov.in before investing.",
    "color": "success"
  }
}
```

### `src/data/document-analysis.json`

```json
{
  "documentName": "Personal Loan Agreement — QuickCash Finance Pvt Ltd",
  "documentType": "Personal Loan",
  "loanAmount": 25000,
  "statedRate": "18% per annum",
  "tenureMonths": 24,
  "summary": {
    "level1": {
      "title": "30-second summary",
      "content": "This is a personal loan of ₹25,000. You will pay a total of ₹34,840 over 24 months. I found 3 serious issues you should know before signing."
    },
    "level2": {
      "title": "What the 3 issues mean for you",
      "issues": [
        {
          "id": 1,
          "severity": "high",
          "flag": "Flat Rate Interest — You're actually paying 33%, not 18%",
          "explanation": "The loan says 18% p.a. but uses 'flat rate' calculation. This means interest is calculated on the full ₹25,000 every month, even as you repay. The effective annual rate is ~33%. A bank personal loan at the same 18% reducing balance would cost you ₹4,200 less.",
          "clause": "Clause 4.2: 'Interest shall be calculated at 18% per annum on the original principal amount throughout the loan tenure.'"
        },
        {
          "id": 2,
          "severity": "high",
          "flag": "Prepayment penalty of 5% — you're trapped",
          "explanation": "If you get extra money and want to close this loan early, you pay a 5% penalty on the outstanding amount. This discourages you from getting out of debt faster. Most RBI-regulated lenders cannot charge prepayment penalty on floating rate loans.",
          "clause": "Clause 7.1: 'Prepayment or foreclosure of the loan shall attract a charge of 5% of the outstanding principal, plus applicable GST.'"
        },
        {
          "id": 3,
          "severity": "medium",
          "flag": "Processing fee is NOT part of the stated ₹25,000",
          "explanation": "A processing fee of ₹1,250 (5% of loan) plus 18% GST = ₹1,475 is deducted before disbursement. You'll receive ₹23,525, but repay based on ₹25,000. Your effective loan amount received is lower than what you're paying on.",
          "clause": "Clause 2.4: 'A processing fee of 5% of the loan amount shall be deducted at disbursement. This fee is non-refundable.'"
        }
      ]
    }
  },
  "recommendation": "Before signing: Ask the lender to show you the amortization schedule with reducing balance interest. If they can't provide it, walk away. A Kisan Credit Card or a salary advance from an employer would cost significantly less."
}
```

---

## 4. Internationalisation (i18n)

### `src/i18n/en.json` (English — partial, expand as needed)

```json
{
  "app": {
    "name": "ArthSaathi",
    "tagline": "Your financial companion"
  },
  "onboarding": {
    "greeting": "Hello Rajesh 👋",
    "subgreeting": "Let me understand your financial world before I help.",
    "buildingProfile": "Building your Financial Fingerprint...",
    "fingerprintReady": "Your Financial Fingerprint is ready",
    "questions": [
      "When did you last feel stressed about money?",
      "Do you prefer knowing every rupee, or roughly where things stand?",
      "Have you ever invested money and regretted it?"
    ]
  },
  "dashboard": {
    "healthScore": "Financial Health Score",
    "incomeThisMonth": "Income this month",
    "schemeAlert": "You qualify for 3 govt schemes",
    "survivalFloor": "Survival Floor",
    "stabilityBuffer": "Stability Buffer",
    "growthZone": "Growth Zone"
  },
  "scam": {
    "title": "Scam Firewall",
    "placeholder": "Paste any suspicious message, offer, or forward...",
    "analyze": "Analyse",
    "analyzing": "Analysing...",
    "safe": "Looks Clean",
    "danger": "Scam Detected",
    "caution": "Use Caution",
    "detectedTechniques": "Manipulation techniques detected"
  },
  "twin": {
    "title": "Financial Twin",
    "subtitle": "See your two possible futures",
    "monthlyAmount": "Monthly investment",
    "riskLevel": "Risk level",
    "conservative": "Conservative",
    "balanced": "Balanced",
    "growth": "Growth",
    "probability": "Probability of reaching goal",
    "futureA": "Future A — Savings Account (3.5%)",
    "futureB": "Future B — Liquid Fund (6.5%)"
  },
  "schemes": {
    "title": "Your Scheme Matches",
    "subtitle": "Based on your profile — you likely qualify",
    "howToApply": "How to apply",
    "timeRequired": "Time required"
  },
  "docs": {
    "title": "Document Intelligence",
    "subtitle": "Upload any financial document. I'll find what they don't want you to notice.",
    "upload": "Upload document",
    "uploadHint": "Tap to upload a loan letter, insurance policy, or bank document",
    "analyzing": "Reading document...",
    "flagged": "issues flagged",
    "viewDetail": "View full analysis"
  },
  "nav": {
    "home": "Home",
    "scam": "Scam Check",
    "twin": "Future",
    "schemes": "Schemes",
    "docs": "Documents"
  },
  "voice": {
    "listening": "Listening...",
    "say": "Say a page name to navigate",
    "commands": ["home", "scam firewall", "financial twin", "schemes", "document"]
  }
}
```

### `src/i18n/hi.json` (Hindi — key strings)

```json
{
  "app": {
    "name": "अर्थसाथी",
    "tagline": "आपका वित्तीय साथी"
  },
  "onboarding": {
    "greeting": "नमस्ते राजेश 👋",
    "subgreeting": "मदद करने से पहले मुझे आपकी आर्थिक स्थिति समझने दें।",
    "buildingProfile": "आपकी Financial Fingerprint बन रही है...",
    "fingerprintReady": "आपकी Financial Fingerprint तैयार है"
  },
  "dashboard": {
    "healthScore": "वित्तीय स्वास्थ्य स्कोर",
    "incomeThisMonth": "इस महीने की आमदनी",
    "schemeAlert": "आप 3 सरकारी योजनाओं के लिए पात्र हैं",
    "survivalFloor": "जरूरी खर्च",
    "stabilityBuffer": "सुरक्षा बचत",
    "growthZone": "निवेश क्षेत्र"
  },
  "scam": {
    "title": "स्कैम फायरवॉल",
    "placeholder": "कोई भी संदिग्ध मेसेज, ऑफर या फॉरवर्ड यहाँ पेस्ट करें...",
    "analyze": "जाँचें",
    "analyzing": "जाँच हो रही है...",
    "safe": "सुरक्षित लगता है",
    "danger": "स्कैम मिला",
    "caution": "सावधान रहें"
  },
  "nav": {
    "home": "होम",
    "scam": "स्कैम जाँच",
    "twin": "भविष्य",
    "schemes": "योजनाएं",
    "docs": "दस्तावेज़"
  }
}
```

### `src/i18n/mr.json` (Marathi — key strings)

```json
{
  "app": {
    "name": "अर्थसाथी",
    "tagline": "तुमचा आर्थिक साथीदार"
  },
  "onboarding": {
    "greeting": "नमस्कार राजेश 👋",
    "subgreeting": "मदत करण्यापूर्वी मला तुमची आर्थिक परिस्थिती समजून घेऊ द्या.",
    "buildingProfile": "तुमची Financial Fingerprint तयार होत आहे...",
    "fingerprintReady": "तुमची Financial Fingerprint तयार आहे"
  },
  "nav": {
    "home": "होम",
    "scam": "स्कॅम तपासणी",
    "twin": "भविष्य",
    "schemes": "योजना",
    "docs": "कागदपत्रे"
  }
}
```

### i18n Setup — `src/i18n/index.js`

```js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import hi from './hi.json';
import mr from './mr.json';

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, hi: { translation: hi }, mr: { translation: mr } },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
```

---

## 5. Core Hooks

### `src/hooks/useVoiceNav.js`

```js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VOICE_ROUTES = {
  'home': '/',
  'dashboard': '/',
  'scam': '/scam',
  'scam firewall': '/scam',
  'fraud': '/scam',
  'financial twin': '/twin',
  'twin': '/twin',
  'future': '/twin',
  'schemes': '/schemes',
  'scheme': '/schemes',
  'yojana': '/schemes',
  'document': '/docs',
  'documents': '/docs',
  'dastaavej': '/docs',
};

export function useVoiceNav() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setSupported(!!SpeechRecognition);
  }, []);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript.toLowerCase().trim();
      setTranscript(spoken);
      for (const [phrase, path] of Object.entries(VOICE_ROUTES)) {
        if (spoken.includes(phrase)) {
          navigate(path);
          return;
        }
      }
    };

    recognition.start();
  };

  return { startListening, isListening, transcript, supported };
}
```

### `src/hooks/useHealthScore.js`

```js
import { useState } from 'react';

// Score starts at 47, rises to 72 as user interacts
export function useHealthScore() {
  const [score, setScore] = useState(47);
  const [events, setEvents] = useState([]);

  const triggerEvent = (eventType) => {
    const boosts = {
      'scam-detected': { points: 8, label: '+8 Fraud Awareness' },
      'scheme-viewed': { points: 6, label: '+6 Benefit Unlocked' },
      'document-analysed': { points: 7, label: '+7 Contract Literacy' },
      'twin-explored': { points: 4, label: '+4 Future Planning' }
    };
    const boost = boosts[eventType];
    if (!boost || events.includes(eventType)) return;
    setScore(prev => Math.min(prev + boost.points, 72)); // caps at 72 for demo
    setEvents(prev => [...prev, eventType]);
    return boost.label;
  };

  return { score, triggerEvent };
}
```

---

## 6. Page Implementations

### Page 1: `src/pages/Onboarding.jsx`

**Purpose:** First impression. Voice-style greeting → animated "Financial Fingerprint" build → redirect to Dashboard.

**Visual Flow:**
1. Black screen fades in → ArthSaathi logo pulses
2. Voice waveform animation plays (fake, CSS animated)
3. Three profiling questions appear one at a time (typewriter effect, 1.5s each)
4. "Building your Financial Fingerprint..." text with animated progress
5. Six fingerprint data points appear as cards, one by one:
   - Income Type: Variable Gig
   - Risk Psychology: Loss-Averse
   - Trust Level: Cautious
   - Literacy: Basic
   - Stress Triggers: Debt, Job Security
   - Preferred Style: Simple Numbers
6. "Fingerprint Ready ✓" — then auto-navigates to Dashboard after 2s

**Key Code Details:**

```jsx
// Onboarding.jsx outline

import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const QUESTIONS = [
  "When did you last feel stressed about money?",
  "Do you prefer knowing every rupee, or roughly where things stand?",
  "Have you ever invested money and regretted it?"
];

const FINGERPRINT_ITEMS = [
  { label: "Income Type", value: "Variable Gig", icon: "zap", delay: 0 },
  { label: "Risk Profile", value: "Loss-Averse", icon: "shield", delay: 0.15 },
  { label: "Trust Level", value: "Cautious", icon: "eye", delay: 0.3 },
  { label: "Literacy Baseline", value: "Basic → Intermediate", icon: "book-open", delay: 0.45 },
  { label: "Stress Triggers", value: "Debt, Job Security", icon: "alert-triangle", delay: 0.6 },
  { label: "Preferred Style", value: "Simple Numbers", icon: "bar-chart-2", delay: 0.75 },
];
```

**Animation sequence state machine:**
- `phase: 'greeting' | 'questions' | 'building' | 'reveal' | 'done'`
- Use `setTimeout` chained or a single `useEffect` with phase transitions
- Each question: 2000ms display → fade → next
- Building animation: fake progress bar from 0 to 100% over 2s
- Fingerprint cards: staggered `framer-motion` entrance, `delay` from array above

**Voice waveform (CSS-only):**
```css
/* Three bars animating up and down */
.waveform-bar {
  width: 4px;
  background: var(--color-accent);
  border-radius: 2px;
  animation: waveform 1.2s ease-in-out infinite;
}
.waveform-bar:nth-child(2) { animation-delay: 0.2s; }
.waveform-bar:nth-child(3) { animation-delay: 0.4s; }
@keyframes waveform {
  0%, 100% { height: 8px; }
  50% { height: 28px; }
}
```

**Navigation:** After `phase === 'done'`, call `navigate('/dashboard')` automatically. Also show a "Skip intro →" text link in top-right for judges who've seen it.

---

### Page 2: `src/pages/Dashboard.jsx`

**Purpose:** The "home base." Shows financial health at a glance + the scheme notification that drives exploration.

**Layout (top to bottom):**

```
┌─────────────────────────────────────┐
│  👋 Good evening, Rajesh      [🔔 3] │  ← Header + scheme notification badge
├─────────────────────────────────────┤
│  [Health Score Ring]  47             │  ← Animated SVG ring, purple fill
│   Financial Health Score             │
│   "Good start — 3 quick wins ahead" │
├─────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐         │
│  │ This     │  │ Survival │         │
│  │ Month    │  │ Floor    │         │  ← Two stat cards
│  │ ₹17,400  │  │ ₹9,800   │         │
│  └──────────┘  └──────────┘         │
├─────────────────────────────────────┤
│  [3-tier income bar]                 │  ← Visual income breakdown
│  Floor | Buffer | Growth            │
├─────────────────────────────────────┤
│  ⚡ SCHEME ALERT                     │
│  You qualify for 3 government        │  ← Pulsing card, PRIMARY CTA
│  schemes worth ₹7 lakh+ in          │
│  benefits. Tap to check →           │
├─────────────────────────────────────┤
│  Recent Transactions                 │
│  [Last 4 transactions]              │
└─────────────────────────────────────┘
```

**Health Score Ring Component (`src/components/HealthScoreRing.jsx`):**
- SVG circle with `stroke-dasharray` and `stroke-dashoffset` animation
- Animate from 0 to `score` value on mount using `framer-motion`'s `useMotionValue` or CSS `@keyframes`
- Score displayed in center in `font-mono` large text
- Ring color: < 40 = red, 40–60 = amber, > 60 = green (use `--color-accent` purple for this demo since score is 47→72)
- Below ring: label text, changes based on score range

**3-Tier Income Visualization:**
- Horizontal stacked bar using plain `div` widths in Tailwind
- Floor = 53% width (₹9,800 / ₹18,500), `bg-[#EF4444]/60`
- Buffer gap = 43% width, `bg-[#F59E0B]/60` (target buffer ₹8,000)
- Growth = remaining, `bg-[#22C55E]/60`
- Current buffer fill shown as overlay/marker at ₹2,200 (very small — this makes the problem visible)
- Tooltip or label: "You need ₹5,800 more to reach safety buffer"

**Scheme Alert Card:**
- `bg-gradient-to-r from-[#6C63FF]/20 to-[#22C55E]/10`
- Border: `border border-[#6C63FF]/40`
- Animated pulse ring around the "3" badge: CSS `@keyframes pulse-ring`
- On tap: `navigate('/schemes')`
- The badge/notification icon in header should also show `3`

**Transaction List:**
- Map over last 4 `rajesh.transactions`
- Income items: green `+₹X`, expense items: red `-₹X`
- Category icon on left (use Lucide icons mapped by category)
- Debt repayments highlighted: small red "High Rate" pill next to EarlySalary/MoneyTap

---

### Page 3: `src/pages/ScamFirewall.jsx`

**Purpose:** Paste suspicious text → instant analysis → show which manipulation technique was used.

**Layout:**

```
┌─────────────────────────────────────┐
│  🛡 Scam Firewall                    │
│  Paste any message to analyse        │
├─────────────────────────────────────┤
│  ┌──────────────────────────────┐   │
│  │ Text area                    │   │
│  │ (placeholder text)           │   │
│  │                              │   │
│  └──────────────────────────────┘   │
│  [Try a sample] [Analyse →]         │
├─────────────────────────────────────┤
│  [Result panel — hidden until scan]  │
│                                     │
│  VERDICT: 🔴 SCAM DETECTED          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━         │
│  3 manipulation techniques found    │
│                                     │
│  ① False Promise of Safety          │
│     "guaranteed return" detected    │
│     [explanation text]              │
│                                     │
│  ② Artificial Urgency               │
│     "offer ends tonight" detected   │
│     [explanation text]              │
│                                     │
│  ③ Authority Impersonation          │
│     "RBI approved" detected         │
│     [explanation text]              │
│                                     │
│  💡 What this teaches you:          │
│  [Summary of techniques to          │
│   remember for the future]          │
└─────────────────────────────────────┘
```

**Pre-loaded sample text (for demo):**
```
🔥 LIMITED TIME — SEBI & RBI APPROVED INVESTMENT OPPORTUNITY 🔥

Dear Rajesh Ji,

You have been SPECIALLY SELECTED for our exclusive WhatsApp VIP Group. 
Guaranteed 40% returns in just 6 months! 100% safe, government approved.

⚡ OFFER ENDS TONIGHT — only 7 slots left!

1000+ investors already earning. My friend made ₹85,000 last month!

Send ₹5,000 now to lock your slot. This is strictly for selected members only.

WhatsApp: +91-XXXXXXXXXX
```

**Analysis Logic (`scamAnalysis.js` utility):**
```js
// src/utils/scamAnalysis.js
import scamData from '../data/scam-keywords.json';

export function analyseText(text) {
  const lower = text.toLowerCase();
  const findings = [];
  
  for (const pattern of scamData.patterns) {
    const matched = pattern.keywords.find(kw => lower.includes(kw));
    if (matched) {
      findings.push({ ...pattern, matchedKeyword: matched });
    }
  }
  
  const severity = findings.some(f => f.severity === 'high') ? 'danger'
    : findings.length > 0 ? 'warning' : 'safe';
  
  return { findings, severity, count: findings.length };
}
```

**Result Panel Behavior:**
- Hidden before analysis; slides in from bottom using `framer-motion`
- Verdict banner: full-width colored banner (`bg-red-500/20 border-red-500` for danger)
- Each technique card: numbered, expandable on tap to show full explanation
- Severity chips: `HIGH` in red, `MEDIUM` in amber, `LOW` in slate
- After result: health score boost fires → small toast appears "**+8 Fraud Awareness**"

**"Try a sample" button:** Fills textarea with the pre-written scam message above. Good for judges.

---

### Page 4: `src/pages/FinancialTwin.jsx`

**Purpose:** Two sliders → 3-line animated chart → show rupee difference between futures.

**Layout:**

```
┌─────────────────────────────────────┐
│  📈 Financial Twin                  │
│  See your possible futures           │
├─────────────────────────────────────┤
│  Monthly amount:        ₹2,000      │
│  ├──────────●──────────────────┤    │
│  ₹500                      ₹10,000  │
│                                     │
│  Risk level:            Balanced    │
│  ├──────●──────────────────────┤    │
│  Conservative          Growth       │
├─────────────────────────────────────┤
│  [Recharts line chart — 3 lines]    │
│                                     │
│   ₹14L ╱⋯⋯⋯⋯⋯ (optimistic)         │
│   ₹11L ╱──────── (median)          │
│   ₹8L  ╱········ (pessimistic)     │
│         5yr    10yr   15yr          │
├─────────────────────────────────────┤
│  At 10 years:                       │
│  Savings account: ₹8,40,000        │
│  Liquid fund:     ₹11,20,000       │
│  Difference:    + ₹2,80,000 ✓      │
│                                     │
│  📊 Probability of reaching goal    │
│  [Progress bar] 73%                 │
└─────────────────────────────────────┘
```

**Chart Data Calculation (pure JS, no API):**

```js
// src/utils/twinCalculations.js
export function calculateTwin(monthlyAmount, riskLevel) {
  const years = [1, 2, 3, 5, 7, 10, 15];
  const rates = {
    conservative: { pessimistic: 0.04, median: 0.055, optimistic: 0.07 },
    balanced:     { pessimistic: 0.05, median: 0.075, optimistic: 0.10 },
    growth:       { pessimistic: 0.06, median: 0.10,  optimistic: 0.14 }
  };
  const r = rates[riskLevel];
  
  const calc = (rate) => years.map(y => ({
    year: y,
    value: Math.round(monthlyAmount * 12 * ((Math.pow(1 + rate, y) - 1) / rate) * (1 + rate))
  }));
  
  const savingsAccount = years.map(y => ({
    year: y,
    value: Math.round(monthlyAmount * 12 * y * 1.035) // simple savings account approximation
  }));
  
  return {
    pessimistic: calc(r.pessimistic),
    median: calc(r.median),
    optimistic: calc(r.optimistic),
    savingsAccount,
    probability: Math.round(45 + (riskLevel === 'growth' ? 20 : riskLevel === 'balanced' ? 28 : 35))
  };
}
```

**Recharts Setup:**
```jsx
<ResponsiveContainer width="100%" height={240}>
  <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
    <XAxis dataKey="year" tickFormatter={y => `${y}yr`} tick={{ fill: '#94A3B8', fontSize: 11 }} />
    <YAxis tickFormatter={v => `₹${(v/100000).toFixed(0)}L`} tick={{ fill: '#94A3B8', fontSize: 11 }} />
    <Tooltip formatter={(v) => `₹${v.toLocaleString('en-IN')}`} contentStyle={{ background: '#1A1D27', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
    <Line type="monotone" dataKey="pessimistic" stroke="#EF4444" strokeDasharray="4 4" dot={false} strokeWidth={2} />
    <Line type="monotone" dataKey="median" stroke="#6C63FF" dot={false} strokeWidth={2.5} />
    <Line type="monotone" dataKey="optimistic" stroke="#22C55E" strokeDasharray="2 2" dot={false} strokeWidth={2} />
  </LineChart>
</ResponsiveContainer>
```

**Slider component:** Use Shadcn `<Slider>` for both. Monthly amount: min=500, max=10000, step=100, default=2000. Risk: use segmented control (3 buttons) rather than a continuous slider for clearer UX.

**10-year comparison panel:** Always shows the difference between savings account and median projection for the selected amount. Format as: rupee figure difference, `font-mono`, green highlight.

**Probability bar:** Not from data — calculate as `45 + (normalized risk bonus) + (normalized amount bonus)` capped at 85%. Animated fill on slider change.

---

### Page 5: `src/pages/SchemeEligibility.jsx`

**Purpose:** Show 3 matched govt schemes → tap one → step-by-step application guide.

**Layout — Schemes List View:**

```
┌─────────────────────────────────────┐
│  🏛 Your Scheme Matches              │
│  Based on your profile · 3 found    │
├─────────────────────────────────────┤
│  ┌────────────────────────────────┐ │
│  │ 🛡 Ayushman Bharat PM-JAY      │ │  ← Card 1
│  │ ₹5 lakh health coverage        │ │
│  │ ████████████████████ 97% match │ │
│  │ "Income below threshold. No    │ │
│  │  current health insurance."    │ │
│  │ [How to apply →]               │ │
│  └────────────────────────────────┘ │
│                                     │
│  [Card 2: e-SHRAM — 94% match]      │
│  [Card 3: PMSBY — 99% match]        │
└─────────────────────────────────────┘
```

**Scheme card design:**
- Left accent bar in scheme color
- Scheme name in `font-display font-semibold`
- Benefit amount in `font-mono text-xl` in scheme color
- Match percentage bar: `bg-{color}/20` track, `bg-{color}` fill, width = matchScore%
- Match reason text in `text-secondary text-sm italic`
- "How to apply →" ghost button

**Layout — Application Guide (sheet/modal):**

On tapping "How to apply →", a bottom sheet slides up (use `framer-motion` sliding from y=100% to y=0):

```
┌─────────────────────────────────────┐
│  ← Back   Ayushman Bharat PM-JAY   │
│  Free health coverage · ₹5 lakh    │
├─────────────────────────────────────┤
│  Step ① — Find your nearest CSC     │
│  ⏱ 10 min                          │
│  Visit locator.csccloud.in —        │
│  there are 3 centres within 5km     │
│  of your PIN code (411001).         │
│                                     │
│  Step ② — Carry these documents     │
│  ⏱ Prepare beforehand              │
│  Aadhaar + ration card + income     │
│  proof (2 Zomato screenshots)       │
│                                     │
│  Step ③ ...                         │
│  Step ④ ...                         │
├─────────────────────────────────────┤
│  💬 "One afternoon. That's all it   │
│  takes. This could save you from    │
│  borrowing again if you're sick."  │
└─────────────────────────────────────┘
```

**Implementation note:** Use `useState` for `selectedScheme`. When set, show the guide as a full-screen overlay with `position: fixed` and `framer-motion` y-slide animation. The guide maps over `scheme.applicationSteps[]`.

**Time indicator:** Each step has a `time` field from the JSON. Show as `⏱ 10 min` in a small amber pill.

On viewing a scheme, fire `triggerEvent('scheme-viewed')` for health score boost.

---

### Page 6: `src/pages/DocumentIntelligence.jsx`

**Purpose:** Upload any file → fake "reading" animation → show pre-written flagged analysis.

**Layout — Upload State:**

```
┌─────────────────────────────────────┐
│  📄 Document Intelligence           │
│  I find what they don't want        │
│  you to notice.                     │
├─────────────────────────────────────┤
│  ┌──────────────────────────────┐   │
│  │                              │   │
│  │  📁                          │   │
│  │  Tap to upload               │   │  ← Dashed border upload zone
│  │  Loan letter, insurance,     │   │
│  │  bank document               │   │
│  │                              │   │
│  └──────────────────────────────┘   │
│                                     │
│  — or use sample document —         │
│  [Use "QuickCash Loan Agreement"]   │
└─────────────────────────────────────┘
```

**Upload zone styling:** `border-2 border-dashed border-[#6C63FF]/40 rounded-2xl p-8 text-center cursor-pointer hover:border-[#6C63FF]/80 hover:bg-[#6C63FF]/5 transition-all`

**"Use sample document" button:** This is the reliable demo path. Always works regardless of what the judge uploads.

**Layout — Analyzing State (shown for ~2.5s):**

```
┌─────────────────────────────────────┐
│  Reading document...                │
│                                     │
│  [Animated progress bar]            │
│                                     │
│  ✓ Document classified: Personal Loan│
│  ✓ Extracting key clauses...        │
│  ✓ Checking interest method...      │  ← Items appear one by one
│  ✓ Scanning for hidden charges...   │
│  ✓ Verifying fee disclosures...     │
│  ⚡ 3 issues found                  │
└─────────────────────────────────────┘
```

The analyzing items are hardcoded strings that appear with 400ms stagger delays. Pure showmanship but very effective.

**Layout — Results State:**

```
┌─────────────────────────────────────┐
│  QuickCash Loan Agreement           │
│  Personal Loan · ₹25,000 · 24 mo   │
├─────────────────────────────────────┤
│  30-second summary                  │
│  ─────────────────────────         │
│  "This loan will cost you ₹34,840   │
│  total. I found 3 issues."          │
├─────────────────────────────────────┤
│  🔴 Issue 1 — HIGH                  │
│  Flat rate interest — you're        │
│  actually paying 33%, not 18%       │
│  [Expand for clause + explanation]  │
│                                     │
│  🔴 Issue 2 — HIGH                  │
│  Prepayment penalty of 5%           │
│  [Expand for clause + explanation]  │
│                                     │
│  🟡 Issue 3 — MEDIUM                │
│  Processing fee not in loan amount  │
│  [Expand for clause + explanation]  │
├─────────────────────────────────────┤
│  💡 Recommendation                  │
│  "Ask for reducing balance          │
│  amortization before signing..."    │
└─────────────────────────────────────┘
```

**Expandable issues:** Each issue is a collapsed card by default. On tap, `framer-motion` `AnimatePresence` expands to show:
1. The actual clause text (verbatim, in a `bg-[#0F1117] border-l-4 border-red-500 p-3 rounded` callout box, styled like code)
2. Plain-language explanation below it

**State machine:** `status: 'idle' | 'analyzing' | 'done'`. After upload/sample selection → set `analyzing` → after 2500ms → set `done`.

On results shown, fire `triggerEvent('document-analysed')`.

---

## 7. Shared Components

### `src/components/NavBar.jsx`

Bottom tab bar, fixed. 5 tabs: Home, Scam, Twin, Schemes, Docs.

```jsx
// Tab config
const TABS = [
  { path: '/', icon: 'home', labelKey: 'nav.home' },
  { path: '/scam', icon: 'shield-alert', labelKey: 'nav.scam' },
  { path: '/twin', icon: 'trending-up', labelKey: 'nav.twin' },
  { path: '/schemes', icon: 'landmark', labelKey: 'nav.schemes' },
  { path: '/docs', icon: 'file-text', labelKey: 'nav.docs' },
];
```

- Active tab: accent-colored icon + label, `bg-[#6C63FF]/10` pill background
- Inactive: `text-slate-500`
- `position: fixed; bottom: 0` with `pb-safe` padding for safe area
- Background: `bg-[#0F1117]/95 backdrop-blur-md border-t border-white/5`

### `src/components/LanguageToggle.jsx`

Three-segment button, always visible in top-right of header.

```jsx
const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'हि' },
  { code: 'mr', label: 'म' },
];
```

- Container: `flex rounded-xl bg-[#1A1D27] border border-white/7 p-0.5`
- Active segment: `bg-[#6C63FF] text-white rounded-lg px-2 py-0.5 text-xs font-semibold`
- Inactive: `text-slate-400 px-2 py-0.5 text-xs cursor-pointer hover:text-white`
- On change: `i18n.changeLanguage(code)`

### `src/components/VoiceInput.jsx`

Floating mic button, bottom-right corner, above navbar.

```jsx
// Fixed position, z-50
// Purple circle button with mic icon
// While listening: pulsing glow ring animation
// Shows transcript in a small toast above it
```

- `position: fixed; right: 1rem; bottom: 5rem; z-index: 50`
- Button: `w-12 h-12 rounded-full bg-[#6C63FF] shadow-lg flex items-center justify-center`
- Listening state: outer ring `animate-ping bg-[#6C63FF]/30 absolute inset-0 rounded-full`
- Small floating label above: shows "Say: 'scam', 'home', 'schemes'..."
- On voice result: brief toast "Navigating to Scam Firewall..."

### `src/components/ThinkingAnimation.jsx`

Reusable "AI is processing" animation. Used on Scam Firewall, Document Intelligence.

Three dots pulsing: `● ● ●` with staggered `animate-bounce` and a subtle glowing underline.

```jsx
// Optionally add a fake typing text: "Analysing patterns..."
// Shown for 1.2-2.5 seconds before results appear
```

---

## 8. App Shell — `src/App.jsx`

```jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import NavBar from './components/NavBar';
import VoiceInput from './components/VoiceInput';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import ScamFirewall from './pages/ScamFirewall';
import FinancialTwin from './pages/FinancialTwin';
import SchemeEligibility from './pages/SchemeEligibility';
import DocumentIntelligence from './pages/DocumentIntelligence';
import { useHealthScore } from './hooks/useHealthScore';

// Wrap routes in AnimatePresence for page transitions
// Pass healthScore context down or use Context API

function AppRoutes() {
  const location = useLocation();
  const showNav = location.pathname !== '/';  // hide nav on onboarding

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scam" element={<ScamFirewall />} />
          <Route path="/twin" element={<FinancialTwin />} />
          <Route path="/schemes" element={<SchemeEligibility />} />
          <Route path="/docs" element={<DocumentIntelligence />} />
        </Routes>
      </AnimatePresence>
      {showNav && <NavBar />}
      {showNav && <VoiceInput />}
    </>
  );
}
```

**Page transition wrapper:** Wrap each page content in:
```jsx
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -8 }}
  transition={{ duration: 0.2, ease: 'easeOut' }}
  className="min-h-screen bg-[#0F1117] pb-20"
>
  {/* page content */}
</motion.div>
```

---

## 9. Health Score Context

Use React Context to share `score` and `triggerEvent` across all pages.

```jsx
// src/context/HealthScoreContext.jsx
import { createContext, useContext, useState } from 'react';

const HealthScoreContext = createContext();

export function HealthScoreProvider({ children }) {
  const [score, setScore] = useState(47);
  const [firedEvents, setFiredEvents] = useState([]);
  const [toast, setToast] = useState(null);

  const triggerEvent = (eventType) => {
    const boosts = {
      'scam-detected': { points: 8, label: '+8 Fraud Awareness' },
      'scheme-viewed': { points: 6, label: '+6 Benefit Unlocked' },
      'document-analysed': { points: 7, label: '+7 Contract Literacy' },
      'twin-explored': { points: 4, label: '+4 Future Planning' }
    };
    if (firedEvents.includes(eventType)) return;
    const boost = boosts[eventType];
    if (!boost) return;
    setScore(prev => Math.min(prev + boost.points, 72));
    setFiredEvents(prev => [...prev, eventType]);
    setToast(boost.label);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <HealthScoreContext.Provider value={{ score, triggerEvent, toast }}>
      {children}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-[#22C55E] text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg animate-fade-in-down">
          {toast}
        </div>
      )}
    </HealthScoreContext.Provider>
  );
}

export const useHealthScoreContext = () => useContext(HealthScoreContext);
```

Wrap `<App>` in `<HealthScoreProvider>` in `main.jsx`.

---

## 10. Demo Script Timing Guide

For the 5-minute live demo — exactly what to do on each screen:

| Time | Action | What judge sees |
|---|---|---|
| 0:00 | App opens fresh | Onboarding screen, voice greeting |
| 0:20 | Fingerprint builds | 6 data points animate in — "this isn't a form" moment |
| 0:40 | Lands on Dashboard | Health score 47, scheme badge pulses |
| 1:00 | Tap scheme badge | 3 matched schemes, match % bars |
| 1:20 | Tap PM-JAY "How to apply" | Step-by-step guide, health score toast: +6 |
| 1:45 | Navigate to Scam Firewall (voice OR tap) | Empty text area |
| 2:00 | Tap "Try a sample" | Scam message fills textarea |
| 2:10 | Tap "Analyse" | Thinking animation |
| 2:15 | Results appear | 3 technique cards, health score toast: +8 |
| 2:45 | Navigate to Financial Twin | Two sliders, flat chart |
| 3:00 | Move monthly slider to ₹3,000 | Three lines diverge live |
| 3:15 | Change risk to "Growth" | Lines steepen, probability bar updates |
| 3:30 | Navigate to Document Intelligence | Upload screen |
| 3:40 | Tap "Use sample document" | Analyzing animation plays |
| 4:00 | Results: 3 flagged issues | Expand Issue 1 (flat rate trap) |
| 4:20 | Hit language toggle → हि | Key strings switch to Hindi live |
| 4:30 | Hit language toggle → मराठी | Switch to Marathi |
| 4:45 | Return to Dashboard | Health score now 72 (rose from 47) |
| 5:00 | End | "47 → 72. Four interactions. That's ArthSaathi." |

---

## 11. Accessibility Notes

- All interactive elements: minimum 44px tap target
- Color is never the only signal (always paired with icon or label)
- `prefers-reduced-motion`: wrap all `framer-motion` animations with `useReducedMotion()` check
- Focus states: visible purple outline for keyboard nav
- `aria-label` on all icon-only buttons (voice mic, language toggle)
- Financial numbers: always include `₹` and use `en-IN` locale formatting (`toLocaleString('en-IN')`)

---

## 12. Responsive Breakpoints

The app is designed mobile-first (`max-w-md`). On desktop it should still look good centered:

```css
/* Global layout */
.app-container {
  max-width: 448px;   /* max-w-md = 28rem */
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
}

/* On wider screens, add subtle gradient sides */
body {
  background: #080A10;  /* slightly darker than app bg */
}
```

On screens wider than `md`, the phone-frame effect makes it look intentionally mobile — which actually reinforces the "this is a mobile app" message to judges on laptops.

---

## 13. Quick Wins for Polish

These small details make the demo feel significantly more real:

1. **Rupee formatting everywhere:** `(18500).toLocaleString('en-IN')` → `18,500` (Indian number system, not Western)
2. **Date formatting:** Use `new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })`
3. **Loading shimmer on initial data load:** Even for static data, a 300ms shimmer before content appears feels real
4. **Haptic hint text:** Small text under every major CTA: "Used by 4.2 lakh users" (fake, but convincing)
5. **Scroll behavior:** `scroll-behavior: smooth`, hide scrollbar (`scrollbar-width: none`) for clean look
6. **Active press state:** `active:scale-95 transition-transform` on all buttons — feels native
7. **Chart tooltip formatting:** Always show `₹X,XX,XXX` format in tooltips, not raw numbers
8. **Empty states:** If a section has no data, show a purposeful empty state with an action, not a blank space
9. **Page title in header:** Each page has a consistent header with title + back button (except Dashboard which has the greeting)
10. **"Powered by ArthSaathi AI" badge:** Subtle badge on analysis results pages — reinforces the AI positioning

---

## 14. Files To Create First (Priority Order)

Build in this sequence to have a working demo fastest:

1. `package.json`, `vite.config.js`, `tailwind.config.js` — project scaffold
2. `src/data/*.json` — all data files
3. `src/i18n/*.json` + `src/i18n/index.js` — translations
4. `src/index.css` — CSS variables
5. `App.jsx` + routing shell
6. `NavBar.jsx` + `LanguageToggle.jsx` — global chrome
7. **Dashboard.jsx** — most important screen
8. **ScamFirewall.jsx** — most impressive feature for demo
9. **SchemeEligibility.jsx** — most tangible impact
10. **FinancialTwin.jsx** — best visual moment
11. **DocumentIntelligence.jsx** — good closer
12. **Onboarding.jsx** — build last, it's mostly animation
13. `VoiceInput.jsx` — add last, test in Chrome

---

*End of ArthSaathi Prototype Implementation Plan*
*Version: Hackathon Demo · Persona: Rajesh Kumar · Stack: Vite + React + Tailwind + Framer Motion + Recharts + i18next*
