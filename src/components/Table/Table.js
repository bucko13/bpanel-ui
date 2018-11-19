import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  AutoSizer,
  Table as VirtualizedTable,
  Column,
} from 'react-virtualized';

import HeaderRow from './HeaderRow';
import rowRenderer from './rowRenderer';
import Text from '../Text';
import { connectTheme } from '../../utils';

import 'react-virtualized/styles.css';

class Table extends PureComponent {
  constructor() {
    super();
    this.state = {
      /**
       * openIndex tracks the row in the table that is open
       * Its value is the index of the row in the table
       */
      openIndex: undefined,
    };
    this.onRowClick = this.onRowClick.bind(this);
  }

  static get propTypes() {
    return {
      ExpandedComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      colProps: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          dataKey: PropTypes.string,
          width: PropTypes.number,
        })
      ),
      colHeaders: PropTypes.arrayOf(PropTypes.string),
    };
  }

  static get defaultProps() {
    return {
      ExpandedComponent: () => {},
      headerHeight: 30,
      rowHeight: 30,
      style: {
        bodyStyle: {},
        containerStyle: {},
        headerStyle: {},
      },
    };
  }

  /**
   * getColProps sets the header(top row) data for the table.
   */

  getColProps() {
    const { colProps, tableData, colHeaders } = this.props;
    if (colProps) return colprops;

    const headers = Array.isArray(colHeaders)
      ? colHeaders
      : Object.entries(tableData[0]).map(
          header => (Array.isArray(header) ? header[0] : header)
        );

    return headers.map(header => ({
      label: header,
      dataKey: header,
      width: 400,
      flexGrow: 1,
      cellRenderer: ({ cellData }) => (
        <Text>{cellData && cellData.toString()}</Text>
      ),
      headerRenderer: ({ label }) => <Text>{label && label.toString()}</Text>,
    }));
  }

  /**
   * getTableHeight gets height of the table. Calculates the height of the table
   * if a row is expanded.
   */

  getTableHeight(tableData, openIndex, openHeight) {
    return (
      (tableData.length + 1) * 30 +
      (openIndex || openIndex === 0 ? openHeight : 0)
    );
  }

  /**
   * onRowClick handles an onClick event to expand a table row.
   */

  onRowClick({ index }) {
    const { expandedHeight } = this.props;
    const { openIndex } = this.state;
    const selectedIndex =
      expandedHeight && index === openIndex ? undefined : index;
    this.setState({ openIndex: selectedIndex });
  }

  render() {
    const {
      tableData,
      ExpandedComponent,
      expandedHeight,
      expandedData,
      onRowClick,
      headerHeight,
      rowHeight,
      rowStyle,
      style: { containerStyle, innerContainerStyle, headerStyle, bodyStyle },
      theme,
      ...tableProps
    } = this.props;

    const {
      table: { container: containerCss, header: headerCss, body: bodyCss },
      tableRowStyle,
      expandedRow: expandedRowStyles,
    } = theme;

    const { openIndex } = this.state;
    const _colProps = this.getColProps();
    const tableHeight = this.getTableHeight(
      tableData,
      openIndex,
      expandedHeight
    );
    const rowRendererOptions = {
      openIndex,
      ExpandedComponent,
      expandedHeight,
      expandedData,
      rowHeight,
      expandedRowStyles,
      tableData,
      theme,
    };

    const rowOnClick = expandedHeight ? this.onRowClick : onRowClick;

    return (
      <div className={containerCss} style={containerStyle}>
        <AutoSizer disableHeight>
          {({ width }) => (
            <VirtualizedTable
              className={bodyCss}
              height={tableHeight}
              containerStyle={innerContainerStyle || { overflow: 'visible' }}
              headerClassName={headerCss}
              headerHeight={headerHeight}
              headerRowRenderer={props => <HeaderRow {...props} />}
              headerStyle={headerStyle}
              onRowClick={rowOnClick}
              rowCount={tableData.length}
              rowGetter={({ index }) => tableData[index]}
              rowHeight={rowHeight}
              rowRenderer={options => rowRenderer(options, rowRendererOptions)}
              rowStyle={rowStyle || tableRowStyle}
              width={width}
              {...tableProps}
            >
              {_colProps.map(colProp => (
                <Column key={`table-${colProp.dataKey}`} {...colProp} />
              ))}
            </VirtualizedTable>
          )}
        </AutoSizer>
      </div>
    );
  }
}

export default connectTheme(Table);
