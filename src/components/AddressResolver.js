import React, { Component } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import Address from './Address';

class AddressResolver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: '',
      latitude: '',
      selected: false,
      addresses: []
    };
  }
  handleAddressSelection = (selected) => {
    this.setState({
      selected: true,
      longitude: selected.x,
      latitude: selected.y
    });
    this.props.handler(selected);
  }
  componentDidUpdate(prevProps /*, prevState*/) {
    // only update if data has changed
    if (prevProps !== this.props) {
      this.setState({selected: false});
      this.fetchAddresses();
    }
  }
  fetchAddresses = () => {
    if (this.props.address.length < 2)
      return;
    let key = 'ADDRESSFINDER_DEMO_KEY';
    let url = 'https://api.addressfinder.io/api/nz/address?';
    let query = `format=json&key=${key}&q=${this.props.address}`;

    axios.get(`${url}${query}`)
      .then(res => {
        this.setState({ addresses: res.data.completions });
      });
  }
  renderAddresses() {
    if (!this.state.hidden) {
      return this.state.addresses.map((record, i) =>
        <Address key={i} record={record} handler={this.handleAddressSelection} />
      );
    }
  }
  render() {
    if (this.props.address && !this.state.selected) {
      return (
        <ListGroup>
          {this.renderAddresses()}
        </ListGroup>
      );
    }
    else {
      return '';
    }
  }
}

export default AddressResolver;
