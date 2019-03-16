import React from 'react';
import './LabelPreview.scss';

const LabelPreview = ({ title, description, ingredients }) => {
  return (
    <div className="label-preview">
      <h2>{title}</h2>
      <h4>{description}</h4>
      {ingredients.map(part => (
        <div>
          <h4>{part.title}</h4>
          {part.addedIngredients &&
            part.addedIngredients.map(item => <span>{item}</span>)}
        </div>
      ))}
    </div>
  );
};

export default LabelPreview;
