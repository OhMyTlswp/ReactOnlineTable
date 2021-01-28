import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './Table.module.scss';

const TableCell = React.memo(({ cell, setCell, onFocus, onMouseEnter, onMouseLeave, cellValue }) => {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState('');
  return (
    <td
      onDoubleClick={(e) => {
        setIsActive(true);
        e.target.disabled = false;
        e.target.focus();
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={style['table__cell']}
    >
      <input
        className={style['table__input']}
        style={{}}
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onFocus={(e) => {
          if (onFocus) {
            onFocus(setValue, e);
          }
        }}
        onBlur={(e) => {
          setIsActive(false);
          setCell({ ...cell, value: e.target.value });
        }}
        disabled={!isActive}
        value={!isActive ? cellValue : value}
      />
    </td>
  );
});

export default TableCell;
TableCell.defaultProps = {
  onFocus: null,
  onMouseEnter: null,
  onMouseLeave: null,
};
TableCell.propTypes = {
  cell: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  setCell: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  cellValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
