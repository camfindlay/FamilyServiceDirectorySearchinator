import React from 'react';
import { Button } from 'react-foundation';

class FilterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSelection = this.handleSelection.bind(this);
  }
  handleSelection() {
    this.props.handler(this.props.record.name);
  }
  render() {
    return (
      <Button isHollow={! this.props.selected} onClick={this.handleSelection}>
        {this.props.record.name}
        <sub>({this.props.record.num})</sub>
      </Button>
    );
  }
}

export default FilterButton;
