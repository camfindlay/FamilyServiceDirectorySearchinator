import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import MapResults from './MapResults';
import ServiceInfo from '../components/ServiceInfo';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';
import '../styles/Form.css';

class SearchFilters extends Component {

  constructor() {
    super();
    this.state = {
      showMap: false
    }
  }

  componentWillMount () {
    this.props.loadFilters();
  }


  render() {
    return (
      <div className="container-fluid">
        <nav className="nav">
          {this.props.filters.map(( data, key ) => {
            return (<a className={this.props.name === data.name ? 'selected'  : ''} href="#" key={data.num} 
            onClick={()=> {
            this.props.loadResults(data.name);
            }}> {data.name} 
            </a>)
          })}
        </nav>

        <div>
          <button className="btn-toggle" onClick={() => {
          this.setState({ showMap: !this.state.showMap})
          }}>Toggle Map</button>
          { this.state.showMap && <MapResults className="container-fluid" map_results={this.props.results} />}
          { !this.state.showMap && this.props.results.map((data, key)=> <ServiceInfo key={key} results={data} filter={this.props.name} />)}
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filters: state.filter,
    results: state.results,
    map_results: state.map_results,
    showMap: state.showMap,
    name: state.name
  }
}

export default connect(mapStateToProps, actionCreators)(SearchFilters);
