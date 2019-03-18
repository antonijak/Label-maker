import React from 'react';
import './Added.scss';

const Added = ({ value, removeIngredient, axis }) => (
  <li className="ingredient" axis={axis}>
    <p>{value}</p>
    <button
      onClick={e => {
        removeIngredient(e, value);
      }}
      className="ingredient__remove"
    />
  </li>
);

export default Added;
