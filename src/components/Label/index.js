import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';

import LabelPreview from '../LabelPreview/index';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function getPDF() {
  let element = document.getElementById('stickers');
  html2canvas(element, { scale: 1 }).then(function(canvas) {
    var img = canvas.toDataURL('image/png');
    var doc = new jsPDF('l', 'mm', 'a4');
    doc.addImage(img, 'JPEG', 3, 3);
    doc.save('test.pdf');
  });
}

const Label = () => {
  return (
    <div className="form-container" style={{ width: '100%' }}>
      <div id="stickers" style={{ width: '1100px', display: 'flex' }}>
        <LabelPreview />
        <LabelPreview />
        <LabelPreview />
        <LabelPreview />
      </div>
      <button onClick={() => getPDF()}>Print Label</button>
    </div>
  );
};

const mapStateToProps = ({ ingredientsReducer, companiesReducer }) => {
  return {
    title: ingredientsReducer.title,
    description: ingredientsReducer.description,
    ingredients: ingredientsReducer.ingredients,
    weight: ingredientsReducer.weight,
    date: ingredientsReducer.date,
    ingredientsValidationErrors: ingredientsReducer.validationErrors,
    companiesValidationErrors: companiesReducer.validationErrors,
    producer: companiesReducer.producer,
    distributor: companiesReducer.distributor,
    producersList: companiesReducer.producersList,
    distributorsList: companiesReducer.distributorsList,
    producersVisible: companiesReducer.producersVisible,
    distributorsVisible: companiesReducer.distributorsVisible,
    countries: ingredientsReducer.countries,
    country: ingredientsReducer.country
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: e => dispatch(actions.handleChange(e)),
    validate: e => dispatch(actions.validate(e)),
    selectCountry: e => dispatch(actions.selectCountry(e))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Label);
