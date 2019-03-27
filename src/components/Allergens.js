import React from 'react';
import './Allergens.scss';

const Allergens = ({ checkbox, handleChange }) => {
  return (
    <div className="allergens">
      <h3 className="allergens__title">Select Allergens</h3>
      <div className="allergens__content">
        <label htmlFor="nuts" className="checkbox">
          Nuts
          <input
            type="checkbox"
            name="checkbox"
            id="nuts"
            className={
              checkbox
                ? 'checkbox__button checkbox__button--checked'
                : 'checkbox__button'
            }
            onChange={handleChange}
            value={checkbox}
          />
        </label>
        <label htmlFor="nuts">
          Nuts
          <input
            type="checkbox"
            name="checkbox"
            id="nuts"
            className={
              checkbox
                ? 'checkbox__button checkbox__button--checked'
                : 'checkbox__button'
            }
            onChange={handleChange}
            value={checkbox}
          />
        </label>
        <label htmlFor="nuts">
          Nuts
          <input
            type="checkbox"
            name="checkbox"
            id="nuts"
            className={
              checkbox
                ? 'checkbox__button checkbox__button--checked'
                : 'checkbox__button'
            }
            onChange={handleChange}
            value={checkbox}
          />
        </label>
      </div>
    </div>
  );
};

export default Allergens;
