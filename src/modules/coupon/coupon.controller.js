import { couponModel } from "../../../databases/models/coupon.model.js";
import { AppError } from "../../utils/AppError.js";
import { ApiFeature } from "../../utils/apiFeature.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import { deleteOne } from "../handlers/factor.handler.js";
import QRCode from 'qrcode'

const createCoupon =catchAsyncError(async (req,res,next)=>{
    const coupon =new couponModel(req.body)
    await coupon.save()
    res.json({message:"success",coupon})
})

const getAllCoupon= catchAsyncError(async (req,res,next)=>{
    const apiFeature =new ApiFeature(couponModel.find(),req.query).paginate().search().sort().fields().filter()
    const result =await apiFeature.mongooseQuery
    res.json({message:"success",result,page:apiFeature.PAGE_NUMBER ,limit:apiFeature.limit})
})

const getCoupon =catchAsyncError(async(req,res,next)=>{
    const {id} =req.params
    const coupon =await couponModel.findById(id)
    !coupon && next(new AppError("Coupon Not Found",403))
   let QrCode =await QRCode.toDataURL(coupon.code)
    coupon && res.json({message:"success",coupon ,QrCode})
})
const updateCoupon =catchAsyncError(async(req,res,next)=>{
    const {id} =req.params
    const coupon =await couponModel.findByIdAndUpdate(id,req.body,{new:true})
    !coupon && next(new AppError("Coupon Not Found",403))
    coupon && res.json({message:"success",coupon})
})
const deleteCoupon = deleteOne(couponModel)

export {
    createCoupon ,
    getAllCoupon ,
    getCoupon ,
    updateCoupon ,
    deleteCoupon
}