import React from 'react';
import Ingredient from '../Ingredient/index.js';
import AddCustom from '../AddCustom/index';
import './styles.scss';

const AddDropdown = ({
  filteredIngredients,
  addIngredient,
  search,
  closeDropdown,
  addedIngredients,
  selected
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
              selected={selected}
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
          name="search"
          value={search}
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

export default AddDropdown;
