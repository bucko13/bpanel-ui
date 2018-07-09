import React from 'react';
import errorWrapper from './errorWrapper';
console.log('hello widgetCreator.js');
export default Component_ => (props = {}) => {
  const Component = errorWrapper(Component_);
  return () => React.createElement(Component, props);
};
