import React from 'react';
import axios from 'axios';
import Service from './service.jsx';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.resourceId = '35de6bf8-b254-4025-89f5-da9eb6adf9a0';
    this.state = {results: []};
    this.fetchResults = this.fetchResults.bind(this);
  }
  filters() {
    let filters = {};
    if(this.props.category) {
      filters['LEVEL_1_CATEGORY'] = this.props.category;
    }
    if(this.props.region) {
      filters['PHYSICAL_REGION'] = this.props.region;
    }
    return JSON.stringify(filters);
  }
  fetchResults() {
    let url = 'https://catalogue.data.govt.nz/api/3/action/datastore_search?';
    let query = `resource_id=${this.resourceId}&q=${this.props.keyword}&limit=100&distinct=true&fields=FSD_ID&filters=${this.filters()}`;
    axios.get(`${url}${query}`)
      .then(res => {
        this.setState({ results: res.data.result.records });
      });
  }
  componentDidUpdate(prevProps /*, prevState*/) {
    // only update if data has changed
    if (prevProps !== this.props) {
      this.fetchResults();
    }
  }
  render() {
    return this.state.results.map((record) =>
      <Service key={record.FSD_ID} record={record} />
    );
  }
}

export default SearchResults;
