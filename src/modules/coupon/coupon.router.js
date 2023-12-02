import express from 'express'
import * as coupon from './coupon.controller.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
const couponRouter =express.Router()
couponRouter.route('/').post(protectedRoutes,allowedTo('admin'),coupon.createCoupon).get(protectedRoutes,allowedTo('admin'),coupon.getAllCoupon)
couponRouter.route('/:id').get(protectedRoutes,allowedTo('admin'),coupon.getCoupon).put(protectedRoutes,allowedTo('admin'),coupon.updateCoupon).delete(protectedRoutes,allowedTo('admin'),coupon.deleteCoupon)
export default couponRouter