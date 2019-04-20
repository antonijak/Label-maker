import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions/actions';
import moment from 'moment';

import IngredientsSelector from './components/IngredientSelector/index.js';
import AllergensContainer from './components/AllergensContainer/index.js';
import LabelPreview from './components/LabelPreview/index.js';
import CustomDropdown from './components/CustomDropdown';
import Producer from './components/Producer/index';

import './App.scss';

const today = moment(new Date()).format('YYYY-MM-DD');

class App extends Component {
  render() {
    const {
      title,
      description,
      ingredients,
      weight,
      date,
      validationErrors,
      handleChange,
      validate
    } = this.props;

    return (
      <div className="App">
        {window.innerWidth < 1200 ? (
          <div className="desktop">
            <h1>Label Maker</h1>
            <p>This app can be used on desktop only. </p>
          </div>
        ) : (
          <>
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
                  placeholder="Main description*"
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
              <div className="form__package">
                <div className="form__package__weight">
                  <small className="form__package__weight__message">
                    {validationErrors.weight}
                  </small>

                  <label className="form__package__weight__label">
                    <span>Net.weight:</span>
                    <input
                      name="weight"
                      type="text"
                      placeholder="100"
                      className="form__package__weight__input"
                      value={weight}
                      onChange={handleChange}
                      onBlur={validate}
                      min="0"
                    />
                  </label>
                  <CustomDropdown />
                </div>

                <div className="form__package__date">
                  <small className="form__package__date__message">
                    {validationErrors.date}
                  </small>
                  <label className="form__package__date__label">
                    <span>Best before:</span>
                    <input
                      name="date"
                      type="date"
                      className="form__package__date__input"
                      value={date}
                      onChange={handleChange}
                      onBlur={validate}
                      min={today}
                    />
                  </label>
                </div>
              </div>
              <Producer />
            </form>
            <LabelPreview />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    title: state.title,
    description: state.description,
    ingredients: state.ingredients,
    weight: state.weight,
    date: state.date,
    validationErrors: state.validationErrors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: e => dispatch(actions.handleChange(e)),
    validate: e => dispatch(actions.validate(e))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
