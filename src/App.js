import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions/actions';

import LabelPreview from './components/LabelPreview/index.js';
import Form from './components/Form/index';

import './App.scss';

class App extends Component {
  componentDidMount = () => {
    this.props.getCountries();
  };
  render() {
    return (
      <div className="App">
        <p className="notification">For better experience, open on desktop</p>

        <Form />
        <LabelPreview />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCountries: () => dispatch(actions.getCountries())
  };
};

export default connect(
  undefined,
  mapDispatchToProps
)(App);
