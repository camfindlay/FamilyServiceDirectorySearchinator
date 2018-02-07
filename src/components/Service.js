import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Service extends Component {
  constructor() {
		super();
		this.state = {
			shown: true,
		};
	}	
	
	toggle(e) {
		this.setState({
			shown: !this.state.shown
		});
    e.preventDefault();
	}
  urlify(str) {
    return str.replace(/ /g,'-').replace('---','-').replace(' ', '-').toLowerCase();
  }
  render() {
		let hidden = {
			display: this.state.shown ? "none" : "block"
		}
    console.log(this.props.record)
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
        state: this.props.record}} onClick={()=>this.props.changeResult(this.props.record.FSD_ID)}>{PROVIDER_NAME}</Link>

        <span onClick={()=>this.props.changeResult(this.props.record.FSD_ID)}><h3>{PROVIDER_NAME}</h3></span>

        <h4>{SERVICE_NAME}</h4>
        <p>{SERVICE_DETAIL}</p>
        <dt>Email</dt>
          <dd>{PUBLISHED_CONTACT_EMAIL_1}</dd>
          <dt>Phone</dt>
          <dd>
            <a href={`tel:${PUBLISHED_PHONE_1}`}>{PUBLISHED_PHONE_1}</a>
            <p><small><em>({PROVIDER_CONTACT_AVAILABILITY})</em></small></p>
          </dd>
				<div style={ hidden } className="service-info">
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
    );
  }
}

export default Service;
