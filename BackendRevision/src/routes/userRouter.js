import { Router } from "express";
import { isLoggedIn, loginUser, logoutUser, registerUser, updateAvtarImage, updateCoverImage, updateUsernameAndPassword } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { refreshAccessToken } from "../controllers/user.controller.js";
const userRouter=Router();
// userRouter.use((req, res, next) => {
//     console.log(`Incoming request: ${req.method} ${req.url}`);
//     next();
// });
userRouter.route("/register").post(
    upload.fields([
        { name:"avtar",
          maxCount:1

        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser);

userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyJwt,logoutUser)
userRouter.route("/refreshAccessToken").post(refreshAccessToken);
userRouter.route("/updateUsernameAndPassword").post(verifyJwt,updateUsernameAndPassword);
userRouter.route("/updateAvtarImage").post(upload.fields([
    {
        name:"avtar",
        maxCount:1
    },
   
])  , verifyJwt , updateAvtarImage);
userRouter.route("/updateCoverImage").post(upload.fields([
    {
        name:"coverImage" ,
        maxCount:1
    }
]),verifyJwt,updateCoverImage)
userRouter.route("/isLoggedIn").get(isLoggedIn)

export default userRouter;


