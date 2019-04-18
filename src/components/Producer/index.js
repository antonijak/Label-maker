import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';

import './styles.scss';

class Producer extends Component {
  state = {
    name: '',
    address: '',
    country: '',
    contact: ''
  };

  render() {
    const {
      producerName,
      producerAddress,
      producerCountry,
      producerContact,
      handleChange
    } = this.props;
    return (
      <div className="producer container">
        <h3 className="producer__title">Producer information</h3>
        <button className="producer__load">Load from database</button>
        <input
          name="producerName"
          type="text"
          onChange={handleChange}
          value={producerName}
          placeholder="Company name"
        />
        <input
          name="producerAddress"
          type="text"
          onChange={handleChange}
          value={producerAddress}
          placeholder="Company address"
        />
        <input
          name="producerCountry"
          type="text"
          onChange={handleChange}
          value={producerCountry}
          placeholder="Country"
        />
        <input
          name="producerContact"
          type="text"
          onChange={handleChange}
          value={producerContact}
          placeholder="Contact*"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    producerName: state.producerName,
    producerAddress: state.producerAddress,
    producerCountry: state.producerCountry,
    producerContact: state.producerContact
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: e => dispatch(actions.handleChange(e)),
    validate: e => dispatch(actions.validate(e))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Producer);
