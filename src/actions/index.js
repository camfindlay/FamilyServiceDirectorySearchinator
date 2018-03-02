import axios from 'axios';
import geolib from 'geolib';

const RESOURCE_ID = process.env.REACT_APP_API_RESOURCE_ID;
const API_PATH = process.env.REACT_APP_API_PATH;

let filters = category => category ? `&filters={"LEVEL_1_CATEGORY":"${category}"}` : '';
let q = keyword => keyword.length > 2 ? keyword : '';
const FIELDS = 'LEVEL_1_CATEGORY,FSD_ID,LONGITUDE,LATITUDE,PROVIDER_NAME,PUBLISHED_CONTACT_EMAIL_1,PUBLISHED_PHONE_1,PROVIDER_CONTACT_AVAILABILITY,ORGANISATION_PURPOSE,PHYSICAL_ADDRESS,SERVICE_NAME,SERVICE_DETAIL,DELIVERY_METHODS,COST_TYPE,SERVICE_REFERRALS';

export function loadFilters(){
  let sql = encodeURI(`SELECT "LEVEL_1_CATEGORY" as name, COUNT(*) as num FROM "${RESOURCE_ID}" GROUP BY name ORDER BY name`);
  let url = `${API_PATH}datastore_search_sql?sql=${sql}`;
  return (dispatch) => {
    return axios.get(url).then((response)=>{
      dispatch(showFilters(response.data.result.records));
    });
  };
}

export function loadResults(category, keyword, addressLatLng) {

  let url = encodeURI(`${API_PATH}datastore_search?resource_id=${RESOURCE_ID}&fields=${FIELDS}&q=${q(keyword)}&distinct=true${filters(category)}`);
  return (dispatch) => {
    return axios.get(url).then((response)=>{

      if(addressLatLng) {
        dispatch(showResults(findNearMe(response.data.result.records, addressLatLng), category, keyword));
      } else {
        dispatch(showResults(response.data.result.records, category, keyword));
      }
      
    });
  };
}

export function findNearMe(data, addressLatLng) {

  let results = data;
      var tempData = {};
      for ( var index in results ) {
        if ( results[index].LATITUDE !== "0" && results[index].LONGITUDE !== "0" && results[index].LATITUDE !== null && results[index].LONGITUDE !== null) { 
          tempData[index] = results; 
        } 
      }
      results = tempData;
      
      let resultsList = {};

      for ( var index in results ) {
        resultsList[results[0][index].FSD_ID] = {latitude: results[0][index].LATITUDE, longitude: results[0][index].LONGITUDE};
      }

      let distance = geolib.orderByDistance(addressLatLng, resultsList);

      for ( var j in distance ) {
        for ( var index in data ) {
          if(data[index].FSD_ID === distance[j].key) {
            data[index].DISTANCE = distance[j].distance;
          }
        }
      }

      return data.filter(record => record.DISTANCE > 13711100 && record.DISTANCE < 13714900);
}

// add distance key to array of objects from geolib

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
