import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../Table/Table';
import TableCell from '../Table/TableCell';
import TableRow from '../Table/TableRow';

// const table = [];
// for (let indexY = 0; indexY <= 100; indexY += 1) {
//   table.push([]);
//   for (let indexX = 0; indexX <= 6; indexX += 1) {
//     table[indexY].push({ x: indexX, y: indexY, value: '', isSelected: false, user: null });
//   }
// }

export default function OnlineTable() {
  const table = useSelector((state) => state.table);
  const dispatch = useDispatch();
  const [isGen, setIsGen] = useState(false);
  useEffect(() => {
    dispatch({ type: 'GENERATE_TABLE' });
    setIsGen(true);
  }, []);
  return (
    <>
      <Table>
        {isGen &&
          table.map((tableRow) => (
            <TableRow key={tableRow[0].y}>
              {tableRow.map((tableCell) => (
                <TableCell
                  key={`y${tableCell.y}x${tableCell.x}`}
                  cell={tableCell}
                  setCell={(payload) => {
                    dispatch({ type: 'SET_CELL', payload });
                  }}
                />
              ))}
            </TableRow>
          ))}
      </Table>
    </>
  );
}
