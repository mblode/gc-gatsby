import React from 'react';

const Image = ({ block }) => {
    const image = block.image[0];

    if (image) {
        return (
            <figure className={`position-${block.position} pt-1`}>
                <img src={image.url} alt={image.title ? image.title : ' '} />

                {/* Assets are elements, so they can have fields attached to them. In this
        project, we've included an optional Caption field. */}
                {block.caption && (
                    <figcaption className='text-sm text-gray-600 p2 text-center'>{block.caption}</figcaption>
                )}
            </figure>
        );
    } else {
        return <div>Image not found...</div>;
    }
};

export default Image;
