import React, { useState, useEffect, useRef } from 'react';
import { fetchUserData } from '../services/fetchUser.js';

import '../styles/landing.css'
import Nav from '../components/Nav'
import Image from '../assets/image.png'
import Send_Form from '../components/Send_Form'
import ProtectFunc from '../components/ProtectFunc'
function Landing(props) {
  console.log("RAN")
  

  //use function to display login message below search if user not logged in after one 
  //input
  const [favorites, setFavorites] = useState("");
  const [profiles, setProfiles] = useState("");
  let userStatus = ProtectFunc();

  useEffect(() => { getProfiles(); }, []);
  useEffect(() => { getFavorites(); }, []);
   async function getProfiles ()  {
    let options = {
      method:"GET",
      mode:'cors',
      headers: {
      
      }
    };
   await fetchUserData( options, '/profile').then(response => response.json().then( response => {
    
      console.log("Calling with, ", response)
      
      const currentProfiles = response.map((items) => 
        <li key={items.id}>
        <span >{items.profile_name}  </span>
       
        <button  className="delete-button" onClick={() => onDelete(items.id, "profile")}>Delete</button>
        </li>
      )
     
      
      console.log("Received data value: ", response);
      setProfiles(<ul > {currentProfiles}</ul>);
    })).catch(error => {
      console.log(error);
    });
    

  };
  //delete
  async function onDelete(id, method) {
    let option = {
      method:"DELETE",
      mode:'cors',
      headers: {
      
      }
    };

    await fetchUserData( option, `/${method}/delete/${id}`).then(response => {
      if (response.status == 204){
        alert("Delete Succesful!");
      }else{
        alert("Failed to Delete")
      }
      getProfiles ();

    }).catch(error => {
      console.log(error);
  });
};
  

  //favorites code
  async function getFavorites ()  {
    let options = {
      method:"GET",
      mode:'cors',
      headers: {
      
      }
    };
   await fetchUserData( options, '/favorite').then(response => response.json().then( response => {
    
      
      
      const currentFavorites = response.map((items) => 
        <li key={items.id}>
        <span >{items.restaurant}  </span>
        <span >{items.order_name}  </span>
        <span >{items.fat}  </span>
        <span >{items.protein}  </span>
        <span >{items.carb}  </span>
        <span >{items.calories}  </span>
        <button  className="delete-button" onClick={() => onDelete(items.id, "favorite")}>Delete</button>
        </li>
      )
     
      
      console.log("Received data value: ", response);
      setFavorites(<ul> {currentFavorites}</ul>);
    })).catch(error => {
      console.log(error);
    });
    

  };
  return (


    <>
      <Nav auth={userStatus}/>
      <div id="Landing">

        <div className='row'>
          <div className='column'>
            <Send_Form props={{}}getProfiles={getProfiles} getFavorites={getFavorites} />
            <div id='Log-In'>
            <a href='Login'>Log in</a><span> to view previous orders and save your profile.</span>
            </div>
          </div>

          <div className='column'>
            <div className='display-container'>
            <div className='display'> {profiles}</div>
            <div className='display'>   {favorites}</div>
            </div>
          
          
          </div>

        </div>
      </div>
    </>
  );
}


export default Landing;
