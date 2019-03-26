import React from 'react';
import './LabelPreview.scss';

const LabelPreview = ({ title, description, ingredients, alergens }) => {
  return (
    <div className="label-preview">
      <h2>{title}</h2>
      <h3>{description}</h3>
      {ingredients.map((part, i) => (
        <div key={'item' + i} className="label-preview__part">
          <h4 className="label-preview__part__title">{part.title}</h4>
          <p className="label-preview__part__text">
            <span className="label-preview__part__text__ingredients">
              Ingredients:
            </span>
            {part.addedIngredients &&
              part.addedIngredients.map((ingredient, i) => (
                <span
                  className={
                    alergens.includes(ingredient)
                      ? 'label-preview__part__text__alergen'
                      : 'label-preview__part__text__normal'
                  }
                >
                  {`${i === 0 ? ' ' : ''}${ingredient}${
                    i === part.addedIngredients.length - 1 ? '.' : ', '
                  }`}
                </span>
              ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LabelPreview;
