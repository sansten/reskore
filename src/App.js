// src/App.js  
import React from 'react';  
import { MsalAuthenticationTemplate, useIsAuthenticated } from "@azure/msal-react";  
import { InteractionType } from "@azure/msal-browser";  
import { loginRequest } from './authConfig';  
import Login from './components/Login';  
import MainPage from './components/MainPage';  
  
const App = () => {  
    const isAuthenticated = useIsAuthenticated();  
  
    return (  
        <div>  
            {!isAuthenticated ? (  
                <Login />  
            ) : (  
                <MsalAuthenticationTemplate interactionType={InteractionType.Popup} authenticationRequest={loginRequest}>  
                    <MainPage />  
                </MsalAuthenticationTemplate>  
            )}  
        </div>  
    );  
};  
  
export default App;  
