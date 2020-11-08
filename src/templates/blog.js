import React from 'react';

import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import BlogMatrix from '../components/blogMatrix';
import { getPrettyDate, getStandardDate } from '../utils/dates';

export const query = graphql`
    query BlogPostsQuery($slug: String!) {
        entry: craftBlogBlogEntry(slug: { eq: $slug }) {
            id
            remoteId
            title
            postDate
            blogContent {
                ...RichTextFragment
                ...QuoteFragment
                ...ImageFragment
                ...ImageCarouselFragment
                ...EmbedFragment
            }
        }
    }
`;

const BlogPostPage = ({ data: { entry } }) => {
    return (
        <Layout>
            <SEO title={entry.title} />
            <h1 className='my-4 text-4xl text-black font-display'>{entry.title}</h1>

            <time className='block pb-4 text-sm' dateTime={getStandardDate(entry.postDate)}>
                {getPrettyDate(entry.postDate)}
            </time>

            <BlogMatrix blocks={entry.blogContent} />
        </Layout>
    );
};

export default BlogPostPage;
