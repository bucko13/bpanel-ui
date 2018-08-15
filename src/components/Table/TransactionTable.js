import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import { Table } from '../index';
import { connectTheme } from '../../utils';

import { TxnManager, TxnManagerOptions } from '@bpanel/bpanel-utils';

import ExpandedTransactionRow from './ExpandedTransactionRow';

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
      expandHeight: 390,
      ExpandedComponent: ExpandedTransactionRow,
    };
  }

  // TODO: allow function in headerMap
  // that can return a component?
  formatTableData(transactions, wallet) {
    const txns = this.txnManager.parse(transactions, wallet);
    const { headerMap } = this.props;

    const tableInput = txns.map(tx => {
      // map tx data to desired headers
      const r = {};
      for (let [key, val] of Object.entries(headerMap)) r[val] = tx[key];
      return r;
    });

    return [tableInput, txns];
  }

  // TODO: cache result and return
  getHeaders() {
    return Object.values(this.props.headerMap);
  }

  render() {
    const { transactions, wallet } = this.props;

    const [tableData, expandedData] = this.formatTableData(
      transactions,
      wallet
    );

    // TODO: only invoke if headerMap is different
    const headers = this.getHeaders();

    // TODO: can colHeaders be more than just text?
    // TODO: make expandHeight slightly larger if
    // rendering extra links
    const { ExpandedComponent, expandHeight } = this.props;
    return (
      <div>
        <Table
          colHeaders={headers}
          tableData={tableData}
          expandedHeight={expandHeight}
          ExpandedComponent={ExpandedComponent}
          expandedData={expandedData}
          onRowClick={e => console.log(e)}
        />
      </div>
    );
  }
}

export default connectTheme(TransactionTable);
