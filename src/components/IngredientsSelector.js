import React, { Component } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import SortableComponent from './SortableComponent';
import AddIngredient from './AddIngredient';
import './IngredientsSelector.scss';

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
      'cranberry',
      'apple',
      'banana',
      'wallnuts',
      'hazelnuts',
      'almonds',
      'honey',
      'soy-lecithin',
      'brasilian nut',
      'cashew',
      'rasins',
      'peach',
      'apricot',
      'black-currant',
      'red-currant',
      'blueberry',
      'blackberry',
      'raspberry',
      'elderberry',
      'pineapple',
      'caramel',
      'crockant',
      'nougat',
      'brandy',
      'whiskey',
      'cherry liquer',
      'peach liquer',
      'E100',
      'E200',
      'E300',
      'E400',
      'E500',
      'acidity-regulator: citric acid',
      'whey',
      'sunflower oil',
      'melases',
      'pistachios',
      'eggwhite'
    ],
    filteredIngredients: [],
    addedIngredients: ['cocoa butter', 'cocoa powder', 'sugar'],
    add: false,
    search: ''
  };

  componentDidMount = () => {
    this.setState({
      title: this.props.title,
      addedIngredients: this.props.addedIngredients
    });

    this.props.showOnLabelPreview(
      null,
      this.props.id,
      this.props.title,
      this.props.addedIngredients
    );
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

  hideAdd = () => {
    this.setState({ add: false, search: '' });
  };

  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    e.preventDefault();

    if (name === 'search') {
      const filtered =
        value === ''
          ? []
          : this.state.defaultIngredients
              .filter(item => item.startsWith(value))
              .filter(item => !this.state.addedIngredients.includes(item));
      this.setState({
        search: value,
        add: true,
        filteredIngredients: filtered
      });
    } else if (name === 'title') {
      this.props.showOnLabelPreview(
        e,
        this.props.id,
        [value],
        this.state.addedIngredients
      );
    }
    this.setState({ [name]: value });
  };

  addIngredient = ingredient => {
    const reducedFilteredIngredients = this.state.filteredIngredients.filter(
      item => item !== ingredient
    );
    this.setState({
      addedIngredients: [...this.state.addedIngredients, ingredient],
      filteredIngredients: reducedFilteredIngredients,
      add: false,
      search: ''
    });

    this.props.showOnLabelPreview(null, this.props.id, this.state.title, [
      ...this.state.addedIngredients,
      ingredient
    ]);
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

    this.props.showOnLabelPreview(
      e,
      this.props.id,
      this.state.title,
      reducedAddedIngredients
    );
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ addedIngredients }) => ({
      addedIngredients: arrayMove(addedIngredients, oldIndex, newIndex)
    }));
  };

  render() {
    let {
      number,
      addToLabel,
      handleParts,
      showOnLabelPreview,
      id,
      ingredients,
      key
    } = this.props;
    let { title, addedIngredients, add } = this.state;

    return (
      <div className="ingredients-selector" onClick={this.hideAdd}>
        <h1>{key}</h1>
        <input
          value={title}
          name="title"
          id="title"
          onChange={this.handleChange}
          className="ingredients-selector__title"
          placeholder="Ingredient title"
        />

        <div className="ingredients-selector__picker">
          <input
            name="search"
            onChange={this.handleChange}
            onFocus={this.handleChange}
            placeholder="Search"
            className="ingredients-selector__picker__search"
            id="search"
            value={this.state.search}
            autoComplete="off"
          />
          {add && (
            <AddIngredient
              filteredIngredients={this.state.filteredIngredients}
              addIngredient={this.addIngredient}
              searchIngredients={this.searchIngredients}
              hideAdd={this.hideAdd}
            />
          )}

          <SortableComponent
            items={this.state.addedIngredients}
            removeIngredient={this.removeIngredient}
            onSortEnd={this.onSortEnd}
          />
        </div>

        <button
          name="add"
          onClick={e =>
            this.props.showOnLabelPreview(
              e,
              id,
              this.state.title,
              this.state.addedIngredients
            )
          }
        >
          Finish
        </button>
        <div className="ingredients-selector__button">
          <span className="ingredients-selector__button__add">
            <button onClick={e => handleParts(e, id, 'add')}>+</button>
          </span>
          {ingredients.length > 1 && (
            <span className="ingredients-selector__button__remove">
              <button onClick={e => handleParts(e, id, 'remove')}>-</button>
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default IngredientsSelector;
