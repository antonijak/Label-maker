import React from 'react';
import Ingredient from './Ingredient';
import './AddIngredient.scss';

const AddIngredient = ({
  filteredIngredients,
  addIngredient,
  search,
  handleChange,
  closeDropdown,
  addedIngredients
}) => {
  const clsName =
    search || filteredIngredients.length > 0
      ? 'label__ingredients__picker__filtered'
      : 'label__ingredients__picker__filtered--hidden';
  return (
    <ul className={clsName}>
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
          placeholder="Add search"
          name="search"
          value={search}
          onChange={handleChange}
        >
          {addedIngredients.some(item => item === search) ? (
            <span className="label__ingredients__picker__filtered__item__non-addable">
              Ingredient already on your label
            </span>
          ) : (
            <div className="label__ingredients__picker__filtered__item__addable">
              <button
                onClick={() => addIngredient(search)}
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
};

export default AddIngredient;
