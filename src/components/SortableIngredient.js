import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

const SortableIngredient = SortableElement(({ text }) => <li>{text}</li>);

export default SortableIngredient;
