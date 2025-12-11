---
title: "Architecture Explained"
slug: "08_react/00_intro/00_architecture_explained"
stack: "React"
date: "2025-06-04T07:26:45.889Z"
draft: false
---

<details>
  <summary>What is really happening inside a React app?</summary>
  <div>

React is architected to build high‑performance browser UIs using a fully component‑based model. Every React app begins by rendering a single **root component**, and understanding how that root component becomes visible in the browser helps explain React’s internal architecture.

### **`JSX`** is not **JavaScript** — React creates elements using `createElement()`

```js:title=JSX_version
function App() {
return<h1>Hello React</h1>
}

```

When you write `JSX`, React does **not** run that directly. `JSX` is converted into plain JavaScript using **Babel**.

```js:title=What_Babel_converts_it_into
function App() {
  return React.createElement("h1", null, "Hello React");
}
```

This is the first key insight: React apps are just JavaScript objects created by `React.createElement`.

### How the root component is rendered

React apps built with toolchains like `Next.js`, Remix, Gatsby, or Webpack+Babel start by rendering a root component.

<div class="gatsby-code-title gatsby-remark-code-title">/app/page.js in `Next.js`</div>

```js
"use client";
import App from "../source/App/App";

export default function Home() {
  return <App />;
}
```

This file becomes the **root element** of the entire React component tree.

### What ReactDOM does behind the scenes

<div class="gatsby-code-title gatsby-remark-code-title">If you were not using `Next.js`, you would manually mount the root component</div>

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

This tells React to:

    - Create the virtual DOM representation of <App />
    - Compare it with the previous virtual DOM (initially empty)
    - Update the real browser DOM accordingly

### What if React didn’t exist? (Manual DOM manipulation)

```js:title=Without_React_you_would_manually_update_the_DOM
const h1 = document.createElement("h1");
h1.textContent = "Hello React (without React)";
document.body.appendChild(h1);
```

Updating UI manually becomes **slow** and **error‑prone** as apps grow.

### Doing the same thing using React without `JSX`

```js:title=React_can_build_UI_without_JSX// This is exactly what`JSX`compiles into.
function App() {
    return React.createElement(
        "h1",
        { className: "title" },
        "Hello React (no`JSX`)"
);
}

````

`JSX` is simply a cleaner way to describe the same UI.

```js:title=Doing_the_same_thing_using_JSX_developer_friendly
function App() {
    return <h1 className="title">Hello React (with `JSX`)</h1>;
}
````

### React is a library, not a framework

React only handles UI rendering. It does not include routing, data fetching, or build tools. That’s why ecosystems like `Next.js`, Remix, Gatsby, and Webpack+Babel exist.

React = **UI library**<br>
Angular / `Next.js` = **full framework**

### React apps are Single‑Page Applications (SPAs)

React loads once in the browser and updates the UI dynamically without full page reloads.

```js:title=SPA_navigation
<Link href="/dashboard">Go to Dashboard</Link>

```

No page reload — React swaps components internally.

### Understanding “component tree = F(G(x))”

```js:title=React_components_are_functions_that_return_other_components
function App() {
    return <Layout>
        <Header />
        <Content />
    </Layout>;
}
```

This is mathematically similar to nested function composition:

```js:title=Nested_Function_Composition
App = Layout(Header(Content(x)))
```

This is why React apps are described as a **component tree**.

### Toolchain role (`Next.js`, Babel, Webpack)

The toolchain handles:

    - Transpiling `JSX` → JavaScript
    - Bundling modules
    - Optimizing assets
    - Launching the root component

```js:title=Babel_transforming_JSX
// Input
<button>Click</button>

// Output
React.createElement("button", null, "Click");

```

### Why understanding this matters

Most developers treat **React** as “magic,” but knowing how **`JSX`**, `createElement()`, the **virtual DOM**, and the **toolchain** work gives you:

    - Better debugging skills
    - Better performance optimization
    - Better architectural decisions

Understanding the internals makes you a stronger React engineer.

  </div>
</details>

<details>
  <summary>Why React is a library and not a framework</summary>
  <div>

A **library** is a collection of focused functions or classes that you call directly to perform specific tasks. A **framework** is a larger system that controls the flow of your application and calls your code instead. React is a library because **you call React** — React does not call you.

### React is essentially two libraries

```js:title=In_most_React_apps_you_import_two_separate_libraries
import React from "react";
import ReactDOM from "react-dom/client";
```

    - **react** → core library (createElement, hooks, component logic)
    - **react-dom** → browser-specific library (DOM rendering)

