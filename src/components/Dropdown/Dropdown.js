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
      options: PropTypes.array
    };
  }

  // options shape is { value, label }
  // if options array[0], assume proper shape
  // otherwise, map to { value: element, label: element }
  formatOptions(options = []) {
    // assume all elements same type
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
      control: styles => ({ ...styles, backgroundColor: 'white' }),
      option: (styles, state) => {
        return {
          ...styles,
          color: 'black',
          textColor: 'black',
          cursor: 'default'
        };
      }
    };
  }

  render() {
    const { theme = {}, options = [], onChange } = this.props;

    // TODO: cache options if large
    const _options = this.formatOptions(options);

    return (
      <Select
        options={_options}
        styles={this.customStyles(theme)}
        onChange={onChange}
      />
    );
  }
}

export default connectTheme(Dropdown);
