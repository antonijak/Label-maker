import React from 'react';
import Ingredient from './Ingredient';
import './AddIngredient.scss';

const AddIngredient = ({
  filteredIngredients,
  addIngredient,
  custom,
  handleChange,
  closeDropdown,
  addedIngredients
}) => (
  <ul className="label__ingredients__picker__filtered">
    {filteredIngredients.length > 0 ? (
      filteredIngredients.map((item, i) => (
        <Ingredient
          key={'item' + i}
          text={item}
          addIngredient={addIngredient}
          name="ingredient"
        />
      ))
    ) : (
      <li
        className="label__ingredients__picker__filtered__item"
        placeholder="Add custom"
        name="custom"
        value={custom}
        onChange={handleChange}
      >
        {addedIngredients.some(item => item === custom) ? (
          'No result'
        ) : (
          <div className="label__ingredients__picker__filtered__item__addable">
            <button
              onClick={() => addIngredient(custom)}
              className="label__ingredients__picker__filtered__item__addable__add"
            >
              Add missing ingredient
            </button>
            <button
              className="label__ingredients__picker__filtered__item__addable__remove"
              onClick={closeDropdown}
            />
          </div>
        )}
      </li>
    )}
  </ul>
);

export default AddIngredient;
