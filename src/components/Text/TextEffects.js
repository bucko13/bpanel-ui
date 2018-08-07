import React from 'react';
import PropTypes from 'prop-types';

import keyMirror from 'keymirror';
import { helpers } from '../../utils/';

const TEXT_TAGS = keyMirror({
  condensed: null,
});

const CondensedText = ({
  children,
  className,
  condenseThreshold = 0,
  copyIcon = false,
  style,
  prefix = 4,
  suffix = 4,
  theme: { text: { iconActive, iconInactive }, glyphs },
}) => (
  <React.Fragment>
    <span
      className={`
        ${copyIcon ? iconActive : iconInactive}
        ${className} bpanel-ui-text-condensed
      `}
      onClick={() => !copyIcon && helpers.onCopy(children)}
      style={style}
      title={`${children}`}
    >
      {helpers.condenseText(children, prefix, suffix, condenseThreshold)}
    </span>{' '}
    {copyIcon && (
      <i
        className={`fa fa-copy ${glyphs.copyIcon}`}
        onClick={() => helpers.onCopy(children)}
      />
    )}
  </React.Fragment>
);

CondensedText.propTypes = {
  children: PropTypes.string.isRequired,
  condenseThreshold: PropTypes.number,
  copyIcon: PropTypes.bool,
  prefix: PropTypes.number,
  suffix: PropTypes.number,
};

const TextEffects = {
  [TEXT_TAGS.condensed]: CondensedText,
};

export default TextEffects;
