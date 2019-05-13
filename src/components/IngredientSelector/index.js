import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayMove } from 'react-sortable-hoc';
import * as DATA from '../../data/data';
import * as actions from '../../store/actions/actions';

import SortableComponent from './components/SortableComponent/index';
import AddDropdown from './components/AddDropdown/index';

import './styles.scss';

class IngredientsSelector extends Component {
  state = {
    search: '',
    part: {
      id: '',
      title: '',
      addedIngredients: []
    },
    allIngredients: [],
    filteredIngredients: [],
    mostUsedIngredients: [],
    add: false,
    selected: { index: -1, value: '' }
  };

  componentDidMount = () => {
    //will get data from the server (right now coming from DATA)
    //check if default ingredients are among most used ingredients on the server *will be important later
    const mostUsedIngredients = this.avoidDuplicates(
      DATA.mostUsedIngredients,
      this.props.part.addedIngredients
    );

    this.setState({
      part: this.props.part,
      mostUsedIngredients,
      allIngredients: DATA.ingredients,
      filteredIngredients: mostUsedIngredients
    });
  };

  avoidDuplicates = (arrayToFilter, arrayWithDuplictes) => {
    return arrayToFilter.filter(item => !arrayWithDuplictes.includes(item));
  };

  handleTitle = e => {
    e.preventDefault();
    const { value } = e.target;

    this.props.showIngredients({ ...this.state.part, title: value });
    this.setState({ part: { ...this.state.part, title: value } });
  };

  searchForIngredient = e => {
    //when user types
    //set 'search' to input value
    //set 'filteredIngredients' to filtered by input value
    e.preventDefault();
    const { value } = e.target;

    this.setState({
      add: true,
      search: value,
      filteredIngredients: value
        ? this.state.allIngredients.filter(
            item =>
              item.startsWith(value) &&
              !this.state.part.addedIngredients.includes(item)
          )
        : this.state.mostUsedIngredients
    });
  };

  addIngredient = (ingredient, e) => {
    //return array without selected ingredient
    const reducedFilteredIngredients = this.state.filteredIngredients.filter(
      item => item !== ingredient
    );

    //add ingredient to label
    //check if there are any ingredients left after removing selected
    //if yes show them
    //if no show the rest of the most used ingredients
    this.setState({
      part: {
        ...this.state.part,
        addedIngredients: [...this.state.part.addedIngredients, ingredient]
      },
      filteredIngredients:
        reducedFilteredIngredients.length > 0
          ? this.state.filteredIngredients.filter(item => item !== ingredient)
          : this.state.mostUsedIngredients.filter(item => ingredient !== item),
      add: false,
      search: '',
      mostUsedIngredients: this.state.mostUsedIngredients.filter(
        item => ingredient !== item
      )
    });

    this.props.showIngredients({
      ...this.state.part,
      addedIngredients: [...this.state.part.addedIngredients, ingredient]
    });
    e && e.stopPropagation();
  };

