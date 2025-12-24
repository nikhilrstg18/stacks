---
title: "Conditional Rendering and Shared State"
slug: "08_react/01_fundamentals/04_conditional_rendering_and_shared_state"
stack: "React"
date: "2025-06-04T07:26:45.889Z"
draft: false
---

<details>
  <summary>What is Conditional Rendering in React?</summary>
  <div>

## Conditional Rendering

Conditional rendering allows React components to render different outputs based on state, props, or expressions. It’s a core concept for building dynamic UIs.

### Applying Conditional CSS Classes

```jsx:title=src/components/HouseRow.jsx
export default function HouseRow({ house }) {
  return (
    <tr>
      <td>{house.address}</td>
      <td>{house.country}</td>
      <td className={house.price > 500000 ? "text-primary" : ""}>
        {house.price}
      </td>
    </tr>
  );
}
```

📌 Uses a `?` **ternary operator** to apply `text-primary` class only if price > 500,000.

### ✅ Conditionally Rendering Elements

<div class="gatsby-code-title gatsby-remark-code-title">Only render <td> if price is truthy</div>

```jsx
{
  house.price && <td className="text-primary">{house.price}</td>;
}
```

📌 Uses **logical AND** `&&` → `<td>` is rendered only if `house.price` is truthy.

### ✅ Conditionally Rendering Components

```jsx:title=App.jsx
import { useState } from "react";
import Banner from "./Banner";
import HouseList from "./HouseList";
import House from "./House";

export default function App() {
  const [selectedHouse, setSelectedHouse] = useState();

  return (
    <>
      <Banner />
      {selectedHouse ? (
        <House house={selectedHouse} />
      ) : (
        <HouseList onSelect={setSelectedHouse} />
      )}
    </>
  );
}
```

- If `selectedHouse` exists → render `<House />`.
- Else → render `<HouseList />`.

### ✅ Passing Functions as Props

```jsx:title=src/components/HouseList.jsx
import HouseRow from "./HouseRow";

export default function HouseList({ houses, onSelect }) {
  return (
    <table>
      <tbody>
        {houses.map(h => (
          <HouseRow key={h.id} house={h} onSelect={onSelect} />
        ))}
      </tbody>
    </table>
  );
}
```

```jsx:title=src/components/HouseRow.jsx
export default function HouseRow({ house, onSelect }) {
  return (
    <tr onClick={() => onSelect(house)}>
      <td>{house.address}</td>
      <td>{house.country}</td>
      <td>{house.price}</td>
    </tr>
  );
}
```

- `App` defines state and passes `setSelectedHouse` down.
- `HouseRow` calls `onSelect(house)` when clicked → updates parent state.

### 🎯 Interview Takeaway

- Conditional rendering is **declarative**: React decides what to show based on state/props.
- Use **ternary operators** for inline conditions, **logical AND** for optional rendering.
- Share state by **lifting it up** and passing setter functions as props.
- Keep state as low as possible in the hierarchy to avoid unnecessary rerenders.

  </div>
</details>

<details>
  <summary>What happens when React components mount and unmount?</summary>
  <div>

## Mounting and Unmounting

- **Mounting:** When a component appears in the DOM → its state is initialized and effects run.
- **Unmounting:** When a component is removed from the DOM → its state and effects are destroyed.
- **Example:**
  - Clicking a `HouseRow` replaces `HouseList` with `House`.
  - `HouseList` and its rows are unmounted → their state is lost.
  - If `HouseList` is rendered again, it mounts fresh → state reinitializes, effects rerun.

📌 Mounting/unmounting resets component memory. React treats remounts as fresh instances.

  </div>
</details>

<details>
  <summary>Why use function wrappers and useCallback?</summary>
  <div>

## Function Wrappers and useCallback

- **Problem:** Passing `setSelectedHouse` directly gives child components full control over parent state.
- **Solution:** Wrap `setSelectedHouse` in a controlled function:

```jsx
const handleSelectHouse = (house) => {
  if (typeof house === "object" && house?.id) {
    setSelectedHouse(house);
  }
};
```

- **Benefit:**

  - Encapsulates state logic.
  - Validates input before updating state.
  - Prevents misuse from child components.

- **useCallback:**
  - Prevents function reference from changing on every render.
  - Useful when passing to memoized components or using in dependency arrays.

