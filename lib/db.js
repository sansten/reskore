// lib/db.js  
import mongoose from 'mongoose';  
  
const MONGODB_URI = process.env.MONGODB_URI;  
  
if (!MONGODB_URI) {  
    MONGODB_URI = "mongodb+srv://reskore:reskore!sansten^2024@rkcluster0.bvsqhyb.mongodb.net/reskoredb?retryWrites=true&w=majority&appName=rkCluster0"
    console.log(  
        'Please define the MONGODB_URI environment variable inside .env.local'  
    );  
}  
  
/**  
 * Global is used here to maintain a cached connection across hot reloads in development.  
 * This prevents connections growing exponentially during API Route usage.  
 */  
let cached = global.mongoose;  
  
if (!cached) {  
    cached = global.mongoose = { conn: null, promise: null };  
}  
  
async function dbConnect() {  
    if (cached.conn) {  
        return cached.conn;  
    }  
  
    if (!cached.promise) {  
        const opts = {  
            useNewUrlParser: true,  
            useUnifiedTopology: true,  
        };  
  
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {  
            return mongoose;  
        });  
    }  
    cached.conn = await cached.promise;  
    return cached.conn;  
}  
  
export default dbConnect;  
