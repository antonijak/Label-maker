import React, { Component } from 'react';
import IngredientsSelector from './components/IngredientsSelector.js';

import './App.scss';

class App extends Component {
  state = {
    parts: [1],
    title: '',
    ingredients: {}
  };
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'parts') {
      let newArr = [];
      for (let i = 0; i < value; i++) {
        newArr.push({ i });
      }
      this.setState({ parts: newArr });
    } else {
      this.setState({ [name]: value });
    }
  };

  addToLabel = (e, number, items) => {
    e.preventDefault();
    this.setState({
      ingredients: { ...this.state.ingredients, [number]: items }
    });
  };

  addParts = e => {
    e.preventDefault();
    const addOrRemove = e.target.value;
    const parts = [...this.state.parts];
    parts.length > 1 && parts.pop();

    addOrRemove === 'add'
      ? this.setState({ parts: [...this.state.parts, 1] })
      : this.setState({ parts: parts });
  };

  render() {
    let { parts, title } = this.state;
    return (
      <div className="App">
        <form className="label">
          <div className="label__heading">
            <h1 className="label__heading__h1">Label Maker</h1>

            <input
              name="title"
              type="text"
              id="label-title"
              value={title}
              onChange={this.handleChange}
              className="label__heading__title"
              placeholder="Label title"
            />

            <input
              name="description"
              type="text"
              id="description"
              className="label__heading__description"
              placeholder="Label description"
            />
          </div>

          <div className="label__parts">
            {parts &&
              parts.map((item, i) => (
                <IngredientsSelector
                  key={'item' + i}
                  parts={parts}
                  number={i}
                  handleChange={this.handleChange}
                  addToLabel={this.addToLabel}
                  addParts={this.addParts}
                  parts={parts}
                />
              ))}
          </div>
        </form>
      </div>
    );
  }
}

export default App;
