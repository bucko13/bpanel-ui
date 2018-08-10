import React from 'react';
import PropTypes from 'prop-types';

import keyMirror from 'keymirror';
import { helpers } from '../../utils/';

const TEXT_TAGS = keyMirror({
  condensed: null,
});

/* indicate if text is condensed */
const isCondensed = (text, threshold) => text.length > threshold;

const CondensedText = ({
  children,
  className,
  condenseThreshold = 0,
  copyIcon = false,
  prefix = 4,
  style,
  suffix = 4,
  theme: { text: { iconActive, iconInactive }, glyphs },
}) => (
  <React.Fragment>
    <span
      /* show copyIcon or show condensed text and cursor decorations */
      className={`
        ${copyIcon
          ? iconActive
          : isCondensed(children, condenseThreshold) ? iconInactive : ''}
        ${className} bpanel-ui-text-condensed
      `}
      /* copy onClick only if icon is unavailable and text is condensed */
      onClick={() => {
        !copyIcon && isCondensed(children, condenseThreshold)
          ? helpers.onCopy(children)
          : null;
      }}
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
