let defaultState = {
  filter: [],
  results: [],
  searchVars: {
    category: '',
    keyword: '',
    addressLatLng: {},
    radius: 25000
  },
  noSearchVars: false,
  itemsLoading: false,
  hasSearched: false
};

const mainReducer = (state = defaultState, action) => {
  switch (action.type) {
  case 'LOAD_RESULTS':
    return {
      ...state,
      itemsLoading: action.loading
    };
  case 'SHOW_FILTERS':
    return {
      ...state,
      filter: action.filters
    };
  case 'SHOW_RESULTS':
    return {
      ...state,
      results: action.results,
      searchVars: action.searchVars,
      noSearchVars: action.noSearchVars,
      hasSearched: true
    };
  case 'SHOW_SERVICE':
    return {
      ...state,
      results: action.results,
      searchVars: action.searchVars
    };
  default:
    return {
      ...state
    };
  }
};

export default mainReducer;
