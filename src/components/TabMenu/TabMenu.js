import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';
import { connectTheme } from '../../utils';

const defaultTabs = [
  { header: 'Tab 1', body: <div>Welcome to bPanel!</div> },
  { header: 'Tab 2', body: <div>Tab 2 content</div> },
  { header: 'Tab 3', body: <div>Tab 3 content</div> }
];

class TabMenu extends PureComponent {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0
    };
  }

  static get propTypes() {
    return {
      tabs: PropTypes.arrayOf(PropTypes.object)
    };
  }

  static get defaultProps() {
    return {
      style: { tabMenu: {} },
      tabs: defaultTabs,
      theme: { tabMenu: {} }
    };
  }

  renderHeader(header, index) {
    return (
      <div onClick={() => this.setState({ selectedIndex: index })}>
        <Text>{header}</Text>
      </div>
    );
  }

  render() {
    const {
      tabs,
      theme: {
        tabMenu: {
          headerContainer,
          headerText,
          headerTextActive,
          headerTextInactive,
          bodyContainer,
          bodyActive,
          bodyInactive
        }
      },
      style: {
        tabMenu: {
          customHeaderContainer = {},
          customHeaderText = {},
          customHeaderTextActive = {},
          customHeaderTextInactive = {},
          customBodyContainer = {},
          customBodyActive = {},
          customBodyInactive = {}
        }
      },
      ...otherProps
    } = this.props;
    const { selectedIndex } = this.state;

    return (
      <div>
        <div style={{ ...headerContainer, ...customHeaderContainer }}>
          {tabs.map(({ header }, index) => {
            const selected = selectedIndex === index;
            const stateStyles = selected
              ? { ...headerTextActive, ...customHeaderTextActive }
              : { ...headerTextInactive, ...customHeaderTextInactive };
            return (
              <div
                style={{ ...headerText, ...stateStyles }}
                key={`${header}-header-${index}`}
              >
                {this.renderHeader(header, index)}
              </div>
            );
          })}
        </div>
        {tabs.map(({ body, header }, index) => {
          const selected = selectedIndex === index;
          const stateStyles = selected
            ? { ...bodyActive, ...customBodyActive }
            : { ...bodyInactive, ...customBodyInactive };
          return (
            <div
              style={{ ...bodyContainer, ...stateStyles }}
              key={`${header}-body-${index}`}
            >
              {body}
            </div>
          );
        })}
      </div>
    );
  }
}

export default connectTheme(TabMenu);
