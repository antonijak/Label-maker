import * as actionTypes from '../actions/actionTypes';
import uuid from 'uuid/v4';

const initialState = {
  title: '',
  description: '',
  ingredients: [{ id: '01', title: '', addedIngredients: [] }],
  mostUsedIngredients: ['cocoa powder', 'cocoa butter', 'milk powder', 'sugar'],
  allAllergens: ['eggs', 'milk', 'milk powder', 'peanuts', 'hazelnuts'],
  mayContain: ['nuts', 'milk', 'eggs']
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_CHANGE:
      const name = action.payload.event.target.name;
      let value = action.payload.event.target.value;
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
              { id: uuid(), title: '', addedIngredients: [] }
            ]
          }
        : {
            ...state,
            ingredients: [...state.ingredients].filter(item => item.id !== id)
          };

    case actionTypes.SHOW_ON_LABEL_PREVIEW:
      let { title, addedIngredients } = action.payload;
      id = action.payload.id;
      return {
        ...state,
        ingredients: [...state.ingredients].map(item =>
          item.id === id ? { id, title, addedIngredients } : item
        )
      };

    default:
      return state;
  }
};

export default reducer;
