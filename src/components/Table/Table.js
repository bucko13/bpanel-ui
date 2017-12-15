import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  AutoSizer,
  Table as VirtualizedTable,
  Column
} from 'react-virtualized';

import { connectTheme } from '../../utils';

import 'react-virtualized/styles.css';
import './Table.scss';

class Table extends PureComponent {
  static get propTypes() {
    return {
      colProps: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          dataKey: PropTypes.string,
          width: PropTypes.number
        })
      )
    };
  }

  render() {
    const { colProps, tableContainerStyles, ...tableProps } = this.props;
    return (
      <div style={tableContainerStyles}>
        <AutoSizer disableHeight style={tableProps.style}>
          {({ width }) => (
            <VirtualizedTable {...tableProps} width={width}>
              {colProps.map(colProp => (
                <Column key={`table-${colProps.dataKey}`} {...colProp} />
              ))}
            </VirtualizedTable>
          )}
        </AutoSizer>
      </div>
    );
  }
}

export default connectTheme(Table);
