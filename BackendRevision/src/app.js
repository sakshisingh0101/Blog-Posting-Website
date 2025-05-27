import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app=express();
const allowedOriginsString = process.env.CORS_ORIGIN;
const allowedOrigins = allowedOriginsString ? allowedOriginsString.split(',').map(s => s.trim()) : [];

// app.use(cors({
//     origin:process.env.CORS_ORIGIN,
//     credentials:true
// }))

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
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

