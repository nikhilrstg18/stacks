import * as React from "react";
import { Link } from "gatsby";
import * as styles from "../styles/aside.module.css";

export default function Tray({ sideMenu }) {
  function titleCase(str) {
    if (str === "0_c") {
      str = "c#";
    }
    // Split the string by underscores
    let words = str.split("_");
    let capitalizedWords = words.map((word) => {
      switch (word) {
        case "ai":
        case "llm":
        case "nlp":
          return word.toUpperCase();
        default:
          return word.charAt(0).toUpperCase() + word.slice(1);
      }
    });

    // Join the words back together with spaces
    let titleCaseString = capitalizedWords
      .map((w) => w.replace(/[\d]+/g, ""))
      .join(" ");

    return titleCaseString;
  }
  return (
    <footer className={styles.tray}>
      <div>
        <div className={styles.trayBack}>
          <Link to="../">👈</Link>
        </div>
        {sideMenu
          .sort((a, b) => a?.name - b?.name)
          ?.map((sm) => (
            <div className={styles.traySection} key="sm">
              {sm.menu?.map((m) => (
                <div key={m?.id}>
                  <Link to={m?.name}>{titleCase(m?.name)}</Link>
                </div>
              ))}
            </div>
          ))}
      </div>
    </footer>
  );
}
