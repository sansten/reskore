// src/components/MainPage.js  
import React, { useState } from 'react';  
import axios from 'axios';  
//import { useMsal } from "@azure/msal-react";  
  
const MainPage = () => {  
    const [leftText, setLeftText] = useState("");  
    const [rightText, setRightText] = useState("");  
    const [loading, setLoading] = useState(false);  
    const [result, setResult] = useState(null);  
  //  const { accounts } = useMsal();  
  
    const handleApiCall = async () => {  
        setLoading(true);  
  
        // Remove single quotes, double quotes, and new lines  
        const cleanedLeftText = leftText.replace(/['"\n]/g, '');  
        const cleanedRightText = rightText.replace(/['"\n]/g, '');  
  
        // Create JSON object  
        const requestData = {  
            resumetxt: cleanedLeftText,  
            jobdesc: cleanedRightText  
        };  
  
        try {  
            const response = await axios.post(  
                'https://reskore.eastus2.inference.ml.azure.com/score', // Replace with your Azure API endpoint  
                requestData,  
                {  
                    headers: {  
                        'Ocp-Apim-Subscription-Key': 'YOUR_API_KEY', // Replace with your API key  
                        'Authorization': `Bearer iqQX9WilEXhTufXgyD1bBHZDPLqwLahB`,
                        'azureml-model-deployment': 'reskore-1',
                        'Access-Control-Allow-Origin': '*',
                        'access_control_allow_origins': 'https://reskore.azurewebsites.net, http://localhost:3000/,azure.com'
                    }  
                }  
            );  
            setResult(response.data);  
        } catch (error) {  
            console.error("Error calling the API:", error);  
        } finally {  
            setLoading(false);  
        }  
    };  
  
    return (  
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>  
            <h1>Resume Scoring for the given Job description</h1>  
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>  
                <div style={{ display: 'flex', flexDirection: 'column', width: '45%', margin: '10px' }}>  
                    <h3>Resume</h3> <small>Copy paste your resume here.</small>  
                    <textarea   
                        style={{ width: '100%', height: '200px' }}   
                        value={leftText}   
                        onChange={(e) => setLeftText(e.target.value)}   
                    />  
                </div>  
                <div style={{ display: 'flex', flexDirection: 'column', width: '45%', margin: '10px' }}>  
                    <h3>Job Description</h3>  
                    <small>Copy paste the job description here.</small> 
                    <textarea   
                        style={{ width: '100%', height: '200px' }}   
                        value={rightText}   
                        onChange={(e) => setRightText(e.target.value)}   
                    />  
                </div>  
            </div>  
            <button onClick={handleApiCall} disabled={loading} style={{ margin: '20px' }}>  
                {loading ? 'Loading...' : 'Submit'}  
            </button>  
            {loading && (  
                <div className="loading">  
                    <div className="spinner"></div>  
                </div>  
            )}  
            {result && (  
                <div style={{ marginTop: '20px', width: '90%' }}>  
                    <h3>API Response:</h3>  
                    <textarea   
                        style={{ width: '100%', height: '200px' }}   
                        value={JSON.stringify(result, null, 2)}   
                        readOnly   
                    />  
                </div>  
            )}  
        </div>  
    );  
};  
  
export default MainPage;  
