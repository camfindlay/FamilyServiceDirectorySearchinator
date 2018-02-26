import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
// import axios from 'axios';
// import { Well, Nav } from 'react-bootstrap';
// import FilterButton from './FilterButton';
// import '../styles/Nav.css';

// class SearchFilters extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {records: []};
//     this.resourceId = '35de6bf8-b254-4025-89f5-da9eb6adf9a0';
//     this.fetchRecords(this.props.field);
//   }
//   fetchRecords(field) {
//     let sql = encodeURI(`SELECT "LEVEL_1_CATEGORY" as name, COUNT(*) as num FROM "${this.resourceId}" GROUP BY name ORDER BY name`);
//     let url = `https://catalogue.data.govt.nz/api/3/action/datastore_search_sql?sql=${sql}`;
//     axios.get(url)
//       .then(res => {
//         this.setState({ records: res.data.result.records });
//       });
//   }
//   renderButtons() {
//     return this.state.records.map((record) =>
//       <FilterButton key={record.name} record={record} handler={this.props.handler} selected={this.props.selected === record.name}/>
//     );
//   }
//   render() {
//     return (
//       <Well className="container-fluid">
//         <span>{this.props.label}</span>
//         <Nav className="list-stripped list-inline" bsStyle="tabs" activeKey={1} >{this.renderButtons()}</Nav>
//       </Well>
//     );
//   }
// }

// export default SearchFilters;

class SearchFilters extends Component {

componentWillMount () {
  this.props.loadFilters();
}
  
componentWillReceiveProps(nextProps) {
  if(nextProps.filter !== this.props.filter){
   
  }
}

  render() {
    return (
      <div>
        {this.props.filter.map(( data ) => (<button key={data.num} onClick={()=> this.props.loadResults(data.name)}> {data.name} </button>))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filter: state.filter
  }
}

export default connect(mapStateToProps, actionCreators)(SearchFilters);
