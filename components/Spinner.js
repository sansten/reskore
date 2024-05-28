// components/Spinner.js  
export default function Spinner() {  
    return (  
        <div className="spinner">  
            <style jsx>{`  
                .spinner {  
                    border: 16px solid #f3f3f3; /* Light grey */  
                    border-top: 16px solid #3498db; /* Blue */  
                    border-radius: 50%;  
                    width: 120px;  
                    height: 120px;  
                    animation: spin 2s linear infinite;  
                    display: flex;  
                    justify-content: center;  
                    align-items: center;  
                    margin-top: 20px;  
                }  
  
                @keyframes spin {  
                    0% { transform: rotate(0deg); }  
                    100% { transform: rotate(360deg); }  
                }  
            `}</style>  
        </div>  
    );  
}  
