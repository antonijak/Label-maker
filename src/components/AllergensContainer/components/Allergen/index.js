import React from 'react';
import './styles.scss';

const Allergen = ({ name, label, value, handleChange }) => {
  return (
    <label htmlFor={name} className="allergen checkbox">
      <input
        type="checkbox"
        name={name}
        id={name}
        className={
          value
            ? 'checkbox__button checkbox__button--checked'
            : 'checkbox__button'
        }
        onChange={handleChange}
        value={value}
      />
      <span>{label}</span>
    </label>
  );
};

export default Allergen;
