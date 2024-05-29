import React from 'react';  
  
const WeavyHeader = () => {  
    return (  
        <header className="weavy-header">  
            <h1>Weavy Header</h1>  
            <style jsx>{`  
                .weavy-header {  
                    width: 100%;  
                    padding: 10px 20px;  
                    background-color: #007bff;  
                    color: white;  
                    position: fixed;  
                    top: 0;  
                    left: 0;  
                    z-index: 1000;  
                    text-align: center;  
                }  
                .weavy-header h1 {  
                    margin: 0;  
                    font-size: 24px;  
                }  
            `}</style>  
        </header>  
    );  
};  
  
export default WeavyHeader;  
