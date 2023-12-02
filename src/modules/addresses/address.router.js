import express from 'express'
import { addadress, getUserAddress, removeadress } from './address.controller.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'

const addressRouter =express.Router()
addressRouter.patch('/',protectedRoutes,allowedTo('user','admin'),addadress)
addressRouter.delete('/',protectedRoutes,allowedTo('user','admin'),removeadress)
addressRouter.get('/',protectedRoutes,allowedTo('user','admin'),getUserAddress)

export default addressRouter