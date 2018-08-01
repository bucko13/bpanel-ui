import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Link from '../Link/Link';
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
      id: PropTypes.string,
      pathName: PropTypes.string,
      subItem: PropTypes.bool,
      theme: PropTypes.object.isRequired,
    };
  }

  onGetActive(name, pathname) {
    const { theme } = this.props;
    return pathname === name ? theme.sidebar.itemActive : '';
  }

  render() {
    const {
      name,
      displayName,
      icon = 'cog',
      subItem = false,
      id,
      children,
      pathname, // path from window.location object
      pathName, // name from metadata to use as path for link
      theme,
    } = this.props;
    const defaultPath = pathName ? pathName : name;
    const activeCss = this.onGetActive(defaultPath, pathname);
    const path = pathName ? pathName : name;
    const dataId = id ? id : name;
    return (
      <Link
        to={path}
        className={`${theme.sidebar.link} nav-item sidebar-link ${subItem
          ? theme.sidebar.subItem
          : ''}`}
        onMouseEnter={this.onToggleHover}
        onMouseLeave={this.onToggleHover}
      >
        <div
          className={`${activeCss} ${theme.sidebar.item} sidebar-item`}
          data-id={dataId}
        >
          <i className={`${theme.sidebar.itemIcon} fa fa-${icon}`} />
          <Text>{displayName ? displayName : name}</Text>
          {children}
        </div>
      </Link>
    );
  }
}

export default connectTheme(SidebarNavItem);
