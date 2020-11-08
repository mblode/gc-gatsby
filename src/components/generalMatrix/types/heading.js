import React from 'react';

const Heading = ({ block }) => {
    return <h1 className={`${block.size}`}>{block.heading}</h1>;
};

export default Heading;
