---
applyTo: '**'
---
Junior Front-End Developer Assignment
Goal
Build a simple multi-step application wizard with a loan payment calculator using vanilla JavaScript.
UI/UX should feel Swedbank-like: clean, simple, calm, and professional. Visual perfection is not
required.
General Requirements
• HTML, CSS, JavaScript only (no frameworks)
• Single-page application (SPA-style)
• Works in modern browsers (Chrome / Firefox)
• Delivered as a ZIP file (open via index.html)
Flow
Intro: short intro + “Start application” button
Wizard (4 steps, one visible at a time)
Step 1 – Employment status
• Radio buttons (Employed / Self-employed / Unemployed)
• Required
Step 2 – Income + Loan Calculator
• Income dropdown (e.g. <1000€, 1000–2000€, >2000€)
• Loan amount input or slider
• Loan period dropdown (12 / 24 / 36 months)
• Interest rate dropdown (fixed options)
• Display monthly payment (formula may be referenced from Wikipedia)
Step 3 – Consents
• 2–3 checkboxes
• At least one required
Step 4 – Additional info
• Textarea (min. 10 characters)
Navigation & Validation
• Next disabled or error shown if step is incomplete
• Back keeps previous answers
• Steps cannot be skipped
Summary
• Display all answers and calculated monthly payment
• Submit does not send data anywhere (UI only)
Bonus (optional)
• Accessibility (labels, keyboard navigation)
• README with setup notes
• Separate pure JS function for loan calculation
Estimated time: 3–6 hours