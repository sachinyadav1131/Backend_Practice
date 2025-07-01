import { ApiError } from "../utils/ApiError.js";
import { asyncHandeler } from "../utils/asyncHandeler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js"


export const verifyJWT = asyncHandeler(async(req , res , next) => {
  try { const token =  req.cookies?.accessToken || 
    req.header("Authorization")?.replace("Bearer ","")

    if(!token){
        throw new ApiError(401,"Unauthorized user")
    }

    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

     const user = await User.findById(decodedToken?._id).
    select("-password -refreshToken")

    if(!user){
        throw new ApiError(401 , "Invalid Access Token")
    }

    req.user = user;
    next()
   } catch(error){
    throw new ApiError(401 , error?.message || "Invalid Access token")
}
})