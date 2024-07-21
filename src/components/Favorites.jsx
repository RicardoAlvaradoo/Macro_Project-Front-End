import { fetchUserData } from '../services/fetchUser.js';

import React, {  useRef } from 'react';
import {  useNavigate } from "react-router-dom"

function Favorites({ item, setMap, onDelete }) {

  const locationFav = useRef(null);
  async function handleFavorite(restaurant){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => { 
      console.log("WER AREIVE ", position)
     
      locationFav.current = { latitude: position.coords.latitude, longitude: position.coords.longitude }
      onNearby(restaurant);
    },  (err) => {console.warn(`ERROR(${err.code}): ${err.message}`);},  {enableHighAccuracy: true});
    
  }else{
    console.log(error);
  }
}
  async function onNearby(restaurant) {
   
   
    await fetchUserData("GET", `/nearby/${restaurant}/${locationFav.current.latitude}/${locationFav.current.longitude}`, null).then(response => response.json().then(response => {
      if (response.status == 401){
        const navigate = useNavigate();
        navigate('/login');
  
      }
      console.log("Received data value: ", response);
      let alert_string = "There is a " + restaurant + " " + response.data.distance.slice(0,3) + " miles away from you at " + response.data.address;
      alert(alert_string);
      //display map
      
     
  
     // console.log("before get", response)
      let google_map = `https://www.google.com/maps/dir/?api=1&origin=${locationFav.current.latitude}+${locationFav.current.longitude}&destination=${restaurant}`;
      console.log(google_map);
      window.location.replace(google_map.replace(" ", "+"));
      //setMap(getMap(location.current.latitude, location.current.longitude, response.data.coords.lat, response.data.coords.lng, restaurant));

    })).catch(error => {
      console.log(error);
    });
  };

  return (
    <li key={item.id}>
      <div className='row-content'>
      <span >{item.restaurant}  </span>
      <span >{item.order_name}  </span>
      </div>
      <div className='row-buttons'>
      <button className="item-button" onClick={() => handleFavorite(item.restaurant)}>Directions</button>
      <button className="delete-button" onClick={() => onDelete(item.id, "favorite")}>Delete</button>
      </div>
    </li>)
}
export default Favorites;