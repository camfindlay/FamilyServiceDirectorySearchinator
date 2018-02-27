import React from 'react';

class Filters extends React.Component {
  render() {
    return (
      <nav className="nav">
        {this.props.data.filters.map(( data, key ) => {
          return (<button className={this.props.data.category === data.name ? 'selected'  : ''} key={data.num} 
            onClick={()=> {
            this.props.data.loadResults(data.name, '');
          }}> {data.name} 
          </button>)
        })}
      </nav>
    )
  }
}

export default Filters;
