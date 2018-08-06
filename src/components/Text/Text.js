import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connectTheme } from '../../utils';
import { TEXT_CONSTANTS } from '../../constants';
import TextEffects from './TextEffects';

const getText = type =>
  Object.assign(TEXT_CONSTANTS.TEXT_ELEMENTS, TextEffects)[type];

class Text extends PureComponent {
  static get propTypes() {
    return {
      type: PropTypes.string,
    };
  }

  render() {
    const { className = '', style, type = 'span', ...otherProps } = this.props;
    const TextElement = getText(type);
    const textCss = otherProps.theme.text[type] || '';
    return (
      <TextElement
        className={`${className} ${textCss}`}
        style={style}
        {...otherProps}
      />
    );
  }
}

export default connectTheme(Text);
