// pages/api/logUserActivity.js  
import dbConnect from '../../lib/db';  
import UserHistory from '../../models/UserHistory';  
  
export default async function handler(req, res) {  
    await dbConnect();  
  
    const { email, ip, resumeLength, jobDescLength,score } = req.body;  
  
    try {  
        const newUserHistory = new UserHistory({  
            email,  
            ip,  
            resumeLength,  
            jobDescLength,
            score            
        });  
  
        await newUserHistory.save();  
  
        res.status(201).json({ success: true, data: newUserHistory });  
    } catch (error) {  
        res.status(400).json({ success: false, error: error.message });  
    }  
}  
