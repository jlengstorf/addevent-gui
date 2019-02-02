module.exports = {
  siteMetadata: {
    title: `Create an AddEvent Link`,
    description: `AddEvent is great for creating links that allow people to add an event to their calendar. However, their API is kinda hard to use. This makes it less hard.`,
    author: `@jlengstorf`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `create-addevent-link`,
        short_name: `AddEvent 🔗`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ]
};
