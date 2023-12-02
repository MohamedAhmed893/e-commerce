import express from 'express'
import * as productController from './product.controller.js'
import { validation } from '../../middleware/validation.js'
import { createcategorySchema, spacificproductSchema, updateProductSchema } from './product.schemaVl.js'
import { uploadMixOfFile } from '../../middleware/uploadFile.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
let arreyOfFields=[{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 8 }]
const productRouter =express.Router({mergeParams:true})
productRouter.route('/').get(productController.getAllProduct).post(protectedRoutes,allowedTo('admin') ,uploadMixOfFile(arreyOfFields,'product'),validation(createcategorySchema),productController.addproduct)
productRouter.route('/:id').get(validation(spacificproductSchema),productController.getSpacificProduct).put(protectedRoutes,allowedTo('admin') ,validation(updateProductSchema),productController.updateProduct).delete(protectedRoutes,allowedTo('admin') ,validation(spacificproductSchema),productController.deleteProduct)
export default productRouter