  removeIngredient = (e, ingredient) => {
    e.preventDefault();

    const reducedAddedIngredients = this.state.part.addedIngredients.filter(
      item => item !== ingredient
    );
    //check if removed ingredient is most used ingredietnt
    let exists = DATA.mostUsedIngredients.some(item => ingredient === item);
    //if yes put it into filtered ingredients
    let filteredIngredients = exists
      ? [...this.state.filteredIngredients, ingredient]
      : this.state.filteredIngredients;

    this.setState({
      part: { ...this.state.part, addedIngredients: reducedAddedIngredients },
      filteredIngredients,
      mostUsedIngredients: this.avoidDuplicates(
        DATA.mostUsedIngredients,
        reducedAddedIngredients
      )
    });

    this.props.showIngredients({
      ...this.state.part,
      addedIngredients: reducedAddedIngredients
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    //drag and drop ingredients
    this.props.showIngredients({
      ...this.state.part,
      addedIngredients: arrayMove(
        this.state.part.addedIngredients,
        oldIndex,
        newIndex
      )
    });
    this.setState({
      part: {
        ...this.state.part,
        addedIngredients: arrayMove(
          this.state.part.addedIngredients,
          oldIndex,
          newIndex
        )
      }
    });
  };

  closeDropdown = () => {
    //close dropdown and fill filteredIngredients with most used ingredients
    this.setState({
      add: false,
      search: '',
      filteredIngredients: this.state.mostUsedIngredients.filter(
        item => item !== this.state.selected.value
      )
    });
  };

  handleBlur = () => {
    if (
      this.state.filteredIngredients.length > 0 ||
      this.state.part.addedIngredients.some(item => item === this.state.search)
    ) {
      this.closeDropdown();
    }
  };

  handleKeyDown = e => {
    //handles keys when ingredient selector dropdown is focused

    let selectedIndex = this.state.selected.index;
    let nextSelectedIndex =
      selectedIndex + 1 < this.state.filteredIngredients.length
        ? selectedIndex + 1
        : 0;

    let prevSelectedIndex =
      selectedIndex - 1 > -1
        ? selectedIndex - 1
        : this.state.filteredIngredients.length - 1;

    if (e.which === 40) {
      //on arrow down select tha first ingredient
      //on further arrow down select subsequest ingredinet
      this.setState({
        selected: {
          index: nextSelectedIndex,
          value: this.state.filteredIngredients[nextSelectedIndex]
        }
      });
    } else if (e.which === 38) {
      //on arrow up select previous ingredient
      this.setState({
        selected: {
          index: prevSelectedIndex,
          value: this.state.filteredIngredients[prevSelectedIndex]
        }
      });
    } else if (e.which === 13) {
      //on enter add ingredient
      this.state.selected.value &&
        this.addIngredient(this.state.selected.value, e);
      e.target.blur();
      this.setState({ selected: { index: -1, value: '' } });
    }
  };

  render() {
    const { ingredients, handleParts } = this.props;
    const { id, title } = this.state.part;

    return (
      <div className="container ingredients-selector">
        <input
          type="text"
          value={title}
          onChange={this.handleTitle}
          className="ingredients-selector__title"
          placeholder="Ingredient title*"
        />

        <div className="ingredients-selector__picker">
          <div
            className="ingredients-selector__picker__cont"
            onBlur={this.handleBlur}
          >
            <input
              type="text"
              onChange={this.searchForIngredient}
              onFocus={() => {
                this.setState({ add: true });
              }}
              onKeyDown={this.handleKeyDown}
              placeholder="Search"
              className="ingredients-selector__picker__cont__search"
              value={this.state.search}
              autoComplete="off"
            />

            {this.state.add && (
              <AddDropdown
                filteredIngredients={this.state.filteredIngredients}
                addIngredient={this.addIngredient}
                search={this.state.search}
                closeDropdown={this.closeDropdown}
                addedIngredients={this.state.part.addedIngredients}
                selected={this.state.selected.value}
              />
            )}
          </div>
          <SortableComponent
            items={this.state.part.addedIngredients}
            removeIngredient={this.removeIngredient}
            onSortEnd={this.onSortEnd}
          />
        </div>

        <div className="ingredients-selector__button">
          <span className="ingredients-selector__button__add">
            <button
              type="button"
              onClick={e => handleParts(e, id, 'add')}
              title="Add ingredient group"
              className="ingredients-selector__button__add__button"
            >
              +
            </button>
          </span>
          {ingredients.length > 1 && (
            <span className="ingredients-selector__button__remove">
              <button
                type="button"
                onClick={e => handleParts(e, id, 'remove')}
                title="Remove ingredient group"
                className="ingredients-selector__button__remove__button"
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredientsReducer.ingredients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleParts: (e, id, value) => dispatch(actions.handleParts(e, id, value)),
    showIngredients: part => dispatch(actions.showIngredients(part))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IngredientsSelector);
