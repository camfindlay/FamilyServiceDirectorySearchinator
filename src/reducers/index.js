let defaultState = {
  filter: []
}

const mainReducer = (state=defaultState, action) => {
  if(action.type === 'SHOW_FILTERS'){
    return {
      ...state,
      filter: action.filters
    }
  } else {
    return {
      ...state
    }
  }
}

export default mainReducer;
