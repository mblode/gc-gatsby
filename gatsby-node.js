/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    const blogPostTemplate = path.resolve(`src/templates/blog.js`);
    const pageAboutTemplate = path.resolve(`src/templates/about.js`);
    const pageDefaultTemplate = path.resolve(`src/templates/default.js`);

    return graphql(
        `
            query PageQuery {
                blogPosts: allCraftBlogBlogEntry {
                    nodes {
                        remoteId
                        slug
                        uri
                    }
                }
                pageDefault: allCraftPagesDefaultEntry {
                    nodes {
                        remoteId
                        slug
                        uri
                    }
                }
                pageAbout: allCraftPagesAboutEntry {
                    nodes {
                        remoteId
                        slug
                        uri
                    }
                }
            }
        `,
        { limit: 1000 }
    ).then((result) => {
        if (result.errors) {
            throw result.errors;
        }

        const blogPosts = result.data.blogPosts.nodes;
        const pageDefault = result.data.pageDefault.nodes;
        const pageAbout = result.data.pageAbout.nodes;

        // Create blog post pages.
        const createAllPages = (nodes, template) => {
            nodes.forEach((post) => {
                createPage({
                    // Path for this page — required
                    path: `/${post.uri}`,
                    component: template,
                    context: {
                        uri: post.uri,
                        slug: post.slug,
                    },
                });
            });
        };

        createAllPages(blogPosts, blogPostTemplate);
        createAllPages(pageDefault, pageDefaultTemplate);
        createAllPages(pageAbout, pageAboutTemplate);

        // Create blog post list pages (for pagination)
        const postsPerPage = 10;
        const numPages = Math.ceil(blogPosts.length / postsPerPage);

        Array.from({ length: numPages }).forEach((_, i) => {
            const currentPage = i + 1;
            const nextUrl = numPages !== currentPage ? `/p${currentPage + 1}` : null;
            const prevUrl = currentPage !== 1 ? (currentPage === 2 ? '/' : `/p${currentPage - 1}`) : null;

            createPage({
                path: i === 0 ? `/` : `/p${currentPage}`,
                component: path.resolve('./src/templates/home.js'),
                context: {
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    totalPages: numPages,
                    currentPage: currentPage,
                    nextUrl,
                    prevUrl,
                },
            });
        });
    });
};
