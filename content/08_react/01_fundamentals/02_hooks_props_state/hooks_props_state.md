---
title: "React - Hooks, Props, State"
slug: "08_react/01_fundamentals/02_hooks_props_state"
stack: "React"
date: "2025-06-04T07:26:45.889Z"
draft: false
---

<details>
  <summary>What are props in React?</summary>
  <div>

## Props

- **Definition:** Props are arguments passed into components using **HTML‑like attribute syntax**.
- **Types:** Can be strings, numbers, objects, arrays, or functions.
- **Access:** Received as an object parameter in the component function (`props`).
- **Rule:** Props are **read‑only** → components must not modify their own props.
- **Reason:** Prevents side effects since props may be passed by reference (objects/arrays).
- **Pattern:** Data flow is **one‑way** (parent → child).
- **Benefit:** Greatly enhances **reusability** → same component can render different outputs based on props.

```jsx:title=/app/Banner.js
function Banner({ headerText }) {
  return <h1>{headerText}</h1>;
}
```

```jsx:title=/App.js

function App() {
  return (
    <>
      <Banner headerText="Welcome to Globomantics" />
      <Banner headerText="Our Latest Offers" />
    </>
  );
}
```

  </div>
</details>

<details>
  <summary>What are prop types?</summary>
  <div>

## Prop Types

- **Problem:** JavaScript is dynamically typed → props can be anything.
- **Solution:** `prop-types` library allows declaring expected types.

```jsx:title=/app/Banner.js
import PropTypes from "prop-types";

Banner.propTypes = {
  headerText: PropTypes.string.isRequired,
};
```

- **Behavior:** Warns if wrong type or missing required prop.
- **Status:** **Deprecated by React team** → recommend **TypeScript** for compile‑time type safety.
- 📌 Mention that **TypeScript** is the modern, robust solution for type checking in React projects.

  </div>
</details>

<details>
  <summary>What is the children prop?</summary>
  <div>

## The Children Prop

- **Definition:** Special prop automatically available → contains all JSX between a component’s opening and closing tags.
- **Flexibility:** Can be strings, elements, or entire component trees.
- **Usage:** Makes components more **natural and flexible** to use.

```jsx:title=/app/Banner.js
function Banner({ children }) {
  return <h1>{children}</h1>;
}
```

```jsx:title=/App.js
function App() {
  return (
    <>
      <Banner>Welcome to Globomantics</Banner>
      <Banner>
        <div>
          Special <strong>Offer</strong> Today!
        </div>
      </Banner>
    </>
  );
}
```

- **Behind the scenes:** JSX compiles to `React.createElement` calls → children are passed as objects in the `props.children`.
- **Benefit:** Enables **composition** → treat JSX like objects, store in variables, and reuse anywhere.

📌 Props handle **data flow**, while `children` handles **composition**. Together, they make React components highly reusable and expressive.

  </div>
</details>

<details>
  <summary>How do fragments work in React?</summary>
  <div>

## Fragments

- **Problem:** JSX must return a single parent element.
- **Solution:** Use `<></>` (fragment shorthand) or `<React.Fragment>` → allows multiple children without adding extra DOM nodes.
- **Benefit:** Cleaner HTML output, avoids unnecessary wrapper `<div>`s.

```jsx:title=/app/HouseList.js
function HouseList() {
  return (
    <>
      <h2 className="themeFontColor">Available Houses</h2>
      <table className="table">{/* rows here */}</table>
    </>
  );
}
```

📌 Fragments are about **structure without clutter** — they enforce React’s single parent rule while keeping the DOM lean.

  </div>
</details>

<details>
  <summary>How do you map data to JSX?</summary>
  <div>

## Mapping Data

- **Mechanism:** Use JavaScript’s `map()` to transform arrays into arrays of JSX elements.
- **React behavior:** React can directly render arrays of elements.

```jsx:title=/app/HouseList.js
const houses = [
  { id: 1, address: "123 Main St", country: "USA", price: 250000 },
  { id: 2, address: "456 High St", country: "UK", price: 300000 },
];

function HouseList() {
  return (
    <tbody>
      {houses.map((house) => (
        <tr key={house.id}>
          <td>{house.address}</td>
          <td>{house.country}</td>
          <td>{house.price}</td>
        </tr>
      ))}
    </tbody>
  );
}
```

📌 Mapping is the **bridge between data and UI** — it’s how React turns arrays into dynamic lists.

<details>
  <summary>Why is the key prop important?</summary>
  <div>

## The Key Prop

- **Purpose:** Helps React identify which items changed, added, or removed.
- **Without keys:** React re‑renders the entire list → inefficient.
- **With keys:** React updates only the changed items → efficient reconciliation.
- **Best practice:** Use a unique, stable identifier (e.g., `id`).
- **Fallback:** Use array index only if no unique property exists (can cause issues if order changes).

📌 Keys are **critical for performance and correctness** in lists. They enable React’s diffing algorithm to work efficiently.

  </div>
</details>

  </div>
</details>

<details>
  <summary>How do you extract components for readability?</summary>
  <div>

## Extracting Components

- **Problem:** JSX grows messy with many columns or nested structures.
- **Solution:** Extract reusable parts into separate components.

```jsx:title=/app/HouseRow.js
function HouseRow({ house }) {
  return (
    <tr>
      <td>{house.address}</td>
      <td>{house.country}</td>
      <td>{house.price}</td>
    </tr>
  );
}
```

```jsx:title=/app/HouseList.js

function HouseList({ houses }) {
  return (
    <tbody>
      {houses.map((h) => (
        <HouseRow key={h.id} house={h} />
      ))}
    </tbody>
  );
}
```

- **Options:**
  - Pass entire object → destructure inside component.
  - Pass individual props → shorter inside component, but longer at call site.
  - Spread operator → passes all properties, but may introduce unnecessary props.

📌 Component extraction improves **readability, reusability, and separation of concerns**. Passing the object and destructuring inside is often the clearest approach.

  </div>
</details>

<details>
  <summary>How do you format data for display?</summary>
  <div>

## Formatting Data

- Use helpers like `Intl.NumberFormat` for currency.

```jsx:title=Helper_module
// helpers/currencyFormatter.js
export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
```

```jsx:title=Usage
<td>{currencyFormatter.format(house.price)}</td>
```

📌 Formatting should be **abstracted into helpers** → keeps components clean and makes formatting reusable across the app.

  </div>
</details>
