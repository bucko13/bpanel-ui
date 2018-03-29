import React from 'react';
import errorWrapper from './errorWrapper';

export default Component_ => (props = {}) => {
  const Component = errorWrapper(Component_);
  return () => React.createElement(Component, props);
};
