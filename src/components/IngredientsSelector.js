import React, { Component } from 'react';

class IngredientsSelector extends Component {
  state = {
    title: '',
    search: '',
    defaultIngredients: ['chocolate', 'cocoa powder', 'sugar'],
    filteredIngredients: ['chocolate', 'cocoa powder', 'sugar']
  };
  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({ [name]: value });
    if (name === 'search') {
      this.filterIngredients();
    }
  };

  filterIngredients = () => {
    const filtered = this.state.defaultIngredients.filter(item =>
      item.includes(this.state.search)
    );
    this.setState({ filteredIngredients: filtered });
  };
  render() {
    let { parts, number, handleChange } = this.props;
    let { title, defaultIngredients, filteredIngredients, search } = this.state;
    return (
      <div style={{ border: '1px solid black' }}>
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
          value={search}
          name="search"
          onChange={this.handleChange}
          placeholder="Search"
        />
        <div>
          {filteredIngredients.map(item => (
            <span>{item}</span>
          ))}
        </div>
      </div>
    );
  }
}

export default IngredientsSelector;
