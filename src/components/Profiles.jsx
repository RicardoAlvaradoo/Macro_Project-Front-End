
function Profiles({ profile, onSearch, onDelete}){
    
    
    return (
        <li key={profile.id}>
        <span >{profile.profile_name}  </span>
        <button  className="item-button" onClick={() => onSearch(profile, null)}>Search</button>
        <button  className="item-button" onClick={() => onDelete(profile.id, "profile")}>Delete</button>
        </li>
        
    );
}

export default Profiles;
