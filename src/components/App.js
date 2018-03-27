import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import MapResults from './Map/MapResults';
import AddressFinder from './Forms/AddressFinder';
import Filters from './Service/Filters';
import Service from '../components/Service/Service';
import Sharebar from '../components/Social/Sharebar';
import '../styles/Nav.css';
import '../styles/Form.css';
import Proximity from './Forms/Proximity';

class App extends Component {

  constructor() {
    super();
    this.state = {
      showMap: false,
      latlng: []
    };
  }

  debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  componentWillMount () {
    this.props.loadFilters();
    this.radiusChange = this.debounce(this.radiusChange,200);
  }

  resultButton () {
    if(this.props.results.length > 0){
      return <button className="btn-toggle" onClick={() => {
        this.setState({ showMap: !this.state.showMap}); }
      }>{this.state.showMap ? 'Show List' : 'Toggle Map'}</button>;
    }
  }

  resultCountButton () {
    if(!this.props.itemsLoading && this.props.hasSearched){
      if(this.props.noSearchVars){
        return <p className="resultsDesc">No search parameters supplied</p>;
      }else{
        return <p className="resultsDesc">Found {this.props.results.length} result{this.props.results.length !== 1 ? 's' : ''} {this.resultButton()} </p>;
      }
    }
  }

  keywordBlur(e){
    const clone = {...this.props.searchVars};
    clone.keyword = (e.target.value === '') ? null : e.target.value;
    clone.addressLatLng = (this.props.searchVars.addressLatLng === undefined ? this.state.latlng : this.props.searchVars.addressLatLng);
    this.props.loadResults(clone);
  }

  addressBlur(e){
    /* clears location details when the field is emptied */
    if(e.target.value === ''){
      this.setState({latlng: {}});
      this.props.loadResults({
        category: this.props.searchVars.category,
        keyword: this.props.searchVars.keyword,
        addressLatLng: {},
        radius: 25000
      });
    }
  }

  radiusChange(value){
    const clone = {...this.props.searchVars};
    const callback = this.props.loadResults;
    clone.radius = value*1;
    setImmediate(function() {
      callback(clone);
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <Filters data={this.props} searchVars={this.props.searchVars} />
        <form className="form" onSubmit={(e)=>{
          e.preventDefault();
          this.setState({latlng: this.props.searchVars.addressLatLng});
          const clone = {...this.props.searchVars};
          clone.addressLatLng = (this.props.searchVars.addressLatLng === undefined ? this.state.latlng : this.props.searchVars.addressLatLng);
          clone.keyword = e.target.keyword.value;
          this.props.loadResults(clone);
        }}>
          <input type="search" name="keyword" onBlur={this.keywordBlur.bind(this)} placeholder="Enter topic or organisation" />
          <AddressFinder data={this.props} handler={this.addressBlur.bind(this)} radius={this.props.searchVars.radius}/>
          {this.props.searchVars.addressLatLng && Object.keys(this.props.searchVars.addressLatLng).length !== 0 &&
            <Proximity handler={this.radiusChange.bind(this)} radius={this.props.searchVars.radius}/>
          }
          <button type="submit">Search</button>
        </form>
        <div className={'results' + (this.props.itemsLoading ? ' loading' : '')}>
          {this.resultCountButton()}
          { !this.props.itemsLoading && this.state.showMap && <MapResults className="container-fluid" LatLng={this.props.searchVars.addressLatLng} map_results={this.props.results} />}
          { !this.props.itemsLoading && !this.state.showMap && this.props.results.map((data)=> <Service results={data} searchVars={this.props.searchVars}  key={data.FSD_ID+data.LEVEL_1_CATEGORY+data.SERVICE_NAME} />)}
        </div>
        <Sharebar/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filters: state.filter,
    results: state.results,
    showMap: state.showMap,
    searchVars: state.searchVars,
    noSearchVars: state.noSearchVars,
    itemsLoading: state.itemsLoading,
    hasSearched: state.hasSearched
  };
}

export default connect(mapStateToProps, actionCreators)(App);
