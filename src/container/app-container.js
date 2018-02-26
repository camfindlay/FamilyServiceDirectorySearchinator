import React, { Component } from 'react';
import SearchFilters from '../components/SearchFilters';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';

class AppCon extends Component {
  
  render() {
    return (
      <div>
        <SearchFilters filters={this.props.loadFilters} />
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return state;
}

export default connect (mapStateToProps, actionCreators)(AppCon);
