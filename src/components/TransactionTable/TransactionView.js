import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connectTheme } from '../../utils';

import Text from '../Text';
import Link from '../Link';

const BLOCK_EXPLORERS = {
  'btc.com': {
    bitcoinmain: 'https://btc.com/', // {txhash}
    bitcoincashmain: 'https://bch.btc.com/',
  },
  blocktrail: {
    bitcoinmain: 'https://www.blocktrail.com/BTC/tx/',
    bitcointestnet: 'https://www.blocktrail.com/tBTC/tx/', // tx/{txhash}
    bitcoincashmain: 'https://www.blocktrail.com/BCC/tx/',
    bitcoincashtestnet: 'https://www.blocktrail.com/tBCC/tx/',
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
      network: 'main',
      cointype: 'bitcoin',
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

  // TODO: make this work
  // cointype - bitcoin, bitcoincash
  // network - mainnet, testnet
  maybeRenderExplorerLink(cointype, network, txhash) {
    if (!(cointype in COINS)) return [];
    if (!(network in NETWORKS)) return [];

    const subkey = `${cointype}${network}`;
    const links = [];

    // build list of hyperlinks
    for (let [key, val] of Object.entries(BLOCK_EXPLORERS)) {
      if (subkey in val) links.push(`${val[subkey]}/${txhash}`);
    }

    console.log('links:');
    console.log(links);
    return links.map(link => <Link to={link} />);
  }

  // TODO: only view on website if testnet or mainnet
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
        {this.maybeRenderExplorerLink(cointype, network, hash)}
      </div>
    );
  }
}

export default connectTheme(TransactionView);
