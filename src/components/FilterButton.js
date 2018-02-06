import React, { Component } from 'react';
import { NavItem } from 'react-bootstrap';

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
        <NavItem bsstyle={this.className()} className="list-inline" active={this.props.selected} onClick={this.handleSelection}>
          {this.props.record.name}
          <sub>({this.props.record.num})</sub>
        </NavItem>
      );
    }
    else {
      return '';
    }
  }
}

export default FilterButton;
