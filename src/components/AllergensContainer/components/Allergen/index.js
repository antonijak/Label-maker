import React from 'react';
import './styles.scss';

const Allergen = ({ name, label, value, handleChange }) => {
  return (
    <label htmlFor={name} className="allergen checkbox">
      <span>{label}</span>
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
    </label>
  );
};

export default Allergen;
