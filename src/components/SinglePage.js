import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const fields = ()=> {
  return 'FSD_ID,LONGITUDE,LATITUDE,PROVIDER_NAME,PUBLISHED_CONTACT_EMAIL_1,PUBLISHED_PHONE_1,PROVIDER_CONTACT_AVAILABILITY,ORGANISATION_PURPOSE,PHYSICAL_ADDRESS,SERVICE_NAME,SERVICE_DETAIL,DELIVERY_METHODS,COST_TYPE,SERVICE_REFERRALS';
}



export class SinglePageInfo extends React.Component {
  state  = {

  }
 

  componentDidMount() {
    const name = this.props.match.params.id;
    const resourceId = '35de6bf8-b254-4025-89f5-da9eb6adf9a0';
    let url = 'https://catalogue.data.govt.nz/api/3/action/datastore_search?';
      let query = `resource_id=${resourceId}&q=&fields=${fields()}&distinct=true&filters={"LEVEL_1_CATEGORY":"${name}"}`;
        return axios.get(`${url}${query}`).then((response)=>{
          console.log(response.data.result.records);
        });
  }

  render(){
    return <div> my page info </div>
  } 
}



