Markdown
# IMPLEMENTATION PLAN: Neural Factory UI Upgrade

**CONTEXT:**
We are updating the UI of a dashboard called "Neural Factory".
Current state: A basic slider and a few social buttons.
Goal: Add accordions, presets, a high-end service list, a large social media grid, and a premium training block.
Style: Cyberpunk, Neon Blue/Cyan, Dark Background.

**RULES FOR AI:**
1.  DO NOT remove existing logic unless instructed.
2.  Use the exact class names provided in snippets.
3.  Write clean, commented code.
4.  Proceed step-by-step. Do not do everything at once.

---

## STEP 1: HTML Structure Restructuring (Accordions)

**Action:**
Wrap the existing content of the "Configuration HUD" into collapsible `<details>` sections to clean up the UI.

**Instructions:**
1.  Locate the main container where the current "Power Slider" and "Social Networks" are located. Let's call it `.factory-container` (or the equivalent in the current code).
2.  Create TWO `<details>` tags with the class `cyber-accordion`.
3.  **Accordion 1:** Title "⚙️ КОНФИГУРАТОР ЗАВОДА". Move the existing slider and current social buttons inside this accordion.
4.  **Accordion 2:** Title "🚀 HI-END МОДУЛИ". Leave it empty for now.
5.  **Bottom Block:** Below the accordions, create a placeholder `div` for the "Training Block" (High-Ticket item).