```js:title=Using_React_without_JSX
const element = React.createElement("h1", null, "Hello React");
ReactDOM.createRoot(document.getElementById("root")).render(element);

```

````

This shows React is just a set of functions you call — exactly what a library is.

### Viewing React as a library in the browser

```js:title=You_can_load_React_directly_in_an_HTML_file_using_ESM_imports
<script type="module" src="https://unpkg.com/react/umd/react.development.js"></script>
<script type="module" src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>

<h1>Hello React</h1>

````

Opening DevTools → Network shows two separate downloads:

- **react** → includes createElement, useState, useEffect, etc.
- **react-dom** → includes DOM rendering functions

This separation reinforces that React is not a full framework — it only handles UI logic.

### What React provides vs. what it does NOT provide

**React provides:**

- Component model
- Virtual DOM
- Hooks (useState, useEffect, etc.)
- Rendering logic

**React does NOT provide:**

- Routing
- Data fetching
- Build system
- File-based routing
- Deployment pipeline

This is why React is a **library**, not a framework.

### Library vs Framework — control flow difference

```js:title=Library_flow
yourCode()  →  calls library functions
```

```js:title=Framework_flow
framework  →  calls your code  →  may call library functions
```

React fits the first model — **you call React**.

```js:title=React_as_a_library_you_control_the_flow
function App() {
    return <h1>Hello</h1>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

You decide when and how rendering happens.

### Example: Framework controlling the flow (`Next.js`)

`Next.js` automatically calls your components — you don’t call ReactDOM yourself.

<div class="gatsby-code-title gatsby-remark-code-title">app/page.js</div>

```js
export default function Page() {
  return <App />;
}
```

`Next.js` handles:

    - Routing
    - Rendering
    - Bundling (Webpack/SWC)
    - Server-side rendering
    - API routes

This is why `Next.js` is a **framework** built on top of the React library.

### React ecosystem: library + framework

**React (library)** gives you UI building blocks.
**`Next.js` (framework)** gives you everything else:

- Node.js runtime
- Webpack or SWC bundling
- PostCSS
- Jest for testing
- Routing system
- Server components

### Why you almost always use a framework with React

Using React alone means manually handling:

- Routing
- Bundling
- Transpiling `JSX`
- Optimizing assets
- Deployment

A framework automates all of this, saving massive development time.

### Bottom line

React is a **UI library** that gives you the tools to build components. Frameworks like `Next.js` wrap React and provide the full application structure. In React, **you control the flow**. In a framework, **the framework controls the flow**.

  </div>
</details>

<details>
  <summary>What it means that React is a Single‑Page App (SPA)</summary>
  <div>

A Single‑Page Application (SPA) is a web app that loads a single HTML page once, then updates the UI dynamically using JavaScript without performing full page reloads. Gmail, Yahoo Mail, and Hotmail have been SPAs for years — long before the term became popular.

### What makes an app a SPA?

- The browser loads **one HTML file** initially.
- JavaScript dynamically updates the UI afterward.
- No full‑page refreshes occur after the first load.
- Server calls still happen — but only data is fetched, not full pages.

```js:title=Traditional_multi‑page_app_MPA
// Clicking a link reloads the entire page
<a href="/profile">Go to Profile</a>

```

```js:title=SPA_navigation_React
// No page reload — React swaps components internally
<Link href="/profile">Go to Profile</Link>
```

### Building a tiny SPA without React (to understand the concept)

This example shows what React does internally — but manually.

```html:title=index.html
<!DOCTYPE html>
<html>
    <head>
        <title>Simple SPA</title>
        <script src="index.js"></script>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
```

```js:title=index.html
window.onload = function () {
const rootElement = document.getElementById("root");
rootElement.innerHTML = "Welcome to my SPA!";
};
```

This is already a SPA — JavaScript updates the UI without reloading the page.

### Adding interactivity (like React does)

Let’s add a button that updates the UI dynamically.

```js
window.onload = function () {
  const rootElement = document.getElementById("root");

  const button = document.createElement("button");
  button.innerHTML = "Click me for current date";

  button.addEventListener("click", () => {
    rootElement.innerHTML = new Date().toString();
  });

  rootElement.appendChild(button);
};
```

Now the UI updates instantly when the button is clicked — no page reload.<br/> This is exactly how React works, but React uses a virtual DOM and components instead of manual DOM manipulation.

### How React turns this into a real SPA

```js:title=React_version_of_the_same_behavior
function App() {
const [date, setDate] = useState("");

    return (
        <div>
            <button onClick={() => setDate(new Date().toString())}>
            Click me for current date
            </button>
            {date}
        </div>
    );
}
```

React handles:

- UI updates
- DOM diffing
- Efficient rendering
- State management

But the core idea is the same: **update the UI without reloading the page**.

### Why SPAs feel fast

- No full page reloads
- Only small pieces of UI update
- JavaScript handles rendering locally
- Network calls fetch data, not HTML pages

```js:title=Fetching_data_in_a_SPA
async function loadData() {
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data);
}
```

The page stays loaded — only the data changes.

### Bottom line

A SPA loads once and updates the UI dynamically using JavaScript. React automates this process using components, state, and the virtual DOM, making SPAs easier to build, maintain, and scale.

  </div>
</details>

<details>
  <summary>Understanding React without a build chain or `JSX` syntax</summary>
  <div>

React does not require `JSX` or a build chain to work. At its core, React is just a JavaScript library that exposes functions like `React.createElement` and `ReactDOMClient.createRoot`. Understanding React without `JSX` helps you see how React truly works under the hood.

### Rendering a list using plain JavaScript (no React)

Start with a simple SPA that updates the DOM manually.

```js:title=index.html
<div id="root"></div>
<script src="index.js"></script>
```

```js:title=index.js_manual_DOM_manipulation
const rootElement = document.getElementById("root");

const numbers = [1, 2, 3];

numbers.forEach(num => {
    const li = document.createElement("li");
    li.innerHTML = num;
    rootElement.appendChild(li);
});

```

This is pure JavaScript updating the browser DOM — no React involved.

### Adding React to the page without `JSX` or a build tool

Load React directly using ESM CDN imports.

```js:title=index.html
<script type="module" src="index.js"></script>

<script type="module" src="https://esm.sh/react"></script>
<script type="module" src="https://esm.sh/react-dom/client"></script>
```

Now React and ReactDOMClient are available globally.

### Rendering the same list using React without `JSX`

```js:title=index.js_react_version
const rootElement = document.getElementById("root");

// Create React virtual DOM root
const root = ReactDOMClient.createRoot(rootElement);

const numbers = [1, 2, 3];
const childrenElements = [];

// Build list items using React.createElement
numbers.forEach((num, index) => {
  const li = React.createElement(
    "li",
    { key: index }, // required for lists
    num // child text node
  );
  childrenElements.push(li);
});

// Render the array of - elements
root.render(childrenElements);
```

This produces the exact same UI as the DOM‑only version — but now React manages the virtual DOM.

### Why React is not faster in this example

Both versions do the same work:

- Create 3 - ` elements
- Insert them into the DOM

React is not faster here because nothing is changing. React’s performance advantage appears when the UI updates frequently.

### Where React becomes powerful: updating values

```js:title=Manual_DOM_update_hard_to_maintain
li.innerHTML = newValue;
```

```js:title=React_update_virtual_DOM_diffing
root.render(React.createElement("li", { key: 0 }, newValue));
```

React compares the old virtual DOM with the new one and updates only what changed — not the entire DOM tree.

### Key takeaways for interviews

- React does not require `JSX` — `JSX` is just syntax sugar.
- React apps can run without Webpack, Babel, or `Next.js`.
- `React.createElement()` is the core primitive behind `JSX`.
- ReactDOMClient manages the virtual DOM and updates the real DOM efficiently.
- React is not faster for initial rendering — it is faster for **updates**.
- Understanding React without `JSX` shows deep knowledge of how React works internally.

  </div>
</details>

<details>
  <summary>Creating a React app with the `Next.js` toolchain/framework</summary>
  <div>

While React can run without any toolchain using plain `React.createElement` and `ReactDOMClient.createRoot`, almost no real-world apps are built this way. Modern React development relies on a toolchain to support `JSX`, routing, bundling, optimization, and server-side rendering. Today, **`Next.js`** is the most popular and recommended toolchain for building React apps.

### Why a toolchain is needed

- React alone does not support `JSX` — a toolchain must transpile it.
- React does not include routing, bundling, or server rendering.
- Toolchains automate optimization, code splitting, and asset handling.

```js:title=JSX_requires_a_build_step
// `JSX` (not valid JavaScript)

<h1>Hello React</h1>

// What Babel converts it into
React.createElement("h1", null, "Hello React");

```

Without a toolchain, you would need to write the second version manually — which is why toolchains exist.

### Evolution of React toolchains

- **Create React App `CRA`** — introduced in 2016, once the standard.
- **`Next.js`** — now the dominant toolchain, actively maintained by Vercel.
- Other options: Remix, Gatsby, RedwoodJS, or custom Webpack setups.

`CRA` is no longer recommended in the official React docs. `Next.js` is now the preferred choice.

### Creating a new `Next.js` app

In VS Code, open a terminal and run:

```sh:title=Terminal
npx create-next-app@latest
```

You will be prompted with configuration questions. A typical setup for a JavaScript-based project:

```sh:title=Terminal
✔ Project name: myapp
✔ Use TypeScript? No
✔ Use ESLint? Yes
✔ Use Tailwind CSS? No
✔ Use /src directory? Yes
✔ Use App Router? Yes
✔ Customize import alias? No
```

This generates a complete `React` + `Next.js` project with `routing`, `bundling`, and `server components` enabled.

### Understanding the generated folder structure

```text
myapp/
├── src/
│    └── app/
│         ├── page.js        ← root route (localhost:3000)
│         └── mylist/
│              └── page.js   ← route: /mylist
├── package.json
├── next.config.js
└── node_modules/
```

<div class="gatsby-code-title gatsby-remark-code-title">src/app/page.js</div>

```js
export default function Page() {
  return <h1>Hello from `Next.js`</h1>;
}
```

This component is rendered when visiting `http://localhost:3000`.

### Running the app

After installation, run:

`npm run dev`

`Next.js` starts a development server at:

`http://localhost:3000`

### How routing works in `Next.js`

`Next.js` uses a file-based routing system. Creating a new folder with a `page.js` file automatically creates a new route.

```js:title=Create_a_new_route
// File: src/app/mylist/page.js
export default function MyList() {
    return <h2>This is the MyList page</h2>;
}
```

Visit:`http://localhost:3000/mylist`

### Server components vs client components

By default, `page.js` files are **server components**:

- They run on the Node.js server.
- They cannot use React hooks like `useState` or `useEffect`.

To use hooks, you must mark a component as a client component:

```js
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

### Why `Next.js` is the preferred toolchain

- Built-in routing
- Server components
- Automatic code splitting
- Image optimization
- API routes
- Zero-config bundling (SWC)
- First-class React support

`Next.js` provides everything needed to build production-grade React apps.

### Key interview takeaways

- React is a UI library — it needs a toolchain to be practical.
- `Next.js` is now the recommended toolchain for React apps.
- `Next.js` supports `JSX`, routing, server components, and bundling out of the box.
- File-based routing makes navigation simple and intuitive.
- Server components run on the server and cannot use browser-only hooks.

  </div>
</details>

<details>
  <summary>Converting React library calls to `JSX` syntax</summary>
  <div>

Once a React app is scaffolded using a toolchain like `Next.js`, you no longer need to manually create a virtual DOM or call `React.createElement`. The toolchain handles all of that behind the scenes, allowing you to write clean `JSX` instead of low-level React API calls.

### Launching the `Next.js` development server

After creating the project with `create-next-app`,

start the dev server: `npm run dev`

This starts a Node.js server at:`http://localhost:3000`

Your browser automatically loads the root route, which is controlled by `/src/app/page.js`.

### Replacing the default page with a simple `JSX` component

Open `/src/app/page.js` and replace the generated code with a simple component:

```js:title=page.js
export default function Page() {
    return <h1>Hello from Pluralsight</h1>;
}
```

This is `JSX` — a developer-friendly syntax that `Next.js` automatically transpiles into React library calls.

### Making the component a client component

By default, `page.js` is a **server component** (runs on Node.js). To use browser-only features like `useState`, mark it as a client component:

```js:title=page.js
"use client";

export default function Page() {
    return <h1>Hello from Pluralsight</h1>;
}
```

This tells `Next.js` to render this component in the browser instead of on the server.

### Comparing `JSX` to raw React library calls

```js:title=JSX_version_what_you_write

<h1>Hello from Pluralsight</h1>
```

```js:title=What_Babel_converts_it_into_what_React_actually_runs
React.createElement("h1", null, "Hello from Pluralsight");
```

`Next.js` handles this conversion automatically — no manual calls needed.

### Cleaning up the scaffolded project

You can safely delete unused files like:

- `favicon.ico`
- `page.module.css`

And simplify `globals.css` to your preferred styling.

### What `Next.js` does for you automatically

Unlike building React manually, you do **not** need to:

- Create a base `index.html`
- Call `ReactDOMClient.createRoot`
- Call `root.render()`
- Manage the virtual DOM
- Transpile `JSX`

`Next.js` handles all of this behind the scenes. You only write components.

### Example: `JSX` vs manual React API (side-by-side)

```js:title=Manual_React_no_JSX
const element = React.createElement(
"div",
null,
React.createElement("h1", null, "Hello")
);

root.render(element);

```

```js:title=JSX_version_Nextjs
export default function Page() {
return (
<div>
<h1>Hello</h1>
</div>
);
}

```

Both produce the same UI — `JSX` is simply a cleaner, more expressive syntax.

### Key interview takeaways

- `JSX` is not required by React — it’s just syntax sugar.
- `Next.js` automatically converts `JSX` into `React.createElement` calls.
- You don’t manually create or render the virtual DOM — the toolchain does it.
- Server components run on Node.js; client components run in the browser.
- `Next.js` simplifies React development by handling routing, bundling, and rendering.

  </div>
</details>

<details>
  <summary>Expanding `JSX` syntax to handle lists and child components</summary>
  <div>

`JSX` is one of React’s most powerful features because it allows developers to mix JavaScript expressions with HTML‑like syntax. To understand `JSX` deeply, it helps to expand beyond simple text rendering and build lists, reusable components, and nested component trees.

### Starting with simple `JSX`

```js:title=component_returning_static_JSX
export default function Page() {
return <div>Hello from Pluralsight</div>;
}

```

This works, but `JSX` becomes far more useful when rendering dynamic lists and child components.

### Rendering a simple list without advanced `JSX`

```js:title=component_returning_JSX_with_a_static_list
export default function Page() {
    return (

        - 1
        - 2
        - 3

    );
}
```

This works, but it’s not dynamic or reusable.

### Creating a child component inside the same file

React components must return a single element. To return multiple items, wrap them in a **React Fragment**:

```js
function ListItems() {
  return <>- 1 - 2 - 3</>;
}

export default function Page() {
  return <ListItems />;
}
```

Fragments (`<></>`) allow returning multiple elements without adding extra DOM nodes.

### Rendering a list dynamically using JavaScript expressions

`JSX` allows embedding JavaScript inside `{ }`. This is where `JSX` becomes powerful.

```js:title=Create_an_array_of_integers
const ints = [1, 2, 3];
```

```js:title=Render_the_list_using_map()
export default function Page() {
  const ints = [1, 2, 3];

  return (

      {ints.map((num) => (
        <li key={num}>{num}
      ))}

  );
}
```

**Why map works but forEach does not:**

- `map()` returns a new array → React can render it.
- `forEach()` returns `undefined` → nothing to render.

### Combining dynamic lists with child components

Extract the list item into its own component for cleaner `JSX`:

```js
function Item({ value }) {
  return- {value};
}

export default function Page() {
  const ints = [1, 2, 3];

  return (

      {ints.map((num) => (
        <Item key={num} value={num} />
      ))}

  );
}
```

This demonstrates how `JSX` naturally builds component trees.

### `JSX` rules demonstrated

- Components must start with an uppercase letter (`ListItems`, `Item`).
- Components must return a single element → use fragments when needed.
- JavaScript expressions go inside `{ }`.
- Lists must include a `key` prop for each item.

### Key interview takeaways

- `JSX` is not HTML — it’s JavaScript with XML-like syntax.
- `JSX` allows embedding expressions like `map()` to generate UI dynamically.
- Fragments allow returning multiple elements without extra DOM nodes.
- Breaking UI into small components keeps `JSX` clean and maintainable.
- `JSX` compiles to `React.createElement` calls under the hood.

  </div>
</details>

<details>
  <summary>What F(G(X)) means when rendering React component trees</summary>
  <div>

In functional programming, **F(G(X))** represents **function composition** — one function returns another function, which returns another, and so on. This pattern allows complex behavior to be built by combining smaller, reusable functions. React uses this exact idea to build component trees.

### Functional composition: the idea behind F(G(X))

```js:title=Functional_composition_means
F(G(X))  →  F receives the output of G, which receives X
```

Each function transforms data and passes it along. This is the foundation of React’s component architecture.

### React components are just functions

React components are JavaScript functions that return UI. When components call other components, they form a composition chain — exactly like **F(G(X))**.

```js:title=Two_simple_components
function G() {
    return- Item;
}

function F() {
    return (

        <G />

    );
}
```

Here, `F` renders `G`

```js:title=in_functional_notation
F(G())
```

### Adding X → the “data” passed through components

In React, **X = props or state**. When data flows through components, the composition becomes:

```js
F(G(X));
```

```js:title=Example_with_props_X
function G({ value }) {
    return- {value};
}

function F() {
    const X = 42;
    return (

            <G value={X} />

    );
}

```

Now the composition is literally:

```js
F(G(42));
```

### Adding state → the real X in React apps

When state is introduced, X becomes dynamic:

```js
function G({ value }) {
  return -{ value };
}

function F() {
  const [count, setCount] = useState(0); // X = count

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Add</button>

      <G value={count} />
    </div>
  );
}
```

Now the composition is:

```js
F(G(count));
```

Every time `count` changes, React recomposes the UI.

### Visualizing React’s component tree as F(G(X))

```text
App (F)
└── List (G)
    └── Item (X → props/state)

```

This is functional composition expressed as UI composition.

### Why this matters in interviews

- Shows you understand React as a functional system, not just JSX.
- Explains why React components are small, pure functions.
- Demonstrates how props/state flow through the component tree.
- Reveals how React re-renders efficiently using composition.

### Key takeaway

**React builds UI by composing functions (components) together.**  
**F(G(X))** is simply the mathematical way of describing how React renders nested components with data flowing through them.

  </div>
</details>

<details>
  <summary>What makes React apps reactive</summary>
  <div>

React apps are “reactive” because React maintains **component state** — special data that, when updated, automatically triggers a re‑render of the component tree. Unlike normal JavaScript variables, React state persists across renders and notifies the React engine to update the UI.

### Why normal variables don’t trigger UI updates

```js
let count = 0;
count = 5; // UI does NOT update
```

React has no idea this variable changed. It only reacts to state updates.

### Introducing component state with useState

React state is created using the `useState` hook:

```js
import { useState } from "react";

const [ints, setInts] = useState([1, 2, 3]);
```

- `ints` → current state value
- `setInts` → function to update state

Updating state automatically re-renders the component.

### Passing state from parent to child (props)

```js:title=Parent_component
function App() {
    const [ints, setInts] = useState([1, 2, 3]);

    return <ListItems ints={ints} />;
}
```

```js:title=Child_component_receiving_props
function ListItems({ ints }) {
    return (
        <ul>
            {ints.map((n) => (
            <li key={n}>{n} />
            ))}
        </ul>
    );
}
```

### Updating state from a child (passing functions down)

To allow a child to update parent state, pass a function as a prop.

```js:title=Parent
function App() {
    const [ints, setInts] = useState([1, 2, 3]);

    function addValue() {
        const max = Math.max(...ints);
        setInts([...ints, max + 1]);
    }

    return <ListItems ints={ints} addValue={addValue} />;
}
```

```js:title=Child
function ListItems({ ints, addValue }) {
    return (
    <>
        <button onClick={addValue}>Add Item</button>
        <ul>
        {ints.map((n) => (
            <li key={n}>{n} />
        ))}
        </ul>
    </>
    );
}
```

Clicking the button updates state → React re-renders → UI updates.

### Passing data back up using an anonymous function

To pass custom values from child → parent, wrap the parent function:

```js:title=Parent
function addValue(increment) {
    const max = Math.max(...ints);
    setInts([...ints, max + increment]);
}
```

```js:title=Child
function ListItems({ ints, addValue }) {
    const incrementBy = 3;

    return (
    <>
        <button onClick={() => addValue(incrementBy)}>
        Add Item
        </button>

        <ul>
        {ints.map((n) => (
            <li key={n}>{n} />
        ))}
        </ul>
    </>
    );
}
```

Now each click adds **+3** instead of **+1**.

### Why React needs keys when rendering lists

Keys help React track which items changed between renders.

```js
{
  ints.map((n) => <li key={n}>{n}/>);
}
```

Without keys, React cannot efficiently update the DOM.

### Why React apps are “reactive”

- State changes trigger re-renders automatically.
- React diffs the virtual DOM to find what changed.
- Only the necessary parts of the UI update.
- Parent → child data flows via props.
- Child → parent communication happens via callback functions.

### Key interview takeaways

- **State** is what makes React reactive — not variables.
- `useState` returns a value + setter function.
- Updating state triggers a re-render.
- Props pass data down; functions pass data up.
- Keys are required for list rendering.
- React reactivity = state → virtual DOM diff → UI update.

  </div>
</details>
