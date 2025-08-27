import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:false
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:String,
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})


//password hashing
userSchema.pre('save',async function (next) {
    if(!this.isModified('password')){
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt)
        next();
    } catch (error) {
        next(error)
    }
})

//comapring hashed Password

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model('User',userSchema)

export default User;