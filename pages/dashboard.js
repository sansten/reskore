// pages/dashboard.js  
import { useState, useEffect } from "react";  
import axios from "axios";  
import Spinner from "../components/Spinner";  
import ScoreDisplay from '../components/ScoreDisplay';  
import Footer from "@/components/Footer";  
import LogoutButton from "@/components/LogoutButton"; // Import the LogoutButton component  
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";  
import Image from 'next/image'; // Assuming you are using Next.js Image component for optimized images  

const DAILY_LIMIT = 20;  
const MAX_ALLOWED_RESUME_CHARS=25000
const MAX_ALLOWED_JD_CHARS=5000

// utils/getUserIP.js  
  
export const getUserIP = async () => {  
    try {  
        const response = await axios.get('https://api.ipify.org?format=json');  
        return response.data.ip;  
    } catch (error) {  
        console.error("Error fetching IP address:", error);  
        return null;  
    }  
};  

export default function Dashboard() {  
    const { data: session, status } = useSession()
    const router = useRouter();  

 
    const [leftText, setLeftText] = useState("");  
    const [rightText, setRightText] = useState("");  
    const [leftTextWordCount, setLeftTextWordCount] = useState(0);  
    const [rightTextWordCount, setRightTextWordCount] = useState(0);  
    const [result, setResult] = useState(null);  
    const [loading, setLoading] = useState(false);  
    const [submissionCount, setSubmissionCount] = useState(0);  
    const [limitExceeded, setLimitExceeded] = useState(false);  
    const [email, setEmail] = useState("");  
    const [maxRequestsPerDay, setMaxRequestsPerDay] = useState(DAILY_LIMIT);  
    const [tier, setTier] = useState("");  


 
    useEffect(() => {  
        const fetchUserData = async () => {  
            if (!session)
                {
                    router.push('/');  
                    return;  
                }
            try {  
                if (session)
                    {
                        setEmail(session?.user?.email)
                        const response = await axios.post('/api/getUserHistoryToday', { email: session?.user?.email });  
                        const { maxRequestsPerDay, tier, submissionCount } = response.data;  
        
                        setMaxRequestsPerDay(maxRequestsPerDay);  
                        setTier(tier);  
                        setSubmissionCount(submissionCount);  
        
                        if (submissionCount >= maxRequestsPerDay) {  
                            setLimitExceeded(true);  
                        }  
                   }
            } catch (error) {  
                console.error('Error fetching user history:', error);  
            }  
        };  
  
        fetchUserData();  
    }, [session,router]);  

    const handleSubmit = async () => {  
        if (limitExceeded) {  
            alert("Daily limit exceeded");  
            return;  
        }  
  
        setLoading(true);  
        setResult(null);  
        const sanitizedLeftText = JSON.parse(JSON.stringify(leftText)); // leftText.replace(/['"\n]/g, "");  
        const sanitizedRightText = JSON.parse(JSON.stringify(rightText)); // rightText.replace(/['"\n]/g, "");  
  
        const data = {  
            resumetxt: sanitizedLeftText,  
            jobdesc: sanitizedRightText  
        };  
  
        try {  
            const response = await axios.post("/api/callaz", data);  
            console.log("API Response:", response.data); // Log the response to inspect its format  
            setResult(response.data);  

            const endip = await getUserIP();
               // Log user activity  
            await axios.post('/api/logUserActivity', {  
                email,  
                ip: endip, // You can replace this with actual IP fetching logic  
                resumeLength: sanitizedLeftText.length,  
                jobDescLength: sanitizedRightText.length,  
                score: response.data.score
            });  
  
            // Update user profile (if necessary, for example on first login or tier change)  
            await axios.post('/api/updateUserProfile', {  
                email,  
                username: email, // Assuming username is derived from email  
                tier: 'freetier', // You can set this based on your logic  
                maxRequestsPerDay: DAILY_LIMIT  
            });  

  
            const newCount = submissionCount + 1;  
            setSubmissionCount(newCount);  
  
            if (newCount >= maxRequestsPerDay) {  
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
  
    const resultData = result; // ? parseResult(result) : null;  
    const submissionsLeft = maxRequestsPerDay - submissionCount;  
  
    const countWords = (text) => {  
        return text.length;// .split(/\s+/).filter(word => word.length > 0).length;  
    };  
  
    useEffect(() => {  
        setLeftTextWordCount(countWords(leftText));  
    }, [leftText]);  
  
    useEffect(() => {  
        setRightTextWordCount(countWords(rightText));  
    }, [rightText]);  
  
    return (  
        <div>  
            <header className="header">  
                <div className="brand-box">  
                    <span className="brand">
                    <Image src="/images/logo_trans.png" alt="Sansten Logo" width={200} height={80} />  </span>  

                </div>  
                <LogoutButton />  
            </header>  
            <div className="container">  
                <span className="heading-primary-sub">Good day {email} !</span>  
                <span className="heading-primary-sub">Resume matching score for the Job description</span>  
                <div className="text-area-container">  
                    <div className="text-area-box">  
                        <h3>Resume</h3>  
                        <textarea  
                            value={leftText}  
                            onChange={(e) => setLeftText(e.target.value)}  
                            maxLength={MAX_ALLOWED_RESUME_CHARS}
                            placeholder="Copy & paste the resume text"  
                        />  
                        <div className="word-count">Chars Count: {leftTextWordCount} / {MAX_ALLOWED_RESUME_CHARS}</div>  
                    </div>  
                    <div className="text-area-box">  
                        <h3>Job Description</h3>  
                        <textarea  
                            value={rightText}  
                            onChange={(e) => setRightText(e.target.value)}  
                            maxLength={MAX_ALLOWED_JD_CHARS}
                            placeholder="Copy & paste the job description text"  
                        />  
                        <div className="word-count">Chars Count: {rightTextWordCount} / {MAX_ALLOWED_JD_CHARS}</div>  
                    </div>  
                </div>  
                <button onClick={handleSubmit} disabled={loading || limitExceeded}>  
                    Score it!  
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
                        padding-left: 10px;  
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
                    .word-count {  
                        text-align: right;  
                        font-size: 12px;  
                        color: grey;  
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
    return 'green'
}
