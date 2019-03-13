import React, { Component } from 'react';
import Ingredient from './Ingredient';
import { arrayMove } from 'react-sortable-hoc';
import SortableComponent from './SortableComponent';

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
      'cranberry'
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
      <div
        style={{ border: '1px solid black', padding: '1rem', margin: '2rem' }}
      >
        <label htmlFor="title">
          Title
          <input
            value={title}
            name="title"
            id="title"
            onChange={this.handleChange}
          />
        </label>
        <h3>Ingredients:</h3>
        <input
          name="search"
          onChange={this.handleChange}
          placeholder="Search"
        />
        <div>
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
        <button onClick={e => addToLabel(e, number, addedIngredients)}>
          Finish
        </button>
      </div>
    );
  }
}

export default IngredientsSelector;
