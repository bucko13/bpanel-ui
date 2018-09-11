import React, { PureComponent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connectTheme } from '../../utils';

class Link extends PureComponent {
  static get propTypes() {
    return {
      children: PropTypes.node,
      to: PropTypes.string.isRequired,
    };
  }

  render() {
    const { children, to, theme, style, ...otherProps } = this.props;
    const isExternal = /^https?:\/\//.test(to);
    const linkProps = {
      className: `${theme.link.default} ${otherProps.className}`,
      children: children,
      style,
      ...otherProps,
    };
    return isExternal ? (
      <a href={to} target="_blank" rel="noopener" {...linkProps} />
    ) : (
      <RouterLink to={to} {...linkProps} />
    );
  }
}

export default connectTheme(Link);
