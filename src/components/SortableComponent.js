import React, { Component } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement(({ value, removeIngredient }) => (
  <li>
    {value}
    <button
      onClick={e => {
        removeIngredient(e, value);
      }}
    >
      x
    </button>
  </li>
));

const SortableList = SortableContainer(({ items, removeIngredient }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          value={value}
          removeIngredient={removeIngredient}
        />
      ))}
    </ul>
  );
});

const SortableComponent = ({ items, onSortEnd, removeIngredient }) => {
  return (
    <SortableList
      items={items}
      onSortEnd={onSortEnd}
      removeIngredient={removeIngredient}
    />
  );
};

export default SortableComponent;
