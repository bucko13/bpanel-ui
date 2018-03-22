import React from 'react';
import ErrorWrapper from './ErrorWrapper';

export default Component_ => (props = {}) => {
  const Component = ErrorWrapper(Component_);
  return () => React.createElement(Component, props);
};
