import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from 'react-sortable-hoc';

const SortableItem = SortableElement(({ value, deletex }) => (
  <li>
    {value}
    <button
      onClick={e => {
        e.preventDefault();
        deletex(value);
      }}
    >
      x
    </button>
  </li>
));

const SortableList = SortableContainer(({ items, deletex }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          value={value}
          deletex={deletex}
        />
      ))}
    </ul>
  );
});

class SortableComponent extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex)
    }));
  };

  deletex = itemx => {
    const newItems = this.state.items.filter(item => item !== itemx);
    this.setState({ items: newItems });
  };
  render() {
    console.log(this.state.items);

    return (
      <SortableList
        items={this.state.items}
        onSortEnd={this.onSortEnd}
        deletex={this.deletex}
      />
    );
  }
}

export default SortableComponent;
