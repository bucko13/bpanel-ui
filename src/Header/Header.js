import React from 'react';
import PropTypes from 'prop-types';

import './Header.scss';
import HEADER_CONSTANTS from '../constants/headerConstants';

const getHeader = (props = {}) => HEADER_CONSTANTS.HEADER_ELEMENTS[props.type];

const Header = ({ type = 'h1', children, ...otherProps }) => {
  const HeaderElement = getHeader({ type, children, otherProps });
  return (
    <HeaderElement
      className={`${type}`}
      type={type}
      children={children}
      {...otherProps}
    />
  );
};

Header.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node
};

export default Header;
