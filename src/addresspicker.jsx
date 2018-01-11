import React from 'react';
import axios from 'axios';
import { Label, ButtonGroup, Button, Sizes } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

class AddressPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', results: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.handler(event.target.value);
  }
  handleSubmit(event) {
    this.props.handler(this.state.value);
    event.preventDefault();
  }
  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
      </form>
    );
  }
}

export default AddressPicker;