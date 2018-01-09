import React from 'react';
import axios from 'axios';
import { Label, ButtonGroup, Button } from 'react-foundation';
// import FilterButton from './filterbuttons.jsx';

class SearchFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {records: []};
    this.resourceId = '35de6bf8-b254-4025-89f5-da9eb6adf9a0';
    // this.fetchRecords();
  }
  fetchRecords(field) {
    let sql = encodeURI(`SELECT "${field}" as name, COUNT(*) as num FROM "${this.resourceId}" GROUP BY name ORDER BY name`);
    let url = `https://catalogue.data.govt.nz/api/3/action/datastore_search_sql?sql=${sql}`;
    axios.get(url)
      .then(res => {
        this.setState({ records: res.data.result.records });
      });
  }
  renderButtons() {
    return this.state.records.map((record) =>
      <FilterButton key={record.name} record={record} handler={this.props.handler} selected={this.props.selected === record.name}/>
    );
  }
  render() {
    return (
      <div>
        <Label>Region</Label>
        <ButtonGroup>
          {this.renderButtons()}
        </ButtonGroup>
      </div>
    );
  }
}

class FilterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSelection = this.handleSelection.bind(this);
  }
  handleSelection() {
    let newSelection;
    if(this.props.selected) {
      newSelection = '';
    }
    else {
      newSelection = this.props.record.name;
    }
    this.props.handler(newSelection);
  }
  render() {
    if (this.props.record.name) {
      return (
        <Button isHollow={! this.props.selected} onClick={this.handleSelection}>
          {this.props.record.name}
          <sub>({this.props.record.num})</sub>
        </Button>
      );
    }
    else {
      return '';
    }
  }
}

export default SearchFilters;