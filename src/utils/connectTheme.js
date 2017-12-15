import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default ComponentToWrap => {
  return class ThemeComponent extends PureComponent {
    // Define what’s needed from the `context`
    // The theme is provided from the <ThemeProvider> in the bpanel repo
    static get contextTypes() {
      return { theme: PropTypes.object.isRequired };
    }

    render() {
      const { theme } = this.context;
      // We are rendering <ComponentToWrap>
      // with an added `theme` prop
      return <ComponentToWrap {...this.props} theme={theme} />;
    }
  };
};
