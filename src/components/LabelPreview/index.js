import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as DATA from '../../data/data';

import './styles.scss';
import IngredientsList from './components/IngredientsList/index';

const LabelPreview = ({
  title,
  description,
  ingredients,
  traces,
  weight,
  unit,
  date,
  producer,
  distributor
}) => {
  return (
    <div className="label-preview">
      <h2>{title.toUpperCase()}</h2>

      <h3 className="label-preview__description">{description}</h3>

      <IngredientsList ingredients={ingredients} allergens={DATA.allergens} />

      <p className="label-preview__allergens">
        May contain traces of
        {traces.map((allergen, i) => {
          if (i === traces.length - 1 && i === 0) {
            return ` ${allergen}. `;
          } else if (i === traces.length - 1 && i !== 0) {
            return ` and ${allergen}.`;
          } else if (i === traces.length - 2) {
            return ` ${allergen} `;
          } else {
            return ` ${allergen}, `;
          }
        })}
      </p>
      <p className="label-preview__weight">
        Net. weight:
        <span className="label-preview__weight__text">
          {weight}
          {unit}
        </span>
      </p>
      <p className="label-preview__date">
        Best before:{' '}
        <span className="label-preview__date__text">
          {date && moment(date).format('DD.MM.YYYY')}
        </span>
      </p>

      <p className="label-preview__producer">
        <span>Produced by: </span>
        {producer.name && `${producer.name}, `}
        {producer.address && `${producer.address}, `}
        {producer.country &&
          `${producer.country}${producer.contact ? ', ' : '.'}`}
        {producer.contact && ` ${producer.contact}.`}
      </p>

      <p className="label-preview__distributor">
        <span>Distributed by: </span>
        {distributor.name && `${distributor.name}, `}
        {distributor.address && `${distributor.address}, `}
        {distributor.country &&
          `${distributor.country}${distributor.contact ? ', ' : '.'}`}
        {distributor.contact && ` ${distributor.contact}.`}
      </p>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    title: state.ingredientsReducer.title,
    description: state.ingredientsReducer.description,
    ingredients: state.ingredientsReducer.ingredients,
    mostUsedIngredients: state.ingredientsReducer.mostUsedIngredients,
    traces: state.ingredientsReducer.traces,
    weight: state.ingredientsReducer.weight,
    unit: state.ingredientsReducer.unit,
    date: state.ingredientsReducer.date,
    producer: state.companiesReducer.producer,
    distributor: state.companiesReducer.distributor
  };
};

export default connect(
  mapStateToProps,
  undefined
)(LabelPreview);
