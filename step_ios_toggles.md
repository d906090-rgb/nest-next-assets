
Markdown
# IMPLEMENTATION PLAN: iOS Style Toggles

**CONTEXT:**
The user wants to replace the default checkboxes in the "HI-END MODULES" section with animated iOS-style toggle switches.
Reference style: Dark gray track when OFF, Bright Green (or Cyan) track when ON, round white knob.

**RULES:**
1. Use the exact CSS provided to ensure smooth animation.
2. Update the HTML structure of the switches inside `.hi-end-item`.

---

## STEP 1: CSS Styling for iOS Switch

**Action:**
Add the following CSS to `styles.css`. This creates the visual look of the iPhone toggle.

**Code:**
```css
/* --- iOS Switch Container --- */
.switch-ios {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 28px;
    flex-shrink: 0; /* Prevent squeezing in flexbox */
}

/* Hide default HTML checkbox */
.switch-ios input {
    opacity: 0;
    width: 0;
    height: 0;
}

/* The Track (Background) */
.slider-ios {
    position: absolute;
    cursor: pointer;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: #363636; /* Dark Gray (Off State) */
    transition: .4s;
    border-radius: 34px;
    border: 1px solid rgba(255,255,255,0.1); /* Subtle border */
}

/* The Knob (Circle) */
.slider-ios:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 3px;
    bottom: 2px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3); /* Shadow for 3D effect */
}

/* --- Active State (ON) --- */
/* OPTION 1: Apple Green (Matches your reference) */
.switch-ios input:checked + .slider-ios {
    background-color: #4cd964; 
    border-color: #4cd964;
}

/* OPTION 2: Cyberpunk Cyan (Matches site theme - Optional) 
   Uncomment to use this instead:
.switch-ios input:checked + .slider-ios {
    background-color: #00e5ff; 
    border-color: #00e5ff;
    box-shadow: 0 0 10px rgba(0, 229, 255, 0.4); 
}
*/

/* Move the knob when checked */
.switch-ios input:checked + .slider-ios:before {
    transform: translateX(21px);
}

/* Focus/Hover state for better UX */
.switch-ios input:focus + .slider-ios {
    box-shadow: 0 0 1px #4cd964;
}
STEP 2: HTML Update (Apply styles to buttons)
Action:
Update the HTML inside the "HI-END MODULES" section. Replace the old <label class="switch"> with the new structure .switch-ios.
Instructions for AI:
Iterate through all items in the .hi-end-list and update the toggle code. Keep the onchange logic exactly as it was!
New HTML Pattern:
code
Html
<div class="hi-end-item">
    <div class="info">
        <div class="service-name">
            <span class="icon">⚡</span> <!-- Optional icon placeholder -->
            <span>Service Name Here</span>
        </div>
        <span class="price">9 900 ₽</span>
    </div>
    
    <!-- NEW IOS SWITCH STRUCTURE -->
    <label class="switch-ios">
        <!-- Keep your existing onchange function! -->
        <input type="checkbox" onchange="updateTotal(9900, this.checked)">
        <span class="slider-ios"></span>
    </label>
</div>
Example for "AI Avatar" item:
code
Html
<div class="hi-end-item">
    <div class="info">
        <span>AI Avatar</span>
        <span class="price">49 000 ₽</span>
    </div>
    <label class="switch-ios">
        <input type="checkbox" onchange="updateTotal(49000, this.checked)">
        <span class="slider-ios"></span>
    </label>
</div>
code
Code
### Как применить:

1.  Скопируйте код выше в файл `ios_toggles.md`.
2.  Напишите в чат Cursor: *"Apply the changes from @ios_toggles.md to create iPhone-style switches."*

**Почему это сработает:**
*   **CSS:** Я добавил `box-shadow` для кружочка (Knob), это придает тот самый "объем" как на iOS.
*   **Цвет:** По умолчанию я поставил **Apple Green (#4cd964)**, как на вашем скриншоте-примере.
    *   *Совет:* В коде CSS я оставил закомментированный кусок для **Cyberpunk Cyan**. Если зеленый покажется вам "чужим" на синем сайте, просто попросите Cursor: *"Uncomment Option 2 in CSS for Cyan color"*, и он поменяет цвет на неоново-голубой.