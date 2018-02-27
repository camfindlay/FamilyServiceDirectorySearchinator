let defaultState = {
  filter: [],
  results: [],
  category: '',
  keyword: '',
  map_results: [],
  addresses: []
}

const mainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_FILTERS':
      return {
        ...state,
        filter: action.filters
      }
    case 'SHOW_RESULTS':
      return {
        ...state,
        results: action.results,
        category: action.category,
        keyword: action.keyword
      }
    case 'SHOW_ALL_RESULTS':
      return {
        ...state,
        results: action.results
      }
    case 'FETCH_RESULTS':
      return {
        ...state,
        map_results: action.map_results
      }
    case 'FETCH_ADDRESSES':
      return {
        ...state,
        addresses: action.addresses
      }
    case 'SHOW_MAP':
      return true;
    default:
      return {
        ...state
      }
  }
}

export default mainReducer;
