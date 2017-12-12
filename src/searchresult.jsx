import React from 'react';
import { Breadcrumbs, BreadcrumbItem, Callout} from 'react-foundation';
import { Link } from 'react-router-dom';

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
    this.state = {value: '', results: []};
  }
  renderSearchResults() {
    return this.props.results.map((record) =>
      <SearchResult record={record} />
    );
  }
  render() {
    return this.renderSearchResults()
  }
}

export default SearchResults;
