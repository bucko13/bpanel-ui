import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import { Table } from '../index';
import { connectTheme } from '../../utils';

import TransactionView from './TransactionView';

const constants = {
  //DATE_FORMAT: 'YYYY-MM-DD hh:mm a',
  DATE_FORMAT: 'MM/DD/YY hh:mm a',
  SEND: 'Sent',
  RECEIVE: 'Received',
  COINBASE_RECEIVE: 'Coinbase',
  MULTIPLE_OUTPUT_COPY: 'Multiple',
  UNKNOWN_ADDRESS_COPY: 'Unknown',
};

// what does a list of txns look like?
// cache by serializing and hashing the list and then doing a comparison?
// that operation in itself has a large overhead

class TransactionTable extends PureComponent {
  constructor() {
    super();
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

    // keep state of txid to transaction info?
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

  // differentiate between ingoing and outgoing
  // based on path dictionary in inputs or outputs
  // in transaction object

  // bcoin api
  // deposits:
  // null path in the inputs
  // output with path defined and change false
  //
  // withdrawals:
  // input with defined path and change false
  // output with path defined and change true
  //

  // also build expandedData?
  formatTableData(data, wallet) {
    return data.map(txn => {
      const d = {};
      d.Date = moment(txn.date).format(constants.DATE_FORMAT); // format date

      // TODO: be certain this works with tx indexing on
      const knownInputs = txn.inputs.filter(i => i.path);
      const knownOutputs = txn.outputs.filter(o => o.path);

      let sendOrReceive; // string
      let recipient; // string
      let batchedOutput = false; // indicates multiple outputs
      let account; // string

      // handle withdrawal
      {
        // known outputs that are change
        const changeTxs = knownOutputs.filter(o => o.path.change);
        // TODO: this doesn't account for case with no change transaction
        if (knownInputs.length > 1 && changeTxs.length > 1)
          sendOrReceive = constants.SEND;
      }

      // handle deposit
      {
        // known outputs that are not change
        const changeTxs = knownOutputs.filter(o => !o.path.change);

        if (knownInputs.length === 0 && changeTxs.length === 0)
          sendOrReceive = constants.RECEIVE;
      }

      // TODO: this could overwrite a normal receive
      // handle coinbase transactions
      // only 1 input and address is null
      if (txn.inputs.length === 1 && txn.inputs[0].address === null)
        sendOrReceive = constants.COINBASE_RECEIVE;

      // sanity check
      if (sendOrReceive === undefined)
        console.warn(`BUG: problem parsing ${txn.hash}`);

      let recipients; // list of addresses
      let counterparty; // opposite side of txn
      let amount; // value transferred to/from control
      let accounts; // list of accounts participating in txn

      // parse displayed address
      if (sendOrReceive === constants.SEND) {
        // filter out change txns
        recipients = knownOutputs.filter(o => {
          if (o.path)
            // only will have path property if controlled by wallet
            return !o.path.change; // handle sending to controlled wallet
          return true; // all remaining outputs included
        });

        // parse counterpary based on number of recipients
        if (recipients.length === 0)
          counterparty = constants.UNKNOWN_ADDRESS_COPY;
        else if (recipients.length > 1)
          counterparty = constants.MULTIPLE_ADDRESS_COPY;
        else counterparty = recipients[0].address;

        // sum of inputs under control
        amount = knownInputs.reduce((a, i) => a + i.value, 0);

        // list of accounts under control
        accounts = knownInputs.reduce(
          (a, i) => [...a, { name: i.name, account: i.account }],
          []
        );
      } else if (sendOrReceive === constants.RECEIVE) {
        // hopefully only 1 transaction input
        if (txn.inputs.length > 1)
          counterparty = constants.UNKNOWN_ADDRESS_COPY;
        else if (txn.inputs.length === 1)
          // coinjoin?
          counterparty = txn.inputs[0].address;
        else console.warn('BUG: no counterparty address parsed');

        // TODO: make sure this works with txn indexing on
        recipients = knownOutputs;
        amount = knownOutputs.reduce((a, o) => a + o.value, 0);

        // list of accounts deposited to
        accounts = knownOutputs.reduce(
          (a, o) => [...a, { name: o.name, account: o.account }],
          []
        );
      } else if (sendOrReceive === constants.COINBASE_RECEIVE) {
        // assume one input, one output
        counterparty = txn.outputs[0].address;
        amount = txn.outputs[0].value;
        recipients = [txn.outputs[0].address];

        // list of accounts deposited to
        accounts = knownOutputs.reduce(
          (a, o) => [...a, { name: o.name, account: o.account }],
          []
        );
      }

      console.log(accounts);
      // TODO: similar code above
      if (accounts.length > 1) account = constants.MULTIPLE_ACCOUNT_COPY;
      else if (accounts.length === 1) account = accounts[0].name;
      else account = constants.UNKNOWN_ACCOUNT_COPY;

      d.Amount = amount;
      d.Wallet = wallet; // must be provided by consumer of function
      d.Account = account;
      d.Confirmations = txn.confirmations; // TODO: pretty parse this
      d['Send/Receive'] = sendOrReceive;
      d.Recipient = counterparty;
      return d;
    });
  }

  render() {
    const { transactions } = this.props;

    // TODO: solution for caching
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
