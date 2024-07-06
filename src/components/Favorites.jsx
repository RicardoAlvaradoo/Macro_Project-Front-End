function Favorites({item ,onDelete}) {
   

    return (
    <li key={item.id}>
    <span >{item.restaurant}  </span>
    <span >{item.order_name}  </span>
    <span >{item.fat}  </span>
    <span >{item.protein}  </span>
    <span >{item.carb}  </span>
    <span >{item.calories}  </span>
    <button className="item-button" onClick={() => onDelete(item.id, "favorite")}>Delete</button>
  </li>)
}
export default Favorites;