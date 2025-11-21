import * as React from "react";
import { Link } from "gatsby";

export default function ScrollLink({ id, children }) {
  const handleClick = (e) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <Link to={`#${id}`} onClick={handleClick}>
      {children}
    </Link>
  );
}
