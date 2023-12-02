
import express from 'express'
import * as cart from './cart.controller.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
const cartRouter =express.Router()
cartRouter.route('/').post(protectedRoutes,allowedTo('user'),cart.addProductToCart).get(protectedRoutes,allowedTo('user'),cart.getLogedUserCart)
cartRouter.post('/applycoupon',protectedRoutes,allowedTo('user'),cart.applyCoupon)
cartRouter.route('/:id').delete(protectedRoutes,allowedTo('admin'),cart.removeProductFromCart).put(protectedRoutes,allowedTo('user'),cart.updateQuantity)
export default cartRouter