# AgroVision Analytics

Welcome to **AgroVision Analytics**, a modern Agritech Analytics SaaS platform built as a submission for **Frontend Wars 2026**. This project focuses on transforming raw agricultural sensor data into meaningful visual insights through an intuitive and premium frontend experience.

---

## Competition Overview

Frontend Wars 2026 is a national-level frontend-focused coding competition presented by Frontend Arena. It challenges developers to build exceptional digital experiences under time constraints, testing product thinking, frontend engineering, user experience, and creativity. 

In strict accordance with the competition rules, this project is a **frontend-only application**. There is no backend, no database, and no external API calls. All data visualization is powered by realistic, client-side mock datasets.

---

## Problem Statement

Farmers and agricultural experts need a reliable way to monitor their crop conditions. The challenge is to design a modern, responsive Agritech Analytics SaaS platform that transforms raw sensor data into clear, actionable visual insights. 

The platform visualizes key agricultural metrics—Soil Moisture, Temperature, and NPK (Nitrogen, Phosphorus, Potassium) levels—using color-coded graphs, interactive charts, and dashboard indicators to help users make informed farming decisions.

---

## Mandatory Features

1. **Soil Moisture Monitoring Dashboard**: A comprehensive view displaying current soil moisture, historical trends, multiple field monitoring, summary cards, and key recommendations.
2. **Temperature & NPK Sensor Visualization**: Interactive line, area, and comparison charts dedicated to tracking Temperature, Nitrogen, Phosphorus, and Potassium levels over time.
3. **Color-coded Charts**: Visual representation using standard color codes for quick scanning (Safe, Warning, and Critical values).
4. **Interactive Dashboard Indicators**: Visual widgets like gauges, dials, and progress indicators for Soil Health Scores, Moisture Levels, NPK Status, and Temperature Alerts.
5. **Responsive Analytics Interface**: A seamless and flawless experience across Desktop, Tablet, and Mobile devices.

---

## Project Goals

- **Modern SaaS Dashboard**: Deliver a commercial-grade, premium interface.
- **Responsive Design**: Ensure perfect usability on all screen sizes (Mobile-first to Desktop).
- **Interactive Analytics**: Provide engaging and animated charts for data storytelling.
- **Data Visualization**: Communicate complex agricultural data clearly.
- **Accessibility**: Build inclusive UI components with keyboard navigation and ARIA labels.
- **Performance**: Optimize for fast load times and smooth micro-animations.
- **Clean Architecture**: Maintain a highly organized, scalable, and modular codebase.

---

## Tech Stack

This project strictly adheres to the allowed technologies for Frontend Wars 2026:

- **Core**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Data Visualization**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons

*Note: As per competition rules, backend services, databases (Firebase, Supabase), external APIs, and disallowed frameworks (Next.js, Angular, Vue) are strictly avoided.*

---

## Folder Structure

A scalable and maintainable folder structure designed for premium React applications:

```text
src/
├── assets/          # Static assets (images, logos, fonts)
├── components/      # Reusable UI components
│   ├── ui/          # Generic UI elements (buttons, cards, inputs)
│   ├── charts/      # Specialized Recharts components
│   └── layout/      # Layout wrappers (Sidebar, Header, AppLayout)
├── features/        # Feature-specific modules (Dashboard, Sensors)
├── hooks/           # Custom React hooks
├── data/            # Mock JSON datasets and simulators
├── types/           # Global TypeScript interfaces and types
├── utils/           # Helper functions and formatters
├── styles/          # Global styles (index.css with Tailwind)
├── App.tsx          # Root application component
└── main.tsx         # Application entry point
```

---

## Design Principles

- **Premium SaaS**: The application must look like a high-end commercial platform.
- **Clean & Modern**: Uncluttered interfaces prioritizing data readability.
- **Agriculture-inspired**: Subtle nods to the domain without being overwhelming.
- **Professional & Minimal**: Focus on spacing, typography, and soft shadows.
- **Consistent Spacing**: Use a structured spacing system for a balanced layout.
- **Reusable Components**: Build a cohesive design system before assembling pages.

