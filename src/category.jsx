import Filters from './filters.jsx';

class Categories extends Filters {
  constructor(props) {
    super(props);
    this.state = {records: [], label: 'Category'};
    this.fetchRecords('LEVEL_1_CATEGORY');
  }
}

export default Categories;