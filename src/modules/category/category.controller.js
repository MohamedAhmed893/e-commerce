import { categoryModel } from "../../../databases/models/category.model.js"
import slugify from "slugify"
import { catchAsyncError } from "../../utils/catchAsyncError.js"
import { AppError } from "../../utils/AppError.js"
import { deleteOne } from "../handlers/factor.handler.js"
import { ApiFeature } from "../../utils/apiFeature.js"


const addCategory = catchAsyncError(async (req, res, next) => {
    req.body.user=req.user._id
    if(req.file.filename){
        req.body.img =req.file.filename
    }

req.body.slug =slugify(req.body.name)
    const categories = await categoryModel.insertMany(req.body)
    res.json({ message: "success", categories })
}
)
const getAllCategory = catchAsyncError(async (req, res, next) => {
 
let apiFeature =new ApiFeature(categoryModel.find(),req.query).paginate().fields().filter().search().sort()
  
    
// excute query 
    const categories = await apiFeature.mongooseQuery
    res.json({ message: "success", limit:apiFeature.limit, page:apiFeature.PAGE_NUMBER, categories })
})

const getSpacificCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    const category = await categoryModel.findById(id)
    !category && next(new AppError("Category Not Found ", 403))
    category && res.json({ message: "sucsess", category })
})
const updateCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    req.body.img =req.file.filename
    
req.body.slug =slugify(req.body.name)
    const category = await categoryModel.findByIdAndUpdate(id, req.body, { new: true })
    !category && next(new AppError("Category Not Found ", 403))
    category && res.json({ message: "sucsess", category })
})
const deleteCategory = deleteOne(categoryModel)

export {
    addCategory,
    deleteCategory,
    getSpacificCategory,
    updateCategory,
    getAllCategory
}