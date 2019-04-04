import React from 'react';

import './styles.scss';

const LabelIngredient = ({ allAllergens, ingredient, last, index }) => (
  <span
    className={
      allAllergens.includes(ingredient)
        ? 'label-ingredient__allergen'
        : 'label-ingredient__normal'
    }
  >
    {`${index === 0 ? ' ' : ''}${ingredient}${last ? '.' : ', '}`}
  </span>
);

export default LabelIngredient;
