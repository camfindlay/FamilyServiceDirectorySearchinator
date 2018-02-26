import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actionCreators from '../actions/index';
import MapResults from './MapResults';
import { Link } from 'react-router-dom';

export class SinglePageInfo extends React.Component {

  componentWillMount () {
    this.props.loadFilters();
  }

  componentDidMount() {
    if (this.props.results.length === 0){
      this.props.loadResults(this.props.match.params.category)
    }
  }

  render(){
    const { match: { params: { name } } , results } = this.props;
    const filteredResults =  results
         .filter(item => item.FSD_ID === name)
         
    return <div>
      <Link to="/">Go back</Link>
      <ul>
         {filteredResults
         .map((i, key)  => <li key={key}>{i.PROVIDER_NAME}</li>)}</ul>       
         
         <MapResults map_results={filteredResults} />

         </div>
  } 
}


export default connect( 
  state => ({filters: state.filter, results: state.results}),
  actionCreators
  )(SinglePageInfo);
