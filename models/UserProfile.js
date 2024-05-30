// models/UserProfile.js  
import mongoose from 'mongoose';  
  
const UserProfileSchema = new mongoose.Schema({  
    email: { type: String, required: true, unique: true },  
    username: { type: String, required: true },  
    tier: { type: String, default: 'freetier' },  
    maxRequestsPerDay: { type: Number, default: 50 }  
});  
  
export default mongoose.models.UserProfile || mongoose.model('UserProfile', UserProfileSchema);  
