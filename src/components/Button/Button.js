import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connectTheme } from '../../utils';

class Button extends PureComponent {
  static get propTypes() {
    return {
      children: PropTypes.node,
    };
  }

  render() {
    const {
      type = 'primary',
      children,
      theme,
      style = {},
      className,
      disabled = false,
      ...otherProps
    } = this.props;

    const buttonType = theme.button[type];
    if (disabled) style.cursor = 'not-allowed';

    return (
      <button
        className={`${className} ${buttonType}`}
        style={style}
        {...otherProps}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}

export default connectTheme(Button);
