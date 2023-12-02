import express from 'express'
import * as brandsController  from './brand.controller.js'
import { validation } from '../../middleware/validation.js'
import { createbarndSchema, spacificbrandSchema, updateSchema } from './brand.SchemaVl.js'
import { uploadFile } from '../../middleware/uploadFile.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import productRouter from '../product/product.router.js'

const brandRouter =express.Router()
brandRouter.use('/:id/products',productRouter)
brandRouter.route('/').get(brandsController.getAllBrands).post(protectedRoutes,allowedTo('admin'),uploadFile('image','brands'),validation(createbarndSchema),brandsController.addBrand)
brandRouter.route('/:id').get(validation(spacificbrandSchema),brandsController.getSpacificBrand).put(protectedRoutes,allowedTo('admin') ,validation(updateSchema),brandsController.updateBrand).delete(protectedRoutes,allowedTo('admin'),validation(spacificbrandSchema),brandsController.deleteBrand)
export default brandRouter