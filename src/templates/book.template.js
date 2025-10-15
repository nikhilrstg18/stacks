import { graphql } from "gatsby";
import * as React from "react";
import Notebook from "../layouts/notebook.layout";
import * as styles from "../styles/book.module.css";

export default function Book({ data }) {
  const { html, frontmatter, tableOfContents, timeToRead } =
    data.markdownRemark;
  const { title, stack, date } = frontmatter;
  const sideMenu = data?.allDirectory?.edges
    ?.map((x) => x.node)
    .sort((a, b) => a.name - b.name);

  function toSectionMenu(input) {
    const output = [];

    // Create an object to store sections
    const sections = {};

    // Group elements by relativeDirectory
    input.forEach((item) => {
      const section = item.relativeDirectory;
      if (!sections[section]) {
        sections[section] = [];
      }
      sections[section].push({
        id: item.id,
        name: item.name,
      });
    });

    // Convert grouped sections into desired output format
    for (const section in sections) {
      output.push({
        section: section,
        menu: sections[section],
      });
    }

    return output;
  }

  const sectionMenu = toSectionMenu(sideMenu);

  return (
    <Notebook content={tableOfContents} sideMenu={sectionMenu} stack={stack}>
      <div className={styles.container}>
        <div className={styles.book}>
          <h1>{title}</h1>
          <cite>
            {stack} - <span>{timeToRead}</span>min&nbsp;read
          </cite>
          <div className={styles.tableOfContentMobile}>
            <h4>In this page</h4>
            <div dangerouslySetInnerHTML={{ __html: tableOfContents }}></div>
          </div>

          <div dangerouslySetInnerHTML={{ __html: html }} />
          {/* <div className={styles.np}>
            {prev ? (
              <Link to={prev} title="Prev">
                👈
              </Link>
            ) : (
              ""
            )}
            {next ? (
              <Link to={next} title="Next">
                👉
              </Link>
            ) : (
              ""
            )}
          </div> */}
          <footer className={styles.footer}>
            © {new Date(Date.now()).getFullYear()} <em>Nikhil Rustagi</em>.
            Published on {date.slice(0, 10)}
          </footer>
        </div>
        <div className=".mob">
          <div className={styles.tableOfContent}>
            <h4 title="HeliCoptor View">🚁</h4>
            <div dangerouslySetInnerHTML={{ __html: tableOfContents }}></div>
          </div>
        </div>
      </div>
    </Notebook>
  );
}
export const query = graphql`
  query BookInfo($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        stack
        title
        date
      }
      id
      tableOfContents(maxDepth: 6)
      timeToRead
    }
    allDirectory(
      filter: {
        sourceInstanceName: { eq: "content" }
        relativeDirectory: { eq: $slug }
      }
      sort: { name: ASC }
    ) {
      edges {
        node {
          id
          name
          relativeDirectory
        }
      }
    }
  }
`;
