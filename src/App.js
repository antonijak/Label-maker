import React, { Component } from 'react';
import IngredientsSelector from './components/IngredientsSelector.js';
import AllergensContainer from './components/AllergensContainer.js';
import { connect } from 'react-redux';
import * as actions from './store/actions/actions';
// import uuid from 'uuid/v4';

import './App.scss';
import LabelPreview from './components/LabelPreview.js';

class App extends Component {
  render() {
    console.log(this.props.ingredients);
    return (
      <div className="App">
        <form className="form">
          <div className="form__heading">
            <h1 className="form__heading__h1">Label Maker</h1>

            <input
              name="title"
              type="text"
              id="form-title"
              value={this.props.title}
              onChange={this.props.handleChange}
              className="form__heading__title"
              placeholder="Main title"
            />

            <input
              name="description"
              type="text"
              id="description"
              className="form__heading__description"
              placeholder="Main description"
              value={this.props.description}
              onChange={this.props.handleChange}
            />
          </div>

          <div className="form__parts">
            {this.props.ingredients &&
              this.props.ingredients.map((part, i) => (
                <IngredientsSelector
                  key={part.id}
                  number={i}
                  handleChange={this.props.handleChange}
                  handleParts={this.props.handleParts}
                  showOnLabelPreview={this.props.showOnLabelPreview}
                  part={part}
                />
              ))}
          </div>
          <AllergensContainer />
        </form>
        <LabelPreview
          allAllergens={this.props.allAllergens}
          title={this.props.title}
          description={this.props.description}
          ingredients={this.props.ingredients}
          mayContain={this.props.mayContain}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    title: state.title,
    description: state.description,
    ingredients: state.ingredients,
    mostUsedIngredients: state.mostUsedIngredients,
    allAllergens: state.allAllergens,
    mayContain: state.mayContain
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: e => dispatch(actions.handleChange(e)),
    handleParts: (e, id, value) => dispatch(actions.handleParts(e, id, value)),
    showOnLabelPreview: part => dispatch(actions.showOnLabelPreview(part))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
