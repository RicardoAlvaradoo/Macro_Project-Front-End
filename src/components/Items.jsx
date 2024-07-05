import React, { useState, useEffect, useRef } from 'react';
import { fetchUserData } from '../services/fetchUser.js';
function Items({order, getFavorites}) {
  
  console.log("In items" + order);
 
  async function saveFavorite(restaurant, order_name, fat, carb, protein, calories ){
      
    const options = {
        method: "POST",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
  
        },
        body: JSON.stringify({restaurant, order_name, fat,carb, protein, calories }),
        }
       await fetchUserData(options, "/favorite/").then(response =>  { 
        console.log("We have received", response)
        if (response.status ==201){
          getFavorites();
          alert("Sent");
        }else{
          alert("Error Sending Favorite")
        }
       
       }).catch(error => {
        console.log(error)
       })
    };
    
    return (
        <li key={order[1][0]}>  
          
            <span> {order[1][0]} Order: {order[1][1]} Calories: {order[1][2]} Fat: {order[1][3]}  Protein: {order[1][4]}</span>
            <button onClick={() => saveFavorite(order[1][0],order[1][1], order[1][3],order[1][4],order[1][5], order[1][2] )}>Favorite</button>
        </li>
    )
}
export default Items;

/**await fetch(url, options).then(response => response.json().then(result => {
          result = JSON.stringify(result)
          result = JSON.parse(result);
          result = JSON.parse(result);
          console.log("Received data value: ", result.data.rest);
          let orders = result.data.rest;
          const arrayDataItems = orders.map(items =>
    
            <p>Restaurant: {items[1][0]} Order: {items[1][1]} Calories: {items[1][2]} Fat: {items[1][3]}  Protein: {items[1][4]}</p>
    
          )
          setMessage(arrayDataItems);
        }))
          .catch(error => {
            console.log(error);
          });
      };
      **/