import { Link, graphql, useStaticQuery } from "gatsby";
import * as React from "react";
import * as styles from "../styles/nav.module.css";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const NavBar = ({ section }) => {
  const data = useStaticQuery(
    graphql`
      query NavInfo {
        file(relativePath: { eq: "icon.png" }) {
          id
          childImageSharp {
            gatsbyImageData(width: 64, aspectRatio: 1)
          }
        }
      }
    `
  );
  const image = getImage(data.file.childImageSharp);
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <div className={[styles.cursorbox, styles.pointer].join(" ")}>
          <GatsbyImage
            image={image}
            imgClassName={styles.brand}
            objectFit="contain"
            alt="banner"
          />{" "}
        </div>
      </Link>
      <h1 className={[styles.section, styles.fontxxl].join(" ")}>{section}</h1>
      <span className={styles.filler}></span>
      <ul className={styles.section}>
        <Link to="/books" title="Books">
          📚
        </Link>
        <Link to="/about" title="About">
          🧑‍💻
        </Link>
      </ul>
    </nav>
  );
};
export default NavBar;
