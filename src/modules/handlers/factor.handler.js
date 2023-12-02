import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../../utils/catchAsyncError.js"


export const deleteOne =(model)=>{
    return catchAsyncError(async (req,res,next)=>{
        const {id} =req.params
        const document =await model.findByIdAndDelete(id)
        !document && next(new AppError("Document Not Found",403))
        document && res.json({message:"success",document})
    })
}