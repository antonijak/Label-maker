import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import { Link } from 'react-router-dom';

import LabelPreview from '../LabelPreview/index';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import './styles.scss';

const PrintLabel = ({ title }) => {
  const getPDF = () => {
    let element = document.getElementById('stickers');
    html2canvas(element, { scale: 3 }).then(function(canvas) {
      var img = canvas.toDataURL('image/png');
      var doc = new jsPDF('l', 'mm', 'a4');
      doc.addImage(img, 'JPEG', 0, 0, 297, 210);
      doc.save(`${title}.pdf`);
    });
  };
  return (
    <div className="print-label">
      <Link to="/" className="print-label__back btn">
        Back
      </Link>
      <div className="print-label__stickers" id="stickers">
        {/* <div style={{ padding: '1rem' }}>
          <h4>{title}</h4>
          <p>Lorem ipsum dolor sit</p>
          <p>Lorem ipsum dolor sit amet this is dummy text</p>
          <div
            style={{
              width: '3rem',
              height: '3rem',
              background: 'red',
              borderRadius: '50%'
            }}
          />
        </div> */}
        <LabelPreview print />
        <LabelPreview print />
        <LabelPreview print />
        <LabelPreview print />
        <LabelPreview print />
        <LabelPreview print />
        <LabelPreview print />
        <LabelPreview print />
        <LabelPreview print />
        <LabelPreview print />
        <LabelPreview print />
        <LabelPreview print />
        <LabelPreview print />
        <LabelPreview print />
        <LabelPreview print />
        <LabelPreview print />
        <LabelPreview print />
        <LabelPreview print />
        <LabelPreview print />
        <LabelPreview print />
        <LabelPreview print />
      </div>

      <button className="btn print-label__generate" onClick={() => getPDF()}>
        Generate PDF
      </button>
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
)(PrintLabel);
