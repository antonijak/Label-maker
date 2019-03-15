import React, { Component } from 'react';
import Ingredient from './Ingredient';
import './IngredientsSelector.scss';

const AddCustom = ({
  filteredIngredients,
  addIngredient,
  searchIngredients
}) => (
  <div>
    <p>No results</p>
    <label htmlFor="add-custom" className="styled-label " id="add-custom-label">
      <p>Add custom</p>
      <input
        name="add-custom"
        onChange={searchIngredients}
        className="styled-input"
        id="add-custom"
      />
    </label>
  </div>
);

export default AddCustom;
