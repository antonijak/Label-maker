import React from 'react';
import './LabelPreview.scss';

const LabelPreview = ({ title, description, ingredients }) => {
  const arr = ingredients[0].addedIngredients;
  console.log('arr', arr);
  const arruse = [];
  arr &&
    arr.forEach(element => {
      arruse.push(element);
    });

  // const arr = Object.keys(ingredients);
  // const arr2 = arr[0].addedIngredients;
  // console.log('arr', arr);
  // console.log(arr[0]);
  // console.log(arr[0].addedIngredients);
  console.log('json', JSON.stringify(arr, null, 2));

  return (
    <div className="label-preview">
      <h2>{title}</h2>
      <h4>{description}</h4>
      {ingredients &&
        ingredients.map(part => (
          <div>
            {part.addedIngredients &&
              part.addedIngredients.map(item => <span>{item}</span>)}
          </div>
        ))}
    </div>
  );
};

export default LabelPreview;
