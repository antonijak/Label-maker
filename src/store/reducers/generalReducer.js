import * as actionTypes from '../actions/actionTypes';

const initialState = {
  alert: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_ALERT:
      return { ...state, alert: !state.alert };

    default:
      return state;
  }
};

export default reducer;
