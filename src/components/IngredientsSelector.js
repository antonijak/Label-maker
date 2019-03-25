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
    filteredIngredients: ['soy-lecithin', 'brasilian nut', 'cashew', 'rasins'],
    addedIngredients: ['cocoa butter', 'cocoa powder', 'sugar'],
    add: false,
    initialMostUsed: ['soy-lecithin', 'brasilian nut', 'cashew', 'rasins'],
    mostUsedIngredients: []
  };

  componentDidMount = () => {
    this.setState({
      title: this.props.title,
      addedIngredients: this.props.addedIngredients,
      mostUsedIngredients: this.state.initialMostUsed
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

  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    e.preventDefault();
    if (name === 'search') {
      const filtered = value ? this.state.defaultIngredients
        .filter(item => item.startsWith(value))
        .filter(item => !this.state.addedIngredients.includes(item)) :
        this.state.mostUsedIngredients

      let search = filtered.length > 0 ? this.state.search : value;
      this.setState({
        search: value,
        add: true,
        filteredIngredients: filtered,
        search
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
    const reducedFilteredIngredients = [
      ...this.state.filteredIngredients
    ].filter(item => item !== ingredient);

    let filteredIngredients =
      reducedFilteredIngredients > 0
        ? reducedFilteredIngredients
        : this.state.mostUsedIngredients;

    this.setState({
      addedIngredients: [...this.state.addedIngredients, ingredient],
      filteredIngredients,
      add: false,
      search: '',
      mostUsedIngredients: [...this.state.mostUsedIngredients].filter(
        item => ![...this.state.addedIngredients, ingredient].includes(item)
      )
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
    let exists = this.state.defaultIngredients.some(
      item => ingredient === item
    );
    let filteredIngredients = exists
      ? [...this.state.filteredIngredients, ingredient]
      : this.state.filteredIngredients;
    this.setState({
      addedIngredients: reducedAddedIngredients,
      filteredIngredients,
      mostUsedIngredients: this.state.initialMostUsed.filter(
        item => !reducedAddedIngredients.includes(item)
      )
    });

    this.props.showOnLabelPreview(
      e,
      this.props.id,
      this.state.title,
      reducedAddedIngredients
    );
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.showOnLabelPreview(
      null,
      this.props.id,
      this.state.title,
      arrayMove(this.state.addedIngredients, oldIndex, newIndex)
    );
    this.setState(({ addedIngredients }) => ({
      addedIngredients: arrayMove(addedIngredients, oldIndex, newIndex)
    }));
  };

  closeDropdown = () => {
    this.setState({
      add: false,
      search: '',
      filteredIngredients: this.state.mostUsedIngredients
    });
  };

  searchIngredients = e => {
    const value = e.target.value;
    e.stopPropagation();
    this.setState({ add: true, search: value });
  };

  render() {
    let { handleParts, id, ingredients } = this.props;

    return (
      <div className="ingredients-selector">
        <input
          value={this.state.title}
          name="title"
          id="title"
          onChange={this.handleChange}
          className="ingredients-selector__title"
          placeholder="Ingredient title"
        />
        <div className="ingredients-selector__picker">
          <div
            className="ingredients-selector__picker__cont"
            onBlur={e => {
              console.log('blur');

              console.log('curent', e.currentTarget, 'target', e.target.name);
              if (
                this.state.filteredIngredients.length > 0 ||
                this.state.addedIngredients.some(
                  item => item === this.state.search
                )
              ) {
                this.setState({
                  add: false,
                  search: '',
                  filteredIngredients: [...this.state.mostUsedIngredients]
                });
              }
            }}
          >
            <input
              name="search"
              onChange={this.handleChange}
              onFocus={() => {
                this.setState({ add: true });
              }}
              onKeyDown={e => {
                if (e.which === 13) {
                  e.preventDefault();
                  console.log('key down');

                  this.setState({ add: false, search: '' });
                }
              }}
              placeholder="Search"
              className="ingredients-selector__picker__cont__search"
              id="search"
              value={this.state.search}
              autoComplete="off"
            />

            {this.state.add && (
              <AddIngredient
                filteredIngredients={this.state.filteredIngredients}
                addIngredient={this.addIngredient}
                searchIngredients={this.searchIngredients}
                search={this.state.search}
                handleChange={this.handleChange}
                closeDropdown={this.closeDropdown}
                addedIngredients={this.state.addedIngredients}
              />
            )}
          </div>
          <SortableComponent
            items={this.state.addedIngredients}
            removeIngredient={this.removeIngredient}
            onSortEnd={this.onSortEnd}
          />
        </div>

        <div className="ingredients-selector__button">
          <span className="ingredients-selector__button__add">
            <button
              onClick={e => handleParts(e, id, 'add')}
              title="Add ingredient group"
            >
              +
            </button>
          </span>
          {ingredients.length > 1 && (
            <span className="ingredients-selector__button__remove">
              <button
                onClick={e => handleParts(e, id, 'remove')}
                title="Remove ingredient group"
              >
                -
              </button>
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default IngredientsSelector;
