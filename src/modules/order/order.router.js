import express from 'express'
import * as order from './order.controller.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'

const orderRouter =express.Router()
orderRouter.post('/:cartId',protectedRoutes,allowedTo('user') ,order.createOrder)
orderRouter.post('/checkoutSession/:id',protectedRoutes,allowedTo('user') ,order.checkoutSession)
orderRouter.get('/',protectedRoutes,allowedTo('user'),order.userOrder)
orderRouter.get('/allorder',protectedRoutes,allowedTo('admin'),order.getAllOrder)

export default orderRouter