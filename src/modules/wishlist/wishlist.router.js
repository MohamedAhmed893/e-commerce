import express from 'express'
import { addToWishlist, deleteFromWishlist, getUserWishlist } from './wishlist.controller.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
const wishlistRouter=express.Router()

wishlistRouter.patch('/',protectedRoutes,allowedTo('user','admin'),addToWishlist)
wishlistRouter.delete('/',protectedRoutes,allowedTo('user','admin'),deleteFromWishlist)
wishlistRouter.get('/',protectedRoutes,allowedTo('user','admin'),getUserWishlist)

export default wishlistRouter