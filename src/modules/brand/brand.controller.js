import slugify from "slugify";
import { brandModel } from "../../../databases/models/brand.model.js";
import { AppError } from "../../utils/AppError.js";
import { ApiFeature } from "../../utils/apiFeature.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import { deleteOne } from "../handlers/factor.handler.js";


const addBrand =catchAsyncError(async (req,res,next)=>{
    req.body.user=req.user._id
    req.body.logo =req.file.filename
    req.body.slug =slugify(req.body.name)
    const brand =new brandModel(req.body)
    await brand.save()
    res.json({message:"success",brand})
})

const getAllBrands=catchAsyncError(async (req,res,next)=>{
    
    let apiFeature =new ApiFeature(brandModel.find({}),req.query).paginate().fields().filter().search().sort()
  
    
// excute query 
    const brands = await apiFeature.mongooseQuery

    res.json({message:"success", limit:apiFeature.limit, page:apiFeature.PAGE_NUMBER,brands})

})

const getSpacificBrand =catchAsyncError(async (req,res,next)=>{
    const {id}=req.params
    
    const brand =await brandModel.findById(id)
   !brand && next(new AppError("Brand Not Found",403))
   brand && res.json({message:"success",brand})

})

const updateBrand=catchAsyncError(async(req,res,next)=>{
    const {id}=req.params
    req.body.logo =req.file.filename
    
    req.body.slug =slugify(req.body.name)
    const brand =await brandModel.findByIdAndUpdate(id,req.body,{new:true})
   !brand && next(new AppError("Brand Not Found",403))
   brand && res.json({message:"success",brand})
})
const deleteBrand=deleteOne(brandModel)

export {
     addBrand ,
     getAllBrands ,
     getSpacificBrand ,
     updateBrand ,
     deleteBrand
}