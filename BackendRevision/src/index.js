// import mongoose from "mongoose";

// import express from 'express'
// import dotenv from "dotenv"
// dotenv.config({
//     path:'./.env'
// })
// import dbconnect from "./db/index.js";
// export const app=express();
// dbconnect()
// .then(()=>{
//     app.listen(process.env.PORT,()=>{
//         console.log(`The db connects successfully and listening on port ${process.env.PORT}`);
//     })
// }).catch((error)=>{
//     console.log("Error : ",error);
// })

import dotenv from 'dotenv'
// import mongoose from 'mongoose'
// import { dbName } from './constants.js';
import {app} from './app.js'



dotenv.config({path:'./.env'})
import dbconnect from './db/index.js';
dbconnect()
.then(()=>{
  app.on('error',(error)=>{
    console.log("Error :: " ,error);
    throw error;
  })
  const port=process.env.PORT||8000
  app.listen(port,()=>{
    console.log(`The App is listening on ${port}`)
  })
})
.catch((error)=>{
    console.log('Error ',error);
})















// (async()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${db_name}`);
//         app.on("error",(error)=>{
//             console.log(error);
//             throw error;
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`The db connects successfully and listening on port ${process.env.PORT}`);
//         })

        
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// })();