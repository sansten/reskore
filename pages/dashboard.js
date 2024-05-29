// pages/dashboard.js  
import { useMsal } from "@azure/msal-react";  
import { useState, useEffect } from "react";  
import axios from "axios";  
import Spinner from "../components/Spinner";  
import ScoreDisplay from '../components/ScoreDisplay';  
import Footer from "@/components/Footer";
const DAILY_LIMIT = 50;  
  
export default function Dashboard() {  
    const { instance, accounts } = useMsal();  
    const [leftText, setLeftText] = useState("");  
    const [rightText, setRightText] = useState("");  
    const [result, setResult] = useState(null);  
    const [loading, setLoading] = useState(false);  
    const [submissionCount, setSubmissionCount] = useState(0);  
    const [limitExceeded, setLimitExceeded] = useState(false);  

    useEffect(() => {  
        const storedCount = parseInt(localStorage.getItem('submissionCount'), 10) || 0;  
        const lastSubmissionDate = localStorage.getItem('lastSubmissionDate');  
        const today = new Date().toISOString().split('T')[0];  
  
        if (lastSubmissionDate !== today) {  
            localStorage.setItem('submissionCount', '0');  
            localStorage.setItem('lastSubmissionDate', today);  
            setSubmissionCount(0);  
        } else {  
            setSubmissionCount(storedCount);  
        }  
  
        if (storedCount >= DAILY_LIMIT) {  
            setLimitExceeded(true);  
        }  
    }, []);  
  
    const handleSubmit = async () => {  
        if (limitExceeded) {  
            alert("Daily limit exceeded");  
            return;  
        }  
  
        setLoading(true);  
        setResult(null);  
        const sanitizedLeftText = JSON.parse(JSON.stringify(leftText));
//        leftText.replace(/['"\n]/g, "");  
        const sanitizedRightText = JSON.parse(JSON.stringify(rightText)); // rightText.replace(/['"\n]/g, "");  
  
        const data = {  
            resumetxt: sanitizedLeftText,  
            jobdesc: sanitizedRightText  
        };  
  
        try {  
            const response = await axios.post("/api/callaz", data);  
            console.log("API Response:", response.data); // Log the response to inspect its format  
            setResult(response.data);  
  
            const newCount = submissionCount + 1;  
            localStorage.setItem('submissionCount', newCount.toString());  
            setSubmissionCount(newCount);  
  
            if (newCount >= DAILY_LIMIT) {  
                setLimitExceeded(true);  
            }  
        } catch (error) {  
            console.error("Error calling Azure API:", error);  
        } finally {  
            setLoading(false);  
        }  
    };  
  
    const parseResult = (result) => {  
        if (typeof result !== 'string') {  
            console.error("Expected result to be a string, but got:", typeof result);  
            return { score: null, details: [] };  
        }  
  
        const lines = result.split("\n");  
        let score = null;  
        let details = [];  
  
        lines.forEach(line => {  
            const match = line.match(/(?:\*\*)?Score:\s*(\d+(?:\.\d+)?)(?:\*\*)?/);  
            if (match) {  
                score = parseFloat(match[1]);  
            } else {  
                details.push(line.trim());  
            }  
        });  
  
        return { score, details };  
    };  
  
    const resultData = result ; //? parseResult(result) : null;  
    const submissionsLeft = DAILY_LIMIT - submissionCount;  
  
    return (  

        <div>
        <header class="header">
        <div class="brand-box">
          <span class="brand">reskore</span>
          <span class="heading-primary-sub">Resume matching score for the Job description</span>

        </div>
            
      </header>
       <div className="container">  
               <div className="text-area-container">  
                <div className="text-area-box">  
                    <h3>Resume</h3>  
                    <textarea  
                        value={leftText}  onChange={(e) => setLeftText(e.target.value)}  
                        placeholder="Copy & paste the resume text"  
                    />  
                </div>  
                <div className="text-area-box">  
                    <h3>Job Description</h3>  
                    <textarea  
                        value={rightText}  
                        onChange={(e) => setRightText(e.target.value)}  
                        placeholder="Copy & paste the job description text"  
                    />  
                </div>  
            </div>  
            <button onClick={handleSubmit} disabled={loading || limitExceeded}>  
                Score it !  
            </button>  
            <div className="submission-info">  
                {limitExceeded ? "Daily limit exceeded" : `Total daily submissions left: ${submissionsLeft}`} 
            </div>  
            {loading && <Spinner />}  
            {resultData && (  
                <div className="result">  
                      <ScoreDisplay jsonResponse={resultData.score} />  

                </div>  
            )}  
            <style jsx>{`  
                .score {  
                    font-size: 50px;  
                    text-align: center;  
                    margin-top: 20px;  
                }  
                .details {  
                    list-style-type: disc;  
                    padding-left: 20px;  
                }  
                .limit-exceeded {  
                    color: red;  
                    font-weight: bold;  
                    text-align: center;  
                    margin-top: 20px;  
                }  
                .submission-info {  
                    text-align: center;  
                    margin-top: 10px;  
                    font-size: 14px;  
                    color: ${limitExceeded ? 'red' : 'black'};  
                }  
            `}</style>  
                                <Footer />  

        </div>  
        </div>
    );  
}  
  
const getScoreColor = (score) => {  
    if (score < 5) return 'red';  
    if (score >= 5 && score < 7) return 'orange';  
    return 'green';  
};  

