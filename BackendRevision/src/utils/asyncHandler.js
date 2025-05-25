const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
      Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
  }
}


export { asyncHandler }

/*
export const asyncHandler=(fun)=>{
  return (
   (req,res,next)=>{
    Promise.resolve(fun(req,res,next)).catch((error)=>{
        res.status(error.code ||500).json({
           success:false,
           errorMessage: error.message
        })
    })
   }
  )
}
*/

// export const asyncHandler=(fun)=>{return async(req,res,next)=>{
//   try {
//    return  await fun(req,res,next);
    
//   } catch (error) {
//     return res.status(error.code||500).json({
//         success:false,
//         errormessg: error,

//     })
//   }

// }}


// this is wrong because we do not have req res next defined in the  asynchandler  

// const asyncHandler1=async(fun)=>{
//     try { 
//         await(fun(req,res,next));
        
//     } catch (error) {
//         res.status(error.code||500).json({
//             success:false,
//             errorMessage:error
//         })
//     }
// }