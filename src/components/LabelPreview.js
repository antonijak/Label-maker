import React from 'react';
import './LabelPreview.scss';

const LabelPreview = ({ title, description, ingredients }) => {
  const arr = Object.values(ingredients);
  const arr2 = arr[0].addedIngredients;
  console.log(arr);
  console.log(arr[0]);
  console.log(arr[0].addedIngredients);

  return (
    <div className="label-preview">
      <h2>{title}</h2>
      <h4>{description}</h4>
      {arr2}
    </div>
  );
};

export default LabelPreview;
