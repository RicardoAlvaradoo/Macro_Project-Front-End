import { fetchUserData } from '../services/fetchUser.js';

function Favorites({ item, getLocation, onDelete }) {
  
  async function onNearby(restaurant) {
   
    let location = await getLocation();
    await fetchUserData("GET", `nearby/${restaurant}/${location.latitude}/${location.longitude}`, null).then(response => response.json().then(response => {

      console.log("Received data value: ", response);
      alert(response);
    })).catch(error => {
      console.log(error);
    });
  };

  return (
    <li key={item.id}>
      <span >{item.restaurant}  </span>
      <span >{item.order_name}  </span>
      <span >{item.fat}  </span>
      <span >{item.protein}  </span>
      <span >{item.carb}  </span>
      <span >{item.calories}  </span>
      <button className="item-button" onClick={() => onNearby(item.restaurant)}>Check Nearby</button>
      <button className="item-button" onClick={() => onDelete(item.id, "favorite")}>Delete</button>
    </li>)
}
export default Favorites;