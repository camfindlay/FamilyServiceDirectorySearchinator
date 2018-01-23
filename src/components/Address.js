import React, { Component } from 'react';
import axios from 'axios';
import { ListGroupItem } from 'react-bootstrap';

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleAddressSelection = () => {
    let key = 'ADDRESSFINDER_DEMO_KEY';
    let url = 'https://api.addressfinder.io/api/nz/address/info?';
    let query = `key=${key}&format=json&pxid=${this.props.record.pxid}`;

    axios.get(`${url}${query}`)
      .then(res => {
        this.props.handler(res.data);
      });
  }
  render() {
    return (
      <ListGroupItem onClick={this.handleAddressSelection}>
        {this.props.record.a}
      </ListGroupItem>
    );
  }
}

export default Address;
