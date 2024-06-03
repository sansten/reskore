// pages/_app.js  
import { SessionProvider } from "next-auth/react"

import "../styles/globals.css";  
  
  
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