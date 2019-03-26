import React from 'react';
import Ingredient from './Ingredient';
import AddCustom from './AddCustom';
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
        <div>
          {filteredIngredients.map((item, i) => (
            <Ingredient
              key={'item' + i}
              text={item}
              addIngredient={addIngredient}
              name="ingredient"
            />
          ))}
          {search && (
            <AddCustom
              addIngredient={addIngredient}
              search={search}
              closeDropdown={closeDropdown}
              addedIngredients={addedIngredients}
              clsName="many"
            />
          )}
        </div>
      ) : (
        <li
          className="label__ingredients__picker__filtered__item"
          placeholder="Add search"
          name="search"
          value={search}
          onChange={handleChange}
        >
          <AddCustom
            addIngredient={addIngredient}
            search={search}
            closeDropdown={closeDropdown}
            addedIngredients={addedIngredients}
            clsName="one"
          />
        </li>
      )}
    </ul>
  );
};

export default AddIngredient;
