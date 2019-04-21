import * as actionTypes from '../actions/actionTypes';
import uuid from 'uuid/v4';

const companiesState = {
  producer: {
    name: '',
    address: '',
    country: '',
    contact: ''
  },
  producersList: [],
  producersVisible: false,
  distributor: {
    name: '',
    address: '',
    country: '',
    contact: ''
  },
  distributorsList: [],
  distributorsVisible: false,
  validationErrors: {
    producer: '',
    distributor: ''
  }
};

const reducer = (state = companiesState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_CHANGE_COMPANY:
      let { event, use } = action.payload;
      let { name, value } = event.target;
      return use === 'producer'
        ? { ...state, producer: { ...state.producer, [name]: value } }
        : { ...state, distributor: { ...state.distributor, [name]: value } };

    case actionTypes.TOGGLE_COMPANY:
      action.payload.event.preventDefault();
      use = action.payload.use;

      if (use === 'producer') {
        let producer = state.producersVisible
          ? {
              name: '',
              address: '',
              country: '',
              contact: ''
            }
          : state.producer;

        return {
          ...state,
          producersVisible: !state.producersVisible,
          producer,
          validationErrors: { ...state.validationErrors, producer: '' }
        };
      } else if (use === 'distributor') {
        let distributor = state.distributorsVisible
          ? {
              name: '',
              address: '',
              country: '',
              contact: ''
            }
          : state.producer;
        return {
          ...state,
          distributorsVisible: !state.distributorsVisible,
          distributor,
          validationErrors: { ...state.validationErrors, distributor: '' }
        };
      }
      return state;

    case actionTypes.USE_COMPANY:
      event = action.payload.event;
      let company = action.payload.company;
      use = action.payload.use;
      event.preventDefault();
      return use === 'producer'
        ? { ...state, producer: company }
        : { ...state, distributor: company };

    case actionTypes.ADD_COMPANY:
      action.payload.event.preventDefault();
      use = action.payload.use;

      if (
        use === 'producer' &&
        state.producer.name &&
        state.producer.address &&
        state.producer.country
      ) {
        let duplicate = state.producersList.some(
          producer => producer.name === state.producer.name
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
        state.distributor.name &&
        state.distributor.address &&
        state.distributor.country
      ) {
        let duplicate = state.distributorsList.some(
          distributor => distributor.name === state.distributor.name
        );

        return !duplicate
          ? {
              ...state,
              distributorsVisible: true,
              distributorsList: [
                ...state.distributorsList,
                { ...state.distributor, id: uuid() }
              ],
              validationErrors: {
                ...state.validationErrors,
                distributor: ''
              }
            }
          : {
              ...state,
              validationErrors: {
                ...state.validationErrors,
                distributor: 'Company already exist in the database'
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
                distributor:
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
              name: '',
              address: '',
              country: '',
              contact: ''
            }
          };
        }
      } else if (use === 'distributor') {
        const distributorsList = state.distributorsList.filter(
          producer => producer.id !== id
        );
        if (window.confirm('Are you sure you want to delete this company?')) {
          return {
            ...state,
            distributorsList,
            distributor: {
              name: '',
              address: '',
              country: '',
              contact: ''
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
