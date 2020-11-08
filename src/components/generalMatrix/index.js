import React from 'react';

import RichText from './types/richText';
import { graphql } from 'gatsby';
import Heading from './types/Heading';

const components = {
    richText: RichText,
    heading: Heading,
};

const Block = (props) => {
    const { block } = props;
    const type = block.typeHandle;
    const Component = components[type];

    if (Object.keys(components).includes(type)) {
        return <Component {...props} />;
    } else {
        return null;
    }
};

const Blocks = ({ blocks }) => {
    return (
        <div>
            {blocks.map((block, i) => (
                <Block key={i} block={block} />
            ))}
        </div>
    );
};

export default Blocks;

export const query = graphql`
    fragment TextFragment on Craft_generalContent_richText_BlockType {
        richText
        typeHandle
    }

    fragment HeadingFragment on Craft_generalContent_heading_BlockType {
        heading
        size
        typeHandle
    }
`;
