import React from 'react';  
import Image from 'next/image'; // Assuming you are using Next.js Image component for optimized images  
  
const Footer = () => {  
    return ( <>
        <footer style={footerStyleBeign}>  
        <p style={{fontSize:'10px'  }}> For questions & support join our <a href="https://discord.gg/jxctNprA" target="_blank"> discord channel </a> </p> 
        
        </footer>
        <footer style={footerStyle}>  
            
            <div style={contentStyle}>  
                <small style={poweredByStyle}>Powered by</small>  
                <Image src="/images/sanstenlogo42.png" alt="Sansten Logo" width={100} height={30} />  
            </div>  
        </footer> </>  
    );  
};  
  
const footerStyleBeign = {  
    position: 'fixed',  
    bottom: 0,  
    left: 0,  
    width: '50%',  
    display: 'flex-start',  
    justifyContent: 'flex-start',  
    padding: '1px',  
    boxSizing: 'border-box',  
};  

const footerStyle = {  
    position: 'fixed',  
    bottom: 0,  
    right: 0,  
    width: '50%',  
    display: 'flex',  
    justifyContent: 'flex-end',  
    padding: '10px',  
    boxSizing: 'border-box',  
};  
  
const contentStyle = {  
    display: 'flex',  
    flexDirection: 'column',  
    alignItems: 'center',  
    marginRight: '10px',  
};  
  
const poweredByStyle = {  
    fontSize: '10px', // Make the text tiny  
    marginBottom: '0px', // Add some space between the text and the logo  
};  


  
export default Footer;  
