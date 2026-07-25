# 🌱 AgroVision Analytics

<p align="center">
  <em>A premium, frontend-only Agritech Analytics SaaS Dashboard built for <b>Frontend Wars 2026</b>.</em>
</p>

---

## 🏆 Project Overview

**AgroVision Analytics** is a high-fidelity data visualization platform designed to help agricultural experts monitor field telemetry, sensor health, and localized crop conditions. 

In strict adherence to Frontend Wars rules, this project is **100% frontend-driven**. It relies on no backend, databases, or external API calls. Instead, it utilizes an advanced, dynamic client-side mock engine to simulate time-series telemetry data (Soil Moisture, Temperature, NPK levels) and reactive sensor states.

## ✨ Core Features & Innovations

### 1. Premium SaaS Design Language
We discarded traditional "dashboard templates" in favor of a bespoke, high-density, yet breathable UI inspired by top-tier modern software (Apple Health, Stripe, Vercel).
*   **Information Hierarchy:** Layouts are structured to answer *"What happened?"*, *"What is happening?"*, and *"What should I do?"* within 5 seconds.
*   **Color Theory:** Strictly semantic, accessible color palettes for safe (Green), warning (Amber), and critical (Red) states, avoiding visual noise.
*   **Micro-interactions:** Subtle Framer Motion transitions, elegant chart reveals, and refined hover states that enhance user engagement without distraction.

### 2. High-Performance Data Visualization (Recharts)
*   **Unified Telemetry:** Instead of scattering data across multiple graphs, we engineered a single, dense `ComposedChart` featuring shared crosshairs and synchronized tooltips for Moisture and Temperature overlays.
*   **Target-Driven Bullet Charts:** Replaced confusing radar charts with clear, linear bullet bars to track real-time Nitrogen, Phosphorus, and Potassium (NPK) against required ppm targets.
*   **Optimized Rendering:** Heavy charts are wrapped in `Suspense` and lazy-loaded to keep the initial TTI (Time to Interactive) incredibly low.

### 3. Responsive & Accessible Architecture
*   **Grid Mastery:** Built on a responsive 12-column Tailwind grid that gracefully stacks from 1920px 4K displays down to 360px mobile viewports with zero horizontal scrolling.
*   **Accessibility (a11y):** Formatted tabular data semantically (`thead`, `th`, `td`), enforced keyboard-navigable custom dropdowns, and ensured strict AA contrast ratios for all active status tags.

## 🛠️ Technology Stack

*   **Core:** React 19, TypeScript, Vite
*   **Styling:** Tailwind CSS (Custom thematic configuration)
*   **Visualization:** Recharts
*   **Animation:** Framer Motion
*   **Icons:** Lucide React

*(Note: No unauthorized frameworks like Next.js or external backend services were used.)*

## 📂 Project Structure

```text
src/
├── components/      # Modular, highly-reusable UI components
│   ├── ui/          # Primitives (Dropdowns, Buttons, Banners)
│   ├── charts/      # Recharts wrappers & wrappers
│   └── dashboard/   # Domain-specific layout components
├── features/        # High-level feature orchestrators (Dashboard Context)
├── data/            # Dynamic mock engine (Random walks, mean reversions)
├── types/           # Strict TypeScript interfaces
└── styles/          # Tailwind entry and minimal CSS reset
```

## 🚀 Getting Started

To run this project locally and explore the interface:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jeevanmarshal/AgroVison-Analytics.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Build for production:**
   ```bash
   npm run build
   ```

## 🎯 Judging Criteria Alignment

*   **Product Thinking:** Delivers a realistic, highly actionable command center for farmers, distilling raw sensor feeds into plain-English "AI Summaries".
*   **Visual Design:** Immaculate spacing (8pt grid system), cohesive corner radii (24px cards), and restrained use of borders and shadows.
*   **Code Quality:** Zero TypeScript errors, zero orphaned files, and strict DRY principles applied across all UI components.

---

<p align="center">
  <i>Submitted with ❤️ for Frontend Wars 2026.</i>
</p>
