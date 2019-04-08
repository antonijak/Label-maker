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
    add: false
  };

  componentDidMount = () => {
    this.setState({
      part: this.props.part,
      mostUsedIngredients: this.avoidDuplicates(
        DATA.mostUsedIngredients,
        this.props.part.addedIngredients
      ),
      allIngredients: DATA.ingredients,
      filteredIngredients: this.avoidDuplicates(
        DATA.mostUsedIngredients,
        this.props.part.addedIngredients
      )
    });
    this.props.showIngredients(this.props.part);
  };

  avoidDuplicates = (arrayToFilter, arrayWithDuplictes) => {
    return arrayToFilter.filter(item => !arrayWithDuplictes.includes(item));
  };

  search = e => {
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

  handleChange = e => {
    e.preventDefault();
    const { value } = e.target;

    this.props.showIngredients({ ...this.state.part, title: value });
    this.setState({ part: { ...this.state.part, title: value } });
  };

  handleBlur = () => {
    if (
      this.state.filteredIngredients.length > 0 ||
      this.state.part.addedIngredients.some(item => item === this.state.search)
    ) {
      this.setState({
        add: false,
        search: '',
        filteredIngredients: [...this.state.mostUsedIngredients]
      });
    }
  };

  addIngredient = ingredient => {
    const reducedFilteredIngredients = this.state.filteredIngredients.filter(
      item => item !== ingredient
    );

    this.setState({
      part: {
        ...this.state.part,
        addedIngredients: [...this.state.part.addedIngredients, ingredient]
      },
      filteredIngredients:
        reducedFilteredIngredients > 0
          ? reducedFilteredIngredients
          : this.state.mostUsedIngredients,
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
  };

  removeIngredient = (e, ingredient) => {
    e.preventDefault();

    const reducedAddedIngredients = this.state.part.addedIngredients.filter(
      item => item !== ingredient
    );

    let exists = DATA.mostUsedIngredients.some(item => ingredient === item);

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
    const { handleParts, ingredients } = this.props;
    const { id, title } = this.state.part;

    return (
      <div className="ingredients-selector">
        <input
          type="text"
          value={title}
          onChange={this.handleChange}
          className="ingredients-selector__title"
          placeholder="Ingredient title"
        />
        <div className="ingredients-selector__picker">
          <div
            className="ingredients-selector__picker__cont"
            onBlur={this.handleBlur}
          >
            <input
              type="text"
              onChange={this.search}
              onFocus={() => {
                this.setState({ add: true });
              }}
              onKeyDown={e => {
                if (e.which === 13) {
                  e.preventDefault();
                  this.setState({ add: false, search: '' });
                }
              }}
              placeholder="Search"
              className="ingredients-selector__picker__cont__search"
              value={this.state.search}
              autoComplete="off"
            />

            {this.state.add && (
              <AddDropdown
                filteredIngredients={this.state.filteredIngredients}
                addIngredient={this.addIngredient}
                searchIngredients={this.searchIngredients}
                search={this.state.search}
                handleChange={this.handleChange}
                closeDropdown={this.closeDropdown}
                addedIngredients={this.state.part.addedIngredients}
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
const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: e => dispatch(actions.handleChange(e)),
    handleParts: (e, id, value) => dispatch(actions.handleParts(e, id, value)),
    showIngredients: part => dispatch(actions.showIngredients(part))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IngredientsSelector);
