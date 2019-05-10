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
  },
  countries: [],
  country: 'EU',
  className: 'label-preview'
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
          //check if input value is a number
          //The "numericality" validator will only allow numbers. If it returns undefined it IS a number
          //number also needs to be bigger than 0
          return validate(
            { weight: value },
            { weight: { numericality: true } }
          ) === undefined && parseFloat(value) > 0
            ? {
                ...state,
                weight: value,
                validationErrors: { ...state.validationErrors, weight: '' }
              }
            : {
                ...state,
                weight: '',
                validationErrors: {
                  ...state.validationErrors,
                  weight: 'Must be a number greater than 0'
                }
              };

        default:
          return value;
      }

    case actionTypes.GET_UNIT:
      //changes weight unit to grams or kilograms
      value = action.payload.target.value.toString();
      return { ...state, unit: value };

    case actionTypes.GET_COUNTRIES:
      //sort countries by alphabet and save them in the state
      const countries = action.payload.sort((a, b) =>
        a.countryName.localeCompare(b.countryName)
      ) || ['Finland', 'Sweden'];
      return { ...state, countries };

    case actionTypes.SELECT_COUNTRY:
      value = action.payload.target.value.toString();
      return { ...state, country: value };

    case actionTypes.CHANGE_LABEL_PREVIEW_SIZE:
      //changes the class name which makes more text fit to screen

      return state.className === 'label-preview'
        ? { ...state, className: 'label-preview small' }
        : { ...state, className: 'label-preview tiny' };

    default:
      return state;
  }
};

export default ingredientsReducer;
