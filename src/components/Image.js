import React from 'react';

const Image = ({ src, onClick }) => {
    return (
        <img className="image" src={src} alt="Dog" onClick={() => onClick(src)} />
    );
};

export default Image;