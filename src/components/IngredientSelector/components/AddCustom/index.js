import React from 'react';
import './styles.scss';

const AddIngredient = ({
  addIngredient,
  search,
  closeDropdown,
  addedIngredients,
  clsName
}) => (
  <div className={`custom ${clsName}`}>
    {addedIngredients.some(item => item === search) ? (
      clsName === 'one' && (
        <span className="custom__non-addable">
          Ingredient already on your label
        </span>
      )
    ) : (
      <div className="custom__addable">
        <button
          onMouseDown={() => {
            search && addIngredient(search);
          }}
          className="custom__addable__add"
        >
          Add missing ingredient
        </button>
        <button
          className="custom__addable__remove"
          onMouseDown={closeDropdown}
        />
      </div>
    )}
  </div>
);

export default AddIngredient;
