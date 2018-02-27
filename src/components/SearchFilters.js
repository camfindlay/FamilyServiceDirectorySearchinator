import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import MapResults from './MapResults';
import ServiceInfo from '../components/ServiceInfo';
import '../styles/Nav.css';
import '../styles/Form.css';

class SearchFilters extends Component {

  constructor() {
    super();
    this.state = {
      showMap: false,
      category: '',
      address: '',
      show_addresses: false
    }
  }

  componentWillMount () {
    this.props.loadFilters();
  }

  selectAddress(address) {
    this.setState({show_addresses: false});
    this.refs.address.value = address;
  }

  clearInput(ref) {
    if(this.refs.ref.value === this.address){
      console.log('add', this.refs.ref.value + " = " + this.address)
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <nav className="nav">
          {this.props.filters.map(( data, key ) => {
            return (<button className={this.props.name === data.name ? 'selected'  : ''} key={data.num} 
              onClick={()=> {
              this.props.loadResults(data.name, '');
              this.setState({category: data.name})
            }}> {data.name} 
            </button>)
          })}
        </nav>
        <form className="form" onSubmit={(e)=>{
          e.preventDefault();
          this.props.loadResults('', e.target.keyword.value);
        }}>
          <input type="search" name="keyword" placeholder="Enter topic or organisation" />
          <input type="search" name="address" className="address-finder-input" placeholder="Enter a Location" ref="address" onChange={(e)=>{
            this.setState({address: e.target.value, show_addresses: true})
            this.props.fetchAddressFinder(this.state.address)
          }} />
          {this.state.show_addresses &&
            <ul className="address-finder list-stripped">
              {this.props.addresses.map((address, key) => <li key={key} onClick={()=>{this.selectAddress(address.a)}}>{address.a}</li>)}
            </ul>
          }
          <button type="submit">Search</button>
        </form>
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
    name: state.name,
    keyword: state.keyword,
    addresses: state.addresses
  }
}

export default connect(mapStateToProps, actionCreators)(SearchFilters);
