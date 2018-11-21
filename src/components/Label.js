import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Text from './Text';

/*
 * renders text on top of children components
 */
class Label extends PureComponent {
  static get propTypes() {
    return {
      text: PropTypes.string,
      children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
      ]),
      textClasses: PropTypes.string,
      stacked: PropTypes.bool,
      className: PropTypes.string,
      theme: PropTypes.object,
      style: PropTypes.object,
    };
  }

  static get defaultProps() {
    return {
      className: '',
      textClasses: '',
      stacked: true,
      theme: {},
      style: {},
    };
  }

  render() {
    const {
      text,
      children,
      className,
      theme,
      style,
      textClasses,
      stacked,
    } = this.props;
    console.log('theme.lab');
    return (
      <div
        key={0}
        className={`${stacked
          ? 'flex-column'
          : 'row align-items-center'} ${className}`}
        style={Object.assign({ width: '100%' }, style)}
      >
        <Text className={`col-auto ${theme.label || ''} ${textClasses}`}>
          {text}
        </Text>
        <div className="col">{children}</div>
      </div>
    );
  }
}

export default Label;
