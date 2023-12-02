import express from 'express'
import { signIn, signUp, verfiy } from './auth.controller.js'
import { validation } from '../../middleware/validation.js'
import { createUserSchemaVL } from '../user/user.SchemaVl.js'

const authRouter =express.Router()
authRouter.post('/signin',signIn)
authRouter.post('/signup',validation(createUserSchemaVL),signUp)
authRouter.get('/verfiy/:token',verfiy)

export default authRouter