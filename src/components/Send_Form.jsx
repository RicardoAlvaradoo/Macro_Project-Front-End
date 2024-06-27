
import Popup from '../components/Popup.jsx'
import React, { useState, useEffect, useRef } from 'react';
function Send_Form(props) {
    const [message, setMessage] = useState(<><h1>Find Macros</h1>
        <p>Input information to find menu items that meet your macro needs near you!</p>
      </>);
    const [dist, set_dist] = useState(5);
    const MAX = 10;
    const [user, setUser] = useState(props.user)
    //popup
  
  
    
    const getProfile = (name) =>
       setUser({...user, profile_name:name});

        restaurant_data(true);
   
//slider logic
    const getBackgroundSize = () => {
      return { backgroundSize: `${(dist * 100) / MAX}% 100%` };
    };
    //popup 

    
    
    
  
    async function restaurant_data(save) {



        
        let url = 'http://127.0.0.1:8000/orders';
        if (save){
          url = 'http://127.0.0.1:8000/profile'
        }
        
        //const csrftoken =  getCookie('csrftoken');

        const options = {
          method: "POST",
          mode: 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
    
          },
          body: JSON.stringify({ user }),
    
        };
        await fetch(url, options).then(response => response.json().then(result => {
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

      async function handleSubmit(e) {

        e.preventDefault();
        restaurant_data(false);
      }

    
   
      return (
    
        <>
            <div className='Data'>

              <span>{message}</span>

            </div>
            <div className='popup'>
            <Popup  getProfile={getProfile}>
            <form >
                
              <div className='Container'>
                <label>Distance</label>
                <div className='sliderBox'>
                  <input type="range"
                    min="0"
                    max={10}
                   onChange={(e) => set_dist(e.target.value)}
                    style={getBackgroundSize()} value={dist}
                  />

                </div>
              </div>
              <div className='Container'>
                <label >Calories   </label>
                <input
                  name="user[cal_min]"
                 onSubmit={e => setUser({ ...user, cal_min: e.target.value })}
                  className='input-data' />

                <span className='semi'>-</span>
                <input
                  name="user[cal_max]"
                 onSubmit={e => setUser({ ...user, cal_max: e.target.value })}
                  className='input-data' />

              </div>

              <div className='Container'>
                <label >Protein  </label>
                <input
                  name="user[pro_min]"
                  onSubmit={e => setUser({ ...user, pro_min: e.target.value })}
                  className='input-data' />
                <span className='semi'>-</span>

                <input
                  name="user[pro_max]"
                  onSubmit={e => setUser({ ...user, pro_max: e.target.value })}
                  className='input-data' />

              </div>
              <div className='Container'>
                <label >Carbohydrates  </label>

                <input
                  name="user[carb_min]"
                  onSubmit={e => setUser({ ...user, carb_min: e.target.value })}
                  className='input-data' />
                <span className='semi'>-</span>
                <input
                  name="user[carb_max]"
                  onSubmit={e => setUser({ ...user, carb_max: e.target.value })}
                  className='input-data' />

              </div>

              <div className='Container'>
                <label >Fat </label>
                <input
                  name="user[fat_min]"
                  onSubmit={e => setUser({ ...user, fat_min: e.target.value })}
                  className='input-data' />
                <span className='semi'>-</span>

                <input
                  name="user[fat_max]"
                  onSubmit={e => setUser({ ...user, fat_max: e.target.value })}
                  className='input-data' />

              </div>
            
              
            </form>
            <button onClick={handleSubmit} id="search" type="submit" name="macros" >Search</button>
           </Popup>
            
            </div>
      </>
      );
    
    

}
export default Send_Form;
