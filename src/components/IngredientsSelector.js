import React, { Component } from 'react';
import Ingredient from './Ingredient';

class IngredientsSelector extends Component {
  state = {
    title: '',
    search: '',
    defaultIngredients: ['chocolate', 'cocoa powder', 'sugar'],
    filteredIngredients: ['chocolate', 'cocoa powder', 'sugar'],
    addedIngredients: []
  };

  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === 'search') {
      const filtered = this.state.defaultIngredients.filter(item =>
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

  removeIngredient = e => {
    e.preventDefault();
    const ingredient = e.target.value;
    const reducedAddedIngredients = this.state.addedIngredients.filter(
      item => item !== ingredient
    );
    this.setState({
      addedIngredients: reducedAddedIngredients,
      filteredIngredients: [...this.state.filteredIngredients, ingredient]
    });
  };

  render() {
    let { parts, number, handleChange } = this.props;
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
            filteredIngredients.map(item => (
              <Ingredient text={item} action={this.addIngredient} />
            ))
          ) : (
            <span>No results</span>
          )}
        </div>
        <div
          style={{
            border: '1px solid lightgray',
            padding: '1rem',
            margin: '2rem'
          }}
        >
          {addedIngredients.map(item => (
            <Ingredient
              removable={true}
              text={item}
              action={this.removeIngredient}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default IngredientsSelector;
