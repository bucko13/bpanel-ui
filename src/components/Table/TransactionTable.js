import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import assert from 'bsert';
import { Table } from '../index';
import { connectTheme } from '../../utils';

import { TxManager, TxManagerOptions } from '@bpanel/bpanel-utils';

import ExpandedDataRow from './ExpandedDataRow';

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
   * expandedMap.mainData
   * expandedMap.subData
   *   maps from bpanel-utils UXTX.toJSON output -> expanded view data
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
      expandedMap: {
        mainData: {
          hash: 'Tx Hash',
        },
        subData: {
          coinbaseLabel: 'Is Coinbase',
          segwitLabel: 'Is Segwit',
          weight: 'Weight',
          inputAmount: 'Input Total',
          outputAmount: 'Output Total',
          block: 'Block Hash',
          confirmations: 'Number of Confirmations',
          fee: 'Fee',
          rate: 'Fee/kB',
          inputCount: 'Input Count',
          outputCount: 'Output Count',
          size: 'Size',
          height: 'Block Height',
        },
      },
      expandHeight: 520,
      ExpandedComponent: ExpandedDataRow,
      TxManagerOptions: TxManagerOptions,
      CustomFooterComponent: null,
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
    const { headerMap, expandedMap } = this.props;

    // tableInput and expandedData are lists
    // each index corresponds to a single data point
    // tableInput renders the columns
    // expandedData renders the dropdown
    // expandedData mainData renders at the top
    // expandedData subData renders at the bottom
    // ugly but functional...
    const { tableInput, expandedData } = txns.reduce(
      (acc, tx) => {
        let tmp = {};
        for (let [key, val] of Object.entries(headerMap)) tmp[val] = tx[key];
        acc.tableInput.push(tmp);
        tmp = { mainData: {}, subData: {} };
        for (let [key, val] of Object.entries(expandedMap.mainData))
          tmp.mainData[val] = tx[key];
        for (let [key, val] of Object.entries(expandedMap.subData))
          tmp.subData[val] = tx[key];
        acc.expandedData.push(tmp);
        return acc;
      },
      { tableInput: [], expandedData: [] }
    );

    return [tableInput, expandedData];
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
    const { transactions, wallet, CustomFooterComponent } = this.props;

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
          ExpandedComponent={props => (
            <ExpandedComponent
              {...props}
              CustomFooterComponent={CustomFooterComponent}
            />
          )}
          expandedData={expandedData}
          onRowClick={e => console.log(e)}
        />
      </div>
    );
  }
}

export default connectTheme(TransactionTable);
