import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-virtualized-select';

// import default styles
import 'react-select/dist/react-select.css';
import 'react-virtualized-select/styles.css';

import { connectTheme } from '../../utils';

/*
 * Docs here:
 * https://github.com/bvaughn/react-virtualized-select
 * See API here:
 * https://github.com/JedWatson/react-select/#usage
 */

class Dropdown extends PureComponent {
  static get propTypes() {
    return {};
  }

  render() {
    <Select />;
  }
}

export default connectTheme(Dropdown);
