import React, { Component } from 'react';
import './Allergens.scss';

class Allergens extends Component {
  state = {
    nuts: false,
    milk: false
  };

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: !this.state[name] });
  };
  render() {
    const { nuts, milk } = this.state;
    return (
      <div className="allergens">
        <h3 className="allergens__title">Select Allergens</h3>
        <div className="allergens__content">
          <label htmlFor="nuts" className="checkbox">
            Nuts
            <input
              type="checkbox"
              name="nuts"
              id="nuts"
              className={
                nuts
                  ? 'checkbox__button checkbox__button--checked'
                  : 'checkbox__button'
              }
              onChange={this.handleChange}
              value={nuts}
            />
          </label>
          <label htmlFor="nuts">
            Milk
            <input
              type="checkbox"
              name="milk"
              id="nuts"
              className={
                milk
                  ? 'checkbox__button checkbox__button--checked'
                  : 'checkbox__button'
              }
              onChange={this.handleChange}
              value={milk}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default Allergens;
