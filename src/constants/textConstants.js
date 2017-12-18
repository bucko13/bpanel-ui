import React from 'react';
import keyMirror from 'keymirror';

const TEXT_TAGS = keyMirror({
  span: null,
  p: null,
  strong: null
});

const TEXT_ELEMENTS = {
  [TEXT_TAGS.span]: props => <span {...props} />,
  [TEXT_TAGS.p]: props => <p {...props} />,
  [TEXT_TAGS.strong]: props => <strong {...props} />
};

export default {
  TEXT_TAGS,
  TEXT_ELEMENTS
};
