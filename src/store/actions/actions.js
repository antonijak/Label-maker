import * as actionTypes from './actionTypes';

export function handleChange(event) {
  return {
    type: actionTypes.HANDLE_CHANGE,
    payload: { event }
  };
}

export function handleParts(e, id, value) {
  return {
    type: actionTypes.HANDLE_PARTS,
    payload: { e, id, value }
  };
}

export function showOnLabelPreview(part) {
  return {
    type: actionTypes.SHOW_ON_LABEL_PREVIEW,
    payload: part
  };
}
