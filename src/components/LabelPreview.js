import React from 'react';
import './LabelPreview.scss';

const LabelPreview = ({
  title,
  description,
  ingredients,
  allAllergens,
  mayContain
}) => {
  return (
    <div className="label-preview">
      <h2>{title.toUpperCase()}</h2>

      <h3 className="label-preview__description">{description}</h3>

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
                  key={i + 1}
                  className={
                    allAllergens.includes(ingredient)
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

      <p className="label-preview__allergens">
        May contain traces of{' '}
        {mayContain.map((allergen, i) => {
          if (i === mayContain.length - 1) {
            return <span key={i + 1}>{`and ${allergen}.`}</span>;
          } else if (i === mayContain.length - 2) {
            return <span key={i + 1}>{`${allergen} `}</span>;
          } else {
            return <span key={i + 1}>{`${allergen}, `}</span>;
          }
        })}
      </p>
    </div>
  );
};

export default LabelPreview;
