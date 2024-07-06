
import { apiGet } from '../services/urlGate.js';
import { ACCESS_TOKEN } from "../constants";
import { json } from 'react-router-dom';
export const fetchUserData = (method, params, data ) => {
  const url = params;
  const token = localStorage.getItem(ACCESS_TOKEN);
  
  

  let options = {
    method: method,
    mode:'cors',
    headers: {},
  }
  if (method == 'POST'){
    options.headers[ 'Content-Type'] = 'application/json';
    options = {...options, body: JSON.stringify(data)};
  }
  if (token){
     
       options.headers['Authorization'] =   `Bearer ${token}` ;
   }
  
  return apiGet(options, url );
}