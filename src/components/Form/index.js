import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import moment from 'moment';
import { Link } from 'react-router-dom';

import IngredientsSelector from '../IngredientSelector/index';
import AllergensContainer from '../AllergensContainer/index.js';
import CustomDropdown from '../CustomDropdown/index';
import Company from '../Company/index';
import NutritionalValues from '../NutritionalValues';
import LabelPreview from '../LabelPreview/index';

import './styles.scss';

const today = moment(new Date()).format('YYYY-MM-DD');

const Form = ({
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
  countries,
  country,
  selectCountry
}) => {
  return (
    <div className="form-container">
      <form className="form" onSubmit={() => {}}>
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
        <div className="container form__package">
          <div className="form__package__weight">
            <small className="form__package__weight__message">
              {ingredientsValidationErrors.weight}
            </small>

            <label className="form__package__weight__label">
              <span className="form__package__weight__label__text">
                Net.weight:
              </span>
              <input
                name="weight"
                type="number"
                placeholder="100"
                className="form__package__weight__label__input"
                value={weight}
                onChange={validate}
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
              <span className="form__package__date__label__text">
                Best before:
              </span>
              <input
                name="date"
                type="date"
                className="form__package__date__label__input"
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
        <div className="container country-select">
          <span className="country-select__label">Country of origin:</span>
          <select
            value={country}
            onChange={selectCountry}
            className="country-select__select"
          >
            <option>EU</option>
            {countries.length > 0 &&
              countries.map((country, i) => (
                <option key={i + 1} value={country.countryName}>
                  {country.countryName}
                </option>
              ))}
          </select>
        </div>
        <NutritionalValues />
        <div className="container form__submit">
          <Link to="/label" className="form__submit__button">
            Continue
          </Link>
        </div>
      </form>
      <LabelPreview />
    </div>
  );
};

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
    countries: ingredientsReducer.countries,
    country: ingredientsReducer.country
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: e => dispatch(actions.handleChange(e)),
    validate: e => dispatch(actions.validate(e)),
    selectCountry: e => dispatch(actions.selectCountry(e))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
