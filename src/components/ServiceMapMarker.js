import React, { Component } from 'react';
import { Marker, Popup } from 'react-leaflet';

class ServiceMapMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const props = this.props.record;

    if (props.LATITUDE && props.LONGITUDE) {
      let position = [props.LATITUDE, props.LONGITUDE];

      return (
        <Marker position={position}>
          <Popup>
            <span>
              <h5>{props.PROVIDER_NAME}</h5>
              <h6>{props.SERVICE_NAME}</h6>
              <p>{props.ORGANISATION_PURPOSE}</p>
              <p>{props.PHYSICAL_ADDRESS}</p>
            </span>
          </Popup>
        </Marker>
      );
    } else {
      return '';
    }
  }
}

export default ServiceMapMarker;
