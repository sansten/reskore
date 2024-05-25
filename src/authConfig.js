// src/authConfig.js  
export const msalConfig = {  
    auth: {  
        clientId: "dc934073-6b26-4936-afa6-18a431aad869",  
        authority: "https://login.microsoftonline.com/233c6c53-a1d4-4e12-a0b5-a0fad87faf7a",  
        redirectUri: "http://localhost:3000",  
    },  
    cache: {  
        cacheLocation: "sessionStorage",  
        storeAuthStateInCookie: false,  
    },  
};  
  
export const loginRequest = {  
    scopes: ["User.Read"],  
};  
