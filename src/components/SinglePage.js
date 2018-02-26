import React from 'react';
import { connect } from 'react-redux';
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
        <div className="container-fluid">
          <div className="service">
          <Link to="/">Go back</Link>
          <ul className="list-stripped">
            {filteredResults
            .map((i, key)  => (
              <div key={key}>
                <h2>{i.PROVIDER_NAME}</h2>
                <p>{i.PHYSICAL_ADDRESS}</p>
                <h4>{i.SERVICE_NAME}</h4>
                <p>{i.SERVICE_DETAIL}</p>
              </div>
            ))}
          </ul>
        </div>
        </div>
        <MapResults map_results={filteredResults} />
      </div>
  } 
}


export default connect( 
  state => ({filters: state.filter, results: state.results}),
  actionCreators
  )(SinglePageInfo);
