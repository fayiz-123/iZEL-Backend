import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    endpoint : {
        type:String,
        required:true
    },
    expirationTime:{
        type:String,
        default:null
    },
    keys:{
        p256dh:String,
        auth:String
    }
})

export default mongoose.model('Subscription',subscriptionSchema)