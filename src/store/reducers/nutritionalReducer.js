import * as actionTypes from '../actions/actionTypes';

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
  sodiumPercent: ''
};

const nutritionalReducer = (state = nutrientsState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_NUTRIENT:
      let name = action.payload.target.name;
      let value = action.payload.target.value;
      return { ...state, [name]: value };

    default:
      return state;
  }
};

export default nutritionalReducer;
