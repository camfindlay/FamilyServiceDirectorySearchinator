import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SearchResult extends React.Component {
  render() {
    return (
      <div className="search-result">
        <Link to={this.props.record.FSD_ID}>
          <h3>{this.props.record.PROVIDER_NAME}</h3>
        </Link>
        <sub>{this.props.record.PROVIDER_WEBSITE_1}</sub>
        <p>{this.props.record.PHYSICAL_REGION}</p>
        <p>{this.props.record.LATITUDE} {this.props.record.LONGITUDE}</p>
        <p>{this.props.record.ORGANISATION_PURPOSE}</p>
      </div>
    );
  }
}

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', results: []};
  }
  render() {
    return this.props.results.map((record) =>
      <SearchResult record={record} />
    );
  }
}

export default SearchResults;
