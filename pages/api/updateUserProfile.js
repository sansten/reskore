// pages/api/updateUserProfile.js  
import dbConnect from '../../lib/db';  
import UserProfile from '../../models/UserProfile';  
  
export default async function handler(req, res) {  
    await dbConnect();  
  
    const { email, username, tier, maxRequestsPerDay } = req.body;  
  
    try {  
        const userProfile = await UserProfile.findOneAndUpdate(  
            { email },  
            { username, tier, maxRequestsPerDay },  
            { new: true, upsert: true } // Create a new document if not found  
        );  
  
        res.status(200).json({ success: true, data: userProfile });  
    } catch (error) {  
        res.status(400).json({ success: false, error: error.message });  
    }  
}  
