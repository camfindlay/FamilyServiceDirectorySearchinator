import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

class FilterButton extends Component {
  constructor(props) {
    super(props);
  }
  handleSelection = e => {
    let newSelection;
    newSelection = this.props.record.name;
    this.props.handler(newSelection);
  }

  className() {
    if (this.props.selected) {
      return 'primary';
    }
    return '';
  }

  getFilters() {
    return <BrowserRouter>
      <Link to={{ pathname: '/'}} className={`list-inline ${this.className()}`}>
        <div onClick={this.handleSelection}>
          {this.props.record.name}
          <sub>({this.props.record.num})</sub>
        </div>
      </Link>
    </BrowserRouter>;
  }
  render() {
    return this.props.record.name ? this.getFilters() : null;
  }
}

export default FilterButton;
