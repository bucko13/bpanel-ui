import React from 'react';
import PropTypes from 'prop-types';

import keyMirror from 'keymirror';

const TEXT_TAGS = keyMirror({
  p: null,
  span: null,
  strong: null,
});

const TEXT_ELEMENTS = {
  [TEXT_TAGS.p]: props => <p {...props} />,
  [TEXT_TAGS.span]: props => <span {...props} />,
  [TEXT_TAGS.strong]: props => <strong {...props} />,
};

export default {
  TEXT_ELEMENTS,
  TEXT_TAGS,
};
