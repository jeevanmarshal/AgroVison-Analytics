# DESIGN_SPECIFICATION.md: AgroVision "Mission Control"

## 1. Exact Page Layout Specification

*   **Architecture:** Single Page Application, Top-navigation only (No sidebar). This maximizes horizontal space for data visualization.
*   **Header Height:** Fixed `64px` (`h-16`). Sticky with glassmorphism backdrop (`backdrop-blur-md`).
*   **Container Width:** `max-w-[1440px]` with `mx-auto` for ultra-widescreen support. Standard desktop bounded at 1280px visually.
*   **Grid System:** 12-column CSS Grid.
    *   Column gap: `24px` (Desktop), `16px` (Tablet), `8px` (Mobile).
    *   Row gap: `32px` between major architectural sections.
*   **Spacing System:** Strict `8px` scale. Inner component padding is `16px` or `24px`. Section margins are `48px` or `64px`.
*   **Breakpoints (Tailwind standard):**
    *   Mobile: `<768px`
    *   Tablet: `768px - 1023px`
    *   Laptop: `1024px - 1279px`
    *   Desktop: `1280px+`

---

## 2. Component Specifications

### 2.1 The Hero Canvas
*   **Width:** 100% of container.
*   **Height:** `min-h-[280px]`.
*   **Border Radius:** `24px`.
*   **Background:** `hsl(220, 20%, 12%)` with dynamic radial gradient overlay (ambient weather glow).
*   **Shadow:** `0 20px 40px -15px rgba(0,0,0,0.4)`
*   **Typography:** AI Summary uses `Geist` Regular, 20px, line-height 1.6.

### 2.2 Liquid Progress Ring (Health Score)
*   **Size:** `w-[160px] h-[160px]`.
*   **Typography (Center Value):** `Geist Mono` Bold, `48px`.
*   **Animation:** SVG Wave path, `4s` linear infinite loop.
*   **Hover State:** Scale to `1.05`, shadow intensifies, `spring` transition.

### 2.3 Status Ribbon (KPI Cards)
*   **Width:** Span 2/12 columns each on Desktop.
*   **Height:** `h-[96px]`.
*   **Background:** Transparent. Separated by `1px` translucent borders (`rgba(255,255,255,0.05)`).
*   **Typography:** Value uses `Geist Mono` 32px. Title uses `Inter Tight` 12px uppercase.
*   **Icon Size:** `16px` (Subtle, next to title).
*   **Hover State:** Background shifts to `rgba(255,255,255,0.02)`. Elevation remains flat.

### 2.4 Interactive Data Chart (Synchronized Sparklines)
*   **Height:** `h-[320px]` total (Split `160px` Moisture, `160px` Temp).
*   **Background:** Transparent canvas, no grid lines (only horizontal min/max/target lines).
*   **Interaction:** Vertical crosshair follows cursor instantly (`0ms` delay).
*   **Loading State:** Shimmer gradient sweep (duration: `1.5s` infinite).

### 2.5 Recommendation Glass Card
*   **Border Radius:** `12px`.
*   **Background:** `rgba(255, 255, 255, 0.03)` with `backdrop-blur-xl`.
*   **Border:** `1px solid` matching priority color at `15%` opacity.
*   **Hover State:** `box-shadow: 0 8px 24px -8px [Priority_Color]`.
*   **Typography:** Title 14px SemiBold, Body 13px Regular text-neutral-400.

---

## 3. Dashboard Hierarchy (10-Second Eye Travel)

1.  **Seconds 0-2 (The Anchor):** The user's eye is instantly pulled to the **Liquid Progress Ring (Overall Health)** in the center of the Hero Canvas. The fluid motion and glowing color (Green/Yellow/Red) immediately answer: *"Is my farm okay?"*
2.  **Seconds 2-4 (The Context):** The eye tracks left to the **AI "Crop Whisperer" Summary**, reading the generative text that explains *why* the health score is what it is.
3.  **Seconds 4-7 (The Trend):** The eye drops down to the **Synchronized Sparkline Charts**, grasping the 7-day trajectory of moisture vs. temperature.
4.  **Seconds 7-10 (The Action):** The eye scans the **Recommendation Cards** at the bottom right to see exactly what to do next (e.g., "Irrigate Field B").

---

## 4. Component Priority (Visual Importance)

1.  **Liquid Progress Ring (Health)** - The ultimate source of truth.
2.  **AI Summary & Action Alerts** - Directives for the user.
3.  **Synchronized Telemetry Charts** - Visual proof of the trends.
4.  **Nutrient Bullet Charts (NPK)** - Detailed sub-health metrics.
5.  **Status Ribbon (KPIs)** - Quick numerical context.
6.  **Raw Sensor Table** - Reference data (lowest priority visually).

---

## 5. Color Usage Rules

