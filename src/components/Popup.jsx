import React, { useState, useEffect, useRef, Children } from 'react';
import '../styles/Popup.css'
import classnames from 'classnames';




const Popup =({children, handleSave}) => {
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
            console.log("CALLED IN POP", name)
            handleSave(name);
            setModal(!modal);
            setStyle(!styles);
            
            
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