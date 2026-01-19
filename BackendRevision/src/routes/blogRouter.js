import { Router } from "express";
import { blogPost, deletePost, getAllPost, getLoggedInUserAllPost, getpostbyid, getUserAllPost, getUserDetails, getUserProfile, updatePost } from "../controllers/blog.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";


const blogRouter=Router();

blogRouter.route("/blogPost").post(
    upload.fields([
        {
            name:"postImage",
            maxCount:1
        }
    ]),
    verifyJwt,
    blogPost
)
blogRouter.route("/updatePost/:blog_id").post(upload.fields([
    {
        name:"postImage",
        maxCount:1
    }
]),verifyJwt,updatePost)
blogRouter.route("/deletePost/:blogId").delete(verifyJwt,deletePost)
blogRouter.route("/getUserDetails/:userId").get(getUserDetails)
blogRouter.route("/getAllPost").get(getAllPost)
blogRouter.route("/getUserProfile/:userName").get(verifyJwt,getUserProfile)
blogRouter.route("/getUserAllPost/:userName").get(verifyJwt,getUserAllPost)
blogRouter.route("/getLoggedInUserAllPost").get(verifyJwt,getLoggedInUserAllPost)
blogRouter.route("/getPostbyID/:blogId").get(getpostbyid);



export default blogRouter;
