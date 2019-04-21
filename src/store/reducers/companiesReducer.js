import * as actionTypes from '../actions/actionTypes';
import uuid from 'uuid/v4';

const companiesState = {
  producer: {
    producerName: '',
    producerAddress: '',
    producerCountry: '',
    producerContact: ''
  },
  producersList: [],
  producersVisible: false,
  company: {
    distributorName: '',
    distributorAddress: '',
    distributorCountry: '',
    distributorContact: ''
  },
  companyList: [],
  companyVisible: false,
  validationErrors: {
    producer: '',
    company: ''
  }
};

const reducer = (state = companiesState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_CHANGE_COMPANY:
      let name = action.payload.target.name;
      let value = action.payload.target.value;
      if (
        name === 'producerName' ||
        name === 'producerAddress' ||
        name === 'producerCountry' ||
        name === 'producerContact'
      ) {
        return { ...state, producer: { ...state.producer, [name]: value } };
      } else if (
        name === 'distributorName' ||
        name === 'distributorAddress' ||
        name === 'distributorCountry' ||
        name === 'distributorContact'
      ) {
        return { ...state, company: { ...state.company, [name]: value } };
      } else {
        return { ...state, [name]: value };
      }

    case actionTypes.TOGGLE_COMPANY:
      action.payload.event.preventDefault();
      let use = action.payload.use;

      if (use === 'producer') {
        let producer = state.producersVisible
          ? {
              producerName: '',
              producerAddress: '',
              producerCountry: '',
              producerContact: ''
            }
          : state.producer;
        return {
          ...state,
          producersVisible: !state.producersVisible,
          producer,
          validationErrors: { ...state.validationErrors, producer: '' }
        };
      } else if (use === 'distributor') {
        let company = state.companyVisible
          ? {
              distributorName: '',
              distributorAddress: '',
              distributorCountry: '',
              distributorContact: ''
            }
          : state.producer;
        return {
          ...state,
          companyVisible: !state.companyVisible,
          company,
          validationErrors: { ...state.validationErrors, company: '' }
        };
      }
      return state;

    case actionTypes.USE_COMPANY:
      let { event } = action.payload;
      let company = action.payload.company;
      use = action.payload.use;
      event.preventDefault();
      return use === 'producer'
        ? { ...state, producer: company }
        : { ...state, company };

    case actionTypes.ADD_COMPANY:
      action.payload.event.preventDefault();
      use = action.payload.use;

      if (
        use === 'producer' &&
        state.producer.producerName &&
        state.producer.producerAddress &&
        state.producer.producerCountry
      ) {
        let duplicate = state.producersList.some(
          producer => producer.producerName === state.producer.producerName
        );
        return !duplicate
          ? {
              ...state,
              producersVisible: true,
              producersList: [
                ...state.producersList,
                { ...state.producer, id: uuid() }
              ],
              validationErrors: {
                ...state.validationErrors,
                producer: ''
              }
            }
          : {
              ...state,
              validationErrors: {
                ...state.validationErrors,
                producer: 'Company already exist in the database'
              }
            };
      } else if (
        use === 'distributor' &&
        state.company.distributorName &&
        state.company.distributorAddress &&
        state.company.distributorCountry
      ) {
        let duplicate = state.companyList.some(
          company => company.distributorName === state.company.distributorName
        );

        return !duplicate
          ? {
              ...state,
              companyVisible: true,
              companyList: [
                ...state.companyList,
                { ...state.company, id: uuid() }
              ],
              validationErrors: {
                ...state.validationErrors,
                company: ''
              }
            }
          : {
              ...state,
              validationErrors: {
                ...state.validationErrors,
                company: 'Company already exist in the database'
              }
            };
      } else {
        return use === 'producer'
          ? {
              ...state,
              validationErrors: {
                ...state.validationErrors,
                producer:
                  'You need to specify name, address and country to be able to save'
              }
            }
          : {
              ...state,
              validationErrors: {
                ...state.validationErrors,
                company:
                  'You need to specify name, address and country to be able to save'
              }
            };
      }

    case actionTypes.REMOVE_COMPANY:
      let id = action.payload.id;
      event = action.payload.event;
      use = action.payload.use;
      event.preventDefault();
      event.stopPropagation();

      if (use === 'producer') {
        const filteredProducersList = state.producersList.filter(
          producer => producer.id !== id
        );
        if (window.confirm('Are you sure you want to delete this company?')) {
          return {
            ...state,
            producersList: filteredProducersList,
            producer: {
              producerName: '',
              producerAddress: '',
              producerCountry: '',
              producerContact: ''
            }
          };
        }
      } else if (use === 'distributor') {
        const filteredCompanyList = state.companyList.filter(
          producer => producer.id !== id
        );
        if (window.confirm('Are you sure you want to delete this company?')) {
          return {
            ...state,
            companyList: filteredCompanyList,
            company: {
              distributorName: '',
              distributorAddress: '',
              distributorCountry: '',
              distributorContact: ''
            }
          };
        }
      }

      return state;

    default:
      return state;
  }
};

export default reducer;
