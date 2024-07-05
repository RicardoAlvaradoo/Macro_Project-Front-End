
function Profiles({ profile,onSearch, onDelete}){
    
     

    return (
        <li key={profile.id}>
        <span >{profile.profile_name}  </span>
        <button  className="delete-button" onClick={() => onSearch(profiles,)}>Delete</button>
        <button  className="delete-button" onClick={() => onDelete(profile.id, "profile")}>Delete</button>
        </li>
        
    );
}

export default Profiles;
