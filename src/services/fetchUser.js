import {apiGet} from '../apiGateway.js';

export const fetchUserData = (params) => {
  const url = params;

  return apiGet(url);
}