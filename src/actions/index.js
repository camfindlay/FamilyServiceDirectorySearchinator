import axios from 'axios';

const resourceId = '35de6bf8-b254-4025-89f5-da9eb6adf9a0';

export function loadFilters(field){
  let sql = encodeURI(`SELECT "LEVEL_1_CATEGORY" as name, COUNT(*) as num FROM "${resourceId}" GROUP BY name ORDER BY name`);
  let url = `https://catalogue.data.govt.nz/api/3/action/datastore_search_sql?sql=${sql}`;
  return (dispatch) => {
    return axios.get(url).then((response)=>{
      dispatch(showFilters(response.data.result.records));
    });
  }
}

const fields = ()=> {
  return 'LEVEL_1_CATEGORY,FSD_ID,LONGITUDE,LATITUDE,PROVIDER_NAME,PUBLISHED_CONTACT_EMAIL_1,PUBLISHED_PHONE_1,PROVIDER_CONTACT_AVAILABILITY,ORGANISATION_PURPOSE,PHYSICAL_ADDRESS,SERVICE_NAME,SERVICE_DETAIL,DELIVERY_METHODS,COST_TYPE,SERVICE_REFERRALS';
}

export function loadResults(category, keyword) {

  let url = 'https://catalogue.data.govt.nz/api/3/action/datastore_search?';
  var query;
  if (keyword) {
    query = `resource_id=${resourceId}&q=${keyword}&fields=${fields()}&distinct=true`;
  } else if(category) {
    query = `resource_id=${resourceId}&q=&fields=${fields()}&distinct=true&filters={"LEVEL_1_CATEGORY":"${category}"}`; 
  } else if(category && keyword) {
    query = `resource_id=${resourceId}&q=${keyword}&fields=${fields()}&distinct=true&filters={"LEVEL_1_CATEGORY":"${category}"}`; 
  } else {
    query = `resource_id=${resourceId}&fields=${fields()}&distinct=true`; 
  }

  return (dispatch) => {
    return axios.get(`${url}${query}`).then((response)=>{
      dispatch(showResults(response.data.result.records, category, keyword));
    });
  }
}

export function fetchAddressFinder(address, pxid) {
  let key = 'ADDRESSFINDER_DEMO_KEY';
  let url = 'https://api.addressfinder.io/api/nz/address?';
  let query = `format=json&key=${key}&q=${address}&pxid=${pxid}`;
  
  return (dispatch) => {
    return axios.get(`${url}${query}`).then((response)=>{
      dispatch(fetchAddresses(response.data.completions));
    });
  }
}

export function showFilters(filters){
  return {
    type: 'SHOW_FILTERS',
    filters
  }
}

export function showResults(results, category, keyword) {
  return {
    type: 'SHOW_RESULTS',
    results,
    category,
    keyword
  }
}
export function fetchAddresses(addresses) {
  return {
    type: 'FETCH_ADDRESSES',
    addresses
  }
}
