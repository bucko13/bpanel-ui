import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connectTheme } from '../../utils';

import './Text.scss';

class Text extends PureComponent {
  static get propTypes() {
    return {
      children: PropTypes.node
    };
  }

  render() {
    const { children, ...otherProps } = this.props;
    return <span {...otherProps}>{children}</span>;
  }
}

export default connectTheme(Text);
