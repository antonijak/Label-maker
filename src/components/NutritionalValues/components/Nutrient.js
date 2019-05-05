import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/actions';

import './Nutrient.scss';

const Nutrient = ({
  name1,
  name2,
  value1,
  value2,
  title,
  unit1,
  unit2,
  validationErrors,
  handleNutrient,
  validateNutrient
}) => {
  return (
    <div className="nutrient">
      <h5 className="nutrient__title">{title}</h5>

      <div className="nutrient__inputs">
        <label className="nutrient__inputs__label">
          <small className="nutrient__inputs__label__message name1">
            {validationErrors[name1]}
          </small>
          <input
            type="number"
            value={value1}
            name={name1}
            onChange={handleNutrient}
            className="nutrient__inputs__label__input"
          />
          <p className="nutrient__inputs__label__unit">{unit1}</p>
        </label>

        <label className="nutrient__inputs__label">
          <small className="nutrient__inputs__label__message name2">
            {validationErrors[name2]}
          </small>
          <input
            type="number"
            name={name2}
            value={value2}
            onChange={handleNutrient}
            className="nutrient__inputs__label__input"
          />
          <p className="nutrient__inputs__label__unit">{unit2}</p>
        </label>
      </div>
    </div>
  );
};

const mapStateToProps = ({ nutritionalReducer }) => {
  return {
    validationErrors: nutritionalReducer.validationErrors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleNutrient: e => dispatch(actions.handleNutrient(e)),
    validateNutrient: e => dispatch(actions.validateNutrient(e))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nutrient);
