import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions/actions';
import moment from 'moment';

import IngredientsSelector from './components/IngredientSelector/index.js';
import AllergensContainer from './components/AllergensContainer/index.js';
import LabelPreview from './components/LabelPreview/index.js';
import CustomDropdown from './components/CustomDropdown';
import Company from './components/Company/index';

import './App.scss';

const today = moment(new Date()).format('YYYY-MM-DD');

class App extends Component {
  componentDidMount = () => {
    this.props.getCountries();
  };
  render() {
    const {
      title,
      description,
      ingredients,
      weight,
      date,
      ingredientsValidationErrors,
      handleChange,
      validate,
      companiesValidationErrors,
      producer,
      distributor,
      producersList,
      distributorsList,
      producersVisible,
      distributorsVisible,
      countries
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
                    {ingredientsValidationErrors.weight}
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
                    {ingredientsValidationErrors.date}
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
              <Company
                use="producer"
                company={producer}
                companyList={producersList}
                companyVisible={producersVisible}
                errorMessage={companiesValidationErrors.producer}
                title="Producer"
              />
              <Company
                use="distributor"
                company={distributor}
                companyList={distributorsList}
                companyVisible={distributorsVisible}
                errorMessage={companiesValidationErrors.distributor}
                title="Importer/Distributer"
              />
              <div className="container">
                <select
                  placeholder="County of origin"
                  className="form__country"
                >
                  {countries.length > 0 &&
                    countries.map((country, i) => (
                      <option key={i + 1}>{country.countryName}</option>
                    ))}
                </select>
              </div>
            </form>
            <LabelPreview />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ ingredientsReducer, companiesReducer }) => {
  return {
    title: ingredientsReducer.title,
    description: ingredientsReducer.description,
    ingredients: ingredientsReducer.ingredients,
    weight: ingredientsReducer.weight,
    date: ingredientsReducer.date,
    ingredientsValidationErrors: ingredientsReducer.validationErrors,
    companiesValidationErrors: companiesReducer.validationErrors,
    producer: companiesReducer.producer,
    distributor: companiesReducer.distributor,
    producersList: companiesReducer.producersList,
    distributorsList: companiesReducer.distributorsList,
    producersVisible: companiesReducer.producersVisible,
    distributorsVisible: companiesReducer.distributorsVisible,
    countries: ingredientsReducer.countries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: e => dispatch(actions.handleChange(e)),
    validate: e => dispatch(actions.validate(e)),
    getCountries: () => dispatch(actions.getCountries())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
