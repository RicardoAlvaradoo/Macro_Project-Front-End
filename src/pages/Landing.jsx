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
  let user = useRef(props.user);
  //slider logic

  //distance
  const [dist, set_dist] = useState(5);
  const MAX = 10;

  const getBackgroundSize = () => { 
    return { backgroundSize: `${(dist * 100) / MAX}% 100%` }; }; 
  const [minCal, set_minCal] = useState(100);
  const [maxCal, set_maxCal] = useState(900);
  //protein
  const [minPro, set_minPro] = useState(20);
  const [maxPro, set_maxPro] = useState(80);
  //carb
  const [minCarb, set_minCarb] = useState(30);
  const [maxCarb, set_maxCarb] = useState(120);
  //fat
  const [minFat, set_minFat] = useState(20);
  const [maxFat, set_maxFat] = useState(80);




  async function restaurant_data() {


    user = {
      ...user,
      cal_min: minCal,
      cal_max: maxCal,
      pro_min: minPro,
      pro_max: maxPro,
      carb_min: minCarb,
      carb_max: maxCarb,
      fat_min: minFat,
      fat_max: maxFat,
      distance: dist,
    };

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

{message}

</div>
        <form>
          <div className='Container'>
            <span>Distance: {dist}</span>
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
            <div className='label'>
              <span>Calories:  {minCal} {maxCal}</span>
            </div>
            <div className='sliderBox'>
              <MultiRangeSlider
                min={0}
                max={1000}
                label='false'
                ruler='false'

                minValue={minCal}
                maxValue={maxCal}
                onInput={(e) => {
                  set_minCal(e.minValue);
                  set_maxCal(e.maxValue);


                }}
              />
            </div>
          </div>
          <div className='Container'>
            <div className='label'>

              <span>Protein</span>
            </div>
            <div className='sliderBox'>
              <MultiRangeSlider
                min={0}
                max={100}
                label='false'
                ruler='false'

                minValue={minPro}
                maxValue={maxPro}
                onInput={(e) => {
                  set_minPro(e.minValue);
                  set_maxPro(e.maxValue);


                }}
              />
            </div>
          </div>
          <div className='Container'>
            <div className='label'>
              <span>Carbohydrates:</span>
            </div>
            <div className='sliderBox'>
              <MultiRangeSlider
                min={0}
                max={150}
                label='false'
                ruler='false'

                minValue={minCarb}
                maxValue={maxCarb}
                onInput={(e) => {
                  set_minCarb(e.minValue);
                  set_maxCarb(e.maxValue);

                }}
              />
            </div>
          </div>

          <div className='Container'>
            <div className='label'>
              <span>Fat:</span>
            </div>
            <div className='sliderBox'>
              <MultiRangeSlider
                min={0}
                max={100}
                label='false'
                ruler='false'

                minValue={minFat}
                maxValue={maxFat}
                onInput={(e) => {
                  set_minFat(e.minValue);
                  set_maxFat(e.maxValue);

                }}
              />
            </div>
          </div>
          <button onClick={handleSubmit} id="search" type="submit" label="min" name="macros" values="Enter Macros">Search</button>
        </form>
        </div>
        
        <div className='column'>
          
        <img src={Image} id='logo-map'/>
        </div>
      
      </div>
      </div>
    </>
  );
}


export default Landing;
