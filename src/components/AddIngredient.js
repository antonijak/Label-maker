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
      <input
        name="add-custom"
        onMouseDown={e => console.log(e.target.name)}
        onChange={() => {}}
        className="styled-input add-custom"
        id="add-custom"
        placeholder="Add custom ingredient"
        value={custom}
      />
    )}
  </ul>
);

export default AddIngredient;
