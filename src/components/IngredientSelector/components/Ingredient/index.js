import React from 'react';

const Ingredient = ({ text, addIngredient, selected }) => (
  <li
    onMouseDown={() => addIngredient(text, null)}
    value={text}
    className={
      selected && selected === text
        ? 'label__ingredients__picker__filtered__item selected'
        : 'label__ingredients__picker__filtered__item'
    }
  >
    {text}
  </li>
);

export default Ingredient;
