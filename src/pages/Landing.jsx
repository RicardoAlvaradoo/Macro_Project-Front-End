import React, { useState, useEffect } from 'react';
//import './styles/landing.css'

function Landing(props){
  console.log("RAN")
  const [message, setMessage] = useState(<h1>No data yet</h1>);
  const [user, setUser] = useState(props.user)
  async function restaurant_data() {
      console.log("Restaurant Data Called ", user);
      //const csrftoken =  getCookie('csrftoken');
      const options = {
          method:"POST", 
          mode: 'cors',
          headers: {
              'Content-Type':'application/x-www-form-urlencoded',
              
          },
          body:JSON.stringify({user}),
          
      };
      await fetch('http://127.0.0.1:8000/orders', options).then(response => response.json().then(result => {
      result = JSON.stringify(result)
      result = JSON.parse(result);
      result = JSON.parse(result);
      console.log("Received data value: ",result.data.rest);   
      let orders = result.data.rest;
      const arrayDataItems = orders.map( items=> 
        
        <p>Restaurant: {items[1][0]} Order: {items[1][1]} Calories: {items[1][2]} Fat: {items[1][3]}  Protein: {items[1][4]}</p>
         
      )
        setMessage( arrayDataItems );
          }))
          .catch(error => {
            console.log(error);
          });
      };
     
    function handleSubmit(e){
      
      e.preventDefault();
      restaurant_data();
    }
    return (
      <>
      {message}
      <form >
        <div>
        <label >Cal Min:
          <input  
          name="user[cal_min]" 
          onChange={e => setUser({ ...user, cal_min: e.target.value })}/>
        </label>
        <label >Cal Max:
          <input  
          name="user[cal_max]"  
          onChange={e => setUser({ ...user, cal_max: e.target.value })}/>
        </label>
        </div>
        
        <div>
        <label >Protein Min:
          <input  
          name="user[pro_min]" 
          onChange={e => setUser({ ...user,pro_min: e.target.value })}/>
          </label>
        <label>Protein Max:
          <input  
          name="user[pro_max]"
          onChange={e => setUser({ ...user, pro_max: e.target.value })}/>
          </label>
        </div>
        <div>
        <label >Carbohydrate Min:
          <input 
          name="user[carb_min]"
          onChange={e => setUser({ ...user, carb_min: e.target.value })}/>
          </label>
        <label >Carbohydrate Max:
          <input  
          name="user[carb_max]"
          onChange={e => setUser({ ...user, carb_max: e.target.value })}/>
          </label>
        </div>
        
        <div>
        <label >Fat Min:<input  
        name="user[fat_min]"
        onChange={e => setUser({ ...user, fat_min: e.target.value })}/>
        </label>
        <label >Fat Max:
          <input  
          name="user[fat_max]"
          onChange={e => setUser({ ...user, fat_max: e.target.value })}/>
          </label>
        </div>
        <button onClick={handleSubmit} type="submit" label = "min" name="macros" values="Enter Macros">Search</button>
      </form>
      </>
    );
  }
  
  
  export default Landing;
