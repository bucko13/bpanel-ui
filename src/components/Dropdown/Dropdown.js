import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { connectTheme } from '../../utils';

/*
 * See full API for react-select here:
 * https://github.com/JedWatson/react-select/#usage
 */

class Dropdown extends PureComponent {
  // options prop populates Select selection options
  // onChange({ label, value }, { action, option }) => void
  static get propTypes() {
    return {
      defaultValue: PropTypes.string,
      theme: PropTypes.object,
      style: PropTypes.object,
      placeholder: PropTypes.string,
      options: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(
          PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            label: PropTypes.string,
          })
        ),
      ]),
      onChange: PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      placeholder: 'Select...',
    };
  }

  // <Select options /> shape is { value, label }
  // if options array[0] isn't a string
  // or number, assume proper shape
  // otherwise, map to { value: element, label: element }
  formatOptions(options = []) {
    // assume all elements same type
    // as to not have to iterate over all of them
    const t = typeof options[0];
    if (t === 'string' || t === 'number')
      return options.map(el => ({ label: `${el}`, value: `${el}` }));
    return options;
  }

  // parse theme and style <Select />
  // see https://react-select.com/styles for usage
  customStyles(theme) {
    const { themeVariables = {} } = theme;
    const { themeColors = {} } = themeVariables;

    return {
      option: (styles, { isSelected, isFocused }) => {
        let backgroundColor = themeColors.white;
        let fontWeight;
        if (isSelected) backgroundColor = themeColors.highlight2;
        if (isFocused) fontWeight = 'bold';

        return {
          ...styles,
          ':active': themeColors.highlight2,
          backgroundColor,
          color: themeColors.black,
          cursor: 'pointer',
          fontWeight,
        };
      },
    };
  }

  render() {
    const {
      theme = {},
      options = [],
      onChange,
      defaultValue,
      placeholder,
    } = this.props;

    // TODO: cache options if large
    return (
      <div className={theme.dropdown.container}>
        <Select
          defaultValue={defaultValue}
          options={this.formatOptions(options)}
          placeholder={placeholder}
          styles={this.customStyles(theme)}
          onChange={onChange}
        />
      </div>
    );
  }
}

export default connectTheme(Dropdown);
