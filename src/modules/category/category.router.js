import express from "express"
import * as controller from "./category.controller.js"
import subCategoryRouter from "../subcategory/subcategory.router.js"
import { validation } from "../../middleware/validation.js"
import { createcategorySchema, spacificCategorySchema, updatecategorySchema } from "./category.SchemaVl.js"
import { uploadFile } from "../../middleware/uploadFile.js"
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js"


const categoryRouter = express.Router()
categoryRouter.use('/:id/subcategories', subCategoryRouter)
categoryRouter.route('/').get(controller.getAllCategory).post(protectedRoutes,allowedTo('admin') ,uploadFile('image','category'),validation(createcategorySchema), controller.addCategory)
categoryRouter.route('/:id').put(protectedRoutes,allowedTo('admin') ,uploadFile('image','category'),validation(updatecategorySchema), controller.updateCategory).delete(protectedRoutes,allowedTo('admin') ,validation(spacificCategorySchema), controller.deleteCategory).get(validation(spacificCategorySchema), controller.getSpacificCategory)

export default categoryRouter