import * as React from "react";

export default function Details({ summary, answer, explanation }) {
  return (
    <details>
      <summary>{summary}❓</summary>
      <p>📍{answer}</p>
      <div>{explanation}</div>
    </details>
  );
}
