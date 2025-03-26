# Angular Albums Microsite - Zeal Network Test

This albums microsite is built with modern Angular 19, focusing on performance and user experience.

**What We Used:**

* **Angular 19:**
    * Uses Signals (including Output Signals) for fast data updates and improved performance.
    * Uses Control Flow Syntax for cleaner and more readable template logic.
    * Uses Standalone Components to keep things organized and modular.
    * Has proxy setup for easy API calls (avoids CORS issues during development).
* **Bootstrap:** Makes the site responsive, looking good on all devices.
* **Tailwind CSS:** For quick and easy styling.
* **Angular Animations:** For smooth page changes.
* **ngx-infinite-scroll:** Loads more albums as you scroll.
* **ngMocks:** Helps with testing.
* **Playwright (Optional):** Extra tests to show modern testing.
* **Separation of Concerns and Parent/Child Components:** Used to create reusable and maintainable UI components.

**How It's Built:**

* `core/`: Important parts like data and services.
* `shared/`: Things used in many places.
* `features/`: Each page and its parts.

**How to Run:**

1.  Install Node.js v22.14.0, then run `npm install`.
2.  Start the app with `ng serve`. Open Chrome at `http://localhost:4200/`. (Chrome is the primary browser used.)
3.  Test the app with `ng test` to run unit tests.
4.  **Playwright (Optional):** If you added playwright tests, follow the playwright documentation to run them.

**Goal:**

This microsite shows how to build a good, easy-to-change Angular app with modern tools.