import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Header.scss';
import HEADER_CONSTANTS from '../../constants/headerConstants';

const getHeader = (props = {}) => HEADER_CONSTANTS.HEADER_ELEMENTS[props.type];

export default class Header extends PureComponent {
  static get propTypes() {
    return {
      type: PropTypes.string,
      children: PropTypes.node
    };
  }
  render() {
    const { type = 'h1', children, ...otherProps } = this.props;
    const HeaderElement = getHeader({ type, children, otherProps });
    return (
      <HeaderElement
        className={`${type}`}
        type={type}
        children={children}
        {...otherProps}
      />
    );
  }
}
