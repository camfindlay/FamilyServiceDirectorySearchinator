import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CategoryLink extends React.Component {
  render() {
    return (
      <li className="category-link">
        <Link to={this.props.record.name} onClick={this.handleCategorySelection}>
          {this.props.record.name}
        </Link>
      </li>
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
    return this.state.categories.map((record) =>
      <CategoryLink record={record} />
    );
  }
}

export default Categories;