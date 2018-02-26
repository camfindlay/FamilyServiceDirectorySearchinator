let defaultState = {
  filter: [],
  results: [],
  name: ''
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
        name: action.name
      }
    default:
      return {
        ...state
      }
  }
}

export default mainReducer;
