import { userModel } from "../../../databases/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { ApiFeature } from "../../utils/apiFeature.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import { deleteOne } from "../handlers/factor.handler.js";


const createUser=catchAsyncError(async (req,res,next)=>{
    const isFound =await userModel.findOne({email:req.body.email})
    if(isFound) return next(new AppError("Account Already Exist",409))
    const user =new userModel(req.body)
    await user.save() 
    res.json({message:"success",user})
})

const getAllUser =catchAsyncError(async (req,res,next)=>{
    const apifeature =new ApiFeature(userModel.find(),req.query).paginate().fields().filter().sort().search()
    const result=await apifeature.mongooseQuery
    res.json({message:"success",page:apifeature.PAGE_NUMBER,limit:apifeature.limit,result})
})

const getUser =catchAsyncError (async(req,res,next)=>{
    const {id}=req.params
    const user =await userModel.findById(id)
    !user && next(new AppError("User Not Found",403))
    user && res.json({message:"success",user})
})
const updateUser =catchAsyncError (async(req,res,next)=>{
    const {id}=req.params
    const user =await userModel.findByIdAndUpdate(id,req.body,{new:true})
    !user && next(new AppError("User Not Found",403))
    user && res.json({message:"success",user})
})
const changePasswordUser =catchAsyncError (async(req,res,next)=>{
    const {id}=req.params
    req.body.changedAt=Date.now()
    const user =await userModel.findByIdAndUpdate(id,req.body,{new:true})
    !user && next(new AppError("User Not Found",403))
    user && res.json({message:"success",user})
})
const deleteUser =deleteOne(userModel)

export{
    getAllUser ,
    getUser ,
    createUser ,
    updateUser ,
    deleteUser ,
    changePasswordUser
}