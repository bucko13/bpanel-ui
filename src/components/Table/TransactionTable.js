import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import assert from 'bsert';
import { Table } from '../index';
import { connectTheme } from '../../utils';

import { TxManager, TxManagerOptions } from '@bpanel/bpanel-utils';
import ExpandedTransactionRow from './ExpandedTransactionRow';

/*
 * TransactionTable
 *
 * Wrapper around Table to display
 * transaction related information
 *
 * TODO: better logic around setting custom
 * TxManager options
 */
class TransactionTable extends PureComponent {
  /*
   * Create a TransactionTable
   * Initialize a txManager with default options
   * @constructor
   *
   */
  constructor() {
    super();
    this.txManager = TxManager.fromOptions(TxManagerOptions);

    // TODO: use for caching purposes
    this._headers = null;
  }

  /*
   * Get proptypes
   *
   * @static
   * @returns {Object}
   */
  static get propTypes() {
    return {
      TxManagerOptions: propTypes.object,
      transactions: propTypes.array,
      wallet: propTypes.string,
      headerMap: propTypes.object,
      expandHeight: propTypes.number, // pass along to Table
    };
  }

  /*
   * Get default props
   * headerMap:
   *   map of bpanel-utils.UXTX.toJSON output -> table header names
   *
   * @static
   * @returns {Object}
   */
  static get defaultProps() {
    return {
      // list of transactions from bcoin api
      transactions: [],
      wallet: null,
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
      TxManagerOptions: TxManagerOptions,
    };
  }

  /*
   * set TxManager to use
   * useful for setting custom TxManager options
   *
   * @returns {void}
   */
  setTxManager(txManager) {
    assert(txManager instanceof TxManager);
    this.txManager = txManager;
  }

  /*
   * Format table data from output of UXTX.toJSON
   * Maps props.headerMap values that correspond to
   * UXTX.toJSON values into an object with keys
   * of the headerMap key
   *
   * This allows for arbitrarily selecting
   * column headers
   *
   * @param {Object[]} transactions - list of transaction json
   * @param {String} wallet - wallet the txs belong to
   * @returns {Tuple[Object[], Object[]]}
   *
   * TODO: allow function in headerMap
   * that can return a component?
   */
  formatTableData(transactions, wallet) {
    const txns = this.txManager.parse(transactions, wallet);
    const { headerMap } = this.props;

    const tableInput = txns.map(tx => {
      // map tx data to desired headers
      const r = {};
      for (let [key, val] of Object.entries(headerMap)) r[val] = tx[key];
      return r;
    });

    return [tableInput, txns];
  }

  /*
   * Get header values
   * TODO: cache result and only
   * compute if things changed
   *
   * @returns {String[]}
   */
  getHeaders() {
    return Object.values(this.props.headerMap);
  }

  /*
   * Render
   * @returns {JSX}
   */
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
