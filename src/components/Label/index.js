import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import { Link } from 'react-router-dom';

import LabelPreview from '../LabelPreview/index';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Label = ({ title }) => {
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
    <div
      className="form-container"
      style={{
        width: '100%',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div
        id="stickers"
        style={{
          padding: '1rem',
          width: '848.57px',
          height: '600px',
          display: 'grid',
          overflow: 'hidden',
          border: '1px solid black',
          margin: '0 auto',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)'
        }}
      >
        <div style={{ border: '1px solid black' }}>
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
        </div>
        <div style={{ border: '1px solid black' }}>
          <h4>{title}</h4>
          <p>Lorem ipsum dolor sit</p>
          <p>Lorem ipsum dolor sit amet this is dummy text</p>
        </div>
        <div style={{ border: '1px solid black' }}>
          <h4>{title}</h4>
          <p>Lorem ipsum dolor sit</p>
          <p>Lorem ipsum dolor sit amet this is dummy text</p>
        </div>
        <div style={{ border: '1px solid black' }}>
          <h4>{title}</h4>
          <p>Lorem ipsum dolor sit</p>
          <p>Lorem ipsum dolor sit amet this is dummy text</p>
        </div>
        <div style={{ border: '1px solid black' }}>
          <h4>{title}</h4>
          <p>Lorem ipsum dolor sit</p>
          <p>Lorem ipsum dolor sit amet this is dummy text</p>
        </div>
        <div style={{ border: '1px solid black' }}>
          <h4>{title}</h4>
          <p>Lorem ipsum dolor sit</p>
          <p>Lorem ipsum dolor sit amet this is dummy text</p>
        </div>
        <div style={{ border: '1px solid black' }}>
          <h4>{title}</h4>
          <p>Lorem ipsum dolor sit</p>
          <p>Lorem ipsum dolor sit amet this is dummy text</p>
        </div>
        <div style={{ border: '1px solid black' }}>
          <h4>{title}</h4>
          <p>Lorem ipsum dolor sit</p>
          <p>Lorem ipsum dolor sit amet this is dummy text</p>
        </div>
        <div style={{ border: '1px solid black' }}>
          <h4>{title}</h4>
          <p>Lorem ipsum dolor sit</p>
          <p>Lorem ipsum dolor sit amet this is dummy text</p>
        </div>
        <div style={{ border: '1px solid black' }}>
          <h4>{title}</h4>
          <p>Lorem ipsum dolor sit</p>
          <p>Lorem ipsum dolor sit amet this is dummy text</p>
        </div>
        <div style={{ border: '1px solid black' }}>
          <h4>{title}</h4>
          <p>Lorem ipsum dolor sit</p>
          <p>Lorem ipsum dolor sit amet this is dummy text</p>
        </div>
        <div style={{ border: '1px solid black' }}>
          <h4>{title}</h4>
          <p>Lorem ipsum dolor sit</p>
          <p>Lorem ipsum dolor sit amet this is dummy text</p>
        </div>
        <div style={{ border: '1px solid black' }}>
          <h4>{title}</h4>
          <p>Lorem ipsum dolor sit</p>
          <p>Lorem ipsum dolor sit amet this is dummy text</p>
        </div>
        <div style={{ border: '1px solid black' }}>
          <h4>{title}</h4>
          <p>Lorem ipsum dolor sit</p>
          <p>Lorem ipsum dolor sit amet this is dummy text</p>
        </div>
        <div style={{ border: '1px solid black' }}>
          <h4>{title}</h4>
          <p>Lorem ipsum dolor sit</p>
          <p>Lorem ipsum dolor sit amet this is dummy text</p>
        </div>
        <div style={{ border: '1px solid black' }}>
          <h4>{title}</h4>
          <p>Lorem ipsum dolor sit</p>
          <p>Lorem ipsum dolor sit amet this is dummy text</p>
        </div>
        <div style={{ border: '1px solid black' }}>
          <h4>{title}</h4>
          <p>Lorem ipsum dolor sit</p>
          <p>Lorem ipsum dolor sit amet this is dummy text</p>
        </div>
        <div style={{ border: '1px solid black' }}>
          <h4>{title}</h4>
          <p>Lorem ipsum dolor sit</p>
          <p>Lorem ipsum dolor sit amet this is dummy text</p>
        </div>
        <div style={{ border: '1px solid black' }}>
          <h4>{title}</h4>
          <p>Lorem ipsum dolor sit</p>
          <p>Lorem ipsum dolor sit amet this is dummy text</p>
        </div>
        <div style={{ border: '1px solid black' }}>
          <h4>{title}</h4>
          <p>Lorem ipsum dolor sit</p>
          <p>Lorem ipsum dolor sit amet this is dummy text</p>
        </div>
        <div style={{ border: '1px solid black' }}>
          <h4>{title}</h4>
          <p>Lorem ipsum dolor sit</p>
          <p>Lorem ipsum dolor sit amet this is dummy text</p>
        </div>
      </div>
      <button className="form__submit__button" onClick={() => getPDF()}>
        Print Label
      </button>
      <Link to="/" className="form__submit__button">
        Back
      </Link>
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
