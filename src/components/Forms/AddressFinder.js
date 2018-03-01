import React from 'react';

class AddressFinder extends React.Component {

  componentWillReceiveProps() {
    let widget = new window.AddressFinder.Widget(
      document.getElementById('address_field'),
      'ADDRESSFINDER_DEMO_KEY',
      'NZ',
      {manual_style:true}
    );

    widget.on('result:select', (value, item) => {
      console.log('You’ve selected: '+ item.x);
    });
  }

  render() {
    return (
      <div>
        <input id="address_field" type="search" name="address" className="address-finder-input" placeholder="Enter a Location" />
      </div>
    );
  }
}

export default AddressFinder;

