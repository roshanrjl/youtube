
    
    //asyncHandler is a function which take the arguments as  another functio and here another function is the route function 
    // sabi  async route function ma try and catch launw vanda async route function lai asynchanlder function ma pass garne ra asyncHandler la try catch perform garxa ra return gardin xa
    //both method 1 and 2 are of same purpose.
    
    
// method one
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next); 
//     } catch (error) {
//         res.status(error.code || 500).json({ 
//             success: false,
//             message: error.message
//         });
//     }
// };


//method two 

const asyncHandler = (requestHandler)=>{
 return  (req , res, next)=>{
    Promise.resolve(requestHandler(req , res, next))
    .catch((err)=>next(err))
  }

}

export {asyncHandler}