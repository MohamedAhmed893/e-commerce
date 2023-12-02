import { cartModel } from "../../../databases/models/cart.model.js";
import { orderModel } from "../../../databases/models/order.model.js";
import { productModel } from "../../../databases/models/product.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51NZrnhBMiaqFeDeqBvX895AkIyqOlsjv30pQuCtiv9PZLRqO3ZkkQlbaREsrYcHpAqAXHnZOenpCnJ572GF0RWP300wp7Y0URU');

const createOrder = catchAsyncError(async (req, res, next) => {
    const cart = await cartModel.findById(req.params.cartId)
    if (!cart) return next(new AppError("cart not found", 401))
    const totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice
    const order = new orderModel({
        user: req.user._id,
        cartItems: cart.cartItems,
        totalOrderPrice,
        shippingAdress: req.body.shippingAdress
    })

    await order.save()
    if (order) {
        let options = cart.cartItems.map((ele) => ({
            updateOne: {
                filter: { _id: ele.product },
                update: { $inc: { quantity: -ele.quantity, sold: ele.quantity } },
            },
        }))
        await productModel.bulkWrite(options)
        await cartModel.findByIdAndDelete(req.params.cartId)
    }

    res.json({ message: 'success', order })
})
const userOrder = catchAsyncError(async (req, res, next) => {
    const order = await orderModel.findOne({ user: req.user._id })
    !order && next(new AppError("you don`t have order", 403))
    order && res.json({ message: "success", order })
})
const getAllOrder = catchAsyncError(async (req, res, next) => {
    const orders = await orderModel.find({})
    res.json({ message: "success", orders })
})

const checkoutSession = catchAsyncError(async (req, res, next) => {
    const cart = await cartModel.findById(req.params.id)
    if (!cart) return next(new AppError("cart not found"))
    const totalOrderPrice = cart.totalPriceAfterDiscount? cart.totalPriceAfterDiscount : cart.totalPrice
    let session =await stripe.checkout.sessions.create({
        line_items:[
          {
            price_data:{
                currency:'egp',
                unit_amount:totalOrderPrice*100 ,
                product_data:{
                    name:req.user.name
                }
            },
            quantity:1
          }
        ],
        mode:'payment' ,
        success_url:"http://localhost:7000/api/v1/products" ,
        cancel_url:"http://localhost:7000/api/v1/category" ,
        customer_email:req.user.email ,
        metadata:req.body.shippingAdress ,
        client_reference_id:req.params.id
    })
    res.json({message:'success',session})
})

export {
    createOrder,
    userOrder,
    getAllOrder ,
    checkoutSession
}