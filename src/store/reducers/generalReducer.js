import * as actionTypes from '../actions/actionTypes';
import moment from 'moment';
import validate from 'validate.js';

const initialState = {
  alert: false,
  countries: [],
  country: 'EU',
  className: 'label-preview',
  weight: '',
  date: '',
  unit: 'g',
  validationErrors: {
    weight: '',
    date: ''
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_DATE:
      let name = action.payload.target.name;
      //prevent user from entering javascript
      let value = action.payload.target.value.toString();

      return { ...state, [name]: value };
    case actionTypes.HANDLE_ALERT:
      return { ...state, alert: !state.alert };

    case actionTypes.GET_COUNTRIES:
      //sort countries by alphabet and save them in the state
      const countries = action.payload.sort((a, b) =>
        a.countryName.localeCompare(b.countryName)
      );
      return {
        ...state,
        countries
      };

    case actionTypes.SELECT_COUNTRY:
      value = action.payload.target.value.toString();
      return { ...state, country: value };

    case actionTypes.CHANGE_LABEL_PREVIEW_SIZE:
      //changes the class name which makes more text fit to screen

      return state.className === 'label-preview'
        ? { ...state, className: 'label-preview small' }
        : { ...state, className: 'label-preview tiny' };

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

    default:
      return state;
  }
};

export default reducer;
