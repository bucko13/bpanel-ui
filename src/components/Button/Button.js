import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connectTheme } from '../../utils';

import './Button.scss';

class Button extends PureComponent {
  static get propTypes() {
    return {
      children: PropTypes.node
    };
  }

  render() {
    const { children, ...otherProps } = this.props;
    return <button {...otherProps}>{children}</button>;
  }
}

export default connectTheme(Button);
