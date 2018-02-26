let defaultState = {
  filter: [],
  results: [],
  map_results: []
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
        results: action.results
      }
    case 'FETCH_RESULTS':
      return {
        ...state,
        map_results: action.map_results
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
