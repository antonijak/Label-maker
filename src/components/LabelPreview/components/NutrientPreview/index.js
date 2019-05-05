import React from 'react';
import './styles.scss';

const NutrientPreview = ({ title, value1, value2, unit1, unit2 }) => (
  <div className="nutrient-preview">
    <h5>{title}:</h5>

    <div className="nutrient-preview__weight">
      {value1 && (
        <>
          <span className="nutrient-preview__weight__unit">{value1}</span>
          <span>{unit1}</span>
        </>
      )}
    </div>

    <div className="nutrient-preview__percentage">
      {value2 && (
        <>
          <span className="nutrient-preview__percentage__unit">{value2}</span>
          <span>{unit2}</span>
        </>
      )}
    </div>
  </div>
);

export default NutrientPreview;
