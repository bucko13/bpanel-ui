import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connectTheme } from '../../utils';

class Input extends PureComponent {
  static get propTypes() {
    return {
      children: PropTypes.node,
      defaultValue: PropTypes.string,
      name: PropTypes.string.isRequired,
      onChange: PropTypes.func,
      placeholder: PropTypes.string,
      style: PropTypes.object,
      theme: PropTypes.object,
      type: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };
  }

  static get defaultProps() {
    return {
      onChange: () => {},
      type: 'text',
    };
  }

  render() {
    const {
      type,
      children,
      name,
      onChange,
      placeholder,
      theme,
      style,
      value,
      ...otherProps
    } = this.props;

    return (
      <input
        className={theme.input[type]}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        style={style}
        type={type}
        value={value}
        {...otherProps}
      />
    );
  }
}

export default connectTheme(Input);
