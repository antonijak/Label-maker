import React from 'react';
import './LabelPreview.scss';

const LabelPreview = ({ title, description }) => (
  <div className="label-preview">
    <h2>{title}</h2>
    <h4>{description}</h4>
  </div>
);

export default LabelPreview;
