import SearchFilters from './base.jsx';

class Categories extends SearchFilters {
  constructor(props) {
    super(props);
    this.state = {records: [], label: 'Category'};
    this.fetchRecords('LEVEL_1_CATEGORY');
  }
}

export default Categories;