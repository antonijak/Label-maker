import React from 'react';

import './Nutrient.scss';

const Nutrient = ({
  name1,
  name2,
  value1,
  value2,
  title,
  unit1,
  unit2,
  handleNutrient
}) => {
  return (
    <div className="nutrient">
      <h5 className="nutrient__title">{title}</h5>

      <div className="nutrient__inputs">
        <label className="nutrient__inputs__label">
          <input
            type="number"
            value={value1}
            name={name1}
            onChange={handleNutrient}
          />
          <p className="nutrient__inputs__label__unit">{unit1}</p>
        </label>

        <label className="nutrient__inputs__label">
          <input
            type="number"
            name={name2}
            value={value2}
            onChange={handleNutrient}
          />
          <p className="nutrient__inputs__label__unit">{unit2}</p>
        </label>
      </div>
    </div>
  );
};

export default Nutrient;
