import React, { Component } from 'react';
import Ingredient from './Ingredient';
import { arrayMove } from 'react-sortable-hoc';
import SortableComponent from './SortableComponent';
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
      'E300'
    ],
    filteredIngredients: [],
    addedIngredients: []
  };
  componentDidMount = () => {
    this.setState({ filteredIngredients: this.state.defaultIngredients });
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

    if (name === 'search') {
      const filtered = this.state.filteredIngredients.filter(item =>
        item.startsWith(value)
      );
      this.setState({ filteredIngredients: filtered });
    }
    this.setState({ [name]: value });
  };

  addIngredient = e => {
    e.preventDefault();
    const ingredient = e.target.value;
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
    let { title, filteredIngredients, addedIngredients } = this.state;

    return (
      <div className="label__ingredients">
        <label
          htmlFor="title"
          className="label__ingredients__title styled-label"
        >
          Ingredient title
          <input
            value={title}
            name="title"
            id="title"
            onChange={this.handleChange}
            className="styled-input"
          />
        </label>

        <div className="label__ingredients__search ">
          <label htmlFor="title">
            <input
              name="search"
              onChange={this.handleChange}
              placeholder="Search"
              className="styled-input"
            />
          </label>
          <label htmlFor="title" className="label__ingredients__search ">
            <input
              name="search"
              onChange={this.handleChange}
              placeholder="Search"
              className="styled-input"
            />
          </label>
        </div>

        <div className="label__ingredients__picker">
          <div className="label__ingredients__picker__filtered">
            {filteredIngredients.length > 0 ? (
              filteredIngredients.map((item, i) => (
                <Ingredient
                  key={'item' + i}
                  text={item}
                  action={this.addIngredient}
                />
              ))
            ) : (
              <span>No results</span>
            )}
          </div>

          <SortableComponent
            items={this.state.addedIngredients}
            removeIngredient={this.removeIngredient}
            onSortEnd={this.onSortEnd}
          />
        </div>
        <button onClick={e => addToLabel(e, number, addedIngredients)}>
          Finish
        </button>
      </div>
    );
  }
}

export default IngredientsSelector;
