import Filters from './filters.jsx';

class Regions extends Filters {
  constructor(props) {
    super(props);
    this.state = {records: [], label: 'Region'};
    this.fetchRecords('PHYSICAL_REGION');
  }

}

export default Regions;