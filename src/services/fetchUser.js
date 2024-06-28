
import { apiGet } from '../services/urlGate.js';
import { ACCESS_TOKEN } from "../constants";
export const fetchUserData = (options, params) => {
  const url = params;
  const token = localStorage.getItem(ACCESS_TOKEN);
  
  if (token){
     
       options.headers['Authorization'] =   `Bearer ${token}` ;
   }
  
  return apiGet(options, url );
}