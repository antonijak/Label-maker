import React, { Component } from 'react';
import IngredientsSelector from './components/IngredientsSelector.js';

import './App.scss';
import LabelPreview from './components/LabelPreview.js';

class App extends Component {
  state = {
    parts: [1],
    title: '',
    description: '',
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

  addToform = (e, number, items) => {
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
    let { parts, title, description } = this.state;
    return (
      <div className="App">
        <form className="form">
          <div className="form__heading">
            <h1 className="form__heading__h1">form Maker</h1>

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
            {parts &&
              parts.map((item, i) => (
                <IngredientsSelector
                  key={'item' + i}
                  parts={parts}
                  number={i}
                  handleChange={this.handleChange}
                  addToform={this.addToform}
                  addParts={this.addParts}
                  parts={parts}
                />
              ))}
          </div>
        </form>
        <LabelPreview title={title} description={description} />
      </div>
    );
  }
}

export default App;
