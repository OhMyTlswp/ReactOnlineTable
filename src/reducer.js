function processTableFunction(regexpMatch, table, cell) {
  const tableFunction = regexpMatch[0];
  const type = regexpMatch[1];
  const y1 = +regexpMatch[2];
  const y2 = +regexpMatch[4];
  const x1 = +regexpMatch[3];
  const x2 = +regexpMatch[5];
  const isY = y1 === y2;
  const newCell = cell;

  console.log(regexpMatch, table, cell);
  if (y1 === y2 || x1 === x2) {
    switch (type) {
      case 'sum':
        newCell.value = 0;
        if (isY) {
          newCell.function = () => {
            let sum = 0;
            for (let index = x1; index <= x2; index += 1) {
              sum += +(table[y1][index].function ? table[y1][index].function() : table[y1][index].value);
            }
            return sum;
          };
          newCell.value = newCell.function();
        } else {
          newCell.function = () => {
            let sum = 0;
            for (let index = y1; index <= y2; index += 1) {
              sum += +(table[index][x1].function ? table[index][x1].function() : table[index][x1].value);
            }
            return sum;
          };
          newCell.value = newCell.function();
        }
        newCell.tableFunction = tableFunction;
        return newCell;
      case 'multiply':
        newCell.value = 1;
        if (isY) {
          newCell.function = () => {
            let sum = 1;
            for (let index = x1; index <= x2; index += 1) {
              sum *= +(table[y1][index].function ? table[y1][index].function() : table[y1][index].value);
            }
            return sum;
          };
          newCell.value = newCell.function();
        } else {
          newCell.function = () => {
            let sum = 1;
            for (let index = y1; index <= y2; index += 1) {
              sum *= +(table[index][x1].function ? table[index][x1].function() : table[index][x1].value);
            }
            return sum;
          };
          newCell.value = newCell.function();
        }
        newCell.tableFunction = tableFunction;
        return newCell;
      default:
        return newCell;
    }
  }
  return newCell;
}

export default function reducer(state = [], action) {
  // let newState;
  let table = [];
  let regexpMatch = [];
  let newCell = {};
  switch (action.type) {
    case 'SET_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'GENERATE_TABLE':
      for (let indexY = 0; indexY <= 10; indexY += 1) {
        table.push([]);
        for (let indexX = 0; indexX <= 6; indexX += 1) {
          table[indexY].push({ x: indexX, y: indexY, value: '', isSelected: false, user: null });
        }
      }
      console.log(table);
      state.table.forEach((tableRow) => {
        tableRow.forEach((tableItem) => {
          // table = [...state.table];
          regexpMatch = String(tableItem.value).match(/^=([A-Za-z]+)+\(y(\d)x(\d);y(\d)x(\d)\)/);
          newCell = tableItem;
          newCell.function = null;
          if (regexpMatch && regexpMatch.length === 6) {
            newCell = processTableFunction(regexpMatch, table, newCell);
          }
          // console.log(newCell);
          // newCell.value = newCell.function();
          table[tableItem.y][tableItem.x] = newCell;
        });
      });
      return { ...state, table };
    case 'SET_CELL':
      table = [...state.table];
      regexpMatch = String(action.payload.value).match(/^=([A-Za-z]+)+\(y(\d)x(\d);y(\d)x(\d)\)/);
      newCell = action.payload;
      newCell.function = null;
      if (regexpMatch && regexpMatch.length === 6) {
        newCell = processTableFunction(regexpMatch, table, newCell);
        console.log(newCell);
      }
      table[action.payload.y][action.payload.x] = { ...newCell };
      return { ...state, table };
    default:
      return state;
  }
}
