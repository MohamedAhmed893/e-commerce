import { subcategoryModel } from "../../../databases/models/subcategory.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import slugify from "slugify";
import { deleteOne } from "../handlers/factor.handler.js";
import { ApiFeature } from "../../utils/apiFeature.js";

const addsubCategory =catchAsyncError(async(req,res,next)=>{
    req.body.user=req.user._id
   req.body.slug=slugify(req.body.name)
    const result =new subcategoryModel(req.body) 
    await result.save()
    res.json({message:"success",result})
})

const getsubCategories =catchAsyncError(async (req,res,next)=>{


    let filter ={}
    if(req.params.id){
        filter={category:req.params.id}
    }
    let apiFeature =new ApiFeature(subcategoryModel.find(filter),req.query).paginate().fields().filter().search().sort()
  
    
// excute query 
    const subCategories = await apiFeature.mongooseQuery

    res.json({message:"success", limit:apiFeature.limit, page:apiFeature.PAGE_NUMBER,subCategories})
})

const getsubSpacificSubCategory =catchAsyncError(async(req,res,next)=>{
    const {id}=req.params
    const result =await subcategoryModel.findById(id)
    !result && next(new AppError("SubCategory Not Found" ,403))
    result && res.json({message:"success",result})
})
const updateSubCategory =catchAsyncError(async(req,res,next)=>{
    const {id}=req.params
    const {name} =req.body
    const result =await subcategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
    !result && next(new AppError("SubCategory Not Found" ,403))
    result && res.json({message:"success",result})
})
const deleteSubCategory =deleteOne(subcategoryModel)
export {
    addsubCategory ,
    getsubCategories ,
    getsubSpacificSubCategory ,
    deleteSubCategory ,
    updateSubCategory
}