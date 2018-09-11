import React, { Component } from 'react';
import PropTypes from 'prop-types';

const themeShape = {
  button: {},
  header: {},
  link: {},
  table: {
    body: {},
    container: {},
    header: {},
    // row can either be an object or function
    // see `rowStyle` in:
    // https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md
    row: {},
  },
  text: {},
  sidebar: {
    item: {},
  },
};

export default ComponentToWrap => {
  return class ThemeComponent extends Component {
    // Define what’s needed from the `context`
    // The theme is provided from the <ThemeProvider> in the bpanel repo
    static get contextTypes() {
      return { theme: PropTypes.object.isRequired };
    }

    render() {
      const { theme = themeShape } = this.context;
      // We are rendering <ComponentToWrap>
      // with an added `theme` prop
      return <ComponentToWrap {...this.props} theme={theme} />;
    }
  };
};
