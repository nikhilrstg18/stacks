import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import * as styles from "../styles/nav.module.css";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Auth from "./auth.component";

const NavBar = ({ section }) => {
  const data = useStaticQuery(
    graphql`
      query NavInfo {
        file(relativePath: { eq: "icon.png" }) {
          id
          childImageSharp {
            gatsbyImageData(width: 50, aspectRatio: 1)
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
        <Link to="/about" title="About">
          🧑‍💻
        </Link>
        <Link to="/books" title="Books">
          📚
        </Link>
        <Auth />
      </ul>
    </nav>
  );
};
export default NavBar;
