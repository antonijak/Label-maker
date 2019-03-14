import React, { Component } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import './SortableComponent.scss';

const SortableItem = SortableElement(({ value, removeIngredient, axis }) => (
  <li className="label__ingredients__picker__added__ingredient" axis={axis}>
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

const SortableList = SortableContainer(({ items, removeIngredient, axis }) => {
  return (
    <ul className="label__ingredients__picker__added">
      {items.map((value, index) => (
        <SortableItem
          axis="xy"
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
      axis="xy"
    />
  );
};

export default SortableComponent;
