import SearchFilters from './base.jsx';

class Regions extends SearchFilters {
  constructor(props) {
    super(props);
    this.state = {records: [], label: 'Region'};
    this.fetchRecords('PHYSICAL_REGION');
  }
}

export default Regions;