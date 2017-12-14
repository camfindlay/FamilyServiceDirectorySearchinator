import React from 'react';
import axios from 'axios';
import { Menu, MenuText, MenuItem, TopBarRight, ResponsiveNavigation, Sizes } from 'react-foundation';
import { Link } from 'react-router-dom';

class CategoryLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isActive: false};
    this.handleCategorySelection = this.handleCategorySelection.bind(this);
  }
  handleCategorySelection() {
    this.props.handler(this.props.record.name);
  }
  render() {
    return (
      <Link to={this.props.record.name} onClick={this.handleCategorySelection}>
        {this.props.record.name}
        ({this.props.record.num})
      </Link>
    );
  }
}

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {categories: []};
    this.fetchCategories();
  }
  fetchCategories() {
    let sql = encodeURI('SELECT "LEVEL_1_CATEGORY" as name, COUNT(*) as num FROM "35de6bf8-b254-4025-89f5-da9eb6adf9a0" GROUP BY name ORDER BY name');
    let url = `https://catalogue.data.govt.nz/api/3/action/datastore_search_sql?sql=${sql}`;
    axios.get(url)
      .then(res => {
        this.setState({ categories: res.data.result.records });
      });
  }
  renderCategories() {
    return this.state.categories.map((record) =>
      <CategoryLink record={record} handler={this.props.handler} />
    );
  }
  render() {
    return this.renderCategories()
  }
}

export default Categories;