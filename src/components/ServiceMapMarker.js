import React, { Component } from 'react';
import { Marker, Popup } from 'react-leaflet';

class ServiceMapMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      LATITUDE,
      LONGITUDE,
      PROVIDER_NAME,
      SERVICE_NAME,
      ORGANISATION_PURPOSE,
      PHYSICAL_ADDRESS
    } = this.props.record;

    if (LATITUDE && LONGITUDE) {
      let position = [LATITUDE, LONGITUDE];
      return (
        <Marker position={position}>
          <Popup>
            <span>
              <h5>{PROVIDER_NAME}</h5>
              <h6>{SERVICE_NAME}</h6>
              <p>{ORGANISATION_PURPOSE}</p>
              <p>{PHYSICAL_ADDRESS}</p>
            </span>
          </Popup>
        </Marker>
      );
    }
    else {
      return '';
    }
  }
}

export default ServiceMapMarker;
