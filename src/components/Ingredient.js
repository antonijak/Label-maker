import React from 'react';

const Ingredient = ({ text, addIngredient }) => (
  <li
    onMouseDown={() => addIngredient(text)}
    value={text}
    className="label__ingredients__picker__filtered__item"
  >
    {text}
  </li>
);

export default Ingredient;
