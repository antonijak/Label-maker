import React, { Component } from 'react';
import './styles.scss';
import Allergen from './components/Allergen/index';
import * as DATA from '../../data/data';

class AllergensContainer extends Component {
  state = {
    allergens: []
  };

  componentDidMount = () => {
    this.setState({ allergens: DATA.allergenTraces });
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
      if (allergen.hasOwnProperty('group')) {
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
      } else {
        return allergen;
      }
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
          <div className="allergens__content__general">
            {this.state.allergens.map((allergen, i) => (
              <Allergen
                key={i + 1}
                value={allergen.value}
                label={allergen.label}
                name={allergen.name}
                handleChange={this.handleChange}
              />
            ))}
          </div>
          {this.state.allergens
            .filter(allergen => allergen.value)
            .map((allergen, i) => {
              return (
                allergen.hasOwnProperty('group') && (
                  <div key={i + 1} className="allergens__content__specific">
                    <span className="allergens__content__specific__title">{`*Which ${
                      allergen.name
                    }? `}</span>
                    <div>
                      {allergen.group.map((item, i) => (
                        <Allergen
                          key={i + 1}
                          value={item.value}
                          label={item.label}
                          name={item.name}
                          handleChange={this.handleDeep}
                        />
                      ))}
                    </div>
                  </div>
                )
              );
            })}
        </div>
      </div>
    );
  }
}

export default AllergensContainer;
