import SearchFilters from './base.jsx';

class Categories extends SearchFilters {
  constructor(props) {
    super(props);
    this.state = {records: [], label: 'Category', field: 'LEVEL_1_CATEGORY'};
    this.fetchRecords('LEVEL_1_CATEGORY');
  }
}

export default Categories;