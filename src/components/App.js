import React, { Component } from 'react';
// import '../styles/index.css';
// import '../styles/Form.css';
// import SearchFilters from './SearchFilters';
// import SearchForm from './SearchForm';
// import SearchResults from './SearchResults';
// import Info from './Info';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {keyword: '', category: '', region: '', location: '', address: ''};
  }
  handleCategoryChange = category => {
    this.setState({category});
  }
  handleSearchParams = new_state => {
    this.setState(new_state);
  }
  searchResults() {
    if(window.location.pathname === '/') {
      return <SearchResults
          keyword={this.state.keyword}
          address={this.state.address}
          longitude={this.state.longitude}
          latitude={this.state.latitude}
          category={this.state.category}
          region={this.state.region} />
    } else {
      return <Info record={this.props}/>
    }
  }

  render() {
    return (
      <div>
        <h1 className="container-fluid">Find Whānau Services in your area</h1>
        <SearchFilters
          field='LEVEL_1_CATEGORY'
          label='Topics'
          selected={this.state.category}
          handler={this.handleCategoryChange} />
        <SearchForm handler={this.handleSearchParams} />
        {this.searchResults()}
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return state;
}

export default connect (mapStateToProps, actionCreators)(App);
