import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import qrImage from 'qr-image';
import { connectTheme } from '../../utils';

/*
* Taken from:
* https://github.com/jprichardson/react-qr
* */

class QRCode extends PureComponent {
  constructor(props) {
    super(props);
  }
  static get propTypes() {
    return {
      text: PropTypes.string,
      type: PropTypes.string,
      className: PropTypes.string,
      containerStyle: PropTypes.object,
    };
  }
  render() {
    const { text, type = 'span', theme, style, className } = this.props;

    const textCss = theme.text[type] || '';

    if (text) {
      const pngBuffer = qrImage.imageSync(text, { type: 'png', margin: 1 });
      const dataURI = `data:image/png;base64,${pngBuffer.toString('base64')}`;
      return (
        <div style={style} className={`${className} ${textCss}`}>
          <img className="react-qr" src={dataURI} />
        </div>
      );
    }
    // return empty div when no text passed in
    return <div />;
  }
}

export default connectTheme(QRCode);
