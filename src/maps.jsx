import React from 'react';
import {  Map, TileLayer, Marker, Popup } from 'react-leaflet';

class ServiceMapMarker extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: -41.0,
      lng: 174.0,
      // zoom: 13,
    };
  }
  render() {
    if (this.props.record.LATITUDE && this.props.record.LONGITUDE) {
      let position = [this.props.record.LATITUDE, this.props.record.LONGITUDE];
      return (
        <Marker position={position}>
          <Popup>
            <span>
              <h5>{this.props.record.PROVIDER_NAME}</h5>
              <h6>{this.props.record.SERVICE_NAME}</h6>
              <p>{this.props.record.SERVICE_DETAIL}</p>
              <p>{this.props.record.PHYSICAL_ADDRESS}</p>
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
class MapResults extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: -41.0,
      lng: 174.0,
      zoom: 6,
    };
  }
  renderMarkers() {
    return this.props.results.map((record, i) =>
      <ServiceMapMarker key={'marker'+i} record={record} />
    );
  }
  render() {
    let centre
    if (this.props.results.length > 0) {
      centre = [this.props.results[0].LATITUDE, this.props.results[0].LONGITUDE];
    } else {
      centre = [this.state.lat, this.state.lng];
    }

    return (
      <Map center={centre} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {this.renderMarkers()}
      </Map>
    );
  }
}

export default MapResults;
