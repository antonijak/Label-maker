import * as actionTypes from '../actions/actionTypes';
import uuid from 'uuid/v4';

const ingredientsState = {
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

const ingredientsReducer = (state = ingredientsState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_CHANGE:
      let name = action.payload.target.name;
      //prevent user from entering javascript
      let value = action.payload.target.value.toString();

      return { ...state, [name]: value };

    case actionTypes.HANDLE_PARTS:
      //adds or removes ingredient group "part"
      let { e, id } = action.payload;
      //prevent user from entering javascript
      value = action.payload.value.toString();
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
      //updates ingredients in the global state
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

export default ingredientsReducer;
