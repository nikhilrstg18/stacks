---
title: "Vite React - Project Setup"
slug: "08_react/01_fundamentals/00_project_setup/00_with_vite"
stack: "React"
date: "2025-06-04T07:26:45.889Z"
draft: false
---

```bash:title=Time_Consuming_Manual_setup
# Manual setup (time-consuming)
npm install react react-dom
```

<details>
  <summary>How to start with <strong>Vite</strong></summary>
  <div>

## Starting with Vite

- **Prerequisite:** Install **Node.js** (includes npm).
- **Setup:** Run `npm create vite@6` → choose project name (e.g., globomantics) → select **React**.
- **Options:**
  - **JavaScript + SWC** (fast transpiler, better dev experience).
  - TypeScript available but skipped here.
  - React Router setup optional.
- **Project structure:**
  - `package.json` → lists React libs + dev dependencies.
  - Includes **vite core**, **SWC plugin**, **eslint** with React rules.
- **Install packages:** Run `npm install`.
- **Update packages:** Use `npm update` (caret locks major version).

```bash
# Prerequisite: Node.js installed
node -v
npm -v

# Create project with Vite
npm create vite@6

# Example choices:
# Project name: globomantics
# Framework: React
# Variant: JavaScript + SWC
cd globomantics
npm install
npm run dev
```

📌 `package.json` will include React, Vite core, SWC plugin, and ESLint rules

  </div>
</details>

<details>
  <summary>What <strong>commands</strong> and <strong>features</strong> does Vite provide</summary>
  <div>

## Vite commands & features

- **npm run dev:** Starts dev build + mini server → auto reload on file changes.
- **npm run build:** Creates production build → outputs to `dist/` (HTML, bundled JS/CSS, images).
- **npm run lint:** Runs ESLint → checks for bugs/style issues.
- **npm run preview:** Serves production build locally for testing.
- **Features:**

  - Hot reload → browser updates instantly on save.
  - Autosave in editor → seamless feedback loop.
  - Debugging: F12 shows individual files in dev mode (not bundled).

```bash
# Start dev server with hot reload
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview

# Run ESLint checks
npm run lint
```

📌 In dev mode, open `F12` → Sources tab to see unbundled JSX files thanks to source maps.

    </div>

  </details>

<details>
  <summary>How is a Vite React <strong>project structure</strong>d</summary>
  <div>

## Application Structure

