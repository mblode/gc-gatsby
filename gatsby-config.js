const config = require('./data/config');

module.exports = {
    /* Your site config here */
    siteMetadata: {
        title: `Title from siteMetadata`,
        author: `@craftcms`,
        description: `Craft CMS blog starter`,
        siteUrl: urljoin(config.siteUrl, config.pathPrefix),
        rssMetadata: {
            site_url: urljoin(config.siteUrl, config.pathPrefix),
            feed_url: urljoin(config.siteUrl, config.pathPrefix, config.siteRss),
            title: config.siteTitle,
            description: config.siteDescription,
            image_url: `${urljoin(config.siteUrl, config.pathPrefix)}/logos/logo-512.png`,
            copyright: config.copyright,
        },
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-source-craft`,
        `gatsby-plugin-theme-ui`,
        `gatsby-plugin-offline`,
        `gatsby-plugin-sitemap`,
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: config.siteTitle,
                short_name: config.siteTitleShort,
                description: config.siteDescription,
                start_url: config.pathPrefix,
                background_color: config.backgroundColor,
                theme_color: config.themeColor,
                display: 'minimal-ui',
                icons: [
                    {
                        src: '/logos/logo-192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/logos/logo-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
        },
        'gatsby-plugin-offline',
        {
            resolve: 'gatsby-plugin-netlify-cms',
            options: {
                enableIdentityWidget: true,
                publicPath: 'admin',
                htmlTitle: 'Content Manager',
                includeRobots: false,
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'assets',
                path: `${__dirname}/static/`,
            },
        },
    ],
};
