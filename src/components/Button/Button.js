import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connectTheme } from '../../utils';

import './Button.scss';

class Button extends PureComponent {
  static get propTypes() {
    return {
      type: PropTypes.string,
      children: PropTypes.node
    };
  }

  render() {
    const { type = 'default', children, ...otherProps } = this.props;
    return (
      <button className={`${type}`} {...otherProps}>
        {children}
      </button>
    );
  }
}

export default connectTheme(Button);
