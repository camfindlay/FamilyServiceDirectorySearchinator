import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Service extends Component {
  urlify(str) {
    return str.replace(/ /g,'-').replace('---','-').replace(' ', '-').toLowerCase();
  }
  render() {
    const {
      FSD_ID,
      PROVIDER_NAME,
      SERVICE_NAME,
      SERVICE_DETAIL,
      ORGANISATION_PURPOSE,
      PUBLISHED_CONTACT_EMAIL_1,
      PUBLISHED_PHONE_1,
      PROVIDER_CONTACT_AVAILABILITY,
      PHYSICAL_ADDRESS,
      DELIVERY_METHODS,
      COST_TYPE,
      SERVICE_REFERRALS
    } = this.props.record;
    return (
      <div className="service">
        <Link to={{
        pathname: `/service/${this.urlify(PROVIDER_NAME)}`,
        state: this.props.record}} onClick={()=>this.props.changeResult(this.props.record.FSD_ID)}><h3>{PROVIDER_NAME}</h3></Link>

        <h4>{SERVICE_NAME}</h4>
        <p>{SERVICE_DETAIL}</p>
        <dt>Email</dt>
          <dd>{PUBLISHED_CONTACT_EMAIL_1}</dd>
          <dt>Phone</dt>
          <dd>
            <a href={`tel:${PUBLISHED_PHONE_1}`}>{PUBLISHED_PHONE_1}</a>
            <p><small><em>({PROVIDER_CONTACT_AVAILABILITY})</em></small></p>
          </dd>
      </div>
    );
  }
}

export default Service;
