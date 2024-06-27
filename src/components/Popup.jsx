import React, { useState, useEffect, useRef, Children } from 'react';
import '../styles/Popup.css'
import classnames from 'classnames';

import ProtectFunc from '../components/ProtectFunc.jsx';


const Popup =({children, getProfile}) => {
    const [name, setName] = useState("");
    const [modal, setModal] = useState(false);
    const [styles, setStyle] = useState(false);

  
    const toggleModal
        = () => {
            setModal(!modal);
            setName("");
            setStyle(!styles);
        
        }

    const toggleSend
        = () => {
            getProfile(name);
            setModal(!modal);
            setStyle(!styles);
            console.log("Profile name", name);
            
        }
    return (
        
        <div className='pop'>
            <div className={classnames({'form': styles})}>
    
            {children}
            </div>
            {modal && (
                <   div className='modal'><input name="user[profile_name]"
                onChange={e => setName(e.target.value)}
                     />
                    <button onClick={toggleSend} type="submit">Name </button> </div>)

            }
            <button onClick={toggleModal} id="search"  >Save Profile</button>
            </div>
            
    )
};

export default Popup;