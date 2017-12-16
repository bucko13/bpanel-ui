import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connectTheme } from '../../utils';

class Text extends PureComponent {
  static get propTypes() {
    return {
      children: PropTypes.node
    };
  }

  render() {
    const { children, theme, style, ...otherProps } = this.props;
    return (
      <span style={{ ...theme.text, ...style }} {...otherProps}>
        {children}
      </span>
    );
  }
}

export default connectTheme(Text);
