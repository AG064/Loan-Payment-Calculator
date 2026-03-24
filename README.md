# Loan Payment Calculator

A JavaScript Single-Page Application (SPA) built for the Junior Front-End Developer assignment.

## Architecture & Tech Stack

* **Vanilla JS, HTML5, CSS3:** No frameworks, external libraries, or CSS preprocessors were used.
* **State Management:** Implemented a custom `State` class utilizing strict getters and setters. This ensures data integrity and validation at the lowest level before any view rendering occurs.
* **Separation of Concerns:** DOM manipulation is strictly isolated within the `View` class. The `app.js` file acts as the central controller handling events and state transitions.
* **Pure Functions:** The amortized loan calculation logic is completely decoupled from the DOM and state, residing in a separate pure function (`calculator.js`) as per the bonus requirements.

## UI/UX & Accessibility

The user interface was built from scratch to reflect a calm, professional banking environment.
* **Design System:** Styling choices, color palette, and typography structure were implemented in reference to the official public [Swedbank Pay Design Guide](https://design.swedbankpay.com/v/10.14.5/).
* **Custom Form Elements:** Default browser radio buttons and checkboxes were hidden and rebuilt using CSS to ensure visual consistency across modern browsers.
* **Accessibility (a11y):** Form inputs are properly linked to their respective `<label>` elements using `for` and `id` attributes, fully supporting keyboard navigation (Tab spacing) and screen readers.
* **Dynamic Error Handling:** Instead of blocking `alert()` popups, validation errors are rendered dynamically within the UI flow.

## Setup Notes (Important)

Because the application relies on modern ES6 Modules (`import` / `export` in `<script type="module">`), opening `index.html` directly via the `file://` protocol will result in CORS policy restrictions in Chrome and Firefox.

To run the application properly:
1. Extract the ZIP archive.
2. Serve the root directory using any local web server. Examples:
   * **VS Code:** Right-click `index.html` and select *Open with Live Server*.
   * **Node.js:** Run `npx http-server` in the terminal.
   * **Python:** Run `python3 -m http.server` or `python -m SimpleHTTPServer`.
3. Open the provided `localhost` URL in a modern browser.

## Team

Developed collaboratively by Aleksey Aleksandrovich and Vladimir Nilov. The workload was distributed between core state/validation logic and UI/DOM manipulation, with mutual code reviews and joint integration of the final application flow.