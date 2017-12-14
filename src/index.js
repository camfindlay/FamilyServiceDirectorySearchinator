import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import 'foundation-sites/dist/css/foundation.css';
import Categories from './category.jsx';
import SearchForm from './searchform.jsx';
import SearchResults from './searchresult.jsx';

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
        <Categories />
        <SearchForm value={this.state.value} handler={this.handleSearch} />
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
