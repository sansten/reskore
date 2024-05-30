import React, { useState } from 'react';  
import { StarRating } from "star-ratings-react";
  
const ScoreDisplay = ({ jsonResponse }) => {  
    const [scoreData, setScoreData] = useState(null);  
    const [starRating, setstarRating] = useState(0);

    React.useEffect(() => {  
        try {  
            const parsedResponse = JSON.parse(jsonResponse);  
            console.log("parse resp:", parsedResponse, parsedResponse.score);
            if (parsedResponse && parsedResponse.score>-1) {  
                console.log("inside parse resp:", parsedResponse);

                const scoreContent = parsedResponse; 
                const c_strengths = scoreContent.strengths ? scoreContent.strengths :(scoreContent.strength ? scoreContent.strength : [])
                const c_weakness = scoreContent.weaknesses ? scoreContent.weaknesses :(scoreContent.weakness ? scoreContent.weakness :[])
                setScoreData({  
                    score: scoreContent.score ?? 'N/A',  
                    summary: scoreContent.summary ?? 'N/A',  
                    strength: c_strengths ? (Array.isArray(c_strengths) ? c_strengths : [c_strengths]) : [],  
                    weakness: c_weakness ? (Array.isArray(c_weakness) ? c_weakness : [c_weakness]) : []  
                });  
                
            }  
        } catch (error) {  
            console.error('Error parsing JSON:', error);  
        }  
    }, [jsonResponse]);  
  
    return (  
        <div>  
            {scoreData ? (  
                <div className="details">  
                    <center><b>Score: </b> </center>
                    <div className="score" style={{ color: getScoreColor(scoreData.score) }}>  
                        {scoreData.score}/10
                    </div>  
                   <center>  <StarRating rating={scoreData.score} onSetRating={setstarRating} starColor={getScoreColor(scoreData.score)} maxRating={10} size={25} textColor='transparent'/>                        
                   </center>
                    <p><strong>Summary:</strong> {scoreData.summary}</p>  
                    <p><strong>Strengths:</strong> </p>
                        <ul>  
                            {scoreData.strength.map((strength, index) => (  
                                <li key={index}>{strength}</li>  
                            ))}  
                        </ul>  
                    
                    <p><strong>Weaknesses:</strong> </p>  
                    <ul>  
                            { scoreData.weakness.map((weakness, index) => (  
                                <li key={index}>{weakness}</li>  
                            ))}  
                        </ul>  
                    
                </div>  
            ) : (  
                <p>No data available</p>  
            )}  
             <style jsx>{`  
                .score {  
                    font-size: 100px;  
                    text-align: center;  
                    margin-top: 1px;  
                    letter-spacing: 0.1px;
                    padding-top: 0%;  

                }
                .scoreNote {  
                    font-size: 10px;  
                    text-align: center;  
                    margin-top: 1px;  
                    letter-spacing: 0.1px;

                }  
                .details {  
                    list-style-type: disc;  
                    padding-left: 20%;  
                    padding-right: 20%;  
                }  
                .limit-exceeded {  
                    color: red;  
                    font-weight: bold;  
                    text-align: center;  
                    margin-top: 20px;  
                }  
              
            `}</style>  
        </div>  
    );  
};  
  
const getScoreColor = (score) => {  
    if (score < 5) return 'red';  
    if (score >= 5 && score < 7) return 'orange';  


    return 'green';  
};  

export default ScoreDisplay;  