```jsx
const handleSelectHouse = useCallback((house) => {
  if (typeof house === "object" && house?.id) {
    setSelectedHouse(house);
  }
}, []);
```

📌 Wrappers protect state integrity. `useCallback` ensures stable references across renders.

  </div>
</details>

<details>
  <summary>How do you delegate state to a custom hook?</summary>
  <div>

## Delegating State to a Custom Hook

- **Purpose:** Separate logic from UI → cleaner, reusable components.
- **Example:** Move state + effect from `HouseList` to `useHouses` hook.

```jsx:title=src/hooks/useHouses.js
import { useState, useEffect } from "react";

export function useHouses() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/houses")
      .then(res => res.json())
      .then(data => setHouses(data));
  }, []);

  return { houses, setHouses };
}
```

```jsx:title=src/components/HouseList.jsx
import { useHouses } from "../hooks/useHouses";

export default function HouseList() {
  const { houses, setHouses } = useHouses();

  const addHouse = () => {
    setHouses([...houses, newHouse]);
  };

  return (
    <table>
      <tbody>
        {houses.map(h => (
          <tr key={h.id}>
            <td>{h.address}</td>
            <td>{h.country}</td>
            <td>{h.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

- **Benefits:**
  - Logic is modular and testable.
  - Hook state is isolated per usage.
  - Components stay focused on rendering.

📌 Custom hooks promote separation of concerns and reusable logic. Each hook call maintains its own state.

  </div>
</details>

````html
<details>
  <summary>How do you add additional state to a custom hook?</summary>
  <div>
    ## Adding Additional State to a Custom Hook Custom hooks can manage multiple
    pieces of state to improve user experience. In this case, we add a
    `loadingState` to indicate API fetch status. ### ✅ Setup: loadingStatus.js
    ```js // src/constants/loadingStatus.js export const loadingStatus = {
    isLoading: "isLoading", loaded: "loaded", hasErrored: "hasErrored" };
  </div>
</details>
````

---

### ✅ Custom Hook: useHouses.js

```js
import { useState, useEffect } from "react";
import { loadingStatus } from "../constants/loadingStatus";

export function useHouses() {
  const [houses, setHouses] = useState([]);
  const [loadingState, setLoadingState] = useState(loadingStatus.isLoading);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:4000/api/houses");
        const data = await res.json();
        setHouses(data);
        setLoadingState(loadingStatus.loaded);
      } catch (err) {
        setLoadingState(loadingStatus.hasErrored);
      }
    }
    fetchData();
  }, []);

  return { houses, setHouses, loadingState };
}
```

---

### ✅ HouseList Component

```jsx
import { useHouses } from "../hooks/useHouses";
import LoadingIndicator from "./LoadingIndicator";
import { loadingStatus } from "../constants/loadingStatus";

export default function HouseList() {
  const { houses, loadingState } = useHouses();

  if (loadingState !== loadingStatus.loaded) {
    return <LoadingIndicator loadingState={loadingState} />;
  }

  return (
    <table>
      <tbody>
        {houses.map((h) => (
          <tr key={h.id}>
            <td>{h.address}</td>
            <td>{h.country}</td>
            <td>{h.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

📌 Custom hooks can manage multiple states and encapsulate logic. Early returns are valid conditional rendering — just ensure hooks are never called conditionally.

  </div>
</details>

<details>
  <summary>How do Error Boundaries improve React applications?</summary>
  <div>

## Error Boundaries

Error boundaries catch rendering errors and display fallback UI instead of crashing the entire app.

### ✅ ErrorBoundary Component

```jsx:title=src/components/ErrorBoundary.jsx
import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}
```

### ✅ Usage in HouseList

```jsx
import { ErrorBoundary } from "./ErrorBoundary";
import HouseRow from "./HouseRow";

export default function HouseList({ houses }) {
  return (
    <table>
      <tbody>
        <ErrorBoundary
          fallback={
            <tr>
              <td colSpan="3">Error loading house rows</td>
            </tr>
          }
        >
          {houses.map((h) => (
            <HouseRow key={h.id} house={h} />
          ))}
        </ErrorBoundary>
      </tbody>
    </table>
  );
}
```

### ✅ Usage in App Component

```jsx
<ErrorBoundary fallback={<div>Something went wrong in the app.</div>}>
  <App />
</ErrorBoundary>
```

📌 Error boundaries isolate failures and improve resilience. They must be class components and can be placed at multiple levels for granular fallback control.

  </div>
</details>
