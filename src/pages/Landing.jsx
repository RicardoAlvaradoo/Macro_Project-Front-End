import React, { useState, useEffect, useRef } from 'react';
import { fetchUserData } from '../services/fetchUser.js';

import '../styles/landing.css'
import Nav from '../components/Nav'
import Image from '../assets/image.png'
import Send_Form from '../components/Send_Form'
import Items from '../components/Items'
import Profiles from '../components/Profiles.jsx'
import Favorites from '../components/Favorites'
import ProtectFunc from '../components/ProtectFunc'
function Landing(props) {
  console.log("RAN")


  //use function to display login message below search if user not logged in after one 
  //input
  const [favorites, setFavorites] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [order_list, setOrders] = useState([]);
  const [message, setMessage] = useState(true);
  let userStatus = ProtectFunc();
 

  useEffect(() => { getProfiles(); }, []);
  useEffect(() => { getFavorites(); }, []);

  async function getProfiles() {
    await fetchUserData("GET", '/profile', null).then(response => response.json().then(response => {
      console.log("Received data value: ", response);
      setProfiles(response);
    })).catch(error => {
      console.log(error);
    });
  };
  async function getFavorites() {
    await fetchUserData("GET", '/favorite', null).then(response => response.json().then(response => {

      console.log("Received data value: ", response);
      setFavorites(currentFavorites);
    })).catch(error => {
      console.log(error);
    });
  };
  async function onDelete(id, method) {
    await fetchUserData("DELETE", `/${method}/delete/${id}`, null).then(response => {
      if (response.status == 204) {
        alert("Delete Succesful!");
      } else {
        alert("Failed to Delete")
      }
      getProfiles();

    }).catch(error => {
      console.log(error);
    });
  };

  async function search(user, name) {
    let url;
    let location = null;
    let data;
    if (profile_name) {
      data = { profile_name: name, ...user }
      url = '/profile/';
    } else {

      url = '/orders/';
      //get location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

          location = { latitude: position.coords.latitude, latitude: position.coords.longitude }
        });
      } else {
        console.log("Error in getting location");
      }
      data = { ...user, location: location }
    }
    await fetchUserData("POST", url, data).then(response => response.json().then(result => {
      if (!profile_name) {
        //console.log("Order list", result);
       
        let order_list = result;
        //console.log("We have received", order_list, response)
        setOrders(order_list);
        setMessage(false);

      } else {
        getProfiles();
      }
    })).catch(error => {
      console.log(error)
    })
  };


return (


  <>
    <Nav auth={userStatus} />
    <div id="Landing">

      <div className='row'>
        <div className='column'>
          <div className='Data'>
            {message && (<span>Find Macros
              Input information to find menu items that meet your macro needs near you!
            </span>)}
            {!message && (<ul>
              {order_list.map((order) => (
                <Items order={order} getFavorites={getFavorites} />

              ))} </ul>)}





          </div>
          <Send_Form props={{}}  search={search} />
          <div id='Log-In'>
            <a href='Login'>Log in</a><span> to view previous orders and save your profile.</span>
          </div>
        </div>

        <div className='column'>
          <div className='display-container'>
            <div className='display'> (<ul>
              {favorites.map((item) => (
                <Favorites item={item} onDelete={onDelete} />

              ))} </ul>)
              </div>
            <div className='display'>   {favorites}</div>
          </div>


        </div>

      </div>
    </div>
  </>
);

}

export default Landing;
