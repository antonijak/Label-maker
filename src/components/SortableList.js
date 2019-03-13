import React from 'react';
import Ingredient from './Ingredient';
import { SortableContainer } from 'react-sortable-hoc';
import SortableIngredient from './SortableIngredient';

const SortableList = SortableContainer(({ items, removeIngredient }) => {
  return (
    <ul
      style={{
        border: '1px solid lightgray',
        padding: '1rem',
        margin: '2rem'
      }}
    >
      {items.map(item => (
        <SortableIngredient text={item} action={removeIngredient} />
      ))}
    </ul>
  );
});

export default SortableList;
