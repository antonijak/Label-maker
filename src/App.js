import React, { Component } from 'react';
import IngredientsSelector from './components/IngredientsSelector.js';
import './App.scss';

class App extends Component {
  state = {
    parts: [],
    title: ''
  };
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'parts') {
      let newArr = [];
      for (let i = 0; i < value; i++) {
        newArr.push({});
      }
      this.setState({ parts: newArr });
    } else if (name.startsWith('ingredients')) {
      let index = name.slice(-1);
      this.setState({
        parts: [
          ...this.state.parts,
          (this.state.parts.index = { ingredients: value })
        ]
      });
    }
  };
  render() {
    let { parts, title } = this.state;
    return (
      <div className="App">
        <h1>Label Maker</h1>
        <form>
          <label htmlFor="label-title">
            Title
            <input
              name="title"
              id="label-title"
              value={title}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="description">
            Description
            <input name="title" id="description" />
          </label>
          <select
            name="parts"
            value={parts.length}
            onChange={e => this.handleChange(e)}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
          {parts &&
            parts.map((item, i) => (
              <IngredientsSelector parts={parts} number={i} />
            ))}
        </form>
      </div>
    );
  }
}

export default App;
