import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import { connectTheme } from '../../utils';
import Text from '../Text/Text';

const getActive = (name, pathname) =>
  pathname.includes(name) ? 'sidebar-item-active' : '';

class SidebarNavItem extends PureComponent {
  static get propTypes() {
    return {
      children: PropTypes.node,
      icon: PropTypes.string,
      key: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
      name: PropTypes.string.isRequired,
      pathname: PropTypes.string,
      pathName: PropTypes.string,
      subItem: PropTypes.bool,
      theme: PropTypes.object.isRequired
    };
  }

  onGetActive(name, pathname) {
    const { theme } = this.props;
    return pathname.includes(name) ? theme.sidebar.itemActive : '';
  }

  render() {
    const {
      name,
      icon = 'cog',
      subItem = false,
      children,
      pathname,
      pathName, // name to use as path for link
      theme
    } = this.props;
    const activeCss = this.onGetActive(name, pathname);

    return (
      <RouterLink
        to={pathName}
        className={`${theme.sidebar.link} nav-item sidebar-link ${subItem
          ? 'subItem'
          : ''}`}
        onMouseEnter={this.onToggleHover}
        onMouseLeave={this.onToggleHover}
      >
        <div className={`${activeCss} ${theme.sidebar.item} sidebar-item`}>
          <i className={`${theme.sidebar.itemIcon} fa fa-${icon}`} />
          <Text>{name}</Text>
          {children}
        </div>
      </RouterLink>
    );
  }
}

export default connectTheme(SidebarNavItem);