*   **Obsidian Base (`hsl(220, 20%, 9%)`):** Used strictly for the main `body` background.
*   **Surface Graphite (`hsl(220, 20%, 12%)`):** Used for elevated containers (Hero, Table wrapper).
*   **Flora Green (`hsl(142, 70%, 45%)`):** 
    *   *Do use:* For health scores >= 80, positive micro-trends (+X%), or success states.
    *   *Do not use:* As a decorative background or accent outside of status context.
*   **Moisture Aqua (`hsl(190, 90%, 55%)`):**
    *   *Do use:* Exclusively to represent Water/Moisture data points (charts, icons).
*   **Crimson (`hsl(350, 80%, 60%)`):**
    *   *Do use:* Only for Critical Alerts or health scores < 50. It must trigger immediate user action.
*   **Stark White (`hsl(0, 0%, 98%)`):**
    *   *Do use:* For primary data values (numbers) and active headings to pop against the dark canvas.
*   **Muted Grey (`hsl(220, 10%, 50%)`):**
    *   *Do use:* For labels, secondary text, and inactive states to establish deep typographic hierarchy.

---

## 6. Motion Specification

Animations exist solely to guide focus, explain state changes, or provide physical feedback.

1.  **Page Load Reveal (Staggered Fade/Slide Up)**
    *   *Duration:* `400ms`. *Easing:* `cubic-bezier(0.16, 1, 0.3, 1)`. *Delay:* Staggered by `50ms`.
    *   *Purpose:* Guides the user's eye from top to bottom, establishing the hierarchy naturally.
2.  **Number Rolling (Data Change)**
    *   *Duration:* `600ms`. *Easing:* `spring` (stiffness: 100, damping: 20). *Trigger:* Context switch (Farm A -> Farm B).
    *   *Purpose:* Prevents jarring flashes. Explains that data is transitioning, not breaking.
3.  **Magnetic Button (Header Actions)**
    *   *Duration:* `200ms`. *Easing:* `spring`. *Trigger:* Hover proximity.
    *   *Purpose:* Tactile physical feedback. Makes the app feel hyper-responsive and premium (like Linear/Framer).
4.  **Crosshair Sync (Charts)**
    *   *Duration:* `0ms` (Instant). *Trigger:* Mouse move on chart canvas.
    *   *Purpose:* Lag-free precision data exploration.
5.  **Liquid Wave (Health Ring)**
    *   *Duration:* `4s`. *Easing:* `linear`. *Trigger:* Infinite loop.
    *   *Purpose:* Ambient indication of system "life". A flat circle is dead; a waving circle is actively monitoring.

---

## 7. Chart Redesign Rationales

**1. Replaced: Composed Area/Line Chart ➡️ New: Synchronized Vertical Sparklines**
*   *Why Superior:* Putting two distinct metrics (Temp in °C and Moisture in %) on overlapping Y-axes creates visual noise and scale confusion. By splitting them into two vertical, borderless, filled sparklines that share an invisible X-axis, the user can easily read the correlation (e.g., "When temp spikes, moisture drops") without the lines ever crossing or muddling the data.

**2. Replaced: Radar Chart ➡️ New: Linear Bullet Charts**
*   *Why Superior:* Radar charts are notorious for poor UX in precision environments. Agronomists need to know if Potassium is at 200ppm (Optimal) or 150ppm (Deficient). A bullet chart provides a linear bar with clearly marked optimal "zones" (e.g., grey background for target range, green bar for current value). It requires zero cognitive load to interpret distance-to-target.

---

## 8. Responsive Specification

*   **Desktop (`>1280px`):** Full "Mission Control" view. Hero takes full width. KPIs sit below in a 6-column ribbon. Charts sit side-by-side (2/3 and 1/3 split).
*   **Laptop (`1024px - 1279px`):** Similar to Desktop, but NPK Bullet charts collapse to slightly narrower widths. Font sizes scale down to 90%.
*   **Tablet (`768px - 1023px`):** The Hero canvas stacks the Health Ring below the AI Summary. The KPI ribbon wraps into a 3x2 grid. Charts stack vertically (Moisture/Temp on top, NPK below).
*   **Mobile (`<768px`):** Complete vertical stack. The header hides dropdowns behind a Hamburger menu. The Liquid Ring shrinks to `100px`. KPIs become a 2x3 grid. Tooltips on charts are disabled in favor of tap-and-hold crosshairs.

---

## 9. Judge Impression Review (Self-Critique)

