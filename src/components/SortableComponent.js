import React, { Component } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import './SortableComponent.scss';

const SortableItem = SortableElement(({ value, removeIngredient }) => (
  <li className="added-ingredients__ingredient">
    <button
      onClick={e => {
        removeIngredient(e, value);
      }}
    >
      x
    </button>
    {value}
  </li>
));

const SortableList = SortableContainer(({ items, removeIngredient }) => {
  return (
    <ul className="ingredients-selector__added">
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
