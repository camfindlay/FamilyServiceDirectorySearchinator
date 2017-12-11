import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import 'foundation-sites/dist/css/foundation.min.css';
import Categories from './category.jsx';
import SearchResults from './searchresult.jsx';

class SearchForm extends React.Component {
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
    this.props.handler(this.state.value);
    event.preventDefault();
  }
  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          ngā kupu:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="haere" onSubmit={this.handleSubmit} />
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', results: []};
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(keyword) {
    let url = `https://catalogue.data.govt.nz/api/3/action/datastore_search?resource_id=35de6bf8-b254-4025-89f5-da9eb6adf9a0&q=${keyword}`;
    axios.get(url)
      .then(res => {
        this.setState({ results: res.data.result.records });
      });
  }
  render() {
    return (
      <div>
        <h1>Whānau Services Search</h1>
        <SearchForm value={this.state.value} handler={this.handleSearch} />
        Categories: <Categories />
        <SearchResults results={this.state.results} />
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
