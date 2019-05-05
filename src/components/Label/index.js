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

import printJS from 'print-js';

const Label = () => {
  return (
    <div className="form-container">
      {/* <div
        id="label-preview"
        className="label-preview"
      >
        Hello
        <h1>This is test</h1>
      </div> */}
      <LabelPreview />
      <button
        type="button"
        onClick={() =>
          printJS({
            printable: 'label-preview',
            type: 'html',
            style:
              '.label-preview { font-family: Roboto; font-size: .5rem; box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.226); border-radius: 4px; width: 30%; padding: 2rem; height: 600px; margin: 2.5vh 1rem;} .label-preview__description {font-weight: normal;}.label-ingredient__allergen { font-weight: bold;} .label-preview__allergens {font-style: italic;font-weight: bold;} .label-preview * {margin: 0; padding: 0; height: 1rem; display: inline; width: fit-content;} .label-preview__nutrients {display: block;} .nutrient-preview {margin: 0; padding: 0; height: 1rem; display: inline; width: fit-content;} .nutrient-preview * {margin: 0; padding: 0; height: 1rem; display: inline; width: fit-content; }'
          })
        }
      >
        Print Label
      </button>
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
)(Label);
