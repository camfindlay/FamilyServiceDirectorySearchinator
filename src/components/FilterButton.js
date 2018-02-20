import React, { Component } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';

class FilterButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSelection = () => {
    
    let newSelection;
    if(this.props.selected) {
      newSelection = '';
    }
    else {
      newSelection = this.props.record.name;
      
    }
    this.props.handler(newSelection);
  }
  className() {
    if (this.props.selected) {
      return 'primary';
    }
    return '';
  }
  render() {

    if (this.props.record.name) {
      return (
        <BrowserRouter>
          <Link to={{ pathname: '/'}} className={`list-inline ${this.className()}`}>
            <div onClick={this.handleSelection}>
              {this.props.record.name}
              <sub>({this.props.record.num})</sub>
            </div>
          </Link>
        </BrowserRouter>
      );
    }
    else {
      return '';
    }
  }
}

export default FilterButton;
