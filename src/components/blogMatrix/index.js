import React from 'react';

import RichText from './types/richText';
import { graphql } from 'gatsby';
import Image from './types/image';
import ImageCarousel from './types/imageCarousel';
import Quote from './types/quote';
//import Embed from "./types/embed"

const components = {
    richText: RichText,
    image: Image,
    imageCarousel: ImageCarousel,
    quote: Quote,
    //embed: Embed
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
    fragment RichTextFragment on Craft_blogContent_richText_BlockType {
        richText
        typeHandle
    }

    fragment QuoteFragment on Craft_blogContent_quote_BlockType {
        quote
        attribution
        typeHandle
    }

    fragment ImageFragment on Craft_blogContent_image_BlockType {
        image {
            url
            title
        }
        caption
        typeHandle
    }

    fragment ImageCarouselFragment on Craft_blogContent_imageCarousel_BlockType {
        images {
            url
            title
        }
        typeHandle
    }

    fragment EmbedFragment on Craft_blogContent_embed_BlockType {
        code
        typeHandle
    }
`;
