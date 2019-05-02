import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as DATA from '../../data/data';

import './styles.scss';
import IngredientsList from './components/IngredientsList/index';
import NutrientPreview from './components/NutrientPreview/index';

class LabelPreview extends Component {
  state = {
    clname: 'label-preview'
  };

  render() {
    let {
      title,
      description,
      ingredients,
      traces,
      weight,
      unit,
      date,
      producer,
      distributor,
      country,
      energyKcal,
      energyKJ,
      fatGram,
      fatPercent,
      saturatedFatGram,
      saturatedFatPercent,
      transFatGram,
      transFatPercent,
      carbohydratesGram,
      carbohydratesPercent,
      sugarGram,
      sugarPercent,
      fiberGram,
      fiberPercent,
      proteinGram,
      proteinPercent,
      sodiumGram,
      sodiumPercent
    } = this.props;
    return (
      <div className={this.state.clname}>
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

        <p className="label-preview__country">
          <span>Country of origin: </span>
          {country}
        </p>

        <div className="label-preview__nutrients">
          <h4 className="label-preview__nutrients__title">Nutrition Facts</h4>

          <NutrientPreview
            title="Energy"
            value1={energyKcal}
            value2={energyKJ}
            unit1="kcal"
            unit2="KJ"
          />

          <NutrientPreview
            title="Fat"
            value1={fatGram}
            value2={fatPercent}
            unit1="g"
            unit2="%"
          />

          <div className="label-preview__nutrients__subnutrient">
            <NutrientPreview
              title="Saturated fat"
              value1={saturatedFatGram}
              value2={saturatedFatPercent}
              unit1="g"
              unit2="%"
            />

            <NutrientPreview
              title="Trans fat"
              value1={transFatGram}
              value2={transFatPercent}
              unit1="g"
              unit2="%"
            />
          </div>

          <NutrientPreview
            title="Carbohydrates"
            value1={carbohydratesGram}
            value2={carbohydratesPercent}
            unit1="g"
            unit2="%"
          />

          <div className="label-preview__nutrients__subnutrient">
            <NutrientPreview
              title="Sugar"
              value1={sugarGram}
              value2={sugarPercent}
              unit1="g"
              unit2="%"
            />

            <NutrientPreview
              title="Fiber"
              value1={fiberGram}
              value2={fiberPercent}
              unit1="g"
              unit2="%"
            />
          </div>

          <NutrientPreview
            title="Protein"
            value1={proteinGram}
            value2={proteinPercent}
            unit1="g"
            unit2="%"
          />

          <NutrientPreview
            title="Sodium"
            value1={sodiumGram}
            value2={sodiumPercent}
            unit1="g"
            unit2="%"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  ingredientsReducer,
  companiesReducer,
  nutritionalReducer
}) => {
  return {
    title: ingredientsReducer.title,
    description: ingredientsReducer.description,
    ingredients: ingredientsReducer.ingredients,
    mostUsedIngredients: ingredientsReducer.mostUsedIngredients,
    traces: ingredientsReducer.traces,
    weight: ingredientsReducer.weight,
    unit: ingredientsReducer.unit,
    date: ingredientsReducer.date,
    producer: companiesReducer.producer,
    distributor: companiesReducer.distributor,
    country: ingredientsReducer.country,
    energyKcal: nutritionalReducer.energyKcal,
    energyKJ: nutritionalReducer.energyKJ,
    fatGram: nutritionalReducer.fatGram,
    fatPercent: nutritionalReducer.fatPercent,
    saturatedFatGram: nutritionalReducer.saturatedFatGram,
    saturatedFatPercent: nutritionalReducer.saturatedFatPercent,
    transFatGram: nutritionalReducer.transFatGram,
    transFatPercent: nutritionalReducer.transFatPercent,
    carbohydratesGram: nutritionalReducer.carbohydratesGram,
    carbohydratesPercent: nutritionalReducer.carbohydratesPercent,
    sugarGram: nutritionalReducer.sugarGram,
    sugarPercent: nutritionalReducer.sugarPercent,
    fiberGram: nutritionalReducer.fiberGram,
    fiberPercent: nutritionalReducer.fiberPercent,
    proteinGram: nutritionalReducer.proteinGram,
    proteinPercent: nutritionalReducer.proteinPercent,
    sodiumGram: nutritionalReducer.sodiumGram,
    sodiumPercent: nutritionalReducer.sodiumPercent
  };
};

export default connect(
  mapStateToProps,
  undefined
)(LabelPreview);
