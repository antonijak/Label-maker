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
  render() {
    let { parts, title } = this.state;
    return (
      <div className="App">
        <h1 className="main-title">Label Maker</h1>
        <form className="label">
          <div className="label__heading">
            <input
              name="title"
              type="text"
              id="label-title"
              value={title}
              onChange={this.handleChange}
              className="styled-input"
              placeholder="Label title"
            />

            <input
              name="description"
              type="text"
              id="description"
              className="styled-input"
              placeholder="Label description"
            />

            <select
              name="parts"
              value={parts.length}
              onChange={e => this.handleChange(e)}
              placeholder="Parts"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
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
                />
              ))}
          </div>
        </form>
      </div>
    );
  }
}

export default App;
