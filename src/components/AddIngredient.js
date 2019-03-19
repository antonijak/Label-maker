import React from 'react';
import Ingredient from './Ingredient';
import './AddIngredient.scss';

const AddIngredient = ({
  filteredIngredients,
  addIngredient,
  searchIngredients,
  custom
}) => (
  <ul className="label__ingredients__picker__filtered">
    {filteredIngredients.length > 0 ? (
      filteredIngredients.map((item, i) => (
        <Ingredient
          key={'item' + i}
          text={item}
          addIngredient={addIngredient}
        />
      ))
    ) : (
      <li className="label__ingredients__picker__filtered__item">No results</li>
    )}
  </ul>
);

export default AddIngredient;
