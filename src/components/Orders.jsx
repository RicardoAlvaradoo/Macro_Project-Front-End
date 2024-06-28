import React, { useState, useEffect, useRef } from 'react';
function Items(order) {
    async function saveFavorite(){

    const options = {
        method: "POST",
        mode: 'cors',
        headers: {
         
  
        },
        body: JSON.stringify({ order }),
        }
       await fetchUserData(options, "favorite").then(response =>  { 
        console.log("We have received", response)
        alert("Sent");
       }).catch(error => {
        console.log(error)
       })
    };
    return (
        <>  
            <span> {order[1][0]} Order: {order[1][1]} Calories: {order[1][2]} Fat: {order[1][3]}  Protein: {order[1][4]}</span>
            <button onClick={saveFavorite}></button>
        </>
    )
}


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