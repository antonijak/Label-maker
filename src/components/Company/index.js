import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';

import './styles.scss';

const Company = props => {
  const {
    use,
    producersList,
    resellerList,
    producersVisible,
    resellerVisible,
    validationErrors,
    handleChange,
    useCompany,
    addCompany,
    removeCompany,
    toggleCompany
  } = props;

  const company = use === 'producer' ? props.producer : props.company;
  const companyList = use === 'producer' ? producersList : resellerList;
  const companyVisible =
    use === 'producer' ? producersVisible : resellerVisible;
  const errorMessage =
    use === 'producer' ? validationErrors.producer : validationErrors.company;

  const title =
    use === 'producer'
      ? 'Producer information'
      : 'Distributor information (your company)';

  return (
    <div className="company  container">
      <h3 className="company__title">{title}</h3>
      <div>
        {companyList.length > 0 && companyVisible ? (
          <div className="company__list">
            {companyList.map((item, i) => (
              <div
                key={i + 1}
                onClick={e => {
                  useCompany(e, item, use);
                }}
                className={
                  use === 'producer'
                    ? item.producerName === company.producerName
                      ? 'company__list__item active'
                      : 'company__list__item'
                    : item.distributorName === company.distributorName
                    ? 'company__list__item active'
                    : 'company__list__item'
                }
              >
                <span>
                  {use === 'producer'
                    ? item.producerName
                    : item.distributorName}
                </span>
                <button
                  className="company__list__item__delete"
                  onClick={e => removeCompany(e, item.id, use)}
                />
              </div>
            ))}
            <button
              onClick={e => toggleCompany(e, use)}
              className="company__list__item add"
            >
              + Add new
            </button>
          </div>
        ) : (
          <div>
            <small>{errorMessage}</small>
            <input
              name={`${use}Name`}
              type="text"
              onChange={handleChange}
              value={
                use === 'producer'
                  ? company.producerName
                  : company.distributorName
              }
              placeholder="Company name"
            />
            <input
              name={`${use}Address`}
              type="text"
              onChange={handleChange}
              value={
                use === 'producer'
                  ? company.producerAddress
                  : company.distributorAddress
              }
              placeholder="Company address"
            />
            <input
              name={`${use}Country`}
              type="text"
              onChange={handleChange}
              value={
                use === 'producer'
                  ? company.producerCountry
                  : company.distributorCountry
              }
              placeholder="Country"
            />
            <input
              name={`${use}Contact`}
              type="text"
              onChange={handleChange}
              value={
                use === 'producer'
                  ? company.producerContact
                  : company.distributorContact
              }
              placeholder="Contact*"
            />
            <div className="company__buttons">
              <button
                className="company__buttons__button save"
                onClick={e => addCompany(e, use)}
              >
                Save
              </button>
              {companyList.length > 0 && (
                <button
                  className="company__buttons__button use"
                  onClick={e => toggleCompany(e, use)}
                >
                  Use from database
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    validationErrors: state.companiesReducer.validationErrors,
    company: state.companiesReducer.company,
    producer: state.companiesReducer.producer,
    producersList: state.companiesReducer.producersList,
    resellerList: state.companiesReducer.companyList,
    producersVisible: state.companiesReducer.producersVisible,
    resellerVisible: state.companiesReducer.companyVisible
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: e => dispatch(actions.handleChangeCompany(e)),
    toggleCompany: (e, use) => dispatch(actions.toggleCompany(e, use)),
    useCompany: (e, producer, use) =>
      dispatch(actions.useCompany(e, producer, use)),
    addCompany: (e, use) => dispatch(actions.addCompany(e, use)),
    removeCompany: (e, id, use) => dispatch(actions.removeCompany(e, id, use))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Company);
