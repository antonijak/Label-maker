import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';

import './styles.scss';

const Company = props => {
  const {
    use,
    company,
    companyList,
    companyVisible,
    errorMessage,
    title,
    addCompany,
    useCompany,
    removeCompany,
    toggleCompanies,
    handleChange
  } = props;

  return (
    <div className="container company">
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
                  item.name === company.name
                    ? 'company__list__item active'
                    : 'company__list__item'
                }
              >
                <span>{item.name}</span>
                <button
                  className="company__list__item__delete"
                  onClick={e => removeCompany(e, item.id, use)}
                />
              </div>
            ))}
            <button
              onClick={e => toggleCompanies(e, use)}
              className="company__list__item add"
            >
              + Add new
            </button>
          </div>
        ) : (
          <div>
            <small>{errorMessage}</small>
            <input
              name="name"
              type="text"
              onChange={e => handleChange(e, use)}
              value={company.name}
              placeholder="Company name"
            />
            <input
              name="address"
              type="text"
              onChange={e => handleChange(e, use)}
              value={company.address}
              placeholder="Company address"
            />
            <input
              name="country"
              type="text"
              onChange={e => handleChange(e, use)}
              value={company.country}
              placeholder="Country"
            />
            <input
              name="contact"
              type="text"
              onChange={e => handleChange(e, use)}
              value={company.contact}
              placeholder="Contact*"
            />
            <div className="company__buttons">
              <button
                type="button"
                className="company__buttons__button save btn"
                onClick={e => addCompany(e, use)}
              >
                Save
              </button>
              {companyList.length > 0 && (
                <button
                  type="button"
                  className="company__buttons__button use btn"
                  onClick={e => toggleCompanies(e, use)}
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

const mapDispatchToProps = dispatch => {
  return {
    handleChange: (e, use) => dispatch(actions.handleChangeCompany(e, use)),
    toggleCompanies: (e, use) => dispatch(actions.toggleCompanies(e, use)),
    useCompany: (e, producer, use) =>
      dispatch(actions.useCompany(e, producer, use)),
    addCompany: (e, use) => dispatch(actions.addCompany(e, use)),
    removeCompany: (e, id, use) => dispatch(actions.removeCompany(e, id, use))
  };
};

export default connect(
  undefined,
  mapDispatchToProps
)(Company);
