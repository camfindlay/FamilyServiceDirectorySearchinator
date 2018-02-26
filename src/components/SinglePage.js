import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actionCreators from '../actions/index';

// const fields = ()=> {
//   return 'FSD_ID,LONGITUDE,LATITUDE,PROVIDER_NAME,PUBLISHED_CONTACT_EMAIL_1,PUBLISHED_PHONE_1,PROVIDER_CONTACT_AVAILABILITY,ORGANISATION_PURPOSE,PHYSICAL_ADDRESS,SERVICE_NAME,SERVICE_DETAIL,DELIVERY_METHODS,COST_TYPE,SERVICE_REFERRALS';
// }


export class SinglePageInfo extends React.Component {


  componentDidMount() {
    if (this.props.results.length === 0){
      this.props.loadResults(this.props.match.params.category)
    }
   /* 
   const { name,category } = this.props.match.params;
    
    
    const resourceId = '35de6bf8-b254-4025-89f5-da9eb6adf9a0';
    let url = 'https://catalogue.data.govt.nz/api/3/action/datastore_search?';
      let query = `resource_id=${resourceId}&q=&fields=${fields()}&distinct=true&filters={"LEVEL_1_CATEGORY":"${name}"}`;
        return axios.get(`https://catalogue.data.govt.nz/api/3/action/datastore_search?resource_id=35de6bf8-b254-4025-89f5-da9eb6adf9a0&q=&fields=FSD_ID,LONGITUDE,LATITUDE,PROVIDER_NAME,PUBLISHED_CONTACT_EMAIL_1,PUBLISHED_PHONE_1,PROVIDER_CONTACT_AVAILABILITY,ORGANISATION_PURPOSE,PHYSICAL_ADDRESS,SERVICE_NAME,SERVICE_DETAIL,DELIVERY_METHODS,COST_TYPE,SERVICE_REFERRALS&distinct=true&filters={%22LEVEL_1_CATEGORY%22:%22${decodeURIComponent(category)}%22}`).then((response)=>{
          this.setState({data: response.data.result.records});
    });
    */

  }

  render(){
    const { match: { params: { name } } , results } = this.props;
    return <div> <h1>my List </h1>
      <ul>
         {results
         .filter(item => item.FSD_ID === name)
         .map((i, key)  => <li key={key}>{i.SERVICE_NAME}</li>)}</ul>       </div>
  } 
}


export default connect( 
  state => ({results: state.results}),
  actionCreators
  )(SinglePageInfo);
