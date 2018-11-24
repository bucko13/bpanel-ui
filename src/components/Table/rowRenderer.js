import React from 'react';

import 'font-awesome/css/font-awesome.min.css';

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
    style,
  },
  {
    selectedIndex,
    ExpandedComponent,
    expandedHeight,
    rowHeight,
    hoverExpandableRow,
    hoverRow,
    selectedRow,
    hoverIndex,
    expandedRowStyles,
    expandedData,
    tableData,
    theme,
    selectable,
  }
) {
  const a11yProps = {};
  let expandedComponent = null;
  let expandVisualAid = null;
  let expandGlyph; // up or down arrow glyph, indicates expanding row

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

  // selectable styles
  let rowClassNames = className;
  if (selectable) {
    if (index === hoverIndex && hoverRow)
      rowClassNames = rowClassNames.concat(' ', hoverRow);
    if (index === selectedIndex && selectedRow)
      rowClassNames = rowClassNames.concat(' ', selectedRow);
  }

  // style the header row
  if (index === -1) rowClassNames = theme.table.headerRow;

  if (expandedHeight && index === hoverIndex)
    rowClassNames = rowClassNames.concat(' ', hoverExpandableRow);

  // Expandable rows get up/down icon and hidden expanded data content
  if (expandedData) {
    if (index === selectedIndex) {
      expandGlyph = 'fa-chevron-up';
      expandedComponent = (
        <div
          style={{
            ...style,
            top: style.top + rowHeight,
            height: expandedHeight,
          }}
        >
          <ExpandedComponent expandedData={expandedData[selectedIndex]} />
        </div>
      );
    } else if (index > selectedIndex) {
      style.top = style.top + expandedHeight;
    }

    // glyph hasn't been set, this isn't a selected row
    if (expandGlyph === undefined) expandGlyph = 'fa-chevron-down';

    expandVisualAid = (
      <div className={theme.expandedRow.expandVisualAid}>
        <i className={`fa ${expandGlyph}`} />
      </div>
    );
  }

  return (
    <div key={key} style={{}}>
      {' '}
      {/* Empty style object added to remove react-virtualized warning */}
      <div {...a11yProps} className={rowClassNames} role="row" style={style}>
        {columns}
        {expandVisualAid}
      </div>
      {expandedComponent}
    </div>
  );
}
