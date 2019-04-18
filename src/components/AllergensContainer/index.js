import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as DATA from '../../data/data';
import * as actions from '../../store/actions/actions';

import Allergen from './components/Allergen/index';

import './styles.scss';

class AllergensContainer extends Component {
  state = {
    allergens: [],
    nuts: [],
    gluten: []
  };

  componentDidMount = () => {
    this.setState({
      allergens: DATA.allergenTraces,
      nuts: DATA.nuts,
      gluten: DATA.gluten
    });
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    //toggle allergen value
    let allergens = this.state.allergens.map(allergen => {
      return allergen.name === name
        ? { ...allergen, value: !allergen.value }
        : allergen;
    });
    //set state with new allergen value
    this.setState({ allergens });

    //show/hide allergen if it (doesn't) already exist
    if (this.props.traces.includes(name) && value === 'true') {
      this.props.removeAllergen(name);
    } else if (!this.props.traces.includes(name) && value === 'false') {
      this.props.showAllergen(name);
    }

    //if allergen
    if (name === 'nuts' || name === 'gluten') {
      this.state[name].forEach(element => {
        this.props.traces.includes(element.name) &&
          this.props.removeAllergen(element.name);
      });
      this.setState({
        [name]: this.state[name].map(item =>
          item.value ? { ...item, value: !item.value } : item
        )
      });
    }
  };

  handleDeep = (e, array) => {
    const name = e.target.name;

    const newArray = this.state[array].map(item =>
      item.name === name ? { ...item, value: !item.value } : item
    );

    this.setState({ [array]: newArray });

    this.props.traces.includes(array) && this.props.removeAllergen(array);

    this.props.traces.includes(name)
      ? this.props.removeAllergen(name)
      : this.props.showAllergen(name);
  };

  render() {
    return (
      <div className="allergens container">
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
                (allergen.name === 'nuts' || allergen.name === 'gluten') && (
                  <div key={i + 1} className="allergens__content__specific">
                    <span className="allergens__content__specific__title">{`*Which ${
                      allergen.name
                    }? `}</span>
                    <div>
                      {this.state[allergen.name].map((item, i) => (
                        <Allergen
                          key={i + 1}
                          value={item.value}
                          label={item.label}
                          name={item.name}
                          handleChange={e => this.handleDeep(e, allergen.name)}
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

const mapStateToProps = state => {
  return {
    traces: state.traces
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showAllergen: allergen => dispatch(actions.showAllergen(allergen)),
    removeAllergen: allergen => dispatch(actions.removeAllergen(allergen))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllergensContainer);
