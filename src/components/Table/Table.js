import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  AutoSizer,
  Table as VirtualizedTable,
  Column
} from 'react-virtualized';

import { connectTheme } from '../../utils';

import 'react-virtualized/styles.css';

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
    const {
      colProps,
      theme: {
        table: {
          container: containerStyle,
          header: headerStyle,
          body: bodyStyle,
          row: rowStyle
        }
      },
      style,
      tableContainerStyles,
      ...tableProps
    } = this.props;
    return (
      <div style={{ ...containerStyle, ...tableContainerStyles }}>
        <AutoSizer disableHeight>
          {({ width }) => (
            <VirtualizedTable
              width={width}
              style={{ ...bodyStyle, ...style }}
              headerStyle={{ ...headerStyle, ...tableProps.headerStyle }}
              rowStyle={rowStyle || tableProps.rowStyle}
              {...tableProps}
            >
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
