// pages/api/callAzure.js  
import axios from "axios";  
  
export default async function handler(req, res) {  
    if (req.method !== "POST") {  
        return res.status(405).json({ message: "Only POST requests are allowed" });  
    }  
  
    const { resumetxt, jobdesc } = req.body;  
  
    try {  
        const response = await axios.post("https://reskore.eastus2.inference.ml.azure.com/score", {  
            resumetxt,  
            jobdesc  
        }, {  
            headers: {  
                "Content-Type": "application/json",  
                'Ocp-Apim-Subscription-Key': 'YOUR_API_KEY', // Replace with your API key  
                'Authorization': `Bearer gb1N08esSh4N5xKHfdFP8lV8BZYIWt40`,
                'Access-Control-Allow-Origin': '*',
                'access_control_allow_origins':'http://localhost:3000/,azure.com'
            }  
        });  
  
        res.status(200).json(response.data);  
    } catch (error) {  
        console.error("Error calling Azure API:", error);  
        res.status(500).json({ message: "Error calling Azure API" });  
    }  
}  
