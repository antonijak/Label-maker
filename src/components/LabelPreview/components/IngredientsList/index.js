import React from 'react';

import './styles.scss';
import LabelIngredient from '../LabelIngredient/index';

const IngredientsList = ({ ingredients, allergens }) => {
  return (
    <div className="ingredients-list">
      {ingredients.map((part, i) => (
        <div key={'item' + i} className="ingredients-list__part">
          <h4 className="ingredients-list__part__title">{part.title}</h4>

          <p className="ingredients-list__part__text">
            <span className="ingredients-list__part__text__ingredients">
              Ingredients:
            </span>

            {part.addedIngredients &&
              part.addedIngredients.map((ingredient, i) => (
                <LabelIngredient
                  key={i + 1}
                  allergens={allergens}
                  ingredient={ingredient}
                  last={i === part.addedIngredients.length - 1}
                  index={i}
                />
              ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default IngredientsList;