---

## Color System

A semantic and accessible color palette tailored for agricultural analytics:

- **Success (Green)**: Used for optimal conditions, healthy soil, and positive trends.
- **Warning (Yellow/Orange)**: Used for metrics approaching critical levels, requiring attention.
- **Error (Red)**: Used for critical alerts, dangerous temperatures, or severe nutrient deficiencies.
- **Information (Blue)**: Used for neutral data points, general information, and moisture levels.
- **Neutral (Grays/Slate)**: Used for backgrounds, text, borders, and structural elements to keep the focus on the data.

---

## Data Model

The application relies on realistic mock datasets simulating agricultural sensors. 

Example TypeScript interfaces:

```typescript
export interface SensorReading {
  timestamp: string;
  value: number;
  status: 'safe' | 'warning' | 'critical';
}

export interface SoilMoistureData {
  fieldId: string;
  fieldName: string;
  currentMoisture: number; // percentage
  history: SensorReading[];
}

export interface NPKData {
  nitrogen: SensorReading;
  phosphorus: SensorReading;
  potassium: SensorReading;
}

export interface TemperatureData {
  currentTemp: number; // Celsius
  history: SensorReading[];
}
```

---

## Component Architecture

- **Layout Components**: `Sidebar`, `TopNavigation`, `PageWrapper`
- **UI Primitives**: `Card`, `Badge`, `Button`, `StatWidget`
- **Data Visualization**: `MoistureTrendChart`, `NPKRadarChart`, `TemperatureAreaChart`
- **Indicators**: `HealthGauge`, `StatusProgress`, `AlertBanner`

---

## Development Phases

The project is executed in a structured, phased approach to maximize quality and scoring:

1. **Requirement Analysis**: Understand the problem and constraints.
2. **Architecture**: Setup Vite, TypeScript, and Tailwind configurations.
3. **Folder Structure**: Establish the structural skeleton.
4. **Reusable Components**: Build UI primitives (buttons, cards, typography).
5. **Core Features**: Implement dashboard layouts and integrate mock data.
6. **Animations**: Add Framer Motion transitions and chart animations.
7. **Responsiveness**: Ensure layout fluidity across all breakpoints.
8. **Accessibility**: Audit colors, contrast, ARIA labels, and keyboard support.
9. **Performance**: Optimize renders and asset loading.
10. **Final Polish**: Refine UX, spacing, and visual harmony.

---

## Coding Standards

- **TypeScript Only**: Strict typing across all components and data structures.
- **Functional Components**: Modern React with hooks. No class components.
- **Reusable Hooks**: Extract complex logic into custom hooks (e.g., `useSensorData`).
- **Clean Architecture**: Separation of concerns between UI, layout, and data logic.
- **No Duplicated Code**: Abstract repeating patterns into reusable utilities or components.

---

## AI Development Guidelines

For AI assistants collaborating on this project:

- **Read Documentation**: Always read project documentation and rules before writing code.
- **Phased Execution**: Never generate or implement everything in a single step. Work phase by phase.
- **Explain First**: Briefly explain implementation plans, reusable components, and edge cases before coding.
- **Production-Ready**: Write clean, maintainable, and highly polished code. 
- **UX First**: Always prioritize user experience and visual design (Product Designer mindset).
- **Consistency**: Maintain architectural and visual consistency across the entire codebase.

---

## Success Criteria

A successful submission will score highly across the official judging parameters:

- **Product Thinking**: Solves the core problem with a thoughtful feature set.
- **User Experience**: Intuitive flow, flawless usability, and overall satisfaction.
- **Visual Design**: High-end aesthetics, typography, layout, and color harmony.
- **Responsiveness**: Perfect execution on Mobile, Tablet, and Desktop.
- **Accessibility**: Inclusive design suitable for all users.
- **Code Quality**: Clean, maintainable, well-structured code with high component reusability.
- **Performance**: Fast, optimized, and snappy interactions.
- **Data Visualization**: Clear, accurate, and effective representation of complex data.
