import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { HEADER_CONSTANTS } from '../../constants';
import { connectTheme } from '../../utils';

const getHeader = type => HEADER_CONSTANTS.HEADER_ELEMENTS[type];

class Header extends PureComponent {
  static get propTypes() {
    return {
      type: PropTypes.string,
    };
  }

  render() {
    const { type = 'h1', theme, style, ...otherProps } = this.props;
    const HeaderElement = getHeader(type);
    return (
      <HeaderElement
        className={`${theme.header[type]}`}
        style={style}
        {...otherProps}
      />
    );
  }
}

export default connectTheme(Header);