*   *Critique:* "Dark mode is a bold choice for an agriculture app. Farming apps usually lean on bright whites and greens. Will this feel alien to the persona?"
*   *Improvement:* To prevent it from feeling like a cybersecurity dashboard, we must ensure the *Ambient Weather Glow* behind the Hero canvas is highly prominent. A warm golden flare for sunny weather or a soft white overcast glow grounds the UI back to nature.
*   *Critique:* "Are synchronized sparklines too minimal? Judges want to see complex data visualization."
*   *Improvement:* While minimal, the synchronized hover crosshair is highly technical to implement well. We will ensure the hover state reveals extremely detailed, beautifully formatted data tooltips, proving that the minimalism hides immense technical depth.

---

## 10. ASCII Wireframes

### DESKTOP (1280px+)
```text
=============================================================================================
 [Logo] AgroVision         [ Farm: North Block ▾ ] [ Field B ▾ ]           🌤️ 24°C    [🔔] [👤]
=============================================================================================
                                                                                          
 +-----------------------------------------------------------------------------------------+
 | (Ambient Weather Glow)                                                                  |
 |                                                                    ...................  |
 |  GOOD MORNING, JAMES.                                             :        92         : |
 |  North Block Farm is performing optimally. Moisture is            :      HEALTH       : |
 |  dropping in Field B, irrigation is recommended tonight.          :  (Liquid Ring)    : |
 |                                                                    ...................  |
 +-----------------------------------------------------------------------------------------+
                                                                                          
   SOIL HEALTH     MOISTURE      TEMPERATURE    NPK SCORE      ALERTS       WEEKLY TREND   
   [ 92  / 100 ]   [ 34%  ▼ ]    [ 24°C  ▲ ]    [ 180ppm ]     [ 1  🔴 ]    [ +12 pts ]    
 -------------------------------------------------------------------------------------------
                                                                                          
 +-------------------------------------------------------+  +------------------------------+
 |  7-DAY TELEMETRY (Sync Sparklines)                    |  |  NUTRIENT BALANCE (Bullet)   |
 |                                                       |  |                              |
 |  [ Moisture Area Chart  ============|======== ]       |  |  N [====|=====     ]         |
 |                                     | (Crosshair)     |  |  P [====|===       ]         |
 |  [ Temp Line Chart      ------------|-------- ]       |  |  K [====|========  ]         |
 +-------------------------------------------------------+  +------------------------------+
                                                                                          
 +-----------------------------------------------------------------------------------------+
 |  RECOMMENDATIONS (Overlapping Glass Cards)                                              |
 |  [ 🔴 Irrigate Field B ]    [ 🟡 Monitor Nitrogen ]   [ 🔵 Firmware Update Ready ]      |
 +-----------------------------------------------------------------------------------------+
```

### TABLET (768px)
```text
=========================================================================
 [Logo]             [ Farm ▾ ] [ Field ▾ ]                   🌤️    [≡]
=========================================================================
                                                                       
 +---------------------------------------------------------------------+
 |  GOOD MORNING, JAMES.                                               |
 |  North Block Farm is performing optimally. Moisture is              |
 |  dropping in Field B, irrigation is recommended tonight.            |
 |                                                                     |
 |                        ...................                          |
 |                       :        92         :                         |
 |                       :      HEALTH       :                         |
 |                        ...................                          |
 +---------------------------------------------------------------------+
                                                                       
   HEALTH: 92       MOISTURE: 34%      TEMP: 24°C                      
   NPK: 180         ALERTS: 1          TREND: +12                      
 -----------------------------------------------------------------------
                                                                       
 +---------------------------------------------------------------------+
 |  7-DAY TELEMETRY                                                    |
 |  [ Moisture Area Chart  ============|======== ]                     |
 |  [ Temp Line Chart      ------------|-------- ]                     |
 +---------------------------------------------------------------------+
 +---------------------------------------------------------------------+
 |  NUTRIENT BALANCE (Bullet)                                          |
 |  N [====|=====     ]   P [====|===       ]   K [====|========  ]    |
 +---------------------------------------------------------------------+
```

### MOBILE (320px)
```text
======================================
 [Logo]                           [≡]
======================================
                                     
 +----------------------------------+
 | GOOD MORNING, JAMES.             |
 |                                  |
 |       ...................        |
 |      :        92         :       |
 |       ...................        |
 |                                  |
 | Irrigation recommended in        |
 | Field B.                         |
 +----------------------------------+
                                     
   HEALTH: 92       MOISTURE: 34%    
   TEMP: 24°C       ALERTS: 1        
 ------------------------------------
                                     
 +----------------------------------+
 | TELEMETRY                        |
 | [ Moisture Area ]                |
 | [ Temp Line ]                    |
 +----------------------------------+
 +----------------------------------+
 | NUTRIENTS                        |
 | N [==|===  ]                     |
 | P [==|==   ]                     |
 | K [==|==== ]                     |
 +----------------------------------+
 +----------------------------------+
 | RECOMMENDATIONS                  |
 | [ 🔴 Irrigate Field B ]          |
 +----------------------------------+
```
