import React from 'react';

import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import GeneralMatrix from '../components/generalMatrix';
import { getPrettyDate, getStandardDate } from '../utils/dates';

export const query = graphql`
    query PagesDefaultQuery($uri: String!) {
        entry: craftPagesDefaultEntry(uri: { eq: $uri }) {
            id
            remoteId
            title
            postDate
            generalContent {
                ...TextFragment
                ...HeadingFragment
            }
        }
    }
`;

const PageDefault = ({ data: { entry } }) => {
    return (
        <Layout>
            <SEO title={entry.title} />
            <h1 className='my-4 text-4xl text-black font-display'>{entry.title}</h1>

            <time className='block pb-4 text-sm' dateTime={getStandardDate(entry.postDate)}>
                {getPrettyDate(entry.postDate)}
            </time>

            <GeneralMatrix blocks={entry.generalContent} />
        </Layout>
    );
};

export default PageDefault;
