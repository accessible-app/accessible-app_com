module.exports = {
  siteMetadata: {
    title: `Accessible App`,
    description: `Learn how to build inclusive web applications and Single Page Apps in modern JavaScript frameworks. This project collects strategies, links, patterns and plugins for React, Vue and Angular.`,
    author: `@_marcusherrmann`,
    image: `/images/a11yfav.png`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '7',
        matomoUrl: 'https://stat.marcus-herrmann.com',
        siteUrl: 'https://accessible-app.com'
      }
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Accessible App`,
        short_name: `A11y App`,
        start_url: `/`,
        background_color: `#3D8CAD`,
        theme_color: `#3D8CAD`,
        display: `minimal-ui`,
        icon: `src/images/a11yfav.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline',
  ],
}
