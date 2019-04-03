import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions/actions';

import IngredientsSelector from './components/IngredientsSelector.js';
import AllergensContainer from './components/AllergensContainer.js';
import LabelPreview from './components/LabelPreview.js';

import './App.scss';

class App extends Component {
  render() {
    const { title, description, ingredients, handleChange } = this.props;
    return (
      <div className="App">
        <form className="form">
          <div className="form__heading">
            <h1 className="form__heading__h1">Label Maker</h1>

            <input
              name="title"
              type="text"
              id="form-title"
              value={title}
              onChange={handleChange}
              className="form__heading__title"
              placeholder="Main title"
            />

            <input
              name="description"
              type="text"
              id="description"
              className="form__heading__description"
              placeholder="Main description"
              value={description}
              onChange={handleChange}
            />
          </div>

          <div className="form__parts">
            {ingredients.map((part, i) => (
              <IngredientsSelector key={part.id} part={part} />
            ))}
          </div>
          <AllergensContainer />
        </form>
        <LabelPreview />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    title: state.title,
    description: state.description,
    ingredients: state.ingredients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: e => dispatch(actions.handleChange(e))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
