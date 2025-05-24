import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json(
    {
        limit:"16kb"
    }
))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static("public"))
app.use(cookieParser())


//import routes
import userRouter from './routes/userRouter.js';
import blogRouter from './routes/blogRouter.js';


//routes declaration 
app.use("/api/v1/users",userRouter)
app.use("/api/v1/blogs",blogRouter);




export {app}





// app.get{router} ("/users",fun(res,req) {controller})
//now we have separated the controller and router so we will use app.use middleware for routing and pass the control to userrouter etc etc

