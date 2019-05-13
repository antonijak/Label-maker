import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ingredientsReducer from './store/reducers/ingredientsReducer';
import companiesReducer from './store/reducers/companiesReducer';
import nutritionalReducer from './store/reducers/nutritionalReducer';
import generalReducer from './store/reducers/generalReducer';
import thunk from 'redux-thunk';

import { BrowserRouter as Router } from 'react-router-dom';

const reducer = combineReducers({
  ingredientsReducer,
  companiesReducer,
  nutritionalReducer,
  generalReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
