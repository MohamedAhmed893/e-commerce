import { cartModel } from "../../../databases/models/cart.model.js";
import { couponModel } from "../../../databases/models/coupon.model.js";
import { productModel } from "../../../databases/models/product.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";

function calc(cart) {
    let totalPrice = 0
    cart.cartItems.forEach(element => {
        totalPrice += element.quantity * element.price
    });
    cart.totalPrice = totalPrice
}

const addProductToCart = catchAsyncError(async (req, res, next) => {
    let product = await productModel.findById(req.body.product)
    if (!product) return next(new AppError("Porduct Not Found", 401))
    req.body.price = product.price
    const cartExist = await cartModel.findOne({ user: req.user._id })
    if (!cartExist) {
        const cart = new cartModel({
            user: req.user._id,
            cartItems: [req.body]
        })
        calc(cart)
        await cart.save()
        return res.json({ message: "success", cart })
    }
    let Exist = cartExist.cartItems.find((ele) => ele.product == req.body.product)
    if (Exist) {
        Exist.quantity += 1
    } else {
        cartExist.cartItems.push(req.body)
    }
    calc(cartExist)
    if(cartExist.discount){
        cartExist.totalPriceAfterDiscount = cartExist.totalPrice - (cartExist.totalPrice * cartExist.discount) / 100
    }
  
    await cartExist.save()
    res.json({ message: "success", cart: cartExist })

})

const removeProductFromCart = catchAsyncError(async (req, res, next) => {
    const result = await cartModel.findOneAndUpdate({ user: req.user._id }, { $pull: { cartItems: { product: req.params.id } } }, { new: true })
    !result && next(new AppError("product not found or not found cart"))
  
    calc(result)
    if(result.discount){
        result.totalPriceAfterDiscount = result.totalPrice - (result.totalPrice * result.discount) / 100
    }
    await result.save()
    result && res.json({ message: "success", cart: result })
})

const updateQuantity = catchAsyncError(async (req, res, next) => {
    let product = await productModel.findById(req.params.id)
    if (!product) return next(new AppError("Porduct Not Found", 401))
    const cartExist = await cartModel.findOne({ user: req.user._id })
    let item = cartExist.cartItems.find(ele => ele.product == req.params.id)
    if (item) {
        item.quantity = req.body.quantity
    }
    calc(cartExist)
    if(cartExist.discount){
        cartExist.totalPriceAfterDiscount = cartExist.totalPrice - (cartExist.totalPrice * cartExist.discount) / 100
    }
    
    await cartExist.save()
    res.json({ message: "success", cart: cartExist })
})

const applyCoupon = catchAsyncError(async (req, res, next) => {
    const coupon = await couponModel.findOne({ code: req.body.code ,expire:{$gt:Date.now()} })
    const cart = await cartModel.findOne({user:req.user._id})
    cart.discount=coupon.discount
    
    cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100
    await cart.save()
    res.json({ message: "success", cart })
})
const getLogedUserCart= catchAsyncError(async (req,res,next)=>{
    const cartItems =await cartModel.findOne({user:req.user._id}).populate('cartItems.product')
    !cartItems&&next(new AppError("cart not found",401))
    cartItems&& res.json({message:"success",cart:cartItems})
})
export {
    addProductToCart,
    removeProductFromCart,
    updateQuantity ,
    applyCoupon ,
    getLogedUserCart
}