const initialState = {
  users: [],
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
      { x: 3, y: 1, value: '=sum(y0x1;y0x2)' },
    ],
  ],
};
export default initialState;
// { id: 0, color: '#ff9', isView: true, x: 0, y: 0 }
// {
//     headers: [], //{'column-name':{ name:'header-name',defaultValue:'' }}
//     options: [], //[{'column-name':{name:'value',isSelected:false,user:null}}]
//   },
