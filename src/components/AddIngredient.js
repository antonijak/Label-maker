import React, { Component } from 'react';
import Ingredient from './Ingredient';
import './IngredientsSelector.scss';
import AddCustom from './AddCustom';

const AddIngredient = ({ filteredIngredients, addIngredient }) => (
  <ul className="label__ingredients__picker__filtered">
    {filteredIngredients.length > 0 ? (
      filteredIngredients.map((item, i) => (
        <Ingredient key={'item' + i} text={item} action={addIngredient} />
      ))
    ) : (
      <AddCustom />
    )}
  </ul>
);

export default AddIngredient;
