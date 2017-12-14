import React from 'react';
import keyMirror from 'keymirror';

const HEADER_TAGS = keyMirror({
  h1: null,
  h2: null,
  h3: null,
  h4: null
});

const HEADER_ELEMENTS = {
  [HEADER_TAGS.h1]: props => <h1 {...props} />,
  [HEADER_TAGS.h2]: props => <h2 {...props} />,
  [HEADER_TAGS.h3]: props => <h3 {...props} />,
  [HEADER_TAGS.h4]: props => <h4 {...props} />
};

export default {
  HEADER_TAGS,
  HEADER_ELEMENTS
};
