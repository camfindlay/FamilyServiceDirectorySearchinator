import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import styles from './searchform.css';
import AddressResolver from './addressresolver.jsx';

class SearchForm extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {keyword: '', address: '', selected_address: '', longitude: '', latitude: '', results: []};
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleAddressSelection = this.handleAddressSelection.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleKeywordChange(event) {
    this.setState({keyword: event.target.value});
  }
  handleAddress(event) {
    this.setState({address: event.target.value});
  }
  handleAddressSelection(selected_address) {
    this.setState({selected_address: selected_address, address: selected_address.a, longitude: selected_address.x, latitude: selected_address.y});
    this.props.handler({selected_address: selected_address, longitude: selected_address.x, latitude: selected_address.y});
  }
  handleSubmit(event) {
    this.props.handler({keyword: this.state.keyword, location: this.state.location});
    event.preventDefault();
  }
  renderGeoLocation() {
    if (this.state.longitude && this.state.latitude)
      return <div>{this.state.longitude} {this.state.latitude}</div>;
    return '';
  }
  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <ControlLabel><FontAwesome name='search' /></ControlLabel>
          <FormControl
            type="text"
            value={this.state.keyword}
            placeholder="Enter topic or organisation"
            onChange={this.handleKeywordChange}
          />
          <FormControl.Feedback />
          <ControlLabel>
            <FontAwesome name='location-arrow' />
          </ControlLabel>
          <FormControl
            type="text"
            value={this.state.address}
            placeholder="Enter a Location"
            onChange={this.handleAddress}
          />
          <AddressResolver address={this.state.address} handler={this.handleAddressSelection} />
          {this.renderGeoLocation()}
          <FormControl.Feedback />
        </FormGroup>
        <Button bsSize="large" block bsStyle="primary" onClick={this.handleSubmit}>
          search
        </Button>
      </form>
    );
  }
}

export default SearchForm;