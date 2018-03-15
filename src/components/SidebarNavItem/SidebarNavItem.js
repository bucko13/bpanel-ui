import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import { connectTheme } from '../../utils';
import Text from '../Text/Text';

const getActive = (name, pathName) =>
  pathName.includes(name) ? 'sidebar-item-active' : '';

class SidebarNavItem extends PureComponent {
  static get propTypes() {
    return {
      children: PropTypes.node,
      icon: PropTypes.string,
      key: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
      name: PropTypes.string.isRequired,
      pathName: PropTypes.string,
      subItem: PropTypes.bool,
      theme: PropTypes.object.isRequired
    };
  }

  onGetActive(name, pathName) {
    const { theme } = this.props;
    return pathName.includes(name) ? theme.sidebar.itemActive : '';
  }

  render() {
    const {
      name,
      icon = 'cog',
      subItem = false,
      children,
      pathName,
      theme
    } = this.props;
    const activeCss = this.onGetActive(name, pathName);

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
