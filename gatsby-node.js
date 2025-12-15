const path = require("path");
const dotenv = require("dotenv");

exports.createPages = async ({ graphql, actions }) => {
  dotenv.config();
  const { data } = await graphql(`
    query BookInfo {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { eq: false } } }
        sort: { frontmatter: { stack: ASC } }
      ) {
        nodes {
          frontmatter {
            slug
            stack
            title
          }
          html
          id
          tableOfContents(pathToSlugField: "")
        }
      }
    }
  `);

  data.allMarkdownRemark.nodes.forEach((node) => {
    actions.createPage({
      path: `/books/${node.frontmatter.slug}`,
      component: path.resolve("./src/templates/book.template.js"),
      context: {
        slug: node.frontmatter.slug,
      },
    });
  });
};
