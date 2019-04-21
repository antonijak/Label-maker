import * as actionTypes from './actionTypes';

export function handleChange(event) {
  return {
    type: actionTypes.HANDLE_CHANGE,
    payload: event
  };
}

export function handleParts(e, id, value) {
  return {
    type: actionTypes.HANDLE_PARTS,
    payload: { e, id, value }
  };
}

export function showIngredients(part) {
  return {
    type: actionTypes.SHOW_INGREDIENTS,
    payload: part
  };
}

export function showAllergen(allergen) {
  return {
    type: actionTypes.SHOW_ALLERGEN,
    payload: allergen
  };
}

export function removeAllergen(allergen) {
  return {
    type: actionTypes.REMOVE_ALLERGEN,
    payload: allergen
  };
}

export function validate(event) {
  return {
    type: actionTypes.VALIDATE,
    payload: event
  };
}

export function getUnit(event) {
  return {
    type: actionTypes.GET_UNIT,
    payload: event
  };
}

// company action creators:

export function handleChangeCompany(event, use) {
  return {
    type: actionTypes.HANDLE_CHANGE_COMPANY,
    payload: { event, use }
  };
}

export function toggleCompanies(event, use) {
  return {
    type: actionTypes.TOGGLE_COMPANIES,
    payload: { event, use }
  };
}

export function useCompany(event, company, use) {
  return {
    type: actionTypes.USE_COMPANY,
    payload: { event, company, use }
  };
}

export function addCompany(event, use) {
  return {
    type: actionTypes.ADD_COMPANY,
    payload: { event, use }
  };
}

export function removeCompany(event, id, use) {
  return {
    type: actionTypes.REMOVE_COMPANY,
    payload: { event, id, use }
  };
}
