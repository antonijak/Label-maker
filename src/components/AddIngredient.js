import React from 'react';
import Ingredient from './Ingredient';
import './AddIngredient.scss';

const AddIngredient = ({
  filteredIngredients,
  addIngredient,
  searchIngredients,
  hideAdd
}) => (
  <ul className="label__ingredients__picker__filtered" onBlur={hideAdd}>
    {filteredIngredients.length > 0 ? (
      filteredIngredients.map((item, i) => (
        <Ingredient
          key={'item' + i}
          text={item}
          addIngredient={addIngredient}
        />
      ))
    ) : (
      <input
        name="add-custom"
        onChange={searchIngredients}
        className="styled-input add-custom"
        id="add-custom"
        placeholder="Add custom ingredient"
      />
    )}
  </ul>
);

export default AddIngredient;
