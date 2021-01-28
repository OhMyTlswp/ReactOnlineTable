const initialState = {
  users: [],
  user: null,
  table: [
    [
      { x: 0, y: 0, value: 'Название', isSelected: false, user: null },
      { x: 1, y: 0, value: 'Количество', isSelected: false, user: null },
      { x: 2, y: 0, value: 'Цена за 1', isSelected: false, user: null },
      { x: 3, y: 0, value: 'Общая сумма', isSelected: false, user: null },
    ],
    [
      { x: 0, y: 1, value: 'Банан' },
      { x: 1, y: 1, value: 5 },
      { x: 2, y: 1, value: 20 },
      { x: 3, y: 1, value: '=multiply(y1x1;y1x2)' },
    ],
    [
      { x: 0, y: 2, value: 'Груша' },
      { x: 1, y: 2, value: 4 },
      { x: 2, y: 2, value: 25 },
      { x: 3, y: 2, value: '=multiply(y2x1;y2x2)' },
    ],
    [
      { x: 0, y: 3, value: 'Мясо' },
      { x: 1, y: 3, value: 20 },
      { x: 2, y: 3, value: 120 },
      { x: 3, y: 3, value: '=multiply(y3x1;y3x2)' },
    ],
    [
      { x: 0, y: 4, value: '' },
      { x: 1, y: 4, value: '' },
      { x: 2, y: 4, value: 'Тотал:' },
      { x: 3, y: 4, value: '=sum(y1x3;y3x3)' },
    ],
  ],
};
export default initialState;
// { id: 0, color: '#ff9', isView: true, x: 0, y: 0 }
// {
//     headers: [], //{'column-name':{ name:'header-name',defaultValue:'' }}
//     options: [], //[{'column-name':{name:'value',isSelected:false,user:null}}]
//   },
