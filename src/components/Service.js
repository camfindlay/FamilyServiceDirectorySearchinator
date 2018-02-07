import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Service extends Component {
  constructor(props) {
    super(props);
  }
  urlify(url) {
    if(url !== undefined) {
      return url.toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g,'')
      .replace(/\s+/g,'-')
      .toLowerCase()
      .replace(/&/g,'-and-')
      .replace(/[^a-z0-9]/g,'')
      .replace(/-+/g,'-')
      .replace(/^-*/,'')
      .replace(/-*$/,'');
    }
  } 
  render() {
    return (
      <div className="service">
        <Link to={{
        pathname: `/service/${this.urlify(this.props.record.PROVIDER_NAME)}`,
        state: this.props.record}} onClick={()=>this.props.changeResult(this.props.record.FSD_ID)}><h3>{this.props.record.PROVIDER_NAME}</h3></Link>

        <h4>{this.props.record.SERVICE_NAME}</h4>
        <p>{this.props.record.SERVICE_DETAIL}</p>
        <dt>Email</dt>
          <dd>{this.props.record.PUBLISHED_CONTACT_EMAIL_1}</dd>
          <dt>Phone</dt>
          <dd>
            <a href={`tel:${this.props.record.PUBLISHED_PHONE_1}`}>{this.props.record.PUBLISHED_PHONE_1}</a>
            <p><small><em>({this.props.record.PROVIDER_CONTACT_AVAILABILITY})</em></small></p>
          </dd>
      </div>
    );
  }
}

export default Service;
