import mongoose from "mongoose";

const couponSchema =mongoose.Schema({
    code:{
        type:String ,
        required:true
    } ,
    discount:{
        type:Number,
        default:0
    } ,
    expire:{
        type:Date ,
        required:true
    }
},{timestamps:true})

export const couponModel =mongoose.model('coupon',couponSchema)