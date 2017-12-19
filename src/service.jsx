import React from 'react';
import { Breadcrumbs, BreadcrumbItem, Callout} from 'react-foundation';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Service extends React.Component {
  constructor(props) {
    super(props);
    this.state = {records: []};
    this.resourceId = '35de6bf8-b254-4025-89f5-da9eb6adf9a0';
    this.fetchRecord = this.fetchRecord.bind(this);
    this.fetchRecord(props.record.FSD_ID);
  }
  filters(FSD_ID) {
    let filters = {'FSD_ID': FSD_ID};
    return JSON.stringify(filters);
  }
  renderCategories() {
    return this.state.records.map((record) =>
      <Breadcrumbs>
        <BreadcrumbItem>{record.LEVEL_1_CATEGORY}</BreadcrumbItem>
        <BreadcrumbItem>{record.LEVEL_2_CATEGORY}</BreadcrumbItem>
      </Breadcrumbs>
    );
  }

  fetchRecord(FSD_ID) {
    let url = 'https://catalogue.data.govt.nz/api/3/action/datastore_search?';
    let query = `resource_id=${this.resourceId}&filters=${this.filters(FSD_ID)}`;
    axios.get(`${url}${query}`)
      .then(res => {
        // TODO condense into one record
        this.setState({ records: res.data.result.records });
        this.setState(res.data.result.records[0]);
      });
  }
  dialAddress() {
    return `tel:${this.props.record.PUBLISHED_PHONE_1}`;
  }
  render() {
    return (
      <Callout>
        <Link to={this.props.record.FSD_ID}>
          <h3>{this.state.PROVIDER_NAME}</h3>
        </Link>
        <dl>
          <dt>Email</dt>
          <dd>{this.state.PUBLISHED_CONTACT_EMAIL_1}</dd>
          <dt>Phone</dt>
          <dd>
            <a href={this.dialAddress()}>{this.state.PUBLISHED_PHONE_1}</a>
            <p>({this.state.PROVIDER_CONTACT_AVAILABILITY})</p>
          </dd>
          <dt>Organisation purpose</dt>
          <dd>{this.state.ORGANISATION_PURPOSE}</dd>
          <dt>Physical address</dt>
          <dd>{this.state.PHYSICAL_ADDRESS}</dd>
          <dt>Service name</dt>
          <dd>{this.state.SERVICE_NAME}</dd>
          <dt>Service detail</dt>
          <dd>{this.state.SERVICE_DETAIL}</dd>
          <dt>Delivery methods</dt>
          <dd>{this.state.DELIVERY_METHODS}</dd>
          <dt>Costs:</dt>
          <dd>{this.state.COST_TYPE}</dd>
          <dt>Service referrals</dt>
          <dd>{this.state.SERVICE_REFERRALS}</dd>
        </dl>
        {this.renderCategories()}
      </Callout>
    );
  }
}

export default Service;