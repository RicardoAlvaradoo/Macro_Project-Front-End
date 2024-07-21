
function Profiles({ profile, onSearch, onDelete}){
    
    
    return (
       
        <li key={profile.id}>
        <div className='row-content'>
        <span >{profile.profile_name}  </span>
        </div>
        
        <div className='row-buttons'>
        <button  className="item-button" onClick={() => onSearch(profile, null)}>Search</button>
        <button  className="delete-button" onClick={() => onDelete(profile.id, "profile")}>Delete</button>
        </div>
        </li>
        
    );
}

export default Profiles;
