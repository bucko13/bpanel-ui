import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connectTheme } from '../utils';

class Spinner extends PureComponent {
  static get propTypes() {
    return {
      className: PropTypes.string,
      style: PropTypes.object,
      theme: PropTypes.object,
      error: PropTypes.object,
      size: PropTypes.string,
    };
  }

  render() {
    const {
      className = '',
      style: _style,
      // fontawesome size suffixes https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons
      size = '2x',
      theme: { themeVariables: { themeColors } },
      error,
      ...otherProps
    } = this.props;

    const style = { color: themeColors.primary, ..._style };
    let loader;
    if (error) {
      loader = (
        <div className="error" style={style} {...otherProps}>
          There was an error loading the content{error.message ? `: ${error.message}` : ''}
        </div>
      );
    } else {
      loader = (
        <div
          className={`${className} fa fa-spinner fa-spin fa-${size}`}
          style={style}
          {...otherProps}
        />
      );
    }
    return <div>{loader}</div>;
  }
}

export default connectTheme(Spinner);
