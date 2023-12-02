import { reviewModel } from "../../../databases/models/review.model.js";
import { AppError } from "../../utils/AppError.js";
import { ApiFeature } from "../../utils/apiFeature.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";


const addReview = catchAsyncError(async (req, res, next) => {
     req.body.user=req.user._id
    const isFound = await reviewModel.findOne({ user:req.user._id ,product:req.body.product })
    if (isFound) return next(new AppError("you are not authorized to write two comment "))
    const review = new reviewModel(req.body)
    review.save()
    res.json({ messsage: "success", review })
})

const getAllReview = catchAsyncError(async (req, res, next) => {
    const apiFeature = new ApiFeature(reviewModel.find(), req.query).paginate().fields().filter().search().sort()
    const reviews = await apiFeature.mongooseQuery
    res.json({ message: "success", reviews })

})

const getSpacificReview= catchAsyncError(async(req,res,next)=>{
    const {id}=req.params
   
    const review =await reviewModel.findById(id)
    !review && next(new AppError("Review Not Found",403))
    review && res.json({ messsage: "success", review })
})
const updateReview= catchAsyncError(async(req,res,next)=>{
    const {id}=req.params
  
    const review =await reviewModel.findOneAndUpdate({_id:id ,user:req.user._id},req.body,{new:true})
    !review && next(new AppError("Review Not Found",403))
    review && res.json({ messsage: "success", review })
})
const deleteReview= catchAsyncError(async(req,res,next)=>{
    const {id}=req.params
    const review =await reviewModel.findOneAndDelete({_id:id ,user:req.user._id})
    !review && next(new AppError("Review Not Found",403))
    review && res.json({ messsage: "success", review })
})

export {
    getAllReview ,
    getSpacificReview ,
    updateReview ,
    deleteReview ,
    addReview
}