export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

export const sortByDistance = (distance = '') => ({
  type: 'SORT_BY_DISTANCE',
  distance
});
