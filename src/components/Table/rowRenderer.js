import React from 'react';

/**
 * Default row renderer for Table.
 */
export default function defaultRowRenderer(
  {
    className,
    columns,
    index,
    key,
    onRowClick,
    onRowDoubleClick,
    onRowMouseOut,
    onRowMouseOver,
    onRowRightClick,
    rowData,
    style
  },
  {
    openIndex,
    ExpandedComponent,
    expandedHeight,
    rowHeight,
    expandedRowStyles,
    tableData
  }
) {
  const a11yProps = {};
  let expandedComponent = null;

  if (
    onRowClick ||
    onRowDoubleClick ||
    onRowMouseOut ||
    onRowMouseOver ||
    onRowRightClick
  ) {
    a11yProps['aria-label'] = 'row';
    a11yProps.tabIndex = 0;

    if (onRowClick)
      a11yProps.onClick = event => onRowClick({ event, index, rowData });

    if (onRowDoubleClick)
      a11yProps.onDoubleClick = event =>
        onRowDoubleClick({ event, index, rowData });

    if (onRowMouseOut)
      a11yProps.onMouseOut = event => onRowMouseOut({ event, index, rowData });

    if (onRowMouseOver)
      a11yProps.onMouseOver = event =>
        onRowMouseOver({ event, index, rowData });

    if (onRowRightClick)
      a11yProps.onContextMenu = event =>
        onRowRightClick({ event, index, rowData });
  }
  if (index === openIndex) {
    expandedComponent = (
      <div
        style={{
          ...style,
          top: style.top + rowHeight,
          height: expandedHeight
        }}
      >
        <ExpandedComponent expandedData={tableData[openIndex]} />
      </div>
    );
  } else if (index > openIndex) style.top = style.top + expandedHeight;

  return (
    <div key={key} style={{}}>
      {' '}
      {/* Empty style object added to remove react-virtualized warning */}
      <div {...a11yProps} className={className} role="row" style={style}>
        {columns}
      </div>
      {expandedComponent}
    </div>
  );
}
