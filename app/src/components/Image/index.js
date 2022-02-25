import React from 'react';
import PropTypes from 'prop-types';

import settings from 'settings';

import './style.less';

const {
  host, port, defaultImage,
} = settings;

const Image = ({
  src,
  alt,
}) => {
  const imageSrc = src || defaultImage;

  return (
    <div className="image-container">
      <img
        src={`http://${host}:${port}${imageSrc}`}
        alt={alt || 'image'}
        className="image-container_image"
      />
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

Image.defaultProps = {
  src: null,
  alt: null,
};

export default Image;
