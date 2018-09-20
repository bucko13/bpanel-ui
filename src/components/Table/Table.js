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
import Button from '../Button';
import assert from 'bsert';

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
      // currentPage tracks the page index for pagination
      currentPage: 0,
      // keep track of left and right button state
      leftDisable: true,
      rightDisable: false,
    };
    this.onRowClick = this.onRowClick.bind(this);
  }

  /*
   * pageSize will cause the component to paginate based on
   *   the number passed in
   */
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
      pageSize: PropTypes.number,
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

  /*
   * @param {string} direction - left or right
   * @param {number} dataCount - total number of rows
   */
  paginateClick(direction, dataCount) {
    const { currentPage, leftDisable, rightDisable } = this.state;
    const { pageSize } = this.props;

    // take last unfilled page into account
    const totalPages = Math.ceil(dataCount / pageSize);

    let nextPage = currentPage;
    // only paginate if there are pages
    if (totalPages > 1) {
      if (direction === 'left') nextPage -= 1;
      else if (direction === 'right') nextPage += 1;
    }

    let nextLeftDisable = leftDisable;
    if (nextPage > 0) nextLeftDisable = false;
    else if (nextPage === 0) nextLeftDisable = true;

    /*
     * take into account zero indexing
     * when doing (totalPages - 1)
     */
    let nextRightDisable = rightDisable;
    if (nextPage === totalPages - 1) nextRightDisable = true;
    else if (nextPage < totalPages - 1) nextRightDisable = false;

    this.setState(
      Object.assign({}, this.state, {
        currentPage: nextPage,
        leftDisable: nextLeftDisable,
        rightDisable: nextRightDisable,
      })
    );
  }

  paginateData(tableData) {
    const { pageSize } = this.props;
    const { currentPage } = this.state;

    // return slice of the data
    const start = currentPage * pageSize;
    const end = start + pageSize;
    assert(start <= end);
    return tableData.slice(start, end);
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
    const { leftDisable, rightDisable } = this.state;

    const {
      ExpandedComponent,
      expandedHeight,
      expandedData,
      onRowClick,
      headerHeight,
      rowHeight,
      rowStyle,
      pageSize,
      theme,
      ...tableProps
    } = this.props;

    let {
      tableData,
      style: {
        containerStyle = {},
        innerContainerStyle,
        headerStyle,
        bodyStyle,
      },
    } = this.props;

    // hold on to total size of data
    const dataCount = tableData.length;

    // slice data and add extra margin to bottom for rendered buttons
    if (pageSize) {
      tableData = this.paginateData(tableData);
      containerStyle = Object.assign({}, containerStyle, {
        marginBottom: '3rem',
      });
    }

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
        <div>
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
                rowRenderer={options =>
                  rowRenderer(options, rowRendererOptions)}
                rowStyle={tableRowStyle || rowStyle}
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
        {pageSize ? (
          <div className={theme.table.paginationContainer}>
            <Button
              disabled={leftDisable}
              className={theme.table.paginationButton}
              onClick={() => this.paginateClick('left', dataCount)}
            >
              <i className="fa fa-arrow-left" />
            </Button>
            <Button
              className={theme.table.paginationButton}
              disabled={rightDisable}
              onClick={() => this.paginateClick('right', dataCount)}
            >
              <i className="fa fa-arrow-right" />
            </Button>
          </div>
        ) : (
          <React.Fragment />
        )}
      </div>
    );
  }
}

export default connectTheme(Table);
