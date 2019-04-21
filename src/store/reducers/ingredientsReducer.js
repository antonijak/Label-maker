import * as actionTypes from '../actions/actionTypes';
import uuid from 'uuid/v4';
import moment from 'moment';
import validate from 'validate.js';

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
  traces: [],
  weight: '',
  date: '',
  unit: 'g',
  validationErrors: {
    weight: '',
    date: ''
  }
};

const ingredientsReducer = (state = ingredientsState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_CHANGE:
      let name = action.payload.target.name;
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

    case actionTypes.VALIDATE:
      name = action.payload.target.name;
      value = action.payload.target.value;

      switch (name) {
        case 'date':
          const today = moment(new Date()).format('YYYY-MM-DD');
          if (value && !moment(value).isBefore(today)) {
            return {
              ...state,
              date: value,
              validationErrors: { ...state.validationErrors, date: '' }
            };
          } else if (!value && !moment(value).isBefore(today)) {
            return {
              ...state,
              date: value,
              validationErrors: {
                ...state.validationErrors,
                date: 'This date is invalid!'
              }
            };
          } else {
            return {
              ...state,
              date: value,
              validationErrors: {
                ...state.validationErrors,
                date: 'This date has already passed!'
              }
            };
          }

        case 'weight':
          const pattern = /[0-9]*/;
          //check if input is number
          return validate(
            { weight: value },
            { weight: { format: pattern } }
          ) === undefined
            ? {
                ...state,
                weight: value,
                validationErrors: { ...state.validationErrors, weight: '' }
              }
            : {
                ...state,
                weight: value,
                validationErrors: {
                  ...state.validationErrors,
                  weight: 'Value must be a number!'
                }
              };

        default:
          return value;
      }

    case actionTypes.GET_UNIT:
      value = action.payload.target.value;
      return { ...state, unit: value };

    default:
      return state;
  }
};

export default ingredientsReducer;
