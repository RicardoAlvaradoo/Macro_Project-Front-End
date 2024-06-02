import React, { useState, useEffect } from 'react';
import './landing.css'


function Landing(){
    console.log("Arrive in function");
    const [message, setMessage] = useState('No Data Yet');
  
    function restaurant_data() {
    console.log("Restaurant Data Called");
    const csrftoken = document.querySelector('[label = "min" name=csrfmiddlewaretoken]').value;
    const options = {
        method:"POST", 
        
        headers: {
            'Content-Type':'application/json',
            'X-CSRFToken': csrftoken,
        },
        body:JSON.stringify(data)
        
    };
    fetch('http://127.0.0.1:8000/test', options).then(response => {
          setMessage(response.data.message);
        })
        .catch(error => {
          console.log(error);
        });
    };
  
    return (
      <>
      <h1>{message}</h1>
      <form >
        <div>
        <label >Cal Min:<input  name="cal_min"/></label>
        <label >Cal Max:<input placeholder = "cal_max" name="cal_max"/></label>
        </div>
        <div>
        <label >Protein Min:<input  name="pro_min"/></label>
        <label>Protein Max:<input  name="pro_max"/></label>
        </div>
        <div>
        <label >Carbohydrate Min:<input  name="carb_min"/></label>
        <label >Carbohydrate Max:<input  name="carb_max"/></label>
        </div>
        <div>
        <label >Fat Min:<input  name="fat_min"/></label>
        <label >Fat Max:<input  name="fat_max"/></label>
        </div>
        <button onClick={restaurant_data()} type="submit" label = "min" name="macros" values="Enter Macros">Search</button>
      </form>
      </>
    );
  }
  
  export default Landing;
