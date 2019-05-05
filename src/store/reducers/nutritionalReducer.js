import * as actionTypes from '../actions/actionTypes';
import validate from 'validate.js';

const nutrientsState = {
  energyKcal: '',
  energyKJ: '',
  fatGram: '',
  fatPercent: '',
  saturatedFatGram: '',
  saturatedFatPercent: '',
  transFatGram: '',
  transFatPercent: '',
  carbohydratesGram: '',
  carbohydratesPercent: '',
  sugarGram: '',
  sugarPercent: '',
  fiberGram: '',
  fiberPercent: '',
  proteinGram: '',
  proteinPercent: '',
  sodiumGram: '',
  sodiumPercent: '',
  validationErrors: {
    energyKcal: '',
    energyKJ: '',
    fatGram: '',
    fatPercent: '',
    saturatedFatGram: '',
    saturatedFatPercent: '',
    transFatGram: '',
    transFatPercent: '',
    carbohydratesGram: '',
    carbohydratesPercent: '',
    sugarGram: '',
    sugarPercent: '',
    fiberGram: '',
    fiberPercent: '',
    proteinGram: '',
    proteinPercent: '',
    sodiumGram: '',
    sodiumPercent: ''
  }
};

const nutritionalReducer = (state = nutrientsState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_NUTRIENT:
      let name = action.payload.target.name;
      let value = action.payload.target.value;
      //check if input value is a number
      //The numericality validator will only allow numbers. If it returns undefined it IS a number
      //number also needs to be bigger than 0
      console.log(value);
      return validate(
        { nutrient: value },
        { nutrient: { numericality: true } }
      ) === undefined && parseFloat(value) > 0
        ? {
            ...state,
            [name]: value,
            validationErrors: { ...state.validationErrors, [name]: '' }
          }
        : {
            ...state,
            [name]: '',
            validationErrors: {
              ...state.validationErrors,
              [name]: 'Enter a number greater than 0'
            }
          };

    default:
      return state;
  }
};

export default nutritionalReducer;
