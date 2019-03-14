import React from 'react';

const Ingredient = ({ text, action, removable }) => (
  <span draggable="true">
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
  </span>
);

export default Ingredient;
