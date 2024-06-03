// pages/_app.js  
import { PublicClientApplication } from "@azure/msal-browser";  
import { MsalProvider } from "@azure/msal-react";  
import { msalConfig } from "../msalConfig";  
import { SessionProvider } from "next-auth/react"

import "../styles/globals.css";  
  
const msalInstance = new PublicClientApplication(msalConfig);  
  
function MyApp({ Component, pageProps: { session, ...pageProps } }) {  
    return (  
        <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
  
        // <MsalProvider instance={msalInstance}>  
        //     <Component {...pageProps} />  
        // </MsalProvider>  
    );  
}  
  
export default MyApp;  