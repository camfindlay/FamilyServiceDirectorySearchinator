import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import axios from 'axios';
import './index.css';

class SearchResult extends React.Component {
  render() {
    return (
      <div className="search-result">
        <h3>{this.props.record.PROVIDER_NAME}</h3>
        <p>{this.props.record.PHYSICAL_REGION}</p>
        <p>{this.props.record.LATITUDE} {this.props.record.LONGITUDE}</p>
        <p>{this.props.record.ORGANISATION_PURPOSE}</p>
      </div>
    );
  }
}

class CategoryLink extends React.Component {
  render() {
    return (
      <li className="category-link">
        <Link to="whare" onClick={this.handleCategorySelection}>
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
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', results: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    this.fetchResults();
    event.preventDefault();
  }
  handleCategorySelection(event) {
    event.preventDefault();
  }
  fetchResults() {
    axios.get(`https://catalogue.data.govt.nz/api/3/action/datastore_search?resource_id=35de6bf8-b254-4025-89f5-da9eb6adf9a0&q=${this.state.value}`)
      .then(res => {
        this.setState({ results: res.data.result.records });
      });
  }
  renderSearchResults() {
    return this.state.results.map((record) =>
      <SearchResult record={record} />
    );
  }
  renderSearchForm() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          ngā kupu:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="haere" />
      </form>
    );
  }
  render() {
    return (
      <div>
        <h1>Whānau Services Search</h1>
        {this.renderSearchForm()}
        <Categories />
        {this.renderSearchResults()}
      </div>
    );
  }
}

// ========================================
ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('root'));
