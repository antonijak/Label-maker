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
      producer,
      handleChange,
      showProducers,
      producersList,
      producersVisible,
      addExistingProducer,
      addProducer,
      errorMessage
    } = this.props;
    return (
      <div className="producer container">
        <h3 className="producer__title">Producer information</h3>
        <div>
          {producersList.length && producersVisible > 0 ? (
            <div className="producer__list">
              {producersList.map((item, i) => (
                <button
                  key={i + 1}
                  onClick={e => {
                    addExistingProducer(e, item);
                  }}
                  className={
                    item.producerName === producer.producerName
                      ? 'producer__list__item active'
                      : 'producer__list__item'
                  }
                >
                  {item.producerName}
                </button>
              ))}
              <button onClick={e => {}} className="producer__list__item">
                Add new
              </button>
            </div>
          ) : (
            <div>
              <small>{errorMessage}</small>
              <input
                name="producerName"
                type="text"
                onChange={handleChange}
                value={producer.producerName}
                placeholder="Company name"
              />
              <input
                name="producerAddress"
                type="text"
                onChange={handleChange}
                value={producer.producerAddress}
                placeholder="Company address"
              />
              <input
                name="producerCountry"
                type="text"
                onChange={handleChange}
                value={producer.producerCountry}
                placeholder="Country"
              />
              <input
                name="producerContact"
                type="text"
                onChange={handleChange}
                value={producer.producerContact}
                placeholder="Contact*"
              />
              <button className="producer__button save" onClick={addProducer}>
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    producersList: state.producersList,
    producer: state.producer,
    producersVisible: state.producersVisible,
    errorMessage: state.validationErrors.producer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: e => dispatch(actions.handleChange(e)),
    validate: e => dispatch(actions.validate(e)),
    showProducers: e => dispatch(actions.showProducers(e)),
    addExistingProducer: (e, producer) =>
      dispatch(actions.addExistingProducer(e, producer)),
    addProducer: e => dispatch(actions.addProducer(e))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Producer);
