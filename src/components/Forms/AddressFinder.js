import React from 'react';
import '../../styles/AddressFinder.css';

class AddressFinder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      address: this.props.data.searchVars.address
    };
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onAddressBlur = this.onAddressBlur.bind(this);
  }

  componentWillUpdate() {
    let address_field = document.getElementById('address_field');
    if(window.AddressFinder){
      let widget = new window.AddressFinder.Widget(
        address_field,
        'ADDRESSFINDER_DEMO_KEY',
        'NZ',
        {manual_style:true}
      );

      widget.on('result:select', (value, item) => {
        this.setState({address: value});
        this.props.data.loadResults({
          category: this.props.data.searchVars.category ? this.props.data.searchVars.category : '',
          keyword: this.props.data.searchVars.keyword ? this.props.data.searchVars.keyword : '',
          address: value,
          addressLatLng: {latitude: item.y, longitude: item.x},
          radius: this.props.radius
        });
      });
    }
  }

  onAddressChange(value){
    this.setState({address: value});
  }

  onAddressBlur(input){
    this.setState({address: input.value});
    this.props.handler.bind(input);
  }

  render() {
    return (
      <div className="address_finder_container">
        <input value={this.state.address} id="address_field" type="search" onBlur={e =>this.onAddressBlur(e.target)} onChange={e => {this.onAddressChange(e.target.value);}} name="address" className="address-finder-input" placeholder="Enter a Location" />
      </div>
    );
  }
}

export default AddressFinder;

