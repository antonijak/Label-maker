import React from 'react';
import './LabelPreview.scss';

const LabelPreview = ({ title, description, ingredients }) => {
  return (
    <div className="label-preview">
      <h2>{title}</h2>
      <h3>{description}</h3>
      {ingredients.map(part => (
        <div className="label-preview__part">
          <p>
            <h4 className="label-preview__part__title">
              {part.title && part.title + ': '}
            </h4>
            {part.addedIngredients && part.addedIngredients.join(', ') + '.'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LabelPreview;
