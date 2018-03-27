import React from 'react';
import '../../styles/Proximity.css';

class Proximity extends React.Component {

  render() {
    return (
      <div className="proximity">
        <div>
          <div className="range">
            <input type="range" min="25000" max="75000" step="25000" onChange={e => {this.props.handler(e.target.value);}} />
          </div>
          <ul className="range-labels">
            <li className="first">Within 25km</li>
            <li className="middle">50km</li>
            <li className="last">100km</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Proximity;

