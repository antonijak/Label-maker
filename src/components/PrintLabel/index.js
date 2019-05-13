import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import LabelPreview from '../LabelPreview/index';

import './styles.scss';

const PrintLabel = ({ title, handleAlert, alert }) => {
  const generatePDF = () => {
    //show alert that document is being generated
    handleAlert();
    let element = document.getElementById('stickers');
    //scale determines quality of the image starting at 1
    html2canvas(element, { scale: 3 }).then(function(canvas) {
      var img = canvas.toDataURL('image/png');
      //landscape, measurements in mm, a4 format
      var doc = new jsPDF('l', 'mm', 'a4');
      doc.addImage(img, 'JPEG', 0, 0, 297, 210);
      doc.save(`${title}.pdf`);
      //hide alert
      handleAlert();
    });
  };
  //will be controled by the user
  const columns = 7;
  const rows = 3;
  const width = '1fr';
  const height = '1fr';
  return (
    <div className="print-label">
      <div>
        <h3 className="print-label__title">DOCUMENT PREVIEW</h3>
        <div
          className="print-label__stickers"
          id="stickers"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, ${width})`,
            gridTemplateRows: `repeat(${rows}, ${height})`
          }}
        >
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
      </div>
      <div className="print-label__button">
        <Link to="/" className="print-label__button__back btn">
          Back
        </Link>

        {alert && (
          <span className="print-label__button__alert" role="alert">
            Generating PDF document...
          </span>
        )}

        <button
          type="button"
          className="btn print-label__button__generate"
          onClick={() => {
            generatePDF();
          }}
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  ingredientsReducer,
  companiesReducer,
  generalReducer
}) => {
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
    country: ingredientsReducer.country,
    alert: generalReducer.alert
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: e => dispatch(actions.handleChange(e)),
    validate: e => dispatch(actions.validate(e)),
    selectCountry: e => dispatch(actions.selectCountry(e)),
    handleAlert: () => dispatch(actions.handleAlert())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrintLabel);
