Вот итоговый, **максимально подробный и структурированный файл**.

Сохрани его как **`UPGRADE_PLAN.md`** в корне твоего проекта.

Затем просто пиши в чат Cursor:
1.  *"Read UPGRADE_PLAN.md and execute Phase 1"*
2.  *"Now execute Phase 2"*
3.  ...и так до финала.

***

```markdown
# 🚀 FULL UPGRADE PLAN: "Neuro Factory" (RU + GEO Optimization)

**Project Context:**
- **Stack:** React (Vite) + Tailwind CSS + Node.js.
- **Design Theme:** Cyberpunk / Deep Space (Dark bg, Neon Cyan `#00FFFF`, Gold `#FFD700`).
- **Target Market:** Russia (Yandex, Google RU).
- **Goal:** Modernize visuals, Switch to "Constructor" pricing, Optimize for AI Search (GEO).

**Files the AI must read before starting:**
- `index.html`
- `tailwind.config.js`
- `src/index.css`
- `src/App.tsx` (or `src/main.tsx`)

---

## 🟢 PHASE 1: Typography (Visual Upgrade)
**Goal:** Replace "Heavy" display fonts with modern, readable geometric fonts (Manrope + Inter).

### Step 1.1: Update Global CSS
**Action:** Open `src/index.css`.
1. Remove any old font imports (e.g., Russo One, Impact).
2. Add this import at the very top:
   ```css
   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Manrope:wght@500;600;700;800&display=swap');
   ```
3. Update the `body` rule:
   ```css
   body { font-family: 'Inter', sans-serif; }
   ```

### Step 1.2: Update Tailwind Config
**Action:** Open `tailwind.config.js`.
1. Locate `theme.extend.fontFamily`.
2. Update or Create these keys:
   ```js
   fontFamily: {
     sans: ['Inter', 'sans-serif'],      // For body text
     heading: ['Manrope', 'sans-serif'], // For H1-H6 headers
   },
   ```

### Step 1.3: Apply Classes
**Action:** Ensure all Header components (`h1` through `h6`) in the code use the `font-heading` class (or style) to apply Manrope.

---

## 🟢 PHASE 2: Pricing Calculator (The "Constructor" Logic)
**Goal:** Replace static price cards with an interactive "Factory Builder".

### Step 2.1: Install Icons
Run in terminal: `npm install lucide-react`

### Step 2.2: Create Component
**Action:** Create `src/components/PricingCalculator.tsx`.
**Requirements:**
- **Visuals:** Dark card, Neon Cyan borders (`border-cyan-400`), Glassmorphism (`backdrop-blur`).
- **State Logic:**
  1. **Base Fee:** 49,900 ₽ (Fixed, Locked Checkbox).
  2. **Volume Slider:** Range 1-100 units.
     - 1-10 units = 500 ₽/unit.
     - 11-40 units = 300 ₽/unit.
     - 41+ units = 150 ₽/unit.
  3. **Add-ons (Toggles):**
     - YouTube Shorts (+15,000 ₽ Setup).
     - Instagram Reels (+15,000 ₽ Setup).
     - AI Avatar (+50,000 ₽ Setup).
- **Output (Right Side):**
  - **"Разовый платеж" (One-Time):** Sum of Base + Addons.
  - **"Ежемесячный расход" (Monthly):** (Volume * PricePerUnit * 30).

### Step 2.3: Integrate
**Action:** Open `src/App.tsx`, import `<PricingCalculator />`, and replace the existing Pricing section.

---

## 🟣 PHASE 3: GEO (Generative Engine Optimization) & SEO
**Goal:** Make the site understandable for both Yandex and AI Models (ChatGPT, Perplexity).

### Step 3.1: Install Helmet
Run in terminal: `npm install react-helmet-async`

### Step 3.2: Configure Metadata & JSON-LD
**Action:** In `src/App.tsx`, inside the main component return, add this `<Helmet>` block:

```tsx
<Helmet>
  {/* Basic SEO */}
  <html lang="ru" />
  <title>Нейро Завод — Автоматизация контента и нейросети под ключ</title>
  <meta name="description" content="Платформа для автоматической генерации видео и постов с помощью нейросетей Sora 2, Kling, ChatGPT. Экономия до 1 млн рублей в год на SMM." />

  {/* Region / GEO Tags */}
  <meta property="og:locale" content="ru_RU" />
  <meta name="geo.region" content="RU" />
  <meta name="geo.placename" content="Moscow" />
  <link rel="canonical" href="https://tecai.ru" />

  {/* JSON-LD for AI Models (Schema.org) */}
  <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Нейро Завод (Neuro Factory)",
        "description": "Автоматизированная система генерации контента для соцсетей с использованием нейросетей.",
        "provider": { "@type": "Organization", "name": "TecAI", "url": "https://tecai.ru" },
        "areaServed": "RU",
        "offers": {
          "@type": "Offer",
          "price": "49900",
          "priceCurrency": "RUB",
          "name": "Базовая настройка платформы"
        }
      }
    `}
  </script>
</Helmet>
```

### Step 3.3: Create FAQ Section (Critical for AI Answers)
**Action:** Create `src/components/FAQSection.tsx`.
- **Content:**
  - **Q:** Что такое Нейро Завод? **A:** Это платформа, объединяющая Sora 2, ChatGPT и Kling для авто-постинга.
  - **Q:** Сколько стоит? **A:** Базовая настройка 49 900р. Далее оплата только за генерацию (от 150р за пост).
- **Implementation:** Add this component to `App.tsx` below the Calculator.

---

## 🟢 PHASE 4: Technical Finalization
**Goal:** Ensure search crawlers can index the SPA correctly.

### Step 4.1: Robots.txt
**Action:** Create `public/robots.txt`:
```text
User-agent: *
Allow: /
Host: https://tecai.ru
Sitemap: https://tecai.ru/sitemap.xml
```

### Step 4.2: Sitemap.xml
**Action:** Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
      <loc>https://tecai.ru/</loc>
      <lastmod>2024-05-20</lastmod>
      <priority>1.0</priority>
   </url>
</urlset>
```

---

## 🔴 FINAL CHECKLIST
1. Run `npm run dev`.
2. Check if fonts are **Manrope/Inter**.
3. Check if Calculator updates prices dynamically.
4. Check if `<head>` contains the new Title and JSON-LD script.
5. Run `npm run build` to verify no errors.
```