import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { connectTheme } from '../../utils';

/*
 * See full API here:
 * https://github.com/JedWatson/react-select/#usage
 */

// options prop populates Select
// onChange({ label, value }, { action, option }) => void

class Dropdown extends PureComponent {
  static get propTypes() {
    return {
      theme: PropTypes.object,
      style: PropTypes.object,
      options: PropTypes.array,
      onChange: PropTypes.func
    };
  }

  // options shape is { value, label }
  // if options array[0], assume proper shape
  // otherwise, map to { value: element, label: element }
  formatOptions(options = []) {
    // assume all elements same type
    // as to not have to iterate over all of them
    const t = typeof options[0];
    if (t === 'string' || t === 'number') {
      return options.map(el => ({ label: `${el}`, value: `${el}` }));
    }
    return options;
  }

  customStyles(theme) {
    const { themeVariables = {} } = theme;
    const { themeColors = {} } = themeVariables;

    return {
      control: styles => ({ ...styles, backgroundColor: themeColors.white }),
      option: (styles, { isSelected }) => {
        return {
          ...styles,
          color: themeColors.black,
          backgroundColor: themeColors.white,
          textColor: themeColors.black,
          cursor: 'default'
        };
      }
    };
  }

  render() {
    const { theme = {}, options = [], onChange } = this.props;

    // TODO: cache options if large
    return (
      <div className={theme.dropdown.container}>
        <Select
          options={this.formatOptions(options)}
          styles={this.customStyles(theme)}
          onChange={onChange}
        />
      </div>
    );
  }
}

export default connectTheme(Dropdown);
