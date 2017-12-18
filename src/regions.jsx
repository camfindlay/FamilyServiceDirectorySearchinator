import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Label, Menu, MenuItem } from 'react-foundation';
class RegionLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleRegionSelection = this.handleRegionSelection.bind(this);
  }
  handleRegionSelection() {
    this.props.handler(this.props.record.name);
  }
  render() {
    return (
      <MenuItem isActive={this.props.selected}>
        {this.props.selected}
        <Link to={this.props.record.name} onClick={this.handleRegionSelection}>
          {this.props.record.name}
          <sub>({this.props.record.num})</sub>
        </Link>
      </MenuItem>
    );
  }
}

class Regions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {categories: []};
    this.fetchRegions();
  }
  fetchRegions() {
    let resourceId = '35de6bf8-b254-4025-89f5-da9eb6adf9a0';
    let sql = encodeURI(`SELECT "PHYSICAL_REGION" as name, COUNT(*) as num FROM "${resourceId}" GROUP BY name ORDER BY name`);
    let url = `https://catalogue.data.govt.nz/api/3/action/datastore_search_sql?sql=${sql}`;
    axios.get(url)
      .then(res => {
        this.setState({ categories: res.data.result.records });
      });
  }
  renderRegions() {
    return this.state.categories.map((record) =>
      <RegionLink record={record} handler={this.props.handler} selected={this.props.selected === record.name}/>
    );
  }
  render() {
    return (
      <div>
        <Label>Regions</Label>
        <Menu>
          {this.renderRegions()}
        </Menu>
      </div>
      );
  }
}

export default Regions;