import React, { Component } from 'react';
import './styles.scss';
import Allergen from './components/Allergen/index';

class AllergensContainer extends Component {
  state = {
    allergens: [
      {
        name: 'nuts',
        label: 'Nuts',
        value: false,
        group: [
          { name: 'wallnuts', label: 'Wallnuts', value: false },
          { name: 'cashews', label: 'Cashews', value: false },
          { name: 'brasillian nuts', label: 'Brasillian nuts', value: false },
          { name: 'hazelnuts', label: 'Hazelnuts', value: false },
          { name: 'almonds', label: 'Almonds', value: false },
          { name: 'pine nuts', label: 'Pine nuts', value: false },
          { name: 'pecan nuts', label: 'Pecan nuts', value: false },
          { name: 'pistachios', label: 'Pistachios', value: false }
        ]
      },
      { name: 'peanuts', label: 'Peanuts', value: false, group: [] },
      { name: 'milk', label: 'Milk', value: false, group: [] },
      { name: 'eggs', label: 'Eggs', value: false, group: [] },
      { name: 'soy', label: 'Soy', value: false, group: [] },
      { name: 'gluten', label: 'Gluten', value: false, group: [] },
      { name: 'sulfites', label: 'Sulfites', value: false, group: [] },
      { name: 'sesame', label: 'Sesame', value: false, group: [] },
      { name: 'celery', label: 'Celery', value: false, group: [] },
      { name: 'mustard', label: 'Mustard', value: false, group: [] }
    ]
  };

  handleChange = e => {
    const name = e.target.name;
    this.setState({
      allergens: this.state.allergens.map(allergen =>
        allergen.name === name
          ? { ...allergen, value: !allergen.value }
          : allergen
      )
    });
  };

  handleDeep = e => {
    const name = e.target.name;
    const bla = this.state.allergens.map(allergen => {
      const newGroup = allergen.group.map(item =>
        item.name === name ? { ...item, value: !item.value } : item
      );

      const newAllergen = {
        ...allergen,
        group: newGroup
      };

      return allergen.group.some(item => item.name === name)
        ? newAllergen
        : allergen;
    });

    this.setState({
      allergens: bla
    });
  };

  render() {
    return (
      <div className="allergens">
        <h3 className="allergens__title">Select Allergens</h3>
        <div className="allergens__content">
          {this.state.allergens.map((allergen, i) => (
            <Allergen
              value={allergen.value}
              label={allergen.label}
              name={allergen.name}
              handleChange={this.handleChange}
            />
          ))}
          <div>
            {this.state.allergens
              .filter(allergen => allergen.value)
              .map(allergen =>
                allergen.group.map(item => (
                  <Allergen
                    value={item.value}
                    label={item.label}
                    name={item.name}
                    handleChange={this.handleDeep}
                  />
                ))
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default AllergensContainer;
