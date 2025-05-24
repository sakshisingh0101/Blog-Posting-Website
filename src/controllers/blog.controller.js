import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { Blog } from "../models/blog.models.js";
import { refreshAccessToken } from "./user.controller.js";


const blogPost=asyncHandler(async(req , res)=>{
   const {title,content} = req.body;
   if(!title?.trim()|| !content?.trim())
   {
    throw new ApiError(401,"All the fields are required")

   }

   const user=req.user;
   const imageLocalPath=req.files?.postImage[0]?.path;
   console.log("req.files console log: ", req.files)
   if(!imageLocalPath)
   {
    throw new ApiError(401,"IMAGE IS REQUIRED");
   }
   const postImage=await uploadOnCloudinary(imageLocalPath);
   if(!postImage)
   {
    throw new ApiError(500,"Internal Server Error : upload failed ");
   }
   const blogPost=await Blog.create({
    title,
    content,
    owner:user._id,
    postImage: postImage.url
   })


   res.status(200)
   .json(
    new ApiResponse(200,"BLOG SUCCESSFULLY POSTED",blogPost)
   )
})


const updatePost = asyncHandler(async(req,res)=>{
    const {title,content}=req.body;
    const {blog_id}=req.params;
    const user=req.user;
    console.log("title :" ,title)
    console.log("content:",content)

    if(!blog_id)
    {
        throw new ApiError(401,"Invalid blog id")
    }

    const blogPost=await Blog.findById(blog_id);
    if(!blogPost)
    {
        throw new ApiError(401,"Incorrect blog id or may be blog doesn't exist")
    }
    if(blogPost.owner._id.toString()!==user._id.toString())
    {
        throw new ApiError(400,"Only owner can manipulate  the Post")
    }
    // const imageLocalPath=req.files?.postImage[0]?.path;
    const imageLocalPath = Array.isArray(req.files?.postImage) && req.files.postImage.length > 0
    ? req.files.postImage[0].path
    : null;
    // await Blog.updateMany(
    //     {},
    //     [
    //       {
    //         $set: {
    //           ownerId: "$owner._id"
    //         }
    //       }
    //     ]
    //   );
    let postImageUrl;
    if(imageLocalPath){
     postImageUrl=await uploadOnCloudinary(imageLocalPath);
    }

    const newBlog=await Blog.findByIdAndUpdate(blogPost._id,{
        $set: {
            title: title?.trim()==="" ? blogPost.title : title,
            content: content?.trim()===""? blogPost.content : content ,
            postImage: postImageUrl?.url || blogPost.postImage 
        },
        


    },
{
    new : true
})

res.status(200)
.json(
    new ApiResponse(200,"Successfully Updated",newBlog)
)

    

})
const deletePost=asyncHandler(async(req,res)=>{
    const {blogId}=req.params
    if(!blogId)
    {
        throw new ApiError(401,"Invalid blog id");
    }
    const blogPost=await Blog.findById(blogId);
    if(!blogPost)
    {
        throw new ApiError(401,"Invalid blog id as blogpOst with this id not found")
    }
    const user=req.user;
    const existedUser=await User.findById(user._id);
    if(!existedUser)
    {
        throw new ApiError(401,"Unauthorized User")

    }
    if(!blogPost.owner._id.equals(existedUser._id))
    {  throw new ApiError(401,"Only owner can delete the post")
        
    }
    const deletedPost=await Blog.findByIdAndDelete(blogPost._id)
    if(!deletedPost)
    {
        throw new ApiError(400,"Post not found");
    }

    res.status(200).json(
        new ApiResponse(200,"Post deleted successfully",deletedPost)
    )
    
})
const getUserDetails=asyncHandler(async(req,res)=>{
    const {userId}=req.params
    if(!userId)
    {
        throw new ApiError(401,"User id not get");
    }
    const user=await User.findById(userId).select( "-password -refreshToken");
    if(!user) {
        throw new ApiError(401,"User not found")
    }
    res.status(200).json(
        new ApiResponse(200,"Successfully fetched User",user)
    )
})

const getUserProfile=asyncHandler(async(req,res)=>{
   const {userName}=req.params

   if(!userName?.trim())
   {
    throw new ApiError(401,"Username is not valid")
   }
   //either we can User.find({userName}  and get the details after afterward)
   // or we can use aggregation 

   const user=await User.aggregate([
    {
        $match:{
            userName:userName?.toLowerCase()
        }
    },
    {
        $project:{
            password:0,
            refreshToken:0
           }
    }
   ])
   if(!user.length)
   {
    throw new ApiError(400,"User not found")
   }
   
   res.status(200).json(
    new ApiResponse(200,"User Fetched Successfully",user[0])
   )


})

const getAllPost=asyncHandler(async(req,res)=>{
    const allPost=await Blog.aggregate([
        {
            $lookup:{
               from:"users",
               localField:"owner",
               foreignField:"_id",
               as:"owner"
            }
        },
        {
            $unwind: "$owner"           // flatten the owner array into an object
        },
        {
            $sort: { createdAt: -1 } // 🔥 Sort by createdAt descending (latest first)
        },
        {   
            
            $project:{
                content:1,
                title:1,
                postImage:1,
                owner:1,
                createdAt:1
            }
        }
    ])
    if(!allPost||allPost.length===0)
    {
        throw new ApiError(500,"Server Error: Failed to fetch");
    }
    res.status(200).json(
        new ApiResponse(200,"Successfully fetched",allPost)
    )
})
const getUserAllPost=asyncHandler(async(req,res)=>{
    const {userName}=req.params
    if(!userName?.trim())
    {
        throw new ApiError(401,"UserName is not valid")
    }
    console.log(userName)


const user=await User.aggregate([
        { 
            $match:{
            userName:userName?.toLowerCase()
           }
        },
        {
            $lookup:{
                from:"blogs",
                localField:"_id",
                foreignField:"owner",
                as:"AllBlogPost"
            }
        },
        {
            $addFields:{
               totalPost:{ 
                $size:"$AllBlogPost"
               }
            }
        },
        {
            $project:{
                password:0,
                refreshToken:0
            }
        }
])
// agrregate does not return mongoose document so we can't use select option to remove unnecessary
if(!user.length)
{
    throw new ApiError(400,"User document  not found ")
}
res.status(200).json(
    new ApiResponse(200,"User Post Details fetched successfully",user[0])
)

})
const getLoggedInUserAllPost=asyncHandler(async(req,res)=>{
    const existedUser=req.user
    if(!existedUser)
    {
        throw new ApiError(401,"User not found")
    }

    const user=await User.aggregate([
        { 
            $match:{
            _id:existedUser._id
           }
        },
        {
            $lookup:{
                from:"blogs",
                localField:"_id",
                foreignField:"owner",
                as:"AllBlogPost",
                // pipeline:[
                //     {
                //         $lookup:{
                //             from:"users",
                //             localField:"owner",
                //             foreignField:"_id",
                //             as:"owner"
                //         }
                //     },
                //     {
                //         $unwind:"owner"
                //     }
                // ]
            }
        },
        {
            $addFields:{
                totalPost:{ 
                    $size:"$AllBlogPost"
                   }
            }
        },
        {
            $project:{
                password:0,
                refreshToken:0
            }
        }
])

    if(!user.length) 
    {
        throw new ApiError(400,"User document  not found ")
    }
    res.status(200).json(
        new ApiResponse(200,"User Post Details fetched successfully",user[0])
    )
    

})
export  {blogPost,updatePost,deletePost,getUserProfile,getUserAllPost,getLoggedInUserAllPost,getAllPost,getUserDetails};


