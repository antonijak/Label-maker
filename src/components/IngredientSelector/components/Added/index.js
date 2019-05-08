import React from 'react';
import './styles.scss';

const Added = ({ value, removeIngredient, axis }) => (
  <li className="ingredient" axis={axis} title="Click to drag">
    <p>{value}</p>
    <button
      type="button"
      onClick={e => {
        removeIngredient(e, value);
      }}
      className="ingredient__remove"
      title="Remove ingredient"
    />
  </li>
);

export default Added;
