import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { createStore, Provider } from 'redux';
import * as actionTypes from './store/actions/actionTypes';
import uuid from 'uuid/v4';

const initialState = {
  title: '',
  description: '',
  ingredients: [{ id: '01', title: '', addedIngredients: [] }],
  mostUsedIngredients: ['cocoa powder', 'cocoa butter', 'milk powder', 'sugar'],
  allAllergens: ['eggs', 'milk', 'milk powder', 'peanuts', 'hazelnuts'],
  mayContain: ['nuts', 'milk', 'eggs']
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.HANDLE_CHANGE:
      const { name, value } = action.payload.e.target;
      return { [name]: value };

    case actionTypes.HANDLE_PARTS:
      // e.preventDefault();
      const { id: partId, value: partValue } = action.payload;
      return partValue === 'add'
        ? {
            ingredients: [
              ...state.ingredients,
              { id: uuid(), title: '', addedIngredients: [] }
            ]
          }
        : {
            ingredients: [...state.ingredients].filter(
              item => item.id !== partId
            )
          };

    case actionTypes.SHOW_ON_LABEL_PREVIEW:
      const { id: showId, title: showTitle, addedIngredients } = action.payload;
      // e && e.preventDefault();
      return {
        ingredients: [...this.state.ingredients].map(item =>
          item.id === showId ? { showId, showTitle, addedIngredients } : item
        )
      };

    default:
      return state;
  }
}

let store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
