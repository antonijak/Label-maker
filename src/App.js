import React, { Component } from 'react';
import IngredientsSelector from './components/IngredientsSelector.js';
import AllergensContainer from './components/AllergensContainer.js';
import { connect } from 'react-redux';
import * as actions from './store/actions/actions';
// import uuid from 'uuid/v4';

import './App.scss';
import LabelPreview from './components/LabelPreview.js';

class App extends Component {
  // state = {
  //   title: '',
  //   description: '',
  //   ingredients: [{ id: '01', title: '', addedIngredients: [] }],
  //   mostUsedIngredients: [
  //     'cocoa powder',
  //     'cocoa butter',
  //     'milk powder',
  //     'sugar'
  //   ],
  //   allAllergens: ['eggs', 'milk', 'milk powder', 'peanuts', 'hazelnuts'],
  //   mayContain: ['nuts', 'milk', 'eggs']
  // };

  // handleChange = e => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   this.props.setState({ [name]: value });
  // };

  // showOnLabelPreview = (e, id, title, addedIngredients) => {
  //   e && e.preventDefault();
  //   this.props.setState({
  //     ingredients: [...this.props.ingredients].map(item =>
  //       item.id === id ? { id, title, addedIngredients } : item
  //     )
  //   });
  // };

  // handleParts = (e, id, value) => {
  //   e.preventDefault();
  //   value === 'add'
  //     ? this.props.setState({
  //         ingredients: [
  //           ...this.props.ingredients,
  //           { id: uuid(), title: '', addedIngredients: [] }
  //         ]
  //       })
  //     : this.props.setState({
  //         ingredients: [...this.props.ingredients].filter(
  //           item => item.id !== id
  //         )
  //       });
  // };

  render() {
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
              this.props.ingredients.map((item, i) => (
                <IngredientsSelector
                  key={item.id}
                  ingredients={this.props.ingredients}
                  number={i}
                  id={item.id}
                  handleChange={this.props.handleChange}
                  handleParts={this.props.handleParts}
                  addedIngredients={
                    item.addedIngredients.length === 0
                      ? this.props.mostUsedIngredients
                      : item.addedIngredients
                  }
                  showOnLabelPreview={this.props.showOnLabelPreview}
                  title={item.title}
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
    showOnLabelPreview: (e, id, title, addedIngredients) =>
      dispatch(actions.showOnLabelPreview(e, id, title, addedIngredients))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
