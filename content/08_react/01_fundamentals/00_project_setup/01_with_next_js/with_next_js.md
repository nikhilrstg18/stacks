---
title: "Next.js - Project Setup"
slug: "08_react/01_fundamentals/00_project_setup/01_with_next_js"
stack: "React"
date: "2025-06-04T07:26:45.889Z"
draft: false
---

```bash:title=Time_Consuming_Manual_setup
# Manual setup (time-consuming)
npm install react react-dom
```

<details>
  <summary>How to start with Next.js</summary>
  <div>

## Starting with Next.js

- **Prerequisite:** Install **Node.js** (includes npm).
- **Setup:** Run `npx create-next-app@latest` → choose project name (e.g., globomantics-next).
- **Options:**
  - **JavaScript or TypeScript** (choose based on preference).
  - ESLint + Tailwind CSS optional.
  - SWC compiler used by default (fast transpilation).
- **Project structure:**
  - `package.json` → lists React, Next.js, and dev dependencies.
  - Includes **next**, **react**, **react-dom**, and ESLint config.
- **Install packages:** Automatically installed by `create-next-app`.
- **Update packages:** Use `npm update` (caret locks major version).

```bash
# Prerequisite: Node.js installed
node -v
npm -v

# Create project with Next.js
npx create-next-app@latest globomantics-next

# Navigate and start dev server
cd globomantics-next
npm run dev
```

📌 `package.json` will include React, Next.js core, SWC compiler, and ESLint rules.

  </div>
</details>

<details>
  <summary>What commands and features does Next.js provide</summary>
  <div>

## Next.js commands & features

- **npm run dev:** Starts dev server → auto reload on file changes.
- **npm run build:** Creates production build → outputs to `.next/` (optimized JS/CSS, HTML).
- **npm run start:** Runs production server locally.
- **npm run lint:** Runs ESLint → checks for bugs/style issues.
- **Features:**
  - Hot reload → browser updates instantly on save.
  - File‑based routing → pages auto‑mapped from `pages/` directory.
  - API routes → backend endpoints inside `pages/api/`.
  - Image optimization, SSR (server‑side rendering), SSG (static site generation).

```bash
# Start dev server
npm run dev

# Build production bundle
npm run build

# Run production server
npm run start

# Run ESLint checks
npm run lint
```

📌 Next.js adds **routing, SSR/SSG, and API routes** beyond what Vite provides.

  </div>
</details>

<details>
  <summary>How is a Next.js React project structured</summary>
  <div>

## Application Structure

- **public/** → Static assets (favicon, images) served directly.
- **pages/** → File‑based routing; each file = route.
  - `index.js` → Home page.
  - `about.js` → `/about` route.
  - `api/` → API endpoints.
- **styles/** → CSS modules or global styles.
- **node_modules/** → Installed packages listed in `package.json`.
- **next.config.js** → Configures Next.js (plugins, env vars, etc.).
- **.eslintrc.json** → ESLint rules.
- **.next/** → Generated on production build; contains optimized output.

```text:title=Next_React_Structure
my-app/
├── public/          # Static assets (favicon, images)
├── pages/           # Routes
│   ├── index.js     # Home page
│   ├── about.js     # /about route
│   └── api/         # API endpoints
├── styles/          # CSS modules, global styles
├── node_modules/    # Installed dependencies
├── package.json     # Dependencies + scripts
├── next.config.js   # Next.js configuration
└── .eslintrc.json   # ESLint rules
```

```jsx:title=pages/index.js
export default function Home() {
  return (
    <main>
      <h1>Welcome to Globomantics Next.js!</h1>
      <p>Learning React with Next.js</p>
    </main>
  )
}
```

  </div>
</details>

<details>
  <summary>What are modules in React/Next.js</summary>
  <div>

## Modules

- **Definition:** Any JS/JSX file with `import`/`export`.
- **Exports:**
  - Named exports → `export { doSomething }`.
  - Default export → `export default Component`.
- **Encapsulation:** Non‑exported items remain private.
- **Example:**

```jsx:title=components/Banner.js
export default function Banner() {
  return <h1>Welcome to Globomantics Next.js!</h1>
}
```

```jsx:title=pages/index.js
import Banner from '../components/Banner'

export default function Home() {
  return (
    <div>
      <Banner />
      <p>Hello, Next.js learner!</p>
    </div>
  )
}
```

📌 Same modular benefits as Vite, but Next.js adds **routing + SSR/SSG**.

  </div>
</details>

<details>
  <summary>How do you add new components in a Next.js project</summary>
  <div>

## Adding New Components

- **Clone repo:** Run `npm install` then `npm run dev`.
- **Create Banner component:**
  - Make `components/` directory.
  - Add `Banner.js` → function returns JSX with header, logo, and text.
  - Export function → makes file a module.
- **Use in `pages/index.js`:** Import and render `<Banner />`.
- **Logo handling:**
  - Place in `public/` → referenced directly (`/logo.png`).
  - Or import from `next/image` for optimization.

```jsx:title=components/Banner.js
import Image from 'next/image'
import logo from '../public/logo.png'

export default function Banner() {
  return (
    <header>
      <Image src={logo} alt="Globomantics Logo" width={100} height={100} />
      <h1>Globomantics Portal</h1>
    </header>
  )
}
```

```jsx:title=pages/index.js
import Banner from '../components/Banner'

export default function Home() {
  return (
    <>
      <Banner />
      <p>Learning React with Next.js!</p>
    </>
  )
}
```

  </div>
</details>

<details>
  <summary>How does ESLint help in Next.js projects</summary>
  <div>

## Detecting Problems with ESLint

- **Included in Next.js template:** Preconfigured React + Next.js rules.
- **Run manually:** `npm run lint`.
- **VS Code plugin:** Shows violations instantly in editor.
- **Example:** Removing `<Banner />` import triggers **no unused vars** warning.
- **Config:** Customize rules in `.eslintrc.json`.
- **Team benefit:** Shared config ensures consistent style and checks across all developers.

```json:title=.eslintrc.json
{
  "extends": "next/core-web-vitals",
  "rules": {
    "no-unused-vars": "warn"
  }
}
```

```bash:title=Run_Lint
npm run lint
```

📌 Next.js ships with **core-web-vitals ESLint config** for performance best practices.

  </div>
</details>

<details>
  <summary>How do you debug React with Next.js</summary>
  <div>

## Debugging Next.js Apps

```json:title=launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug Next.js App",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

- **VS Code debugging:**
  - Use **Run and Debug** tab → select Web App (Chrome).
  - Configure port (default 3000).
  - Add breakpoints in JSX → works since Next.js compiles with SWC.
- **Browser dev tools (F12):**
  - Shows transpiled + original JSX (via source maps).
  - Breakpoints can be set in either.
- **React Developer Tools plugin:**
