import React from 'react';
import axios from 'axios';
import Service from './Service';
import MapResults from './MapResults';
import Info from './Info';
import { Button, Alert } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import '../styles/SearchResults.css';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.resourceId = '35de6bf8-b254-4025-89f5-da9eb6adf9a0';
    this.state = {
      results: [], 
      show_map: false,
      fetch_results: true
    };
  }
  toggleShowMap = () => {
    this.setState({'show_map': !this.state.show_map});
  }
  fields() {
    return 'FSD_ID,LONGITUDE,LATITUDE,PROVIDER_NAME,PUBLISHED_CONTACT_EMAIL_1,PUBLISHED_PHONE_1,PROVIDER_CONTACT_AVAILABILITY,ORGANISATION_PURPOSE,PHYSICAL_ADDRESS,SERVICE_NAME,SERVICE_DETAIL,DELIVERY_METHODS,COST_TYPE,SERVICE_REFERRALS';
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
  queryEntered() {
    return this.props.category || this.props.keyword || this.props.region || (this.props.longitude && this.props.latitude);
  }

  fetchResults = () => {
    if (this.queryEntered()) {
      this.setState({loading: true});
      let url = 'https://catalogue.data.govt.nz/api/3/action/datastore_search?';
      let query = `resource_id=${this.resourceId}&q=${this.props.keyword}&fields=${this.fields()}&distinct=true&filters=${this.filters()}`;
      axios.get(`${url}${query}`)
        .then(res => {
          this.setState({ results: res.data.result.records, loading: false });
        });
    }
    else {
      this.setState({results: []});
    }
  }
  componentDidUpdate(prevProps /*, prevState*/) {
    // only update if data has changed

    if (prevProps.category !== this.props.category) {
      this.fetchResults();
    }
  }
  renderServices() {
    return this.state.results.map((record, i) =>
      <Service key={'serv'+i} record={record} changeResult={this.renderServiceById.bind(this)} />
    );
  }
  renderServiceById(id) {
    var newResults = false;
    this.state.results.forEach(function(result) {
      if(result.FSD_ID === id) {
        newResults = result;
      }
    })
    this.setState({ results: [] })
  }
  renderLoading() {
    return (
      <div className="container-fluid">
        <div className="search-loader">
          <FontAwesome name='spinner' size='3x' spin />
          &nbsp; Fetching..
        </div>
      </div>
    );
  }
  renderMap() {
    const {
      longitude,
      latitude
    } = this.props;
    return (
      <div className="search-results">
        <div className="container-fluid">
          <Button onClick={this.toggleShowMap}><FontAwesome name='list' />List</Button>
          <MapResults className="container-fluid" results={this.state.results}
            longitude={longitude}
            latitude={latitude} />
        </div>
      </div>
    );
  }
  renderList() {
    return (
      <div className="search-results">
        <article className="container-fluid">
          <Button onClick={this.toggleShowMap}><FontAwesome name='map' /> Map</Button>
          {this.renderServices()}
        </article>
      </div>
    );
  }
  renderNoResults(){
    return (
      <div className="container-fluid">
        <Alert bsStyle="warning">
          No results
        </Alert>
      </div>
    );
  }
  render() {
    // Still loading
    if(this.state.loading) {
      return this.renderLoading();
    }

    // We have results
    if(this.state.results.length > 0 ) {
      if (this.state.show_map) {
        return this.renderMap();
      }
      else {
        return this.renderList();
      }
    }

    // No results
    if (this.queryEntered()) {
      return this.renderNoResults();
    }
    else {
      return '';
    }
  }
}

export default SearchResults;
