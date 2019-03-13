import React from 'react';

const Ingredient = ({ text, action, removable }) => (
  <li draggable="true">
    {removable ? (
      <span>
        {text}
        <button onClick={action} value={text}>
          x
        </button>
      </span>
    ) : (
      <button onClick={action} value={text}>
        {text}
      </button>
    )}
  </li>
);

export default Ingredient;
