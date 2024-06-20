import React, { useState, useEffect, useRef } from 'react';
import MultiRangeSlider from "multi-range-slider-react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../styles/Slider.css'
import '../styles/landing.css'
import Nav from '../components/Nav'
import Image from '../assets/image.png'
function Landing(props) {
  console.log("RAN")

  const [message, setMessage] = useState(<><h1>Find Macros</h1>
    <p>Input information to find menu items that meet your macro needs near you!</p>
  </>);
  //use function to display login message below search if user not logged in after one 
  //input

  const [login_user, loginUser] = useState();

  //slider logic

  //distance
  const [dist, set_dist] = useState(5);
  const MAX = 10;

  const getBackgroundSize = () => {
    return { backgroundSize: `${(dist * 100) / MAX}% 100%` };
  };
  const [user, setUser] = useState(props.user)



  async function restaurant_data() {



    console.log("Restaurant Data Called ", user.cal_max);

    //const csrftoken =  getCookie('csrftoken');

    const options = {
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',

      },
      body: JSON.stringify({ user }),

    };
    await fetch('http://127.0.0.1:8000/orders', options).then(response => response.json().then(result => {
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

  function handleSubmit(e) {

    e.preventDefault();
    restaurant_data();
  }
  return (


    <>
      <Nav />
      <div id="Landing">

        <div className='row'>
          <div className='column'>
            <div className='Data'>

              <span>{message}</span>

            </div>
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
                  onChange={e => setUser({ ...user, cal_min: e.target.value })}
                  className='input-data' />

                <span className='semi'>-</span>
                <input
                  name="user[cal_max]"
                  onChange={e => setUser({ ...user, cal_max: e.target.value })}
                  className='input-data' />

              </div>

              <div className='Container'>
                <label >Protein  </label>
                <input
                  name="user[pro_min]"
                  onChange={e => setUser({ ...user, pro_min: e.target.value })}
                  className='input-data' />
                <span className='semi'>-</span>

                <input
                  name="user[pro_max]"
                  onChange={e => setUser({ ...user, pro_max: e.target.value })}
                  className='input-data' />

              </div>
              <div className='Container'>
                <label >Carbohydrates  </label>

                <input
                  name="user[carb_min]"
                  onChange={e => setUser({ ...user, carb_min: e.target.value })}
                  className='input-data' />
                <span className='semi'>-</span>
                <input
                  name="user[carb_max]"
                  onChange={e => setUser({ ...user, carb_max: e.target.value })}
                  className='input-data' />

              </div>

              <div className='Container'>
                <label >Fat </label>
                <input
                  name="user[fat_min]"
                  onChange={e => setUser({ ...user, fat_min: e.target.value })}
                  className='input-data' />
                <span className='semi'>-</span>

                <input
                  name="user[fat_max]"
                  onChange={e => setUser({ ...user, fat_max: e.target.value })}
                  className='input-data' />

              </div>
              <button onClick={handleSubmit} id="search" type="submit" label="min" name="macros" values="Enter Macros">Search</button>
            </form>
            <div id='Log-In'>
            <a href='Login'>Log in</a><span> to view previous orders and save your profile.</span>
            </div>
          </div>

          <div className='column'>

            <img src={Image} id='logo-map' />
          </div>

        </div>
      </div>
    </>
  );
}


export default Landing;
