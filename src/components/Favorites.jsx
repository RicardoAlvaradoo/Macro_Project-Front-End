import { fetchUserData } from '../services/fetchUser.js';
import React, {  useRef } from 'react';
function Favorites({ item, onDelete }) {
  const location = useRef(null);
  async function handleFavorite(restaurant){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => { 
      console.log("WER AREIVE ", position)
     
      location.current = { latitude: position.coords.latitude, longitude: position.coords.longitude }
      onNearby(restaurant);
    });
    
  }else{
    console.log(error);
  }
}
  async function onNearby(restaurant) {
   
    
    await fetchUserData("GET", `/nearby/${restaurant}/${location.current.latitude}/${location.current.longitude}`, null).then(response => response.json().then(response => {

      console.log("Received data value: ", response);
      alert(response);
    })).catch(error => {
      console.log(error);
    });
  };

  return (
    <li key={item.id}>
      <span >{item.restaurant}  </span>
      <span >{item.order_name}  </span>
      <span >{item.fat}  </span>
      <span >{item.protein}  </span>
      <span >{item.carb}  </span>
      <span >{item.calories}  </span>
      <button className="item-button" onClick={() => handleFavorite(item.restaurant)}>Check Nearby</button>
      <button className="item-button" onClick={() => onDelete(item.id, "favorite")}>Delete</button>
    </li>)
}
export default Favorites;