import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import ingredientsReducer from './store/reducers/ingredientsReducer';
import companiesReducer from './store/reducers/companiesReducer';

const reducer = combineReducers({ ingredientsReducer, companiesReducer });

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
