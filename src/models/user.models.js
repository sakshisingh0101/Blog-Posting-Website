import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema=new mongoose.Schema({
    firstName:
    {
        type:String,
        required:true

    },
    lastName:
    {
        type:String,
        required:true

    },
    userName:
    {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim: true,
        // used for searching purpose makit costly but not that much ,, field ko searchable banane ke liye database ke search mai aane lag jaye  

    },
    email:{
        type:String,
        required:[true,"Email is required"],
        lowercase:true,
        unique: true
    },
    password:{
        type:String,
        required:true,
        min:[6,"Min length should be 6 char"],
        max:[15,"Max length should be 15 char"]
    },
    age:{
        type:Number,
        required:true,
        
    },
    avtar:{
        type:String,
        
    },
    coverImage:{
        type:String,

    },
    refreshToken:{
        type:String
    }
    

},{timestamps:true})
userSchema.pre("save",async function(next){
  if(!this.isModified("password")) return next();
  this.password=await bcrypt.hash(this.password,10);
  next();
})

// customise methods
userSchema.methods.isPassword=async function(passwrod){
  return await bcrypt.compare(passwrod,this.password);
}
userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {  _id:this._id,
            userName:this.userName,
            email:this.email,


        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
)
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {  _id:this._id,
            userName:this.userName,
            email:this.email,


        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
)
}

export const User=mongoose.model("User",userSchema);