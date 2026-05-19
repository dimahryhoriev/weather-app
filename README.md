# weather-app
World Weather: A sleek, responsive weather application that provides real-time
forecasts and localized weather data.

[🟢 Live Demo](https://weather-app-lyart-three-33.vercel.app)

🛠 Tech Stack
  * **JavaScript:**
    Vanilla JS (Asynchronous API fetching, private/open APIs integration,
    LocalStorage, IndexedDB)

  * **Build Tool:**
    Vite (Fast HMR development server and optimized production bundling)

  * **Styles:**
    SCSS (BEM methodology, Flexbox/Grid layouts, custom dynamic animations)

  * **HTML:**
    Semantic markup, HTML5 Templates, dynamic DOM rendering

⚡️ Key Features
  * **Robust UI State Management**
    🌐 *No Internet:* Detects network loss and shows offline
       status indicators.
    🔍 *City Not Found:* Gracefully handles 404 errors from
       the API with clean user alerts.
    ⚠️ *Rate Limiting:* Protects the app and warns users if there
       are too many API requests.

  * **Smart Search & Input Optimization**
    💡 *Dynamic Hints:* Provides instant search suggestions
       as theuser types.
    ⚙️ *Data Normalization:* Automatically formats and cleans
       queries to fit the strict API requirements.

  * **Dynamic Visuals & Custom Logic**
    🎨 *Adaptive Themes:* Automatically switches weather icons and
       application backgrounds based on current weather conditions
       and time of day.
    📅 *Daily Forecast:* Renders detailed, real-time weather metrics
       for the current day.

  * **Instant Language Toggle**
    🌍 *Multi-language Support:* Seamlessly switches application
       languages on a button click with instant UI re-rendering.

  * **Modular Codebase Architecture**
    📂 *Logical Grouping:* Code is split into domain-specific modules.
    🛠 *Clean Functions:* Every function inside the modules is foc
       used, reusable, and performs a single specific task.

  * **Responsive Design**
    📱 *Cross-Platform:* Fully optimized with smooth transitions and
       layout adaptability for mobile, tablet, and desktop screens.


🚀 How to Run

-- Option 1: Local Setup
  * Clone the repository:
    ```bash
    git clone https://github.com/dimahryhoriev/weather-app.git
    ```
  * Navigate to the project directory:
    ```bash
    cd weather-app
    ```
  * Install project dependencies:
    ```bash
    npm install
    ```
  * Start the Vite development server:
    ```bash
    npm run dev
    ```
  * Open the application:
    Click the local link generated in your
    terminal to view the app in your browser.

-- Option 2: Instant View
  * Just open the [Live Demo](https://weather-app-lyart-three-33.vercel.app)
    in your browser.