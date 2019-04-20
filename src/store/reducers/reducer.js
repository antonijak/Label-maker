import * as actionTypes from '../actions/actionTypes';
import uuid from 'uuid/v4';
import moment from 'moment';
import validate from 'validate.js';

const initialState = {
  title: '',
  description: '',
  ingredients: [
    {
      id: '01',
      title: '',
      addedIngredients: ['cocoa powder', 'cocoa butter', 'milk powder', 'sugar']
    }
  ],
  traces: [],
  weight: '',
  date: '',
  unit: 'g',
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
    weight: '',
    date: '',
    producer: '',
    company: ''
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_CHANGE:
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

    case actionTypes.HANDLE_PARTS:
      let { e, id } = action.payload;
      value = action.payload.value;
      e.preventDefault();
      return value === 'add'
        ? {
            ...state,
            ingredients: [
              ...state.ingredients,
              {
                id: uuid(),
                title: '',
                addedIngredients: [
                  'cocoa powder',
                  'cocoa butter',
                  'milk powder',
                  'sugar'
                ]
              }
            ]
          }
        : {
            ...state,
            ingredients: state.ingredients.filter(item => item.id !== id)
          };

    case actionTypes.SHOW_INGREDIENTS:
      return {
        ...state,
        ingredients: state.ingredients.map(item =>
          item.id === action.payload.id ? action.payload : item
        )
      };

    case actionTypes.SHOW_ALLERGEN:
      return {
        ...state,
        traces: [...state.traces, action.payload]
      };

    case actionTypes.REMOVE_ALLERGEN:
      return {
        ...state,
        traces: state.traces.filter(item => item !== action.payload)
      };

    case actionTypes.VALIDATE:
      name = action.payload.target.name;
      value = action.payload.target.value;

      switch (name) {
        case 'date':
          const today = moment(new Date()).format('YYYY-MM-DD');
          if (value && !moment(value).isBefore(today)) {
            return {
              ...state,
              date: value,
              validationErrors: { ...state.validationErrors, date: '' }
            };
          } else if (!value && !moment(value).isBefore(today)) {
            return {
              ...state,
              date: value,
              validationErrors: {
                ...state.validationErrors,
                date: 'This date is invalid!'
              }
            };
          } else {
            return {
              ...state,
              date: value,
              validationErrors: {
                ...state.validationErrors,
                date: 'This date has already passed!'
              }
            };
          }

        case 'weight':
          const pattern = /[0-9]*/;
          //check if input is number
          return validate(
            { weight: value },
            { weight: { format: pattern } }
          ) === undefined
            ? {
                ...state,
                weight: value,
                validationErrors: { ...state.validationErrors, weight: '' }
              }
            : {
                ...state,
                weight: value,
                validationErrors: {
                  ...state.validationErrors,
                  weight: 'Value must be a number!'
                }
              };

        default:
          return value;
      }

    case actionTypes.GET_UNIT:
      value = action.payload.target.value;
      return { ...state, unit: value };

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
        return {
          ...state,
          validationErrors: {
            ...state.validationErrors,
            company:
              'You need to specify name, address and country to be able to save',
            producer:
              'You need to specify name, address and country to be able to save'
          }
        };
      }

    case actionTypes.REMOVE_COMPANY:
      id = action.payload.id;
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
