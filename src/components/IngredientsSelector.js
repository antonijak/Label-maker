import React from 'react';

const IngredientsSelector = ({ parts, number, handleChange }) => {
  return (
    <div>
      <input
        value={parts[number].ingredients}
        name={`ingredients${number}`}
        onChange={handleChange}
      />
    </div>
  );
};

export default IngredientsSelector;
