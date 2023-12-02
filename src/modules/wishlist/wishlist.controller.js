import { userModel } from "../../../databases/models/user.model.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";


const addToWishlist =catchAsyncError(async (req,res,next)=>{
    const {product}=req.body
    const result =await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{wishlist:product}},{new:true})
    !result && next(new AppError("result Not Found",403))
    result && res.json({message:"success",result:result.wishlist})
})
const deleteFromWishlist =catchAsyncError(async (req,res,next)=>{
    const {product}=req.body
    const result =await userModel.findByIdAndUpdate(req.user._id,{$pull:{wishlist:product}},{new:true})
    !result && next(new AppError("result Not Found",403))
    result && res.json({message:"success",result:result.wishlist})
})
const getUserWishlist =catchAsyncError(async (req,res,next)=>{
    
    const result =await userModel.findOne({_id:req.user._id})
    !result && next(new AppError("result Not Found",403))
    result && res.json({message:"success",result:result.wishlist})
})

export {
    addToWishlist ,
    deleteFromWishlist ,
    getUserWishlist
}