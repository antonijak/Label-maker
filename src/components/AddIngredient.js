import React, { Component } from 'react';
import Ingredient from './Ingredient';
import { arrayMove } from 'react-sortable-hoc';
import SortableComponent from './SortableComponent';
import './IngredientsSelector.scss';

const AddIngredient = ({
  filteredIngredients,
  addIngredient,
  searchIngredients
}) => {
  return (
    <div className="label__ingredients">
      <div className="label__ingredients__search">
        <label htmlFor="search">
          <input
            name="search"
            onChange={searchIngredients}
            placeholder="Search"
            className="styled-input"
            id="search"
          />
        </label>
        <label
          htmlFor="add-custom"
          className="styled-label "
          id="add-custom-label"
        >
          <p>Add custom</p>
          <input
            name="add-custom"
            onChange={searchIngredients}
            className="styled-input"
            id="add-custom"
          />
        </label>
      </div>

      <div className="label__ingredients__picker">
        <ul className="label__ingredients__picker__filtered">
          {filteredIngredients.length > 0 ? (
            filteredIngredients.map((item, i) => (
              <Ingredient key={'item' + i} text={item} action={addIngredient} />
            ))
          ) : (
            <span>No results</span>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AddIngredient;
