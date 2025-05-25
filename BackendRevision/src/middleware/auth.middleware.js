import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

// export const verifyJwt=asyncHandler(async(req , res ,next)=>{
//     try {  
//         const tokenHeader = req.headers.authorization;
// if (!tokenHeader) {
//     throw new ApiError(401, "Authorization header is missing");
// }
//         const token=req.cookies?.accessToken || tokenHeader.replace("Bearer ","");
//         const decodedInfo= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
//        const user=await User.findById(decodedInfo._id);
//        if(!user)
//        {
//         throw new ApiError(401,"Invalid Access Token");
//        }
//        req.user=user;
//        next();

//     } catch (error) {
//         throw new ApiError(401,error?.message || "Invalid Access Token");
//     }
   
// })


export const verifyJwt = asyncHandler(async (req, res, next) => {
    try {  
        // ✅ First, check token in cookies
        let token = req.cookies?.accessToken;

        // ✅ If no token in cookies, check Authorization header
        if (!token) {
            const tokenHeader = req.headers.authorization;
            if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
                throw new ApiError(401, "Authorization token is missing");
            }
            token = tokenHeader.replace("Bearer ", "").trim();
        }

        // ✅ Verify token
        const decodedInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // ✅ Find user in DB
        const user = await User.findById(decodedInfo._id);
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token");
    }
});
