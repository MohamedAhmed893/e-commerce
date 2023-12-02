import express from 'express'
import * as userController from './user.controller.js'
import { validation } from '../../middleware/validation.js'
import { createUserSchemaVL, spacificUserSchemaVL, updateUserSchemaVL} from './user.SchemaVl.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'

const userRouter =express.Router()

userRouter.route('/').post(protectedRoutes,allowedTo('admin') ,validation(createUserSchemaVL),userController.createUser).get(userController.getAllUser)
userRouter.route('/:id').get(validation(spacificUserSchemaVL),userController.getUser).put(protectedRoutes,allowedTo('admin') ,validation(updateUserSchemaVL),userController.updateUser).delete(protectedRoutes,allowedTo('admin') ,validation(spacificUserSchemaVL),userController.deleteUser)
userRouter.patch('/changePassword/:id',protectedRoutes,allowedTo('admin','user') ,userController.changePasswordUser)
export default userRouter