import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../actions/connectionWS';
import Table from '../Table/Table';
import TableCell from '../Table/TableCell';
import TableRow from '../Table/TableRow';
import Cursor from '../Cursor/Cursor';
// const table = [];
// for (let indexY = 0; indexY <= 100; indexY += 1) {
//   table.push([]);
//   for (let indexX = 0; indexX <= 6; indexX += 1) {
//     table[indexY].push({ x: indexX, y: indexY, value: '', isSelected: false, user: null });
//   }
// }

export default function OnlineTable() {
  const table = useSelector((state) => state.table);
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const wrapperRef = useRef();
  const dispatch = useDispatch();
  const [isGen, setIsGen] = useState(false);
  useEffect(() => {
    socket.on('get_table', (payload) => {
      dispatch({ type: 'SET_TABLE', payload });
      setIsGen(true);
    });
  }, []);
  return (
    isGen && (
      <div
        ref={wrapperRef}
        style={{ position: 'relative', width: '100%' }}
        onMouseLeave={() => {
          socket.emit('set_user_cursor_on_server', { ...user, isView: false });
        }}
        onMouseEnter={(e) => {
          socket.emit('set_user_cursor_on_server', {
            ...user,
            isView: true,
            x: e.clientX,
            y: e.clientY,
            timeStamp: e.timeStamp,
            percentX: (e.clientX - wrapperRef.current.offsetLeft) / (wrapperRef.current.clientWidth / 100),
            percentY: (e.clientY - wrapperRef.current.offsetTop) / (wrapperRef.current.clientHeight / 100),
          });
        }}
        onMouseMove={(e) => {
          const radius = 1;
          // console.log(user);
          if (
            (Math.abs(e.clientX - user.x) >= radius || Math.abs(e.clientY - user.y) >= radius) &&
            e.timeStamp - user.timeStamp > 75
          ) {
            socket.emit('set_user_cursor_on_server', {
              ...user,
              isView: true,
              x: e.clientX,
              y: e.clientY,
              timeStamp: e.timeStamp,
              percentX: (e.clientX - wrapperRef.current.offsetLeft) / (wrapperRef.current.clientWidth / 100),
              percentY: (e.clientY - wrapperRef.current.offsetTop) / (wrapperRef.current.clientHeight / 100),
            });
          }
        }}
      >
        {users.map(({ color, isView, percentY, percentX }) => (
          <Cursor color={color} isView={isView} x={percentX} y={percentY} />
        ))}
        <Table>
          {isGen &&
            table.map((tableRow) => (
              <TableRow key={tableRow[0].y}>
                {tableRow.map((tableCell) => (
                  <TableCell
                    key={`y${tableCell.y}x${tableCell.x}`}
                    cell={tableCell}
                    cellValue={tableCell.function ? tableCell.function() : tableCell.value}
                    onFocus={(setValue) => {
                      setValue(tableCell.function ? tableCell.tableFunction : tableCell.value);
                    }}
                    onMouseEnter={() => {
                      // console.log(e.target.style.backgroundColor);
                      // // e.target.style.backgroundColor = user.color;
                      // console.log(e.target.style.backgroundColor);
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '';
                    }}
                    setCell={(payload) => {
                      socket.emit('save_cell', payload);
                    }}
                  />
                ))}
              </TableRow>
            ))}
        </Table>
      </div>
    )
  );
}
