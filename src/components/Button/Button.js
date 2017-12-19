import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connectTheme } from '../../utils';

class Button extends PureComponent {
  static get propTypes() {
    return {
      children: PropTypes.node
    };
  }

  render() {
    const { children, theme, style, ...otherProps } = this.props;
    return (
      <button style={{ ...theme.button, ...style }} {...otherProps}>
        {children}
      </button>
    );
  }
}

export default connectTheme(Button);