**Code Reference (HTML Structure):**
```html
<div class="factory-container">
    <!-- BLOCK 1 -->
    <details open class="cyber-accordion">
        <summary class="accordion-header">
            <h3>⚙️ КОНФИГУРАТОР ЗАВОДА</h3>
            <span class="arrow">▼</span>
        </summary>
        <div class="accordion-content">
            <!-- MOVE EXISTING SLIDER CODE HERE -->
            <!-- MOVE EXISTING SOCIAL BUTTONS HERE -->
        </div>
    </details>

    <!-- BLOCK 2 -->
    <details class="cyber-accordion">
        <summary class="accordion-header">
            <h3>🚀 HI-END МОДУЛИ</h3>
            <span class="arrow">▼</span>
        </summary>
        <div class="accordion-content">
            <!-- Will be filled in Step 3 -->
        </div>
    </details>

    <!-- BLOCK 3 -->
    <div class="training-block-wrapper">
        <!-- Will be filled in Step 4 -->
    </div>
</div>
STEP 2: Implement "Presets" and "Social Grid"
Action:
Update the content inside the first Accordion. Add 3 Preset buttons above the slider and replace the old social buttons with a large Grid.
Instructions:
Presets: Inside the first accordion, above the slider, add a div with class presets-wrapper containing 3 cards: "Путь к звёздам", "Скорость легенд", "Грань возможного".
Social Grid: Remove the old social buttons list. Create a new div with class socials-grid.
Add Items: Add the following items to the grid (use data-price attribute):
Telegram (0 rub)
VK Video (0 rub)
Shorts (15 000)
Reels (15 000)
OK (10 000)
Pinterest (15 000)
Facebook (15 000)
Linked IN (25 000)
Дзен (35 000)
Wordpress (35 000)
Threads (40 000)
MAX (50 000)
Tik-Tok (60 000)
Code Reference (Presets HTML):
code
Html
<div class="presets-wrapper">
    <div class="preset-card" onclick="applyPreset('eco')">
        <h4>Путь к звёздам</h4> <p>Эконом</p>
    </div>
    <div class="preset-card active-preset" onclick="applyPreset('optimum')">
        <h4>Скорость легенд</h4> <p>Оптимальный</p>
    </div>
    <div class="preset-card" onclick="applyPreset('max')">
        <h4>Грань возможного</h4> <p>Промышленный</p>
    </div>
</div>
Code Reference (Social Grid Item Example):
code
Html
<div class="social-card" onclick="toggleSocial(this, 15000)">
    Shorts <span>15к ₽</span>
</div>
STEP 3: Implement "Hi-End Modules" List
Action:
Fill the second Accordion with premium toggle switches.
Instructions:
Inside the second accordion (🚀 HI-END МОДУЛИ), create a list of items.
Each item must have a text description, a price, and a Toggle Switch (checkbox).
List of services:
Авто генерация музыки (10 треков) - 990 ₽
Кастомная генерация музыки (10 треков) - 9 900 ₽
Лейбл дистрибуция - 49 000 ₽
Клонирование голоса - 24 900 ₽
AI Avatar - 49 000 ₽
3D модель - 9 900 ₽
Code Reference (Item Structure):
code
Html
<div class="hi-end-item">
    <div class="info">
        <span>AI Avatar</span>
        <span class="price">49 000 ₽</span>
    </div>
    <label class="switch">
        <input type="checkbox" onchange="updateTotal(49000, this.checked)">
        <span class="slider round"></span>
    </label>
</div>
STEP 4: Implement "Training Block" (Gold)
Action:
Create the standalone styling block for the 490,000 RUB product.
Instructions:
In the .training-block-wrapper (created in Step 1), add the special card.
It needs a unique class training-card for golden styling.
Code Reference:
code
Html
<div class="training-card" onclick="toggleTraining(this)">
    <div class="training-glow"></div>
    <div class="training-content">
        <div class="icon">🎓</div>
        <div class="text">
            <h4>Обучение созданию заводов</h4>
            <p>Стань архитектором нейросетей</p>
        </div>
        <div class="training-price">490 000 ₽</div>
    </div>
</div>
STEP 5: CSS Styling (Cyberpunk Theme)
Action:
Add CSS to styles.css. Ensure it matches the dark/neon aesthetics.
Instructions:
Accordions: Style .cyber-accordion with background: rgba(13, 25, 41, 0.7) and border-radius: 12px.
Grid: Use display: grid with grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)) for .socials-grid.
Social Cards: Give them a border #00e5ff. On .selected class, fill background with cyan.
Training Card: Give it a border: 1px solid #ffd700 (Gold) and a slight box-shadow.
Crucial CSS Snippet:
code
CSS
/* GRID SYSTEM */
.socials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 8px;
    margin-top: 10px;
}
.social-card {
    border: 1px solid #00e5ff;
    border-radius: 6px;
    padding: 8px;
    text-align: center;
    cursor: pointer;
    font-size: 0.8rem;
    color: #fff;
    transition: 0.2s;
}
.social-card.selected {
    background: #00e5ff;
    color: #000;
}
.training-card {
    border: 1px solid #ffd700;
    background: linear-gradient(135deg, rgba(50,50,50,0.9), rgba(0,0,0,0.9));
    padding: 20px;
    border-radius: 12px;
    margin-top: 20px;
    cursor: pointer;
}
.training-card.active-training {
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
}
STEP 6: JavaScript Logic
Action:
Wire up the buttons to calculate the total price.
Instructions:
Create a variable let totalCost = 0;.
Create function applyPreset(type):
If 'eco': set slider to 10.
If 'optimum': set slider to 40.
If 'max': set slider to 100.
Create function toggleSocial(element, price):
Toggle class .selected on the element.
If selected: totalCost += price.
If deselected: totalCost -= price.
Create function toggleTraining(element):
Toggle class .active-training.
Update price (+- 490000).
Important: Ensure the "Total Price" display in the HTML is updated every time these functions run.
code
JavaScript
function toggleSocial(el, price) {
    el.classList.toggle('selected');
    if (el.classList.contains('selected')) {
        updateTotal(price, true);
    } else {
        updateTotal(price, false);
    }
}
code
Code
---

### Как пользоваться этим файлом:

1.  Скопируйте весь код выше в файл `plan.md`.
2.  В Cursor откройте чат (Ctrl+L или Cmd+L).
3.  Напишите: *"I have a plan in @plan.md. Let's start with STEP 1. Please update the HTML structure."*
4.  После того как он сделает шаг 1, пишите: *"Great, now proceed to STEP 2"*.

**Почему это сработает:**
Вы даете "дешевой" нейросети не абстрактную задачу "сделай красиво", а **инструкцию по сборке LEGO**. Ей не нужно думать над дизайном или логикой, ей нужно просто вставить готовые куски в нужные места.