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
    this.txnManager = TxnManager.fromOptions(TxnManagerOptions);

    // TODO: use for caching purposes
    this._headers = null;
  }

  static get propTypes() {
    return {
      transactions: propTypes.array,
      wallet: propTypes.string,
      headerMap: propTypes.object,
      expandHeight: propTypes.number, // pass along to Table
    };
  }
  static get defaultProps() {
    return {
      // list of transactions from bcoin api
      transactions: [],
      wallet: null,
      // map of bpanel-utils.UXTX.toJSON output -> table header names
      headerMap: {
        date: 'Date',
        uxtype: 'Send/Receive',
        wallet: 'Wallet',
        accountLabel: 'Account',
        amount: 'Amount',
        confirmations: 'Confirmations',
        addressLabel: 'Address',
      },
      expandHeight: 250,
    };
  }

  // TODO: allow function in headerMap?
  formatTableData(transactions, wallet) {
    const txns = this.txnManager.parse(transactions, wallet);
    const { headerMap } = this.props;

    const tableInput = txns.map(tx => {
      // map tx data to desired headers
      const r = {};
      for (let [key, val] of Object.entries(headerMap)) r[val] = tx[key];
      return r;
    });

    // TODO: build expandedData from txns
    return tableInput;
  }

  // TODO: cache result and return
  getHeaders() {
    const headers = Object.entries(this.props.headerMap).map(
      ([key, val]) => val
    );
    return headers;
  }

  render() {
    const { transactions, wallet } = this.props;

    const tableData = this.formatTableData(transactions, wallet);

    // TODO: only invoke if headerMap is different
    const headers = this.getHeaders();

    // TODO: handle onRowClick
    return (
      <div>
        <Table
          colHeaders={headers}
          tableData={tableData}
          onRowClick={e => console.log(e)}
        />
      </div>
    );
  }
}

export default connectTheme(TransactionTable);

/*
 * TODO: implement expanded row view
  expandedHeight={this.expandHeight}
  styles={styles.selectListStyle}
  expandedData={null}
  ExpandedComponent={TransactionView}
 *
 */
