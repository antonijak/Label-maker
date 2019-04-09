import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../store/actions/actions';

import './CustomDropdown.scss';

const CustomDropdown = ({ getUnit }) => {
  return (
    <span className="custom-dropdown">
      <select onChange={getUnit}>
        <option value="g">g</option>
        <option value="kg">kg</option>
      </select>
    </span>
  );
};

CustomDropdown.propTypes = {
  getTransactionType: PropTypes.func
};
const mapStateToProps = state => {
  return {
    unit: state.unit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUnit: e => dispatch(actions.getUnit(e))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomDropdown);
