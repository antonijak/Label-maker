import React, { Component } from 'react';
import './styles.scss';
import Allergen from './components/Allergen/index';

class AllergensContainer extends Component {
  state = {
    nuts: false,
    milk: false,
    eggs: false,
    soy: false,
    gluten: false
  };

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: !this.state[name] });
  };
  render() {
    const { nuts, milk, eggs, soy, gluten } = this.state;
    return (
      <div className="allergens">
        <h3 className="allergens__title">Select Allergens</h3>
        <div className="allergens__content">
          <Allergen
            value={nuts}
            label="Nuts"
            name="nuts"
            handleChange={this.handleChange}
          />
          <Allergen
            value={milk}
            label="Milk"
            name="milk"
            handleChange={this.handleChange}
          />
          <Allergen
            value={eggs}
            label="Eggs"
            name="eggs"
            handleChange={this.handleChange}
          />
          <Allergen
            value={soy}
            label="Soy"
            name="soy"
            handleChange={this.handleChange}
          />
          <Allergen
            value={gluten}
            label="Gluten"
            name="gluten"
            handleChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default AllergensContainer;
