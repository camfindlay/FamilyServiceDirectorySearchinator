import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import 'foundation-sites/dist/css/foundation.css';
import Categories from './category.jsx';
import SearchResults from './searchresult.jsx';
import { Button, Sizes, Label, Row } from 'react-foundation';
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
      <Row>
        <form onSubmit={this.handleSubmit}>
          <Label>
            keywords:
          </Label>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <Button isExpanded size={Sizes.LARGE} onSubmit={this.handleSubmit}>search</Button>
        </form>
      </Row>
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
        <Categories />
        <h3>keyword search</h3>
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
