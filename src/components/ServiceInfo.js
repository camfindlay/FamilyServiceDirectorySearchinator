import React from 'react';
import { Link } from 'react-router-dom';

class ServiceInfo extends React.Component {

  render() {
    let data = this.props.results;
    return (
      <div>
        <Link to={`/place/${data.FSD_ID}`}>{data.SERVICE_NAME}</Link>
        <p>Info here</p>
      </div>
    );
  }
}

export default ServiceInfo;
