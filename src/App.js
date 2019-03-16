import React, { Component } from 'react';
import IngredientsSelector from './components/IngredientsSelector.js';
import uuid from 'uuid/v4';

import './App.scss';
import LabelPreview from './components/LabelPreview.js';

class App extends Component {
  state = {
    title: '',
    description: '',
    ingredients: [{ id: '01', title: '', addedIngredients: [] }],
    mostUsedIngredients: ['cocoa powder', 'cocoa butter', 'sugar']
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  showOnLabelPreview = (e, id, title, addedIngredients) => {
    e && e.preventDefault();
    this.setState({
      ingredients: [...this.state.ingredients].map(item =>
        item.id === id ? { id, title, addedIngredients } : item
      )
    });
  };

  handleParts = (e, id, value) => {
    e.preventDefault();
    value === 'add'
      ? this.setState({
          ingredients: [
            ...this.state.ingredients,
            { id: uuid(), title: '', addedIngredients: [] }
          ]
        })
      : this.setState({
          ingredients: [...this.state.ingredients].filter(
            item => item.id !== id
          )
        });
  };

  render() {
    let { title, description, ingredients } = this.state;
    return (
      <div className="App">
        <form className="form">
          <div className="form__heading">
            <h1 className="form__heading__h1">Label Maker</h1>

            <input
              name="title"
              type="text"
              id="form-title"
              value={title}
              onChange={this.handleChange}
              className="form__heading__title"
              placeholder="form title"
            />

            <input
              name="description"
              type="text"
              id="description"
              className="form__heading__description"
              placeholder="form description"
              value={description}
              onChange={this.handleChange}
            />
          </div>

          <div className="form__parts">
            {ingredients.map((item, i) => (
              <IngredientsSelector
                key={item.id}
                ingredients={this.state.ingredients}
                number={i}
                id={item.id}
                handleChange={this.handleChange}
                addToform={this.addToform}
                handleParts={this.handleParts}
                addedIngredients={
                  item.addedIngredients.length === 0
                    ? this.state.mostUsedIngredients
                    : item.addedIngredients
                }
                showOnLabelPreview={this.showOnLabelPreview}
                title={item.title || 'Ingredients'}
              />
            ))}
          </div>
        </form>
        <LabelPreview
          title={this.state.title}
          description={this.state.description}
          ingredients={this.state.ingredients}
        />
      </div>
    );
  }
}

export default App;
