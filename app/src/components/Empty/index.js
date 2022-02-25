import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

const Empty = ({
  title,
}) => (
  <div className="empty-container">
    <span>{title}</span>
  </div>
);

Empty.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Empty;
