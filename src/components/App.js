import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import MapResults from './Map/MapResults';
import Service from '../components/Service/Service';
import '../styles/Nav.css';
import '../styles/Form.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      showMap: false,
      address: '',
      show_addresses: false
    }
  }

  componentWillMount () {
    this.props.loadFilters();
  }

  selectAddress(address) {
    this.setState({show_addresses: false});
    this.refs.address.value = address.a;
  }

  render() {
    console.log(this.props)
    return (
      <div className="container-fluid">
        <nav className="nav">
          {this.props.filters.map(( data, key ) => {
            return (<button className={this.props.category === data.name ? 'selected'  : ''} key={data.num} 
              onClick={()=> {
              this.setState({category: data.name})
              this.props.loadResults(data.name, '');
            }}> {data.name} 
            </button>)
          })}
        </nav>
        <form className="form" onSubmit={(e)=>{
          e.preventDefault();
          this.props.loadResults(this.state.category, e.target.keyword.value);
        }}>
          <input type="search" name="keyword" placeholder="Enter topic or organisation" />
          <input type="search" name="address" className="address-finder-input" placeholder="Enter a Location" ref="address" onChange={(e)=>{
            this.setState({address: e.target.value, show_addresses: true})
            this.props.fetchAddressFinder(this.state.address)
          }} />
          {this.state.show_addresses &&
            <ul className="address-finder list-stripped">
              {this.props.addresses.map((address, key) => <li key={key} onClick={()=>{this.selectAddress(address)}}>{address.a}</li>)}
            </ul>
          }
          <button type="submit">Search</button>
        </form>
        <div>
          {this.props.results.length > 0 &&
            <button className="btn-toggle" onClick={() => 
              {this.setState({ showMap: !this.state.showMap})
              }}>{this.state.showMap ? 'Show List' : 'Toggle Map'}
            </button>
          }
          { this.state.showMap && <MapResults className="container-fluid" map_results={this.props.results} />}
          { !this.state.showMap && this.props.results.map((data, key)=> <Service key={key} results={data} filter={this.props.name} />)}
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filters: state.filter,
    results: state.results,
    showMap: state.showMap,
    keyword: state.keyword,
    addresses: state.addresses,
    category: state.category
  }
}

export default connect(mapStateToProps, actionCreators)(App);
