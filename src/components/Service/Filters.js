import React from 'react';

const Filters = ( props ) => {
  return (
    <nav className="nav">
      {props.data.filters.map(data => {
        return (<button className={props.data.category === data.name ? 'selected'  : ''} key={data.num} 
        onClick={()=> {props.data.loadResults(data.name, '');}}>{data.name}</button>);
      })}
    </nav>
  );
};

export default Filters;
