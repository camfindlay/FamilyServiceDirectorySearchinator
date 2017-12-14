import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import 'foundation-sites/dist/css/foundation.css';
import Categories from './category.jsx';
import SearchForm from './searchform.jsx';
import SearchResults from './searchresult.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {keyword: '', category: ''};
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }
  handleCategoryChange(category){
    this.setState({category: category});
  }
  handleKeywordChange(keyword) {
    this.setState({keyword: keyword});
  }
  render() {
    return (
      <div>
        <h1>Whānau Services Search</h1>
        <Categories handler={this.handleCategoryChange} />
        <SearchForm handler={this.handleKeywordChange} />
        <SearchResults category={this.state.category} keyword={this.state.keyword} />
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
