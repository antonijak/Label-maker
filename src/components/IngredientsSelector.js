import React, { Component } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import SortableComponent from './SortableComponent';
import AddIngredient from './AddIngredient';
import './IngredientsSelector.scss';
import * as data from '../data/data';
import * as actions from '../store/actions/actions';
import { connect } from 'react-redux';

class IngredientsSelector extends Component {
  state = {
    search: '',
    part: {
      id: '',
      title: '',
      addedIngredients: []
    },
    allIngredients: [],
    filteredIngredients: ['soy-lecithin', 'brasilian nut', 'cashew', 'rasins'],
    mostUsedIngredients: [],
    add: false
  };

  componentDidMount = () => {
    this.setState({
      part: this.props.part,
      mostUsedIngredients: data.mostUsedIngredients,
      allIngredients: data.ingredients
    });

    this.props.showOnLabelPreview(this.props.part);
  };

  handleChange = e => {
    e.preventDefault();

    const { value, name } = e.target;

    if (name === 'search') {
      const filtered = value
        ? this.state.allIngredients
            .filter(item => item.startsWith(value))
            .filter(item => !this.state.part.addedIngredients.includes(item))
        : this.state.mostUsedIngredients;

      this.setState({
        search: value,
        add: true,
        filteredIngredients: filtered
      });
    } else if (name === 'title') {
      e.preventDefault();
      this.props.showOnLabelPreview({ ...this.state.part, title: value });
      this.setState({ part: { ...this.state.part, title: value } });
    }
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
      part: {
        ...this.state.part,
        addedIngredients: [...this.state.part.addedIngredients, ingredient]
      },
      filteredIngredients,
      add: false,
      search: '',
      mostUsedIngredients: [...this.state.mostUsedIngredients].filter(
        item =>
          ![...this.state.part.addedIngredients, ingredient].includes(item)
      )
    });

    this.props.showOnLabelPreview({
      ...this.state.part,
      addedIngredients: [...this.state.part.addedIngredients, ingredient]
    });
  };

  removeIngredient = (e, ingredient) => {
    e.preventDefault();
    const reducedAddedIngredients = this.state.part.addedIngredients.filter(
      item => item !== ingredient
    );
    let exists = this.state.allIngredients.some(item => ingredient === item);
    let filteredIngredients = exists
      ? [...this.state.filteredIngredients, ingredient]
      : this.state.filteredIngredients;
    this.setState({
      part: { ...this.state.part, addedIngredients: reducedAddedIngredients },
      filteredIngredients,
      mostUsedIngredients: data.mostUsedIngredients.filter(
        item => !reducedAddedIngredients.includes(item)
      )
    });

    this.props.showOnLabelPreview({
      ...this.state.part,
      addedIngredients: reducedAddedIngredients
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.showOnLabelPreview({
      ...this.state.part,
      addedIngredients: arrayMove(
        this.state.part.addedIngredients,
        oldIndex,
        newIndex
      )
    });
    this.setState({
      addedIngredients: arrayMove(
        this.state.part.addedIngredients,
        oldIndex,
        newIndex
      )
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
    const { id } = this.state.part;

    return (
      <div className="ingredients-selector">
        <input
          type="text"
          value={this.state.part.title}
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
                this.state.part.addedIngredients.some(
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
              type="text"
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
    showOnLabelPreview: part => dispatch(actions.showOnLabelPreview(part))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IngredientsSelector);
