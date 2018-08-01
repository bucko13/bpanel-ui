import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { connectTheme } from '../../utils';
import { helpers } from '../../utils/';

class CondensedTextView extends PureComponent {
  static get propTypes() {
    return {
      enableCopy: PropTypes.bool,
      leadText: PropTypes.string,
      bodyText: PropTypes.string,
      prefix: PropTypes.string,
      suffix: PropTypes.string,
      theme: PropTypes.object
    };
  }

  onCopy(text) {
    const textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  }

  render() {
    const {
      enableCopy = true,
      bodyText,
      prefix,
      suffix,
      theme,
      leadText = '',
      ...otherProps
    } = this.props;

    theme.condensedTextView = theme.condensedTextView || { copyIcon: '' };

    return (
      <div className="row">
        {leadText.length >= 1 && (
          <div className={'offset-2 col-sm-2'}>{`${leadText}`}</div>
        )}

        <div className={'col-sm-4'}>
          {`${helpers.condenseText(bodyText, prefix, suffix)}`}
        </div>

        {enableCopy && (
          <div className={'col-sm-2'}>
            <i
              className={`fa fa-copy ${theme.condensedTextView.copyIcon}`}
              onClick={() => this.onCopy(bodyText)}
            />
          </div>
        )}
      </div>
    );
  }
}

export default connectTheme(CondensedTextView);
