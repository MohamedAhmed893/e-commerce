import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    cartItems: [
        {
            product: { type: mongoose.Types.ObjectId, ref: 'product' } ,
            price:Number ,
            quantity:Number
        }

    ],
    totalOrderPrice:Number ,
    shippingAdress:{
        street:String ,
        city:String ,
        phone:Number
    } ,
    isPiad:{
        type:Boolean ,
        default:false
    } ,
    piadAt:Date ,
    isDilevered:{
        type:Boolean ,
        default:false
    } ,
    DileveredAt:Date ,
    paymentmethod:{
        type:String ,
        enum:['cash','card'] ,
        default:'cash'
    }

},{timestamps:true})

export const orderModel =mongoose.model('order',orderSchema)