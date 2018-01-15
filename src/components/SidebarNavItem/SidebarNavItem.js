import React, { PureComponent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connectTheme } from '../../utils';
import Text from '../Text/Text';

const getActive = (name, pathname) =>
  pathname.includes(name) ? 'sidebar-item-active' : '';

class SidebarNavItem extends PureComponent {
  constructor() {
    super();
    this.state = {
      hovered: false
    };
    this.onToggleHover = this.onToggleHover.bind(this);
  }

  static get propTypes() {
    return {
      theme: PropTypes.object.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.string,
      subItem: PropTypes.bool,
      children: PropTypes.node,
      pathname: PropTypes.string
    };
  }

  onToggleHover() {
    this.setState({ hovered: !this.state.hovered });
  }

  onGetActive(name, pathname) {
    const { theme } = this.props;
    return pathname.includes(name) ? theme.sidebar.item.active : {};
  }

  render() {
    const {
      name,
      icon = 'cog',
      subItem = false,
      children,
      pathname,
      theme
    } = this.props;
    const hoverStyle = this.state.hovered ? theme.sidebar.item.hover : {};

    return (
      <RouterLink
        to={name}
        className={`nav-item sidebar-link ${subItem ? 'subItem' : ''}`}
        style={theme.sidebar.link}
        onMouseEnter={this.onToggleHover}
        onMouseLeave={this.onToggleHover}
      >
        <div
          style={{
            ...theme.sidebar.item,
            ...hoverStyle,
            ...this.onGetActive(name, pathname)
          }}
          className={`sidebar-item  ${getActive(name, pathname)}`}
        >
          <i className={`fa fa-${icon}`} style={theme.sidebar.itemIcon} />
          <Text>{name}</Text>
          {children}
        </div>
      </RouterLink>
    );
  }
}

export default connectTheme(SidebarNavItem);
