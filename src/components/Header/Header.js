import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { HEADER_CONSTANTS } from '../../constants';
import { connectTheme } from '../../utils';

import './Header.scss';

const getHeader = (props = {}) => HEADER_CONSTANTS.HEADER_ELEMENTS[props.type];

class Header extends PureComponent {
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

export default connectTheme(Header);
