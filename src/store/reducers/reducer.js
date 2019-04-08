import * as actionTypes from '../actions/actionTypes';
import uuid from 'uuid/v4';

const initialState = {
  title: '',
  description: '',
  ingredients: [
    {
      id: '01',
      title: '',
      addedIngredients: ['cocoa powder', 'cocoa butter', 'milk powder', 'sugar']
    }
  ],
  traces: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_CHANGE:
      const name = action.payload.target.name;
      let value = action.payload.target.value;
      return { ...state, [name]: value };

    case actionTypes.HANDLE_PARTS:
      let { e, id } = action.payload;
      value = action.payload.value;
      e.preventDefault();
      return value === 'add'
        ? {
            ...state,
            ingredients: [
              ...state.ingredients,
              {
                id: uuid(),
                title: '',
                addedIngredients: [
                  'cocoa powder',
                  'cocoa butter',
                  'milk powder',
                  'sugar'
                ]
              }
            ]
          }
        : {
            ...state,
            ingredients: state.ingredients.filter(item => item.id !== id)
          };

    case actionTypes.SHOW_INGREDIENTS:
      return {
        ...state,
        ingredients: state.ingredients.map(item =>
          item.id === action.payload.id ? action.payload : item
        )
      };

    case actionTypes.SHOW_ALLERGEN:
      return {
        ...state,
        traces: [...state.traces, action.payload]
      };

    case actionTypes.REMOVE_ALLERGEN:
      return {
        ...state,
        traces: state.traces.filter(item => item !== action.payload)
      };

    default:
      return state;
  }
};

export default reducer;
