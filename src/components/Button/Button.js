import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

export default class Button extends PureComponent {
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
