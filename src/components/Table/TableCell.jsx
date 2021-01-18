import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import style from './Table.module.scss';

const TableCell = React.memo(({ cell, setCell, onFocus }) => {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState('');
  const valueOrFunc = cell.function ? cell.function() : cell.value;
  useEffect(() => {
    // setValue(cell.value);
    if (cell.function) {
      // setCell({ ...cell, value: cell.function() });
    }
  }, [cell.function]);
  return (
    <td
      onDoubleClick={(e) => {
        setIsActive(true);
        e.target.disabled = false;
        e.target.focus();
      }}
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
        value={!isActive ? valueOrFunc : value}
      />
    </td>
  );
});

export default TableCell;
TableCell.defaultProps = {
  onFocus: null,
};
TableCell.propTypes = {
  cell: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  setCell: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
};
