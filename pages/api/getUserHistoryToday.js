import dbConnect from '../../lib/db'; // Assume this is a function that connects to your MongoDB  
import UserProfile from '../../models/UserProfile';  
import UserHistory from '../../models/UserHistory';  
  
export default async function handler(req, res) {  
    if (req.method !== 'POST') {  
        return res.status(405).json({ message: 'Method not allowed' });  
    }  
  
    const { email } = req.body;  
  
    try {  
        await dbConnect();  
  
        const userProfile = await UserProfile.findOne({ email });  
        if (!userProfile) {  
            return res.status(404).json({ message: 'User profile not found' });  
        }  
  
        const today = new Date(new Date().toISOString().split('T')[0]);  
        console.log("todaay:", today)
        const userHistory = await UserHistory.find({ email,   lastdtm: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
          }});  
  
        const todayRequests = userHistory.length;  
  
        res.status(200).json({  
            maxRequestsPerDay: userProfile.maxRequestsPerDay,  
            tier: userProfile.tier,  
            submissionCount: todayRequests  
        });  
    } catch (error) {  
        console.error('Error fetching user data:', error);  
        res.status(500).json({ message: 'Internal server error' });  
    }  
}  
