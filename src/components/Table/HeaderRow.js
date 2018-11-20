import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class HeaderRow extends PureComponent {
  static get propTypes() {
    return {
      columns: PropTypes.node,
    };
  }

  render() {
    const { columns, className, theme, style } = this.props;
    return (
      <div
        className={`${className} ${theme.table.headerRow}`}
        role="row"
        style={style}
      >
        {columns}
      </div>
    );
  }
}
