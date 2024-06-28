
import Popup from '../components/Popup.jsx'
import React, { useState, useEffect, useRef } from 'react';
import { fetchUserData } from '../services/fetchUser.js';
function Send_Form(props, getProfiles, getFavorite ) {
    const [message, setMessage] = useState(<><h1>Find Macros</h1>
        <p>Input information to find menu items that meet your macro needs near you!</p>
      </>);
    const [dist, set_dist] = useState(5);
    const MAX = 10;
    const [user, setUser] = useState(props.user)
    //popup
    
  
    
    async function getProfile  (name) {
       setUser({...user, profile_name:name});

        restaurant_data(true);
    }
//slider logic
    const getBackgroundSize = () => {
      return { backgroundSize: `${(dist * 100) / MAX}% 100%` };
    };
    //popup 

  async function sendFavorite(){
    
  }
    
    
  
    async function restaurant_data(save) {
        let url = '/orders';
        console.log("value" + save);
        if (save){
          url = '/profile'
        }
        
        //const csrftoken =  getCookie('csrftoken');

        const options = {
          method: "POST",
          mode: 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
    
          },
          body: JSON.stringify({ user }),
          }
         await fetchUserData(options, url).then(response => response.json().then( response => { 
          console.log("We have received", response)
          if(response.status == 200){
            
          }
         })).catch(error => {
          console.log(error)
         })
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
