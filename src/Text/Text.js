import React from 'react';
import PropTypes from 'prop-types';

import './Text.scss';

const Text = ({ type = 'default', children, ...otherProps }) => (
  <span className={`${type}`} {...otherProps}>
    {children}
  </span>
);

Text.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node
};

export default Text;
