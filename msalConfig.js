export const msalConfig = {  
    auth: {  
        clientId: "dc934073-6b26-4936-afa6-18a431aad869",  
        authority: "https://login.microsoftonline.com/233c6c53-a1d4-4e12-a0b5-a0fad87faf7a",  
        redirectUri:"https://reskore.sansten.com"
        //redirectUri: "http://localhost:3000"  
        //redirectUri: "https://reskore.azurewebsites.net"  
    },  
    cache: {  
        cacheLocation: "localStorage",  
        storeAuthStateInCookie: true  
    }  
};  
