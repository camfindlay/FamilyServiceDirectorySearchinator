import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class SearchResult extends React.Component {
  render() {
    return (
      <div className="search-result">
        <h3>{this.props.service_name}</h3>
        <p>details of the groooovy service you're loooking for</p>
      </div>
    );
  }
}

class FamilyServicesSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    alert('kei whakataki koe i : ' + this.state.value);
    event.preventDefault();
  }
  renderSearchResults() {
    const results = ['plunket', 'addiction services', 'kfc', 'community garden', 'kai'];
    const searchResults = results.map((service_name) =>
      <SearchResult service_name={service_name} />
    );
    return searchResults;
  }
  renderSearchForm() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          ngā kupu:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="haere" />
      </form>
      );
  }

  render() {
    const query = 'query'

    return (
      <div>
        <h1>Whānau Services Search</h1>
        {this.renderSearchForm()}
        {this.renderSearchResults()}
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <FamilyServicesSearch />,
  document.getElementById('root')
);
