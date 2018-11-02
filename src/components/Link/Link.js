import React, { PureComponent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connectTheme } from '../../utils';

class Link extends PureComponent {
  static get propTypes() {
    return {
      children: PropTypes.node,
      to: PropTypes.string,
      dummy: PropTypes.bool,
      onClick: PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      dummy: false,
    };
  }

  render() {
    const {
      children,
      to,
      theme,
      style,
      dummy,
      onClick,
      ...otherProps
    } = this.props;
    const isExternal = /^https?:\/\//.test(to);
    const linkProps = {
      className: `${theme.link.default} ${otherProps.className}`,
      children: children,
      style,
      ...otherProps,
    };
    /*
     * prioritize dummy links
     * then external links
     * then react router links
     */
    if (dummy)
      return <a href="javascript:void(0)" onClick={onClick} {...linkProps} />;
    else if (isExternal)
      return <a href={to} target="_blank" rel="noopener" {...linkProps} />;
    else return <RouterLink to={to} {...linkProps} />;
  }
}

export default connectTheme(Link);
