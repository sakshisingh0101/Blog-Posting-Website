import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken"
const generateAccessAndRefreshToken =async(userId)=>{
  const user=await User.findById(userId);
  const accessToken=await user.generateAccessToken()
  const refreshToken=await user.generateRefreshToken();
  user.refreshToken=refreshToken;
  user.save({validateBeforeSave: false})
  return {accessToken,refreshToken};

}
const registerUser=asyncHandler(async (req , res)=>{
    //  get details fron frontend
    //  check validation of the data received... empty
    //.. avtar ?? 
    // upload on cloudinary and again check for avtar 
    // create user in db
    // check if user is created or not 
    // remove password and refresh token 
    // return response 

    const {firstName,lastName,userName,email,age,password}=req.body  // req.body we can get data coming from json, form 
    console.log("userName: ", userName);
    console.log("email: ", email);
    console.log("password: ", password);
    console.log(req.body);
    console.log(req.files);

    if([firstName,lastName,userName,email,password].some((field)=>((field?.trim )==="")))
    {
        throw new ApiError(400,"All the fields are required ");
    }
    if(isNaN(age)||age<0)
    {
        throw new ApiError(400,"Enter valid age");
    }
    if(!email.includes('@'))
    {
        throw new ApiError('400',"Enter valid email");
    }

    const existedUser=await User.findOne({
        $or:[ { userName } , { email } ]
    })
    if(existedUser)
    {  console.log("user already registerd")
        throw new ApiError(409,"Already registered user ");
    }

    const avtarLocalPath=req.files?.avtar[0]?.path ;
    if(!avtarLocalPath)
    {
        throw new ApiError(400,"upload avtar");
    }
    console.log(avtarLocalPath);
    const avtarResponse=await uploadOnCloudinary(avtarLocalPath);
    if(!avtarResponse)
    {
        throw new ApiError(500,"Internal Server Error : upload failed ");


    }
    let coverImageLocalPath;
    // const coverImageLocalPath=req.files?.coverImage[0]?.path;
    if(req.files&&Array.isArray(req.files?.coverImage) && req.files?.coverImage.length>0)
    {
        coverImageLocalPath=req.files.coverImage[0].path
    }
    console.log(coverImageLocalPath)
    const coverImageResponse=await uploadOnCloudinary(coverImageLocalPath);
   
    
  
    const user= await User.create({
        firstName,
        lastName,
        userName,
        age,
        email,
        password,
        avtar:avtarResponse.url,
        coverImage:coverImageResponse? coverImageResponse.url : ""  ,
    })
    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)
    const option={
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:'None'
    }

    const usercreated=await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!usercreated)
    {
        throw new ApiError(500,"Internal Server Error: user creation failed")
    }

    console.log("success")

    return res.status(201)
    .cookie("accessToken",accessToken,option)
    .cookie("refreshToken",refreshToken,option)
    .json(new ApiResponse(201,"Successfully registered",usercreated));





})

const loginUser=asyncHandler(async(req,res)=>{
   
    // req.body {username,email,password}
    // check username email password 
    // find user
    // compare password 
    // access token and refresh token
    // send cookies 
    // send response

    const {userName,email,password}=req.body;
    console.log(req.body)
    if([userName,email,password].some((field)=>{
        return (
        field?.trim()===""
        )
    }))

    {
        throw new ApiError(400,"All the fields are required");
    }

    const existedUser=await User.findOne({

        $or: [ {userName} , {email} ]
    })
    if(!existedUser)
    {
        throw new ApiError(400,"User not registered");

    }
    const passwordCorrect=await existedUser.isPassword(password);
    if(!passwordCorrect)
    {
        throw new ApiError(400,"Incorrect password");
    }
    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(existedUser._id)

    const user=await User.findById(existedUser._id).select(
        "-password -refreshToken"
    );
    

    const option={
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite: 'None'
    }

    res.status(200)
    .cookie("accessToken", accessToken,option)
    .cookie("refershToken", refreshToken,option)
    .json(
        new ApiResponse(200,"User Logged In Successfuly",{
            data:user,refreshToken,accessToken
        })
    )




})


const logoutUser=asyncHandler(async(req,res)=>{
    // cookie remove refreshToken update
   const user= await User.findByIdAndUpdate(req.user._id,
        {
        $set:{
            refreshToken:undefined
        }
       
        },
        {
            new : true
        }
)

res.status(200)
.clearCookie("accessToken")
.clearCookie("refreshToken")
.json(
    new ApiResponse(200,"Logged Out Successfully",{
        data:user
    })
)
})

