import React from 'react';  
import Image from 'next/image'; // Assuming you are using Next.js Image component for optimized images  
  
const Footer = () => {  
    return (  
        <footer style={footerStyle}>  
            <div style={logoContainerStyle}>  
                <Image src="/images/sanstenlogo42.png" alt="Company Logo" width={150} height={40} />  
            </div>  
        </footer>  
    );  
};  
  
const footerStyle = {  
    position: 'fixed',  
    bottom: 0,  
    right: 0,  
    width: '100%',  
    display: 'flex',  
    justifyContent: 'flex-end',  
    padding: '10px',  
    boxSizing: 'border-box',  
};  
  
const logoContainerStyle = {  
    marginRight: '10px',  
};  
  
export default Footer;  