- **public/** → Static assets (favicon, images) not processed by Vite; copied directly to `dist/`.
- **src/** → Source code, JSX components, assets to be optimized/bundled.
- **dist/** → Created on production build; contains bundled JS, CSS, processed images, index.html.
- **node_modules/** → Installed packages listed in `package.json`.
- **eslint.config.js** → Configures linting rules; defaults can be customized.
- **vite.config.js** → Configures Vite (e.g., plugins, server port).
- **index.html** → Entry point; loads favicon, defines `<div id="root">`, imports `main.jsx`.
- **main.jsx** → Bootstraps app; renders `StrictMode` (dev warnings only) + `App`.
- **App.jsx** → First real component; returns JSX wrapped in a **fragment** (`<> </>`) to avoid extra DOM nodes.
- **Hierarchy:** index.html → main.jsx → StrictMode + App → child components → nested components.

```text:title=Vite_React_Structure
my-app/
├── public/          # Static assets (favicon, images)
├── src/             # JSX components, styles, assets
│   ├── App.jsx
│   ├── main.jsx
│   └── components/
├── dist/            # Generated production build
├── node_modules/    # Installed dependencies
├── index.html       # Entry point
├── vite.config.js   # Vite configuration
└── eslint.config.js # ESLint rules
```

```jsx:title=main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

  </div>
</details>

<details>
  <summary>What are modules in <strong>React/Vite</strong></summary>
  <div>

## Modules

- **Definition:** Any JS/JSX file with `import`/`export`. Not React-specific; part of JavaScript.
- **Exports:**
  - Named exports → `export { doSomething }` → imported with `{ doSomething }`.
  - Default export → `export default doSomething` → imported with any name.
  - Combination possible (default + named).
- **Encapsulation:** Non-exported items remain private to the module.
- **Example:**
  - `Banner.jsx` → `export default Banner`.
  - `Greeting.jsx` → `import Banner from './Banner'`; then `export function Greeting() { ... }`.
- **Benefits:**

  - Structure → each component in its own file.
  - Reusability → share components across apps.
  - Encapsulation → private scope for non-exported code.
  - Performance → Vite bundles modules efficiently, loads only when needed.
  - Collaboration → teams can work independently on separate modules.
  - Debugging/testing → smaller, self-contained units.

```jsx:title=Banner.jsx
export default function Banner() {
  return <h1>Welcome to Globomantics!</h1>
}
```

```jsx:title=Greetings.jsx
import Banner from './Banner'

export function Greeting() {
  return (
    <div>
      <Banner />
      <p>Hello, React learner!</p>
    </div>
  )
}
```

📌 `Named` vs `default` exports allow flexible imports and encapsulation

</div>

  </details>

<details>
  <summary>How do you add <strong>new components</strong> in a React project</summary>
  <div>

## Adding New Components

- **Clone repo:** Each module has its own directory → run `npm install` then `npm run dev`.
- **Create Banner component:**
  - Make `components/` directory under `src`.
  - Add `Banner.jsx` → function returns JSX with header, logo, and text.
  - Export function → makes file a module.
- **Use in App.jsx:** Replace existing JSX with `<Banner />` inside a fragment.
- **Logo handling:**

  - Option 1: Place in `public/` → referenced directly.
  - Option 2: Place in `src/assets/` → import into Banner → Vite optimizes (hashed filename, cache busting, compression).

```jsx:title=src/components/Banner.jsx
import logo from '../assets/logo.png'

export default function Banner() {
  return (
    <header>
      <img src={logo} alt="Globomantics Logo" />
      <h1>Globomantics Portal</h1>
    </header>
  )
}
```

```jsx:title=App.jsx
import Banner from './components/Banner'

export default function App() {
  return (
    <>
      <Banner />
      <p>Learning React with Vite!</p>
    </>
  )
}
```

</div>
  </details>

<details>
  <summary>How does <strong>ESLint</strong> help in React projects</summary>
  <div>

## Detecting Problems with ESLint

- **Included in Vite template:** Preconfigured React rules.
- **Run manually:** `npm run lint`.
- **VS Code plugin:** Shows violations instantly in editor.
- **Example:** Removing `<Banner />` → triggers **no unused vars** warning.
- **Config:** Customize rules in `eslint.config.js` (enable/disable, warnings vs errors).
- **Team benefit:** Shared config ensures consistent style and checks across all developers.

```js:title=eslint.config.ts
export default [
  {
    files: ["**/*.jsx"],
    rules: {
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "no-unused-vars": "warn"
    }
  }
]
```

```bash:title=Run_Lint
npm run lint
```

📌 Removing <Banner /> without deleting the import triggers a no-unused-vars warning.

  </div>
</details>

<details>
  <summary>How do you <strong>debug React with Vite</strong></summary>
  <div>

## Debugging React Apps

```json:title=launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug Vite App",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

- **VS Code debugging:**
  - Use **Run and Debug** tab → select Web App (Chrome).
  - Configure port (e.g., 3000).
  - Add breakpoints in JSX → works since JSX compiles to JS.
  - Note: **StrictMode** executes functions twice in dev → not in production.
- **Browser dev tools (F12):**
  - Shows both transpiled and original JSX (via source maps).
  - Breakpoints can be set in either, usually original JSX preferred.
- **React Developer Tools plugin:**

  - Adds **Profiler** tab → measure performance.
  - Adds **Components** tab → view hierarchy, inspect props/state.
  - Allows modifying state live → observe effects instantly.

    </div>
  </details>
