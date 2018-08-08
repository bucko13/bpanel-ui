import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connectTheme } from '../../utils';

import ExpandedDataRow from '../Table';

// wrap ExpandedDataRow to fill with proper data

class TransactionView extends PureComponent {
  static get propTypes() {
    return {};
  }
  static get defaultProps() {
    return {};
  }

  render() {
    return (
      <div>
        <h1>Subtest</h1>
      </div>
    );
  }
}

export default connectTheme(TransactionView);