const refreshAccessToken=asyncHandler(async(req,res)=>{
   try {
     const Token=req.cookies?.refreshToken || req.body.refreshToken
     if (!Token) {
        throw new ApiError(401, "Refresh token not provided");
      }
      
     const decodedInfo= jwt.verify(Token,process.env.REFRESH_TOKEN_SECRET)
     const user=await User.findById(decodedInfo._id)
     if(!user)
     {
         throw new ApiError(401," Invalid token : user does not match ")
 
     }
     if(user.refreshToken!==Token)
     {   throw new ApiError(401," Invalid refresh Token")
 
 
     }
 
 
 
     const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id);
     const option={
         httpOnly:true,
         server:false
     }
     const newUser=await User.findByIdAndUpdate(user._id,
         {
         $set: {
             refreshToken:refreshToken
         }
         },
        {
            new: true
        }
 ).select("-password -refreshToken")
     res.status(200)
   
     .cookie("accessToken",accessToken,option)
     .cookie("refreshToken",refreshToken,option)
     .json(
         new ApiResponse(200,"Refresh Aceess Token successfully",{
             data: newUser,refreshToken,accessToken
             
         })
     )
   } catch (error) {
    throw new ApiError(401,error?.message|| "Invalid refresh token 66");
   }
})

const updateUsernameAndPassword=asyncHandler(async(req,res)=>{
    const {userName,password}=req.body;
    console.log(userName,password)

    
    const user=req.user 
    if(!user)
    {
        throw new ApiError(401,"Unauthorized User");
    }
    const existedUser=await User.findById(user.id)
    existedUser.password=password
    existedUser.userName=userName
    existedUser.save({validateBeforeSave: false})

    const newUser=await User.findById(existedUser._id).select(" -password -refreshToken ")
    // {
    //     $set:{
    //         userName: userName?.trim() ? userName: existedUser.userName,
    //         password: password?.trim()? password : existedUser.password

    //     }
    // },
    // {
    //    new:true
    // }).select( " - password -refreshToken ")

    res.status(200).json(
        new ApiResponse(200," User's username and password updated successfully ",newUser)
    );
})

const updateAvtarImage=asyncHandler(async(req,res)=>{
    if(!(req.files&&Array.isArray(req.files?.avtar)&&req.files?.avtar.length>0))
    {
        return  res.status(200).json(
            new ApiResponse(200, "No new avatar uploaded, nothing was changed"))

    }
    const avtarLocalPath=req.files?.avtar[0].path
    const avtar=await uploadOnCloudinary(avtarLocalPath);
    const user=req.user;
    const newUser=await User.findById(user._id)
    if(!newUser)
    {
        throw new ApiError(401,"Unauthorized user");
    }
    newUser.avtar=avtar.url;
    await user.save({validateBeforeSave:false});

    res.status(200)
    .json(
        new ApiResponse(200,"Avtar Updated Successfully ",newUser)
    )

})

const updateCoverImage=asyncHandler(async(req,res)=>{
    if(!(req.files&&Array.isArray(req.files?.coverImage)&&req.files.coverImage[0]))
    {
         return res.status(200).json(new ApiResponse(200,'No new coverImage uploaded'));
    }
    const coverImageLocalPath=req.files?.coverImage[0].path;
    const coverImage=await uploadOnCloudinary(coverImageLocalPath);
    const user=req.user;
    const newUser=await User.findById(user._id);
    if(!newUser)
    {
        throw new ApiError(401,"Unauthorized User")
    }
    newUser.coverImage=coverImage.url;
    await newUser.save({validateBeforeSave:false})

    res.status(200).json(
        new ApiResponse(200,"CoverImage Updated Successfully",newUser)
    )

})

const isLoggedIn=asyncHandler(async(req,res)=>{
    let token = req.cookies?.accessToken;

        // ✅ If no token in cookies, check Authorization header
        if (!token) {
            const tokenHeader = req.headers.authorization;
            if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
                throw new ApiError(401, "Authorization token is missing");
            }
            token = tokenHeader.replace("Bearer ", "").trim();
        }
        const decodedInfo=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user=await User.findById(decodedInfo._id).select(" -password -refreshToken");
        if(!user)
        {
            throw new ApiError(401,"User not found")
        }

        res.status(200).json(
            new ApiResponse(200,"Successfully checked",user)
        )
})
export {registerUser,loginUser,logoutUser,refreshAccessToken,updateUsernameAndPassword,updateAvtarImage,updateCoverImage,isLoggedIn}
