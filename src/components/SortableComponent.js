import React, { Component } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import './SortableComponent.scss';

const SortableItem = SortableElement(({ value, removeIngredient, axis }) => (
  <li
    className="label__ingredients__picker__added__list__ingredient"
    axis={axis}
  >
    <p>{value}</p>
    <button
      onClick={e => {
        removeIngredient(e, value);
      }}
      className="label__ingredients__picker__added__list__ingredient__remove"
    />
  </li>
));

const SortableList = SortableContainer(({ items, removeIngredient }) => {
  return (
    <div className="label__ingredients__picker__added">
      <h5 className="label__ingredients__picker__added__title">
        CHOSEN INGREDIENTS
      </h5>

      <ul className="label__ingredients__picker__added__list">
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
    </div>
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
