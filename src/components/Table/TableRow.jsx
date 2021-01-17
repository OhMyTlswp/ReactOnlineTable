import React from 'react';
import PropTypes from 'prop-types';
import style from './Table.module.scss';

const TableRow = React.memo(({ children }) => <tr className={style['table__row']}>{children}</tr>);

export default TableRow;

TableRow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
