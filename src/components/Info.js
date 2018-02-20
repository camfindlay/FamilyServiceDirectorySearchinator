import React, { Component } from 'react';

import App from './App';
class Info extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
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
    } = this.props.location.state;
    
    return (
      <div>
        <App/>
      <div className="service-info">
        <div className="container-fluid">
          <h2>{PROVIDER_NAME}</h2>
          <h4>{SERVICE_NAME}</h4>
          <p>{SERVICE_DETAIL}</p>
          <dt>Email</dt>
            <dd>{PUBLISHED_CONTACT_EMAIL_1}</dd>
            <dt>Phone</dt>
            <dd>
              <a href={`tel:${PUBLISHED_PHONE_1}`}>{PUBLISHED_PHONE_1}</a>
              <p><small><em>({PROVIDER_CONTACT_AVAILABILITY})</em></small></p>
            </dd>
            <dl>
            <dt>Organisation purpose</dt>
            <dd>{ORGANISATION_PURPOSE}</dd>
            <dt>Physical address</dt>
            <dd>{PHYSICAL_ADDRESS}</dd>
            <dt>Delivery Methods</dt>
            <dd>{DELIVERY_METHODS}</dd>
            <dt>Costs</dt>
            <dd>{COST_TYPE}</dd>
            <dt>Service referrals</dt>
            <dd>{SERVICE_REFERRALS}</dd>
          </dl>
        </div>
      </div>
      </div>
    );
  }
}

export default Info;
