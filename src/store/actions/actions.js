import * as actionTypes from './actionTypes';

export function handleChange(e) {
  return {
    type: actionTypes.HANDLE_CHANGE,
    payload: e
  };
}

export function handleParts(e, id, value) {
  return {
    type: actionTypes.HANDLE_PARTS,
    payload: { e, id, value }
  };
}

export function showOnLabelPreview(e, id, title, addedIngredients) {
  return {
    type: actionTypes.SHOW_ON_LABEL_PREVIEW,
    payload: { e, id, title, addedIngredients }
  };
}
