import React from 'react';

import './styles.scss';

const LabelIngredient = ({ allergens, ingredient, last, index }) => (
  <span
    className={
      allergens.includes(ingredient)
        ? 'label-ingredient__allergen'
        : 'label-ingredient__normal'
    }
  >
    {`${index === 0 ? ' ' : ''}${ingredient}${last ? '.' : ', '}`}
  </span>
);

export default LabelIngredient;
