// models/UserHistory.js  
import mongoose from 'mongoose';  
  
const UserHistorySchema = new mongoose.Schema({  
    email: { type: String, required: true },  
    ip: { type: String, required: true },  
    resumeLength: { type: Number, required: true },  
    jobDescLength: { type: Number, required: true } , 
    score: { type: Object, required: true },
    lastdtm: { type: Date, default: Date.now }

              
});  
  
export default mongoose.models.UserHistory || mongoose.model('UserHistory', UserHistorySchema);  
