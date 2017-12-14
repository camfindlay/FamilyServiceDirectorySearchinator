import React from 'react';
import { Breadcrumbs, BreadcrumbItem, Callout} from 'react-foundation';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SearchResult extends React.Component {
  render() {
    return (
      <Callout>
        <Link to={this.props.record.FSD_ID}>
          <h3>{this.props.record.PROVIDER_NAME}</h3>
        </Link>
        <Breadcrumbs>
          <BreadcrumbItem>{this.props.record.LEVEL_1_CATEGORY}</BreadcrumbItem>
          <BreadcrumbItem>{this.props.record.LEVEL_2_CATEGORY}</BreadcrumbItem>
          <BreadcrumbItem>{this.props.record.PHYSICAL_REGION}</BreadcrumbItem>
        </Breadcrumbs>
        <dl>
          <dt>Email</dt>
          <dd>
            {this.props.record.PUBLISHED_CONTACT_EMAIL_1}
          </dd>
          <dt>Phone</dt>
          <dd>
            {this.props.record.PROVIDER_CONTACT_AVAILABILITY}
            {this.props.record.PUBLISHED_PHONE_1}
          </dd>
          <dt>Organisation purpose</dt>
          <dd>{this.props.record.ORGANISATION_PURPOSE}</dd>
          <dt>Physical_address</dt>
          <dd>{this.props.record.PHYSICAL_ADDRESS}</dd>
          <dt>Service_name</dt>
          <dd>{this.props.record.SERVICE_NAME}</dd>
          <dt>Service_detail</dt>
          <dd>{this.props.record.SERVICE_DETAIL}</dd>
          <dt>Delivery methods</dt>
          <dd>{this.props.record.DELIVERY_METHODS}</dd>
          <dt>Costs:</dt>
          <dd>{this.props.record.COST_TYPE}</dd>
          <dt>Service referrals</dt>
          <dd>{this.props.record.SERVICE_REFERRALS}</dd>
        </dl>
      </Callout>
    );
  }
}

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {results: []};
    this.doKeywordSearch = this.doKeywordSearch.bind(this);
    this.doFacetedSearch = this.doFacetedSearch.bind(this);
  }
  doFacetedSearch() {
    let sql = encodeURI(`SELECT * FROM "35de6bf8-b254-4025-89f5-da9eb6adf9a0" WHERE "LEVEL_1_CATEGORY"='${this.props.category}'`);
    let url = `https://catalogue.data.govt.nz/api/3/action/datastore_search_sql?sql=${sql}`;
    axios.get(url)
      .then(res => {
        this.setState({ results: res.data.result.records });
      });
  }
  doKeywordSearch() {
    let url = `https://catalogue.data.govt.nz/api/3/action/datastore_search?resource_id=35de6bf8-b254-4025-89f5-da9eb6adf9a0&q=${this.props.keyword}`;
    axios.get(url)
      .then(res => {
        this.setState({ results: res.data.result.records });
      });
  }
  componentDidUpdate(prevProps, prevState) {
    // only update if data has changed
    if (prevProps !== this.props) {
      this.doFacetedSearch();
    }
  }
  renderSearchResults() {
    return this.state.results.map((record) =>
      <SearchResult record={record} />
    );
  }
  render() {
    return (
      <div id="search-results">
        <p>keyword: {this.props.keyword}</p>
        <p>category: {this.props.category}</p>
        {this.renderSearchResults()}
      </div>
      );
  }
}

export default SearchResults;
