import express from 'express'
import * as controller from './subcategory.controller.js'
import { validation } from '../../middleware/validation.js'
import { createsubcategorySchema, spacificsubCategorySchema, updatesubcategorySchema } from './subcategory.schemaVl.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'

const subCategoryRouter =express.Router({mergeParams:true})

subCategoryRouter.route('/').post(protectedRoutes,allowedTo('admin') ,validation(createsubcategorySchema),controller.addsubCategory).get(controller.getsubCategories)
subCategoryRouter.route('/:id').put(protectedRoutes,allowedTo('admin') ,validation(updatesubcategorySchema),controller.updateSubCategory).delete(protectedRoutes,allowedTo('admin') ,validation(spacificsubCategorySchema),controller.deleteSubCategory).get(validation(spacificsubCategorySchema),controller.getsubSpacificSubCategory)
export default subCategoryRouter