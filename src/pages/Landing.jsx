import React, { useState, useEffect, useRef } from 'react';
import { fetchUserData } from '../services/fetchUser.js';
import {  useNavigate } from "react-router-dom"
import '../styles/landing.css'
import '../styles/Table.css'
import Nav from '../components/Nav'

import Send_Form from '../components/Send_Form'
import Items from '../components/Items'
import Profiles from '../components/Profiles.jsx'
import Favorites from '../components/Favorites'
import { isAuth } from '../components/Auth.js'

function Landing(props) {


  const navigate = useNavigate();
  //use function to display login message below search if user not logged in after one 
  //input

  const [favorites, setFavorites] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [order_list, setOrders] = useState([]);
  const [message, setMessage] = useState(true);
  const [user, setUser] = useState(false);
  const [username, setUsername] = useState(false);
  const location = useRef(null);
  const [map, setMap] = useState(null);


  useEffect(() => {getAuth()}, []);



  console.log("Auth 2", user);
  
  

  async function getAuth() {
      await isAuth().then(response => {
      console.log(response);
      setUser(response);
      if (response){
        getProfiles();
        getFavorites();
        getUser()
      }
    });
  }
  

  async function getUser(){
    await fetchUserData("GET", '/user/register', null).then(response => response.json().then(response => {
      console.log("Received data value: ", response);
      setUsername(response.data);
    })).catch(error => {
      console.log(error);
    });
  };
  
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
      setFavorites(response);
    })).catch(error => {
      console.log(error);
    });
  };
  async function onDelete(id, method) {
    await fetchUserData("DELETE", `/${method}/delete/${id}`, null).then(response => {
      if (response.status == 401){
        const navigate = useNavigate();
        navigate('/login');
  
      }
      if (response.status == 204) {
        alert("Delete Succesful!");
      } else {
        alert("Failed to Delete")
      }
      if (method == "favorite") {
        getFavorites();
      } else {
        getProfiles();
      }


    }).catch(error => {
      console.log(error);
    });
  };


  async function search(user, name) {
    
    let url;

    let data;
    //saving profile
    if (name) {
      
      data = { profile_name: name, ...user }
      url = '/profile/';
    }//searching based off profile or normal search
    else {

      url = '/orders/';
      //get location
      
      console.log("current data", location.current)
      data = { ...user, location: location.current}
      
     }
    await fetchUserData("POST", url, data).then(response => response.json().then(result => {
      if (!name) {
        console.log("Order list", result);

        let order_list = result.data;
        order_list = JSON.parse(order_list);
        //console.log("We have received", order_list, response)
        setOrders(order_list);
        console.log("Checker OrderLIST", order_list[0], typeof (order_list[0]))
        setMessage(false);

      } else {
        if (response.status == 401){
          const navigate = useNavigate();
          navigate('/login');
    
        }
        getProfiles();
      }
    })).catch(error => {
      console.log(error)
    })
  };

 
  const handleLogin = () => {
    navigate('/login');
  };


  async function handleSearch(user, name){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => { 
      console.log("WER AREIVE ", position)
     
      location.current = { latitude: position.coords.latitude, longitude: position.coords.longitude }
      search(user, name);
    });
    
  }else{
    console.log(error);
  }
}
  console.log("RAN", favorites, profiles, user)
  return (


    <>
      <Nav auth={user} username={username} />
      <div id="Landing">

        <div className='row'>
          <div className='column'>
            <div className='Data'>
              {message && (<span>Find Macros
                Input information to find menu items that meet your macro needs near you!
              </span>)}
              {!message && (
                
                <ul>
                {order_list.map((order) => (
                  <Items order={order} getFavorites={getFavorites} />

                ))} </ul>)}





            </div>
            <Send_Form props={{}} search={handleSearch} />
            <div id='Log-In'>
              <a href='Login'>Log in</a><span> to view previous orders and save your profile.</span>
            </div>
          </div>

          <div className='column'>
            <div className='display-container'>
              <div className='display'>
                <div className='table-title'>Profiles</div>
                { /*Not Logged In message */}
                {(!user) &&
                  (<button onClick={handleLogin}>Log In To View </button>)
                }
                { /*Logged in, no profiles*/}
                {(user) && (profiles.length == 0) && (
                  <h2>Save Profiles to have them displayed!</h2>
                )
                }
                { /*Logged in, profiles*/}
                {(profiles.length != 0) && (<ul>
                  {profiles.map((profile) => (
                    <Profiles profile={profile} onSearch={handleSearch} onDelete={onDelete} />

                  ))} </ul>)}

              </div>
              <div className='display'>
              <div className='table-title'>Orders</div>
                { /*Not Logged In message */}
                {(!user) &&
                  (<button onClick={handleLogin}> Log In To View</button>)
                }
                { /*Logged in, no profiles*/}
                {(user) && (favorites.length == 0) && (
                  <h2>Save Favorites to have them displayed!</h2>
                )

                }
                { /*Logged in, profiles*/}
                {(favorites.length != 0) && (<ul>
                  {favorites.map((item) => (
                    <Favorites item={item} setMap={setMap} onDelete={onDelete} />

                  ))} </ul>)}

                <img src={map}/>
              </div>
            </div>


          </div>

        </div>
      </div>
    </>
  );

}

export default Landing;
