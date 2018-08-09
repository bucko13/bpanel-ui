import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import { Table } from '../index';
import { connectTheme } from '../../utils';

import { TxnManager, TxnManagerOptions } from '@bpanel/bpanel-utils';

import TransactionView from './TransactionView';

class TransactionTable extends PureComponent {
  constructor() {
    super();
    // TODO: figure out way to accept
    // certain props and render those rows
    this.headers = [
      'Date',
      'Send/Receive',
      'Wallet',
      'Amount',
      'Account',
      'Confirmations',
      'Recipient',
    ];
    this.expandHeight = 250;

    this.txnManager = TxnManager.fromOptions(TransactionManagerOptions);
  }

  static get propTypes() {
    return {
      transactions: propTypes.array,
    };
  }
  static get defaultProps() {
    return {
      // list of transactions from bcoin api
      transactions: [],
    };
  }

  formatTableData(transactions, wallet) {
    const txns = this.txnManager.parse(data, wallet);
    // TODO: build expandedData from txns
    return txns;
  }

  render() {
    const { transactions } = this.props;

    const tableData = this.formatTableData(transactions);

    // TODO: handle onRowClick
    return (
      <div>
        <Table
          colHeaders={this.headers}
          tableData={tableData}
          onRowClick={e => console.log(e)}
        />
      </div>
    );
  }
}

export default connectTheme(TransactionTable);

/*
 *
  expandedHeight={this.expandHeight}
  styles={styles.selectListStyle}
  expandedData={null}
  ExpandedComponent={TransactionView}
 *
 */
