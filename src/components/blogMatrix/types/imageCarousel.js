import React, { Fragment } from 'react';

const ImageCarousel = ({ block }) => {
    const heights = {
        '16:9': '56.25%',
        '4:3': '75%',
        '3:2': '66.666%',
    };
    const height = heights[block.aspectRatio];

    return (
        <Fragment>
            {block.images.map((image, i) => (
                <figure
                    key={i}
                    className='relative item'
                    style={{
                        paddingTop: height,
                    }}>
                    <img src={image.url} alt={image.title} className='absolute inset-0 w-full h-full object-cover' />
                </figure>
            ))}
        </Fragment>
    );
};

export default ImageCarousel;
