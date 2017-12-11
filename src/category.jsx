import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ButtonGroup } from 'react-foundation';

class CategoryLink extends React.Component {
  render() {
    return (
      <Link to={this.props.record.name} onClick={this.handleCategorySelection}>
        {this.props.record.name}
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
    let sql = encodeURI('SELECT DISTINCT "LEVEL_1_CATEGORY" as name FROM "35de6bf8-b254-4025-89f5-da9eb6adf9a0" ORDER BY name');
    let url = `https://catalogue.data.govt.nz/api/3/action/datastore_search_sql?sql=${sql}`;
    axios.get(url)
      .then(res => {
        this.setState({ categories: res.data.result.records });
      });
  }
  render() {
    let categories = this.state.categories.map((record) =>
      <CategoryLink record={record} />
    );
    return (
      <ButtonGroup>
        {categories}
      </ButtonGroup>
    );
  }
}

export default Categories;