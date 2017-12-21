import React from 'react';
// import { render } from 'react-dom';
import {  Map, TileLayer, Marker, Popup } from 'react-leaflet';

// const React = window.React;
// const { Map, TileLayer, Marker, Popup } = window.ReactLeaflet;

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
            <span>{this.props.record.PROVIDER_NAME}</span>
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
      zoom: 7,
    };
  }
  renderMarkers() {
    return this.props.results.map((record, i) =>
      <ServiceMapMarker key={'marker'+i} record={record} />
    );
  }
  render() {
    let centre = [this.state.lat, this.state.lng];
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
