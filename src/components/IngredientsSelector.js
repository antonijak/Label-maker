import React, { Component } from 'react';
import Ingredient from './Ingredient';
import { arrayMove } from 'react-sortable-hoc';
import SortableComponent from './SortableComponent';
import AddIngredient from './AddIngredient';
import './IngredientsSelector.scss';

class IngredientsSelector extends Component {
  state = {
    title: '',
    search: '',
    defaultIngredients: [
      'cocoa butter',
      'cocoa powder',
      'sugar',
      'cocoa liquor',
      'palm oil',
      'invert sugar',
      'milk',
      'cream',
      'butter',
      'peanuts',
      'strawberry',
      'cranberry',
      'apple',
      'banana',
      'wallnuts',
      'hazelnuts',
      'almonds',
      'honey',
      'soy-lecithin',
      'brasilian nut',
      'cashew',
      'rasins',
      'peach',
      'apricot',
      'black-currant',
      'red-currant',
      'blueberry',
      'blackberry',
      'raspberry',
      'elderberry',
      'pineapple',
      'caramel',
      'crockant',
      'nougat',
      'brandy',
      'whiskey',
      'cherry liquer',
      'peach liquer',
      'E100',
      'E200',
      'E300',
      'E400',
      'E500',
      'acidity-regulator: citric acid',
      'whey',
      'sunflower oil',
      'melases',
      'pistachios',
      'eggwhite'
    ],
    filteredIngredients: [],
    addedIngredients: [],
    mostUsedIngredients: ['cocoa powder', 'cocoa butter', 'sugar'],
    add: false,
    search: ''
  };
  componentDidMount = () => {
    this.setState({ filteredIngredients: this.state.mostUsedIngredients });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ addedIngredients }) => ({
      addedIngredients: arrayMove(
        this.state.addedIngredients,
        oldIndex,
        newIndex
      )
    }));
  };

  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    e.preventDefault();

    if (name === 'search') {
      const filtered =
        value === ''
          ? this.state.mostUsedIngredients.filter(
              item => !this.state.addedIngredients.includes(item)
            )
          : this.state.defaultIngredients
              .filter(item => item.startsWith(value))
              .filter(item => !this.state.addedIngredients.includes(item));
      this.setState({
        search: value,
        add: true,
        filteredIngredients: filtered
      });
    }
    this.setState({ [name]: value });
  };

  addIngredient = ingredient => {
    // e.preventDefault();
    // const ingredient = e.target.value;
    const reducedFilteredIngredients = this.state.filteredIngredients.filter(
      item => item !== ingredient
    );
    this.setState({
      addedIngredients: [...this.state.addedIngredients, ingredient],
      filteredIngredients: reducedFilteredIngredients
    });
  };

  removeIngredient = (e, ingredient) => {
    e.preventDefault();
    const reducedAddedIngredients = this.state.addedIngredients.filter(
      item => item !== ingredient
    );
    this.setState({
      addedIngredients: reducedAddedIngredients,
      filteredIngredients: [...this.state.filteredIngredients, ingredient]
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ addedIngredients }) => ({
      addedIngredients: arrayMove(addedIngredients, oldIndex, newIndex)
    }));
  };

  render() {
    let { number, addToLabel } = this.props;
    let { title, addedIngredients, add } = this.state;

    return (
      <div className="label__ingredients">
        <input
          value={title}
          name="title"
          id="title"
          onChange={this.handleChange}
          className="styled-input"
          placeholder="Ingredient title"
        />

        <div className="label__ingredients__picker">
          <input
            name="search"
            onChange={this.handleChange}
            onFocus={this.handleChange}
            placeholder="Search"
            className="label__ingredients__picker__search"
            id="search"
            value={this.state.search}
            autoComplete="off"
          />
          {add && (
            <AddIngredient
              filteredIngredients={this.state.filteredIngredients}
              addIngredient={this.addIngredient}
              searchIngredients={this.searchIngredients}
            />
          )}

          <SortableComponent
            items={this.state.addedIngredients}
            removeIngredient={this.removeIngredient}
            onSortEnd={this.onSortEnd}
          />
        </div>
        <button
          name="add"
          onClick={e => addToLabel(e, number, addedIngredients)}
        >
          Finish
        </button>
      </div>
    );
  }
}

export default IngredientsSelector;
