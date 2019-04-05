import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import * as DATA from '../../data/data';

import './styles.scss';
import IngredientsList from './components/IngredientsList/index';

const LabelPreview = ({ title, description, ingredients, traces }) => {
  return (
    <div className="label-preview">
      <h2>{title.toUpperCase()}</h2>

      <h3 className="label-preview__description">{description}</h3>

      <IngredientsList ingredients={ingredients} allergens={DATA.allergens} />

      <p className="label-preview__allergens">
        May contain traces of
        {traces.map((allergen, i) => {
          if (i === traces.length - 1) {
            return `and ${allergen}.`;
          } else if (i === traces.length - 2) {
            return ` ${allergen} `;
          } else {
            return ` ${allergen}, `;
          }
        })}
      </p>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    title: state.title,
    description: state.description,
    ingredients: state.ingredients,
    mostUsedIngredients: state.mostUsedIngredients,
    traces: state.traces
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: e => dispatch(actions.handleChange(e)),
    handleParts: (e, id, value) => dispatch(actions.handleParts(e, id, value)),
    showOnLabelPreview: part => dispatch(actions.showOnLabelPreview(part))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelPreview);
