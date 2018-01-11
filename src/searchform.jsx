import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import styles from './searchform.css';

class SearchForm extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {keyword: '', results: []};
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleKeywordChange(event) {
    this.setState({keyword: event.target.value});
  }
  handleLocationChange(event) {
    this.setState({location: event.target.value});
  }
  handleSubmit(event) {
    this.props.handler({keyword: this.state.keyword, location: this.state.location});
    event.preventDefault();
  }
  className() {
    return styles.big;
  }
  render() {
    return(
      <div class={this.className()}>
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
              value={this.state.location}
              placeholder="Enter a Location"
              onChange={this.handleLocationChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <Button bsSize="large" block bsStyle="primary" onClick={this.handleSubmit}>
            search
          </Button>
        </form>
      </div>
    );
  }
}

export default SearchForm;