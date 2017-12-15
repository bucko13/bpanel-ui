import React, { PureComponent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Link.scss';

export default class Link extends PureComponent {
  static get propTypes() {
    return {
      children: PropTypes.node,
      to: PropTypes.string.isRequired
    };
  }

  render() {
    const { children, to, ...otherProps } = this.props;
    return (
      <RouterLink
        to={to}
        className={`b-link ${otherProps.className}`}
        children={children}
        {...otherProps}
      />
    );
  }
}
