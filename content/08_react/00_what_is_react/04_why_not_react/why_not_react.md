---
title: "Why Not React"
slug: "08_react/00_what_is_react/04_why_not_react"
stack: "React"
date: "2025-06-04T07:26:45.889Z"
draft: false
---

<details>
  <summary>Is JSX different from HTML?</summary>
  <div>

## Concern 1: HTML and JSX differ

- **Similarity:** JSX is ~99% like HTML; differences are small and predictable.
- **Key differences:** **className** (not class), **htmlFor** (not for), **inline styles** as objects, **JS-style comments**.
- **Optionality:** JSX compiles to plain JS; you can write without JSX if desired.
- **Conversion ease:** **Find/replace**, online **HTML→JSX** tools, or **htmltojsx** for bulk conversion.

  </div>
</details>

<details>
  <summary>Does React require a build step?</summary>
  <div>

## Concern 2: Build step required

- **Reality:** Modern apps need builds anyway (minify, transpile, lint, test).
- **Tooling:** **Babel** and **TypeScript** compile JSX + modern JS features.
- **Framework support:** Vite/Next.js/others include **zero-config** JSX transpilation.
- **Developer benefit:** Faster feedback, consistent browser support, automated pipelines.

  </div>
</details>

<details>
  <summary>Will I hit version conflicts with React?</summary>
  <div>

## Concern 3: Version conflicts

- **Constraint:** Can’t load **two React versions** on the same page; keep components aligned.
- **Contrast:** Web components avoid runtimes; other tools (Stencil/Svelte/Skate.js) add features without shared runtime.
- **Practice:** Conflicts are **rare**; upgrades aided by **codemods** when breaking changes occur.
- **Team tips:** **Agree on a React version**, **upgrade React with related libs**, **plan breaking changes** together.

  </div>
</details>

<details>
  <summary>Will outdated content online cause confusion?</summary>
  <div>

## Concern 4: Outdated resources online

- **Evolving ecosystem:** Older posts may show deprecated patterns (e.g., React core imports without react-dom).
- **Key shifts:** **PropTypes** extracted to a separate package; **TypeScript** widely preferred for typing; **Hooks** replaced mixins for logic reuse.
- **What to do:** **Update imports**, prefer **TypeScript + Hooks**, and **validate with official docs**.
- **Conversion mindset:** Old examples are usually **trivial to modernize**—map to separate packages and hook-based patterns.

  </div>
</details>

<details>
  <summary>How to handle decision fatigue in React?</summary>
  <div>

## Concern 5: Decision fatigue

- **View it as a positive:** Options let you tailor to your team’s needs; start with a **standardized baseline**.
- **Five early choices:** **Dev environment**, **component style**, **types**, **state**, **styling**.
- **Recommended defaults:**
  - **Dev environment:** Start with **Vite**; consider **Next.js/React Router** for more features.
  - **Components:** Prefer **function components** (concise, fewer bugs).
  - **Types:** Use **TypeScript** (compile-time checks, strong adoption).
  - **State:** Begin with **plain React state**; add libs as needed (**Redux**, **TanStack Query/SWR/Apollo**, **Zustand/MobX**).
  - **Styling:** Use what you know (**CSS/SASS/LESS**)—opt into CSS Modules or CSS-in-JS later.
- **Strategy:** Start simple, **add libraries incrementally** once pain points emerge, and **document team conventions**.

  </div>
</details>
