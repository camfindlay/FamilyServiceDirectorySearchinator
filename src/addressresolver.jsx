import React from 'react';
import axios from 'axios';
import Service from './service.jsx';
import MapResults from './maps.jsx';
import { Button, Alert } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

class AddressResolver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {location: { longitude: '', latitude: ''}, address: false, addresses: []};
    this.fetchAddresses = this.fetchAddresses.bind(this);
    this.handleAddressSelection = this.handleAddressSelection.bind(this);
  }
  handleAddressSelection(selected) {
    //Object {
    // pxid: "2-.C.1N.2.4w.",
    // number: "1",
    // x: "174.285344",
    // y: "-39.329274",
    // postcode: "4332",
    // a: "1 Adrian Street, Stratford 4332",
    // postal: "1 Adrian Street, Stratford 4332",
    // mailtown: "Stratford",
    // ta: "Stratford District",
    // aims_address_id: "1397240", … }
    this.setState({
      address: selected.a,
      longitude: selected.x,
      latitude: selected.y
    });
    this.props.handler(this.state.address);
  }
  componentDidUpdate(prevProps /*, prevState*/) {
    // only update if data has changed
    if (prevProps !== this.props) {
      this.fetchAddresses();
    }
  }
  fetchAddresses() {
    let key = 'ADDRESSFINDER_DEMO_KEY';
    let url = "https://api.addressfinder.io/api/nz/address?";
    let query = `format=json&key=${key}&q=${this.props.address}`;

    axios.get(`${url}${query}`)
      .then(res => {
        this.setState({ addresses: res.data.completions });
    });
  }
  renderAddresses() {
    return this.state.addresses.map((record, i) =>
      <Address record={record} handler={this.props.handler}/>
    );
  }
  render() {
    if (this.state.address) {
      return (
        <div>
          Selected address:
          {this.state.address}
          {this.state.longitude} {this.state.latitude}
        </div>
        );
    }
    return (
      <div>
        <ol>{this.renderAddresses()}</ol>
      </div>
      );
  }
}

class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleAddressSelection = this.handleAddressSelection.bind(this);
  }
  handleAddressSelection() {
    let key = 'ADDRESSFINDER_DEMO_KEY';
    let url = "https://api.addressfinder.io/api/nz/address/info?";
    let query = `key=${key}&format=json&pxid=${this.props.record.pxid}`;

    axios.get(`${url}${query}`)
      .then(res => {
        this.setState({ selected: res.data });
        this.props.handler(res.data);
    });
  }
  render() {
    return (
      <li onClick={this.handleAddressSelection}>
        {this.props.record.a}
      </li>
      );
  }
}

export default AddressResolver;