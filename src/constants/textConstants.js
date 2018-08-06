import React from 'react';
import PropTypes from 'prop-types';

import keyMirror from 'keymirror';
import { helpers } from '../utils/';

const TEXT_TAGS = keyMirror({
  condensed: null,
  span: null,
  p: null,
  strong: null
});

const CondensedText = ({
  children,
  className,
  enableCopyIcon = false,
  prefix = 4,
  style,
  suffix = 4,
  theme: { text: { iconActive, iconInactive }, glyphs: { copyIcon } }
}) => (
  <React.Fragment>
    <span
      className={`
        ${enableCopyIcon ? iconActive : iconInactive}
        ${className} bpanel-ui-text-condensed
      `}
      onClick={() => !enableCopyIcon && helpers.onCopy(children)}
      style={style}
      title={`${children}`}
    >
      {helpers.condenseText(children, prefix, suffix)}
    </span>{' '}
    {enableCopyIcon && (
      <i
        className={`fa fa-copy ${copyIcon}`}
        onClick={() => helpers.onCopy(children)}
      />
    )}
  </React.Fragment>
);

CondensedText.propTypes = {
  children: PropTypes.string.isRequired,
  enableCopyIcon: PropTypes.bool,
  prefix: PropTypes.number,
  suffix: PropTypes.number
};

const TEXT_ELEMENTS = {
  [TEXT_TAGS.condensed]: CondensedText,
  [TEXT_TAGS.span]: props => <span {...props} />,
  [TEXT_TAGS.p]: props => <p {...props} />,
  [TEXT_TAGS.strong]: props => <strong {...props} />
};

export default {
  TEXT_TAGS,
  TEXT_ELEMENTS
};
