import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';

import Nutrient from './components/Nutrient';

import './styles.scss';

const NutritionalValues = ({
  energyKcal,
  energyKJ,
  fatGram,
  fatPercent,
  handleNutrient,
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
}) => {
  return (
    <div className="container nutritional-values">
      <Nutrient
        title="Energy"
        unit1="kcal"
        unit2="KJ"
        name1="energyKcal"
        name2="energyKJ"
        value1={energyKcal}
        value2={energyKJ}
        handleNutrient={handleNutrient}
      />

      <Nutrient
        title="Fat"
        unit1="g"
        unit2="%"
        name1="fatGram"
        name2="fatPercent"
        value1={fatGram}
        value2={fatPercent}
        handleNutrient={handleNutrient}
      />

      <div className="nutritional-values__subsection">
        <Nutrient
          title="Saturated fat"
          unit1="g"
          unit2="%"
          name1="saturatedFatGram"
          name2="saturatedFatPercent"
          value1={saturatedFatGram}
          value2={saturatedFatPercent}
          handleNutrient={handleNutrient}
        />

        <Nutrient
          title="Trans fat"
          unit1="g"
          unit2="%"
          name1="transFatGram"
          name2="transFatPercent"
          value1={transFatGram}
          value2={transFatPercent}
          handleNutrient={handleNutrient}
        />
      </div>

      <Nutrient
        title="Carbohydrates"
        unit1="g"
        unit2="%"
        name1="carbohydratesGram"
        name2="carbohydratesPercent"
        value1={carbohydratesGram}
        value2={carbohydratesPercent}
        handleNutrient={handleNutrient}
      />

      <div className="nutritional-values__subsection">
        <Nutrient
          title="Sugar"
          unit1="g"
          unit2="%"
          name1="sugarGram"
          name2="sugarPercent"
          value1={sugarGram}
          value2={sugarPercent}
          handleNutrient={handleNutrient}
        />
        <Nutrient
          title="Fiber"
          unit1="g"
          unit2="%"
          name1="fiberGram"
          name2="fiberPercent"
          value1={fiberGram}
          value2={fiberPercent}
          handleNutrient={handleNutrient}
        />
      </div>

      <Nutrient
        title="Protein"
        unit1="g"
        unit2="%"
        name1="proteinGram"
        name2="proteinPercent"
        value1={proteinGram}
        value2={proteinPercent}
        handleNutrient={handleNutrient}
      />

      <Nutrient
        title="Sodium"
        unit1="g"
        unit2="%"
        name1="sodiumGram"
        name2="sodiumPercent"
        value1={sodiumGram}
        value2={sodiumPercent}
        handleNutrient={handleNutrient}
      />
    </div>
  );
};

const mapStateToProps = ({ nutritionalReducer }) => {
  return {
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
    sodiumPercent: nutritionalReducer.sodiumPercent,
    validationErrors: nutritionalReducer.validationErrors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleNutrient: e => dispatch(actions.handleNutrient(e))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NutritionalValues);
