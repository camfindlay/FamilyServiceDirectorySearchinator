import React, { Component } from 'react';

class Info extends Component {

  render() {
    const props = this.props.record.location.state;
    
    return (
      <div className="container-fluid">
        <div className="service-info">
          <h2>{props.PROVIDER_NAME}</h2>
          <h4>{props.SERVICE_NAME}</h4>
          <p>{props.SERVICE_DETAIL}</p>
          <dt>Email</dt>
            <dd>{props.PUBLISHED_CONTACT_EMAIL_1}</dd>
            <dt>Phone</dt>
            <dd>
              <a className="telephone" href={`tel:${props.PUBLISHED_PHONE_1}`}>{props.PUBLISHED_PHONE_1}</a>
              <p><small><em>({props.PROVIDER_CONTACT_AVAILABILITY})</em></small></p>
            </dd>
            <dl>
            <dt>Organisation purpose</dt>
            <dd>{props.ORGANISATION_PURPOSE}</dd>
            <dt>Physical address</dt>
            <dd>{props.PHYSICAL_ADDRESS}</dd>
            <dt>Delivery Methods</dt>
            <dd>{props.DELIVERY_METHODS}</dd>
            <dt>Costs</dt>
            <dd>{props.COST_TYPE}</dd>
            <dt>Service referrals</dt>
            <dd>{props.SERVICE_REFERRALS}</dd>
          </dl>
        </div>
      </div>
    );
  }
}

export default Info;
