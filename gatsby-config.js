/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Stacks`,
    welcome: `Welcome Learner`,
    description: "Subject by experience",
    siteUrl: `https://www.nikhilrstg18.github.io/stacks`,
    author: `Nikhil Rustagi`,
    copyright: "© 2025",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          placeholder: "blurred",
          quality: 70,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: "./content",
      },
      __key: "content",
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          "gatsby-remark-markmap",
          "gatsby-remark-gifs",
          `gatsby-remark-autolink-headers`,
          {
            resolve: "gatsby-remark-code-titles",
            options: {
              className: "gatsby-remark-code-title",
            },
          },`gatsby-remark-prismjs-copy-button`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true,
              noInlineHighlight: false,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 750,
              withWebp: true,
              showCaptions: true,
              quality: 70,
            },
          },
          {
            resolve: "gatsby-remark-embed-youtube",
            options: {
              width: 794,
              height: 447,
            },
          },
        ],
      },
    },
  ],
};
