import React from 'react';  
import { useMsal } from "@azure/msal-react";  
  
const LogoutButton = () => {  
    const { instance, accounts } = useMsal();  
    const email = accounts.length > 0 ? accounts[0].username : "Unknown User";  

    const handleLogout = () => {  
        instance.logoutPopup().catch(e => {  
            console.error(e);  
        });  
    };  
  //<img src="/icons/logout-icon.png" alt="Logout" />  
    return (  
        <div>
        <button className="logout-button" onClick={handleLogout}>  
            
            <small>Logout</small>
            <style jsx>{`  
                .logout-button {  
                    background: none;  
                    border: none;  
                    cursor: pointer;  
                    position: fixed;  
                    top: 10px;  
                    right: 10px;  
                    display: 'flex',  
                    justifyContent: 'flex-end',  
                }  
                .logout-button img {  
                    width: 30px;  
                    height: 30px;  
                }  
            `}</style>  
        </button>  
        </div>
    );  
};  
  
export default LogoutButton;  
