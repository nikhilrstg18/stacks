import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as React from "react";
import Site from "../layouts/site.layout";
import * as styles from "../styles/home.module.css";

const IndexPage = ({ data }) => {
  const { description, title, welcome, author, copyright } =
    data.site.siteMetadata;
  const image = getImage(data.file.childImageSharp);
  return (
    <Site>
      <div className={styles.container}>
        <div>
          <h1 className={styles.header}>{welcome}</h1>
          <h2>
            <Link to="books">
              {title} {description} 👉 📚
            </Link>
          </h2>
          <h3>
            by {author} {copyright}
          </h3>
        </div>
          <GatsbyImage
            image={image}
            imgClassName={styles.banner}
            objectFit="contain"
            alt="banner"
          />
      </div>
    </Site>
  );
};

export default IndexPage;

export const Head = () => <title>Stacks</title>;

export const query = graphql`
  query HomeInfo {
    site {
      siteMetadata {
        description
        title
        welcome
        siteUrl
        author
        copyright
      }
    }
    file(relativePath: { eq: "icon_brand.png" }) {
      id
      childImageSharp {
        gatsbyImageData(height: 256, width: 256, aspectRatio: 1)
      }
    }
  }
`;
