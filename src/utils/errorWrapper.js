import React from 'react';
import Text from '../components/Text';

// Useful HOC for catching errors in components
function errorWrapper(Component_, name = '') {
  return class ErrorComponent extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
      this.name = name ? name : Component_.displayName;
    }

    componentDidCatch(error, errorInfo) {
      this.setState({ hasError: true });
      // eslint-disable-next-line no-console
      console.error(
        `Plugin${this.name
          ? `, ${this.name},`
          : ''} has been disabled because of a plugin crash.`,
        error,
        errorInfo
      );
    }

    render() {
      if (this.state.hasError) {
        return (
          <Text type="p">
            Your plugin{this.name ? `, ${this.name},` : ''} has experienced an
            error and could not load. Please check the JavaScript console for
            more details
          </Text>
        );
      }
      return React.createElement(Component_, this.props);
    }
  };
}

export default errorWrapper;
