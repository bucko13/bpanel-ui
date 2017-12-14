import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Link.scss';

const Link = ({ type, children, ...otherProps }) => {
  return (
    <Route
      className={`${type} ${otherProps.className}`}
      type={type}
      children={children}
      {...otherProps}
    />
  );
};

Link.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node
};

export default Link;
