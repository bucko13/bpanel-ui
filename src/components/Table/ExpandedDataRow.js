// This component can be passed to Tables (which pass it to a rowRenderer)
// it is for showing extra data in your table when you click on a row
// Data should be passed in an expandedData prop, with mainData
// being primary and having copy field functionality
// Neither are required

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { connectTheme } from '../../utils';
import { map } from 'lodash';

const cache = new CellMeasurerCache({
  defaultWidth: 600,
  minWidth: 100,
  fixedHeight: true,
});

class ExpandedDataRow extends PureComponent {
  static get propTypes() {
    return {
      children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
      ]),
      colProps: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          dataKey: PropTypes.string,
          width: PropTypes.number,
        })
      ),
      expandedData: PropTypes.shape({
        mainData: PropTypes.object,
        subData: PropTypes.object,
      }).isRequired,
      theme: PropTypes.object,
    };
  }

  static get defaultProps() {
    return {
      style: {
        bodyStyle: {},
        containerStyle: {},
        headerStyle: {},
      },
    };
  }

  formatExpandedData() {
    const { expandedData: { mainData, subData } } = this.props;
    const data = {
      mainData: map(mainData, (value, key) => ({
        name: key,
        value,
      })),
      subData: map(subData, (value, key) => ({
        name: key,
        value,
      })),
    };
    return data;
  }

  cellRenderer({ columnIndex, key, parent, rowIndex, style }, gridData) {
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={columnIndex}
        key={key}
        parent={parent}
        rowIndex={rowIndex}
      >
        <div
          key={key}
          style={{
            ...style,
            border:
              columnIndex === 1 ? '1px solid rgba(255, 255, 255, 0.2)' : null,
            padding: '5px',
          }}
        >
          {gridData[rowIndex][columnIndex]}
        </div>
      </CellMeasurer>
    );
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

  render() {
    const { theme, children, expandedData } = this.props;
    const { mainData, subData } = this.formatExpandedData();
    return (
      <div className={theme.expandedRow.container}>
        {/* Main Data */}
        <div className={theme.expandedRow.mainDataContainer}>
          {mainData.map((data, i) => (
            <div className={theme.expandedRow.dataRow} key={data.name}>
              <div className={theme.expandedRow.rowHeader}>{data.name}</div>
              <div
                className={theme.expandedRow.borderedCol}
                ref={dataCol => (this[`dataCol${i}`] = dataCol)}
              >
                {data.value}
              </div>
              <i
                className={`fa fa-copy ${theme.glyphs.copyIcon}`}
                onClick={() => this.onCopy(i)}
              />
            </div>
          ))}
        </div>
        {/* Sub Data */}
        <div className={theme.expandedRow.subDataContainer}>
          {subData.map(data => (
            <div className={theme.expandedRow.dataRow} key={data.name}>
              <div className={theme.expandedRow.rowHeader}>{data.name}</div>
              <div className={theme.expandedRow.borderedCol}>{data.value}</div>
            </div>
          ))}
        </div>
        {/* render children components below */}
        <div className={theme.expandedRow.subDataContainer}>
          {React.Children.map(children, child =>
            React.cloneElement(child, { expandedData })
          )}
        </div>
      </div>
    );
  }
}

export default connectTheme(ExpandedDataRow);
