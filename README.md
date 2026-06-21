# ArthSaathi 

ArthSaathi is a mobile-first financial literacy and companion application designed for underserved communities in India. Using the persona of Rajesh, a 34-year-old gig economy driver in Pune, the prototype demonstrates localized financial health metrics, scam detection, government scheme matching, interactive long-term planning, and document analysis.

## Features

- Onboarding: Voice-first onboarding walkthrough with custom selection criteria for targeting underserved users.
- Financial Health Score: Dynamic health score system that starts at 47/100 and updates as the user completes actions, checklists, or navigates the application.
- Scam Firewall: Suspicious message checker that scans text messages for scam indicators, patterns, and typical fraud keywords.
- Scheme Eligibility: Matches user parameters against real-world schemes (such as PM Shram Yogi Maan-dhan and PM SVANidhi) with step-by-step application guidelines.
- Financial Twin: Projections system utilizing sliders to simulate and visualize 10-year income projections with safety-net thresholds.
- Document Intelligence: Upload analyzer that flags high-risk clauses, hidden fees, and legal traps in financial agreements or loan applications.
- Multilingual Support: Localized language toggle supporting English, Hindi, and Marathi.
- Voice Navigation: Hands-free navigation utility that allows page jumps using simple voice commands.

## Technology Stack

- Core: React 18, Vite, Javascript
- Styling: Tailwind CSS, PostCSS, Autoprefixer
- State & Transitions: Framer Motion, Context API
- Data Visualization: Recharts
- Localization: i18next, react-i18next

## Project Structure

```
prototype/
├── public/
├── src/
│   ├── components/
│   │   ├── HealthScoreRing.jsx      - Circular animated visualization of the financial score
│   │   ├── LanguageToggle.jsx       - Language switching buttons (EN, HI, MR)
│   │   ├── NavBar.jsx               - Sticky bottom navigation bar for mobile layout
│   │   ├── PageHeader.jsx           - Consistent page titles and header blocks
│   │   ├── ThinkingAnimation.jsx    - Animated loading dots for processing states
│   │   └── VoiceInput.jsx           - Micro-activation component for speech features
│   ├── context/
│   │   └── HealthScoreContext.jsx   - Global state provider managing the user financial score
│   ├── data/
│   │   ├── document-analysis.json   - Mock checklist for contract clause verification
│   │   ├── rajesh.json              - Persona details and transaction mock records
│   │   ├── scam-keywords.json       - Rules and patterns for the message scanner
│   │   └── schemes.json             - Database of matched government schemes
│   ├── hooks/
│   │   └── useVoiceNav.js           - Hook processing Web Speech API input for routing
│   ├── i18n/
│   │   ├── en.json                  - English translation keys
│   │   ├── hi.json                  - Hindi translation keys
│   │   ├── mr.json                  - Marathi translation keys
│   │   └── index.js                 - i18next initialization logic
│   ├── pages/
│   │   ├── Dashboard.jsx            - Main screen with financial summaries and progress track
│   │   ├── DocumentIntelligence.jsx - Agreement audit interface with flagged items
│   │   ├── FinancialTwin.jsx        - Dual-projection chart simulator
│   │   ├── Onboarding.jsx           - Introductory profile questionnaire
│   │   ├── ScamFirewall.jsx         - SMS verification utility and fraud breakdown cards
│   │   └── SchemeEligibility.jsx    - Match meters and guidelines for national benefits
│   ├── utils/
│   │   ├── scamAnalysis.js          - Basic regex matcher logic for scanning messages
│   │   └── twinCalculations.js      - Projections engine algorithm for Recharts
│   ├── App.jsx                      - Router configuration and core wrapper
│   ├── index.css                    - Global Tailwind styles and custom layout constraints
│   └── main.jsx                     - Application entry point
├── package.json                     - Dependency list and project scripts
├── postcss.config.js                - PostCSS compilation setup
├── tailwind.config.js               - Custom Tailwind design system parameters
└── vite.config.js                   - Vite asset bundling configurations
```

## Getting Started

### Prerequisites

- Node.js (version 18 or above recommended)
- npm or yarn

### Installation

Install the required node packages:

```bash
npm install
```

### Running the Development Server

Start the Vite development server:

```bash
npm run dev
```

The application will run locally at: http://localhost:5173/

### Building for Production

Compile and optimize the application files for production:

```bash
npm run build
```

Verify the build outputs in the generated dist directory:

```bash
npm run preview
```

## Key Configuration Files

- tailwind.config.js: Sets up typography, customized color schemes (such as HSL palettes), border radiuses, and animations.
- postcss.config.js: Handles CSS nesting and vendor prefixes.
- vite.config.js: Configures the React compiler plugin and entry paths.
