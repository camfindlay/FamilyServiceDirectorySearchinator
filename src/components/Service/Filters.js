import React from 'react';
import '../../styles/Form.css';
import { Route } from 'react-router-dom';

class Filters extends React.Component {

  constructor() {
    super();

    this.categoryChange = this.categoryChange.bind(this);
  }


  componentDidMount(){
    if(this.props.searchVars.category){
      this.categoryChange(this.props.searchVars.category);
    }
  }


  handleChange(event) {
    this.categoryChange(this.props.searchVars.category === event.target.value ? '' : event.target.value);
  }

  categoryChange(category){
    //this.setState({value: category});
    const clone = {...this.props.searchVars};
    clone.category = category;
    this.props.loadResults(clone);
  }

  render(){
    return (
      <div className={'filters'+(this.props.filters.length === 0 ? ' loading' : '') }>
        <nav className="nav">
          {this.props.filters.map((data,index) => {
            return (<Route key={index} render={({ history}) => (
              <button className={this.props.searchVars.category === data.name ? 'selected'  : ''} key={data.num}
                onClick={()=> {
                  history.push((this.props.searchVars.category === data.name ? '' : '/category/'+encodeURIComponent(data.name)));
                  this.categoryChange((this.props.searchVars.category === data.name ? '' : data.name));
                }}>
                {data.name}
              </button>)} />
            );
          })}
        </nav>
        <select value={this.props.searchVars.category} onChange={this.handleChange.bind(this)}>
          <option name="filters" defaultValue>-- Select Category --</option>
          {this.props.filters.map(data => {
            return (<option key={data.num} name="filters">{data.name}</option>);
          })}
        </select>
      </div>
    );
  }
}

export default Filters;
