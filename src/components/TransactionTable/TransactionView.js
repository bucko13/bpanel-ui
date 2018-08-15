import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connectTheme } from '../../utils';

import Text from '../Text';
import Link from '../Link';

// TODO: better set up data structures to
// support many chains and pretty printing
// of the names for the links
const BLOCK_EXPLORERS = {
  'btc.com': {
    bitcoinmain: 'https://btc.com', // /{txhash}
    bitcoincashmain: 'https://bch.btc.com',
  },
  blocktrail: {
    bitcoinmain: 'https://www.blocktrail.com/BTC/tx',
    bitcointestnet: 'https://www.blocktrail.com/tBTC/tx', // /tx/{txhash}
    bitcoincashmain: 'https://www.blocktrail.com/BCC/tx',
    bitcoincashtestnet: 'https://www.blocktrail.com/tBCC/tx',
  },
};
const NETWORKS = ['main', 'testnet'];
const COINS = ['bitcoin', 'bitcoincash'];

class TransactionView extends PureComponent {
  static get propTypes() {
    return {
      network: PropTypes.string,
      expandedData: PropTypes.object,
    };
  }
  static get defaultProps() {
    return {
      network: null,
      cointype: null,
    };
  }

  /*
   ** onCopy: Copies data inside of the respective data field.
   */

  onCopy(i) {
    const data = this[`dataCol${i}`];
    const textField = document.createElement('textarea');
    textField.innerText = data.innerText;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  }

  // TODO: fix datastructures, see comment above
  // accepts values in NETWORKS and COINS
  // cointype - bitcoin, bitcoincash
  // network - mainnet, testnet
  maybeRenderExplorerLink(cointype, network, txhash) {
    if (!COINS.includes(cointype)) return [];
    if (!NETWORKS.includes(network)) return [];

    const subkey = `${cointype}${network}`;
    const links = [];

    // build list of hyperlinks
    // TODO: make easier to understand
    for (let [key, val] of Object.entries(BLOCK_EXPLORERS))
      if (subkey in val) links.push(`${val[subkey]}/${txhash}`);

    const { theme } = this.props;

    return links.map((link, i) => {
      return (
        <Link className={theme.txTableRow.subThinItem} key={i} to={link}>
          <Text>{`Explorer ${i}`}</Text>
        </Link>
      );
    });

    return links;
  }

  render() {
    const { expandedData, network, cointype, theme } = this.props;
    const {
      hash,
      height,
      segwitLabel,
      weight,
      confirmations,
      size,
      fee,
      rate,
      date,
      inputs,
      outputs,
      coinbaseLabel,
      inputAmount,
      outputAmount,
    } = expandedData;

    const { txTableRow, glyphs } = theme;

    return (
      <div className={txTableRow.container}>
        <div className={txTableRow.thinRow}>
          <div className={txTableRow.subThinRow}>
            <Text type="p" className={txTableRow.subThinItem}>
              Tx Hash:{' '}
              <span
                ref={dataCol => (this[`dataCol${hash}`] = dataCol)}
                className={txTableRow.borderItem}
              >
                {hash}
              </span>
            </Text>
            <i
              className={`fa fa-copy ${txTableRow.subThinItem} ${glyphs.copyIcon}`}
              onClick={() => this.onCopy(hash)}
            />
          </div>
        </div>
        <div className={txTableRow.thinRow}>
          <Text type="p">
            Included in Block:{' '}
            <span className={txTableRow.borderItem}>{height}</span>
          </Text>
          <Text type="p">
            Time: <span className={txTableRow.borderItem}>{date}</span>
          </Text>
        </div>
        <div className={txTableRow.thinRow}>
          <span className={txTableRow.subThinRow}>
            <Text type="p" className={txTableRow.subThinItem}>
              Segwit:{' '}
              <span className={txTableRow.borderItem}>{segwitLabel}</span>
            </Text>
            <Text type="p" className={txTableRow.subThinItem}>
              Coinbase:{' '}
              <span className={txTableRow.borderItem}>{coinbaseLabel}</span>
            </Text>
          </span>
          <Text type="p">
            Confirmations:{' '}
            <span className={txTableRow.borderItem}>{confirmations}</span>
          </Text>
        </div>
        <div className={txTableRow.thinRow}>
          <span className={txTableRow.subThinRow}>
            <Text type="p" className={txTableRow.subThinItem}>
              Inputs:{' '}
              <span className={txTableRow.borderItem}>{inputs.length}</span>
            </Text>
            <Text type="p" className={txTableRow.subThinItem}>
              Input Total:{' '}
              <span className={txTableRow.borderItem}>{inputAmount}</span> BTC
            </Text>
          </span>
          <Text type="p">
            Fee: <span className={txTableRow.borderItem}>{fee}</span>
          </Text>
        </div>
        <div className={txTableRow.thinRow}>
          <span className={txTableRow.subThinRow}>
            <Text type="p" className={txTableRow.subThinItem}>
              Outputs:{' '}
              <span className={txTableRow.borderItem}>{outputs.length}</span>
            </Text>
            <Text type="p" className={txTableRow.subThinItem}>
              Output Total:{' '}
              <span className={txTableRow.borderItem}>{outputAmount}</span> BTC
            </Text>
          </span>
          <Text type="p">
            Fee per kB: <span className={txTableRow.borderItem}>{rate}</span>
          </Text>
        </div>
        <div className={txTableRow.thinRow}>
          <Text type="p">
            Size: <span className={txTableRow.borderItem}>{size}</span>
          </Text>
          <Text type="p">
            Weight: <span className={txTableRow.borderItem}>{weight}</span>
          </Text>
        </div>
        <div className={txTableRow.subThinItem}>
          {this.maybeRenderExplorerLink(cointype, network, hash)}
        </div>
      </div>
    );
  }
}

export default connectTheme(TransactionView);
