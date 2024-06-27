import React, { useState, useEffect, useRef } from 'react';



import '../styles/landing.css'
import Nav from '../components/Nav'
import Image from '../assets/image.png'
import Send_Form from '../components/Send_Form'
import ProtectFunc from '../components/ProtectFunc'
function Landing(props) {
  console.log("RAN")
  

  //use function to display login message below search if user not logged in after one 
  //input
  const [profiles, setProfiles] = useState("");
  let userStatus = ProtectFunc();

  useEffect(() => { getProfiles(); }, []);
  
   async function getProfiles ()  {
    const options = {
      method:"GET",
      mode:'cors',
      headers: {

      }
    };
    await fetch('http://127.0.0.1:8000/profile', options).then(response =>response.json().then(result => {
      result = JSON.stringify(result)
      result = JSON.parse(result);
      result = JSON.parse(result);
      console.log("Received data value: ", result);
      setProfiles(result);
    })) .catch(error => {
      console.log(error);
    });
    

  }
  //slider logic

  //distance
  
  return (


    <>
      <Nav auth={userStatus}/>
      <div id="Landing">

        <div className='row'>
          <div className='column'>
            <Send_Form/>
            <div id='Log-In'>
            <a href='Login'>Log in</a><span> to view previous orders and save your profile.</span>
            </div>
          </div>

          <div className='column'>
            {profiles}
          
          </div>

        </div>
      </div>
    </>
  );
}


export default Landing;
