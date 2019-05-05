import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions/actions';

import Label from './components/Label/index.js';
import Form from './components/Form/index';
import { Switch, Route, withRouter } from 'react-router-dom';

import './App.scss';

class App extends Component {
  componentDidMount = () => {
    this.props.getCountries();
  };
  render() {
    return (
      <div className="App">
        <p className="notification">For better experience, open on desktop</p>
        <Switch>
          <Route exact path="/" component={Form} />
          <Route path="/label" component={Label} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCountries: () => dispatch(actions.getCountries())
  };
};

export default withRouter(
  connect(
    undefined,
    mapDispatchToProps
  )(App)
);
