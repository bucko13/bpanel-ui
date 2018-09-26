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
      pastDelay: PropTypes.bool,
      timedOut: PropTypes.bool,
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
      timedOut = false, // for use with react-loader to allow for timed out message
      pastDelay = true, // for use with react-loader to avoid flashing the loading icon
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
    } else if (timedOut) {
      loader = (
        <div className="error" style={style} {...otherProps}>
          Network request timed out.
        </div>
      );
    } else if (pastDelay) {
      loader = (
        <div
          className={`${className} fa fa-spinner fa-spin fa-${size}`}
          style={style}
          {...otherProps}
        />
      );
    } else {
      loader = '';
    }
    return <div>{loader}</div>;
  }
}

export default connectTheme(Spinner);
