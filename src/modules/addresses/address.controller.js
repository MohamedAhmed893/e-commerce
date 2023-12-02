import { userModel } from "../../../databases/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";



const addadress =catchAsyncError(async (req,res,next)=>{
    const address =await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{addresses:req.body}},{new:true})
    !address && next(new AppError("address Not Found"))
    address && res.json({message:"success",address:address.addresses})
})
const removeadress =catchAsyncError(async (req,res,next)=>{
    const address =await userModel.findByIdAndUpdate(req.user._id,{$pull:{addresses:{_id:req.body.address}}},{new:true})
    !address && next(new AppError("address Not Found"))
    address && res.json({message:"success",address:address.addresses})
})

const getUserAddress=catchAsyncError(async(req,res,next)=>{
    const address =await userModel.findOne({_id:req.user._id})
    !address && next(new AppError("address Not Found"))
    address && res.json({message:"success",address:address.addresses})
})

export {
    addadress ,
    removeadress ,
    getUserAddress
}