import React from 'react';
import './Added.scss';

const Added = ({ value, removeIngredient, axis }) => (
  <li className="ingredient" axis={axis} title="Click to drag">
    <p>{value}</p>
    <button
      onClick={e => {
        removeIngredient(e, value);
      }}
      className="ingredient__remove"
      title="Remove ingredient"
    />
  </li>
);

export default Added;
